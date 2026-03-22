import Link from "next/link";

export default function SignupPage() {
  return (
    <div>
      <h3 className="text-2xl font-bold mb-2">Create Account</h3>
      <p className="text-gray-500 mb-8">Start organizing your dev resources.</p>

      <form className="space-y-5">
        <div>
          <label className="block text-sm font-bold mb-2">Name</label>
          <input type="text" placeholder="John Doe" className="input-gumroad" />
        </div>

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
          <p className="text-xs text-gray-500 mt-1">
            Must be at least 8 characters
          </p>
        </div>

        <label className="flex items-start gap-2 cursor-pointer">
          <input type="checkbox" className="w-4 h-4 mt-1 accent-[#ff90e8]" />
          <span className="text-sm text-gray-600">
            I agree to the{" "}
            <Link href="#" className="link-gumroad">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="#" className="link-gumroad">
              Privacy Policy
            </Link>
          </span>
        </label>

        <button type="submit" className="btn-gumroad-pink w-full text-lg">
          Create Account →
        </button>
      </form>

      <div className="mt-8 pt-6 border-t-2 border-gray-200 text-center">
        <p className="text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="link-gumroad">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
