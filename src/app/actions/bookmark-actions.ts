"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { bookmarkSchema } from "@/lib/validations";

type Formstate = {
  errors?: {
    title?: string[];
    url?: string[];
    description?: string[];
    tags?: string[];
    _form?: string[];
  };

  success?: boolean;
  message?: string;
};

export async function createBookmark(
  prevState: Formstate,
  formData: FormData,
): Promise<Formstate> {
  const rawData = {
    title: formData.get("title"),
    url: formData.get("url"),
    description: formData.get("description"),
    tags: formData.get("tags"),
    isPublic: formData.get("isPublic") === "on",
  };

  const validateFields = bookmarkSchema.safeParse(rawData);

  if (!validateFields.success) {
    return {
      errors: validateFields.error.flatten().fieldErrors,
      message: "Validation failed. Please check the form",
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

    const tagsArray = validateFields.data.tags
      ? validateFields.data.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag.length > 0)
      : [];

    const bookmark = await prisma.bookmark.create({
      data: {
        title: validateFields.data.title,
        url: validateFields.data.url,
        description: validateFields.data.description,
        tags: tagsArray,
        isPublic: validateFields.data.isPublic,
        userId: user.id,
      },
    });

    console.log("Bookmark created: ", bookmark.id);
  } catch (error) {
    console.error("Database error: ", error);

    return {
      errors: {
        _form: ["Failed to create bookmark. Please try again."],
      },
    };
  }

  revalidatePath("/bookmarks");
  redirect("/bookmarks");
}

export async function updateBookmark(
  id: string,
  prevState: Formstate,
  formData: FormData,
): Promise<Formstate> {
  const rawData = {
    title: formData.get("title"),
    url: formData.get("url"),
    description: formData.get("description"),
    tags: formData.get("tags"),
    isPublic: formData.get("isPublic") === "on",
  };

  const validatedFields = bookmarkSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Validation failed. Please check the form",
    };
  }

  try {
    const tagsArray = validatedFields.data.tags
      ? validatedFields.data.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag.length > 0)
      : [];

    await prisma.bookmark.update({
      where: { id },
      data: {
        title: validatedFields.data.title,
        url: validatedFields.data.url,
        description: validatedFields.data.description || null,
        tags: tagsArray,
        isPublic: validatedFields.data.isPublic,
      },
    });

    console.log("Bookmark updated: ", id);
  } catch (error) {
    console.error("Database error: ", error);

    return {
      errors: {
        _form: ["Failed to update bookmark. Please try again."],
      },
    };
  }

  revalidatePath("/bookmarks");
  revalidatePath(`/bookmarks/${id}`);
  redirect(`/bookmarks/${id}`);
}

export async function deleteBookmark(id: string) {
  try {
    await prisma.bookmark.delete({
      where: { id },
    });
    console.log("Bookmark deleted: ", id);
  } catch (error) {
    console.error("Delete error: ", error);
    throw new Error("Failed to delete bookmark");
  }

  revalidatePath("/bookmarks");
  redirect("/bookmarks");
}
