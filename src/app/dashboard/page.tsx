import { auth } from "@/lib/auth";

export default async function DashboardPage() {
  const session = await auth();

  return (
    <div>
      <p>Welcome back, {session!.user!.name || session!.user!.email}!</p>
      <p>This is the main dashboard content (default slot)</p>
    </div>
  );
}
