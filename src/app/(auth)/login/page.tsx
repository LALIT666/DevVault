import { signIn } from "@/lib/auth";
import { redirect } from "next/navigation";

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

      redirect(callbackUrl);
    } catch (error) {
      console.error("Login error:", error);
    }
  }

  async function handleGitHubLogin() {
    "use server";
    await signIn("github", { redirectTo: callbackUrl });
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Login to DevVault
        </h2>

        {callbackUrl !== "/dashboard" && (
          <p className="text-sm text-gray-600 bg-yellow-50 border border-yellow-200 px-4 py-2 rounded-gumroad">
            You need to login to access:{" "}
            <span className="font-semibold">{callbackUrl}</span>
          </p>
        )}
      </div>

      <form action={handleGitHubLogin}>
        <button type="submit" className="btn btn-primary w-full">
          Sign in with GitHub
        </button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-white text-gray-500 font-medium">OR</span>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Login with Email
        </h3>
        <form action={handleCredentialsLogin} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-900 mb-2"
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder="your@email.com"
              className="input"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-900 mb-2"
            >
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              minLength={6}
              className="input"
            />
          </div>

          <button type="submit" className="btn btn-pink w-full">
            Login with Email
          </button>
        </form>
      </div>

      <p className="text-center text-sm text-gray-600 pt-4 border-t border-gray-200">
        Don&#39;t have an account?{" "}
        <a
          href="/signup"
          className="font-semibold text-gray-900 hover:text-primary-500 transition-colors"
        >
          Sign up
        </a>
      </p>
    </div>
  );
}
