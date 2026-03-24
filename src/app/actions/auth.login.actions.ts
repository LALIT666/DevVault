"use server";

import { signIn } from "@/lib/auth";

type LoginState = {
  error?: string;
  success?: boolean;
};

export async function loginWithCredentials(
  prevState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  // ✅ Now return type is allowed!
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    return { success: true };
  } catch (error) {
    return { error: "Invalid email or password" };
  }
}
