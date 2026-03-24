"use server";

import { signIn } from "@/lib/auth";
import { redirect } from "next/navigation";

type PageProps = {
  searchParams: { callbackUrl?: string };
};

type LoginState = {
  error?: string;
  success?: boolean;
};

export async function loginWithCredentials(
  { searchParams }: PageProps,
  prevState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const callbackUrl = searchParams.callbackUrl || "/dashboard";
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
