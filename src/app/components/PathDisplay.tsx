import { headers } from "next/headers";

export default async function PathDisplay() {
  const headersList = headers();

  const pathname = headersList.get("x-pathname");
  const isAuthenticated = headersList.get("x-authenticated");

  return (
    <div>
      <p>Current path: {pathname}</p>
      <p>Authenticated: {isAuthenticated}</p>
    </div>
  );
}
