// app/actions/auth.ts
"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { signIn } from "@/lib/auth";

// 📌 Type for form state
type SignupState = {
  error?: string;
  errors?: {
    name?: string[];
    email?: string[];
    password?: string[];
  };
  success?: boolean;
};

// 📌 Validation schema
const signupSchema = z.object({
  name: z.string().min(1, "Name required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export async function signupUser(
  prevState: SignupState,
  formData: FormData,
): Promise<SignupState> {
  const rawData = {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  };

  // 📌 Validate
  const validatedFields = signupSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      error: "Validation failed. Please check the form.",
    };
  }

  const { name, email, password } = validatedFields.data;

  try {
    // 📌 Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return {
        error: "Email already registered. Please login instead.",
      };
    }

    // 📌 Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 📌 Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    console.log("✅ User created:", email);

    // 📌 AUTOMATIC LOGIN after signup!
    await signIn("credentials", {
      email,
      password, // Plain password (signIn will verify with hash)
      redirect: false,
    });

    console.log("✅ User auto-logged in");
  } catch (error: any) {
    console.error("Signup error:", error);

    // Handle specific Prisma errors
    if (error.code === "P2002") {
      return {
        error: "Email already exists",
      };
    }

    return {
      error: "Failed to create account. Please try again.",
    };
  }

  // 📌 Redirect to dashboard
  redirect("/dashboard");
}
