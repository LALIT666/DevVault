"use server";

import { prisma } from "@/lib/prisma";
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
  const rawData = {
    title: formData.get("title"),
    code: formData.get("code"),
    language: formData.get("language"),
    description: formData.get("description"),
    isPublic: formData.get("isPublic") === "on",
  };

  const validateFields = snippetSchema.safeParse(rawData);

  if (!validateFields.success) {
    return {
      errors: validateFields.error.flatten().fieldErrors,
      message: "Validation failed. Please check the form.",
    };
  }

  try {
    const user = await prisma.user.findFirst();
    if (!user) {
      return {
        errors: {
          _form: ["No user found. Please login"],
        },
      };
    }

    await prisma.snippet.create({
      data: {
        title: validateFields.data.title,
        code: validateFields.data.code,
        language: validateFields.data.language,
        description: validateFields.data.description || null,
        isPublic: validateFields.data.isPublic,
        userId: user.id,
      },
    });

    console.log("✅ Snippet created");
  } catch (error) {
    console.error("Database error: ", error);
    return {
      errors: {
        _form: ["Failed to create snippet. Please try again."],
      },
    };
  }
  revalidatePath("/snippets");
  redirect("/snippets");
}

// 📌 UPDATE Snippet
export async function updateSnippet(
  id: string,
  prevData: FormState,
  formData: FormData,
): Promise<FormState> {
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
      message: "Validation failed.Please check the form",
    };
  }

  try {
    await prisma.snippet.update({
      where: { id },
      data: {
        title: validatedFields.data.title,
        code: validatedFields.data.title,
        language: validatedFields.data.title,
        description: validatedFields.data.title,
        isPublic: validatedFields.data.isPublic,
      },
    });

    console.log("Snippet updated: ", id);
  } catch (error) {
    console.error("Database error: ", error);
    return {
      errors: {
        _form: ["Failed to update snippet. Please try again"],
      },
    };
  }

  revalidatePath("/snippets");
  revalidatePath(`/snippets/${id}`);
  redirect(`/snippets/${id}`);
}

// 📌 DELETE Snippet
export async function deleteSnippet(id: string) {
  try {
    await prisma.snippet.delete({
      where: { id },
    });

    console.log("✅ Snippet deleted:", id);
  } catch (error) {
    console.error("Delete error: ", error);
    throw new Error("Failed to delete snippet");
  }

  revalidatePath("/snippets");
  redirect("/snippets");
}
