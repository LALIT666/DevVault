// 📌 CONCEPT: Server Component accessing session

import { auth } from "@/lib/auth";
import Image from "next/image";

export default async function UserInfo() {
  // 📌 CONCEPT: auth() function - Get session in Server Component
  const session = await auth();

  if (!session?.user) {
    return (
      <div>
        <p>Not logged in</p>
        <a href="/login">Login</a>
      </div>
    );
  }

  return (
    <div>
      <p>Logged in as: {session.user.name || session.user.email}</p>
      {session.user.image && (
        <Image src={session.user.image} alt="Profile" width={40} height={40} />
      )}
      <form action="/api/auth/signout" method="POST">
        <button type="submit">Sign Out</button>
      </form>
    </div>
  );
}
