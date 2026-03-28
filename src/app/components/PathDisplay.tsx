import { headers } from "next/headers";

export default async function PathDisplay() {
  const headersList = headers();

  const pathname = headersList.get("x-pathname");
  const isAuthenticated = headersList.get("x-authenticated");

  return (
    <div className="card bg-blue-50 border-blue-200">
      <p className="text-sm text-blue-700">
        Current path:{" "}
        <span className="font-mono font-semibold">{pathname}</span>
      </p>
      <p className="text-sm text-blue-700 mt-2">
        Authenticated: <span className="font-semibold">{isAuthenticated}</span>
      </p>
    </div>
  );
}
