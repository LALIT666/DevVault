import { signIn } from "@/lib/auth";
import { redirect } from "next/navigation";

// 📌 CONCEPT: Page Props with searchParams
type PageProps = {
  searchParams: { callbackUrl?: string };
};

export default function LoginPage({ searchParams }: PageProps) {
  const callbackUrl = searchParams.callbackUrl || "/dashboard";

  async function handleCredentialsLogin(formData: FormData) {
    "use server";

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      // 📌 CONCEPT: Redirect to intended page after login
      redirect(callbackUrl);
    } catch (error) {
      console.error("Login error:", error);
    }
  }

  async function handleGitHubLogin() {
    "use server";
    // 📌 Pass callback URL to OAuth flow
    await signIn("github", { redirectTo: callbackUrl });
  }

  return (
    <div>
      <h2>Login to DevVault</h2>

      {/* 📌 Show intended destination */}
      {callbackUrl !== "/dashboard" && (
        <p>You need to login to access: {callbackUrl}</p>
      )}

      <form action={handleGitHubLogin}>
        <button type="submit">Sign in with GitHub</button>
      </form>

      <hr />
      <p>OR</p>
      <hr />

      <h3>Login with Email</h3>
      <form action={handleCredentialsLogin}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            placeholder="your@email.com"
          />
        </div>

        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            minLength={6}
          />
        </div>

        <button type="submit">Login with Email</button>
      </form>

      <p>
        Don&#39;t have an account? <a href="/signup">Sign up</a>
      </p>
    </div>
  );
}
