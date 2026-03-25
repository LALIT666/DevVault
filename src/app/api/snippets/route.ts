import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { snippetSchema } from "@/lib/validations";

// 📌 GET all snippets
export async function GET(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const language = searchParams.get("language");
    const isPublic = searchParams.get("public");

    const where: any = {
      userId: session.user.id,
    };

    if (language) {
      where.language = language;
    }

    if (isPublic !== null) {
      where.isPublic = isPublic === "true";
    }

    const snippets = await prisma.snippet.findMany({
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
      data: snippets,
      count: snippets.length,
    });
  } catch (error) {
    console.error("GET /api/snippets error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

// 📌 POST - Create snippet
export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const validatedFields = snippetSchema.safeParse(body);

    if (!validatedFields.success) {
      return NextResponse.json(
        {
          error: "Zod Validation failed",
          details: validatedFields.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const snippet = await prisma.snippet.create({
      data: {
        title: validatedFields.data.title,
        code: validatedFields.data.code,
        language: validatedFields.data.language,
        description: validatedFields.data.description || null,
        isPublic: validatedFields.data.isPublic,
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

    console.log("✅ Snippet created via API:", snippet.id);

    return NextResponse.json(
      {
        success: true,
        message: "Snippet created successfully",
        data: snippet,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("POST /api/snippets error:", error);
    return NextResponse.json(
      { error: "Failed to create snippet" },
      { status: 500 },
    );
  }
}
