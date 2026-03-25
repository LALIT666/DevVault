// ! route.ts (mandatory name) --- URL /api/bookmarks

import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { bookmarkSchema } from "@/lib/validations";
import { success } from "zod/v4";

export async function GET(request: NextRequest) {
  try {
    // ! Get authenticated user
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    //* Query parameters from URL
    const { searchParams } = new URL(request.url);
    const tag = searchParams.get("tag");
    const isPublic = searchParams.get("public");

    //* Build where clause based on query params

    const where: any = {
      userId: session.user.id,
    };

    if (tag) {
      where.tag = {
        has: tag, //! has jo hai wo postgres ka hai and ye pata lagata hai ki kya array me specific valure contain karti hai
      };
    }

    if (isPublic !== null) {
      where.isPublic = isPublic === "true";
    }

    //fetch all bookmarks

    const bookmarks = await prisma.bookmark.findMany({
      where,
      orderBy: {
        createdAt: "desc",
      },
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

    return NextResponse.json({
      success: true,
      data: bookmarks,
      count: bookmarks.length,
    });
  } catch (error) {
    console.error("GET /api/bookmarks error: ", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

//POST -- Create bookmark
export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    //this is how you **paser JSON body**
    const body = await request.json();

    const validateFields = bookmarkSchema.safeParse(body);

    if (!validateFields.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: validateFields.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
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
        description: validateFields.data.description || null,
        tags: tagsArray,
        isPublic: validateFields.data.isPublic,
        userId: session.user.id,
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

    console.log("Bookmark created via API: ", bookmark.id);

    return NextResponse.json(
      {
        success: true,
        message: "Bookmark created sucessfully",
        data: bookmark,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("POST /api/bookmarks error: ", error);
    return NextResponse.json(
      { error: "Failed to create bookmark" },
      { status: 500 },
    );
  }
}
