import { auth, signOut } from "@/lib/auth";
import Image from "next/image";

export default async function UserInfo() {
  const session = await auth();

  if (!session?.user) {
    return (
      <div className="flex items-center gap-3">
        <a
          href="/login"
          className="text-sm font-semibold text-gray-600 hover:text-gray-900"
        >
          Sign in
        </a>
        <a href="/signup" className="btn btn-primary text-sm">
          Sign up
        </a>
      </div>
    );
  }

  // 📌 Server Action for sign out
  async function handleSignOut() {
    "use server";
    await signOut({ redirectTo: "/" });
  }

  return (
    <div className="flex items-center gap-3">
      {session.user.image && (
        <Image
          src={session.user.image}
          alt={session.user.name || "User"}
          width={32}
          height={32}
          className="rounded-full"
        />
      )}

      <div className="hidden md:block">
        <p className="text-sm font-semibold text-gray-900">
          {session.user.name || session.user.email}
        </p>
      </div>

      {/* ✅ Fixed: Server Action */}
      <form action={handleSignOut}>
        <button
          type="submit"
          className="text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors"
        >
          Sign out
        </button>
      </form>
    </div>
  );
}
