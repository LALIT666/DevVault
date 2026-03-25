import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { snippetSchema } from "@/lib/validations";

type RouteContext = {
  params: { id: string };
};

// 📌 GET single snippet
export async function GET(request: NextRequest, { params }: RouteContext) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;

    const snippet = await prisma.snippet.findUnique({
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

    if (!snippet) {
      return NextResponse.json({ error: "Snippet not found" }, { status: 404 });
    }

    if (snippet.userId !== session.user.id && !snippet.isPublic) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    return NextResponse.json({
      success: true,
      data: snippet,
    });
  } catch (error) {
    console.error("GET /api/snippets/[id] error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

// 📌 PUT - Update snippet
export async function PUT(request: NextRequest, { params }: RouteContext) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;

    const existingSnippet = await prisma.snippet.findUnique({
      where: { id },
    });

    if (!existingSnippet) {
      return NextResponse.json({ error: "Snippet not found" }, { status: 404 });
    }

    if (existingSnippet.userId !== session.user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await request.json();
    const validatedFields = snippetSchema.safeParse(body);

    if (!validatedFields.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: validatedFields.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const updatedSnippet = await prisma.snippet.update({
      where: { id },
      data: {
        title: validatedFields.data.title,
        code: validatedFields.data.code,
        language: validatedFields.data.language,
        description: validatedFields.data.description || null,
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

    console.log("✅ Snippet updated via API:", id);

    return NextResponse.json({
      success: true,
      message: "Snippet updated successfully",
      data: updatedSnippet,
    });
  } catch (error) {
    console.error("PUT /api/snippets/[id] error:", error);
    return NextResponse.json(
      { error: "Failed to update snippet" },
      { status: 500 },
    );
  }
}

// 📌 DELETE - Delete snippet
export async function DELETE(request: NextRequest, { params }: RouteContext) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;

    const snippet = await prisma.snippet.findUnique({
      where: { id },
    });

    if (!snippet) {
      return NextResponse.json({ error: "Snippet not found" }, { status: 404 });
    }

    if (snippet.userId !== session.user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await prisma.snippet.delete({
      where: { id },
    });

    console.log("✅ Snippet deleted via API:", id);

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("DELETE /api/snippets/[id] error:", error);
    return NextResponse.json(
      { error: "Failed to delete snippet" },
      { status: 500 },
    );
  }
}
