"use client";

import { useFormState } from "react-dom";
import { loginWithCredentials } from "@/app/actions/auth.login.actions";

const initialState = {
  error: undefined,
  success: false,
};

export default function LoginPage() {
  const [state, formAction] = useFormState(loginWithCredentials, initialState);

  return (
    <div>
      <h2>Login</h2>

      {state.error && <div>{state.error}</div>}

      <form action={formAction}>
        <input type="email" name="email" required />
        <input type="password" name="password" required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
