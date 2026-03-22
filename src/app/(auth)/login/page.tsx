import Link from "next/link";

export default function LoginPage() {
  return (
    <div>
      <h3 className="text-2xl font-bold mb-2">Login to DevVault</h3>
      <p className="text-gray-500 mb-8">Welcome back! Enter your details.</p>

      <form className="space-y-5">
        <div>
          <label className="block text-sm font-bold mb-2">Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            className="input-gumroad"
          />
        </div>

        <div>
          <label className="block text-sm font-bold mb-2">Password</label>
          <input
            type="password"
            placeholder="••••••••"
            className="input-gumroad"
          />
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="w-4 h-4 accent-[#ff90e8]" />
            <span className="text-sm">Remember me</span>
          </label>
          <Link href="#" className="text-sm link-gumroad">
            Forgot password?
          </Link>
        </div>

        <button type="submit" className="btn-gumroad-pink w-full text-lg">
          Login →
        </button>
      </form>

      <div className="mt-8 pt-6 border-t-2 border-gray-200 text-center">
        <p className="text-gray-600">
          Don&rsquo;t have an account?{" "}
          <Link href="/signup" className="link-gumroad">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
