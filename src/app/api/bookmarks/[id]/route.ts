// 📌 CONCEPT: Dynamic Route Handler
// 📌 URL: /api/bookmarks/:id

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { bookmarkSchema } from "@/lib/validations";

// 📌 CONCEPT: Context parameter with params
type RouteContext = {
  params: { id: string };
};

// 📌 GET single bookmark
export async function GET(request: NextRequest, { params }: RouteContext) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;

    // 📌 Fetch bookmark
    const bookmark = await prisma.bookmark.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
      },
    });

    // 📌 Check if exists
    if (!bookmark) {
      return NextResponse.json(
        { error: "Bookmark not found" },
        { status: 404 },
      );
    }

    // 📌 Check ownership (or if public)
    if (bookmark.userId !== session.user.id && !bookmark.isPublic) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    return NextResponse.json({
      success: true,
      data: bookmark,
    });
  } catch (error) {
    console.error("GET /api/bookmarks/[id] error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

// 📌 PUT - Update bookmark
export async function PUT(request: NextRequest, { params }: RouteContext) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;

    // 📌 Check ownership
    const existingBookmark = await prisma.bookmark.findUnique({
      where: { id },
    });

    if (!existingBookmark) {
      return NextResponse.json(
        { error: "Bookmark not found" },
        { status: 404 },
      );
    }

    if (existingBookmark.userId !== session.user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // 📌 Parse and validate body
    const body = await request.json();
    const validatedFields = bookmarkSchema.safeParse(body);

    if (!validatedFields.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: validatedFields.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    // Process tags
    const tagsArray = validatedFields.data.tags
      ? validatedFields.data.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag.length > 0)
      : [];

    // 📌 Update bookmark
    const updatedBookmark = await prisma.bookmark.update({
      where: { id },
      data: {
        title: validatedFields.data.title,
        url: validatedFields.data.url,
        description: validatedFields.data.description || null,
        tags: tagsArray,
        isPublic: validatedFields.data.isPublic,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    console.log("✅ Bookmark updated via API:", id);

    return NextResponse.json({
      success: true,
      message: "Bookmark updated successfully",
      data: updatedBookmark,
    });
  } catch (error) {
    console.error("PUT /api/bookmarks/[id] error:", error);
    return NextResponse.json(
      { error: "Failed to update bookmark" },
      { status: 500 },
    );
  }
}

// 📌 DELETE - Delete bookmark
export async function DELETE(request: NextRequest, { params }: RouteContext) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;

    // 📌 Check ownership
    const bookmark = await prisma.bookmark.findUnique({
      where: { id },
    });

    if (!bookmark) {
      return NextResponse.json(
        { error: "Bookmark not found" },
        { status: 404 },
      );
    }

    if (bookmark.userId !== session.user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // 📌 Delete bookmark
    await prisma.bookmark.delete({
      where: { id },
    });

    console.log("✅ Bookmark deleted via API:", id);

    // 📌 CONCEPT: 204 No Content for successful delete
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("DELETE /api/bookmarks/[id] error:", error);
    return NextResponse.json(
      { error: "Failed to delete bookmark" },
      { status: 500 },
    );
  }
}
