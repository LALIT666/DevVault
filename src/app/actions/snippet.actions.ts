"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { snippetSchema } from "@/lib/validations";

type FormState = {
  errors?: {
    title?: string[];
    code?: string[];
    language?: string[];
    description?: string[];
    _form?: string[];
  };
  success?: boolean;
  message?: string;
};

export async function createSnippet(
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      errors: {
        _form: ["You must be logged in to create a snippet"],
      },
    };
  }

  const rawData = {
    title: formData.get("title"),
    code: formData.get("code"),
    language: formData.get("language"),
    description: formData.get("description"),
    isPublic: formData.get("isPublic") === "on",
  };

  const validatedFields = snippetSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Validation failed. Please check the form.",
    };
  }

  try {
    await prisma.snippet.create({
      data: {
        title: validatedFields.data.title,
        code: validatedFields.data.code,
        language: validatedFields.data.language,
        description: validatedFields.data.description || null,
        isPublic: validatedFields.data.isPublic,
        userId: session.user.id,
      },
    });

    console.log("✅ Snippet created");
  } catch (error) {
    console.error("Database error:", error);
    return {
      errors: {
        _form: ["Failed to create snippet. Please try again."],
      },
    };
  }

  revalidatePath("/snippets");
  redirect("/snippets");
}

export async function updateSnippet(
  id: string,
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      errors: {
        _form: ["You must be logged in"],
      },
    };
  }

  const snippet = await prisma.snippet.findUnique({
    where: { id },
  });

  if (!snippet || snippet.userId !== session.user.id) {
    return {
      errors: {
        _form: ["Snippet not found or unauthorized"],
      },
    };
  }

  const rawData = {
    title: formData.get("title"),
    code: formData.get("code"),
    language: formData.get("language"),
    description: formData.get("description"),
    isPublic: formData.get("isPublic") === "on",
  };

  const validatedFields = snippetSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Validation failed. Please check the form.",
    };
  }

  try {
    await prisma.snippet.update({
      where: { id },
      data: {
        title: validatedFields.data.title,
        code: validatedFields.data.code,
        language: validatedFields.data.language,
        description: validatedFields.data.description || null,
        isPublic: validatedFields.data.isPublic,
      },
    });

    console.log("✅ Snippet updated:", id);
  } catch (error) {
    console.error("Database error:", error);
    return {
      errors: {
        _form: ["Failed to update snippet. Please try again."],
      },
    };
  }

  revalidatePath("/snippets");
  revalidatePath(`/snippets/${id}`);
  redirect(`/snippets/${id}`);
}

export async function deleteSnippet(id: string) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("You must be logged in");
  }

  const snippet = await prisma.snippet.findUnique({
    where: { id },
  });

  if (!snippet || snippet.userId !== session.user.id) {
    throw new Error("Snippet not found or unauthorized");
  }

  try {
    await prisma.snippet.delete({
      where: { id },
    });

    console.log("✅ Snippet deleted:", id);
  } catch (error) {
    console.error("Delete error:", error);
    throw new Error("Failed to delete snippet");
  }

  revalidatePath("/snippets");
  redirect("/snippets");
}
