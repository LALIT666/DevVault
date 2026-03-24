// app/signup/page.tsx
"use client";

import { useFormState } from "react-dom";
import { signupUser } from "@/app/actions/auth.signup.actions";
import SubmitButton from "@/app/components/SubmitButton";

const initialState = {
  error: undefined,
  errors: {},
  success: false,
};

export default function SignupPage() {
  const [state, formAction] = useFormState(signupUser, initialState);

  return (
    <div>
      <h2>Create Account</h2>

      {/* General error message */}
      {state.error && <div>{state.error}</div>}

      <form action={formAction}>
        {/* Name field */}
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" required />
          {state.errors?.name && <p>{state.errors.name[0]}</p>}
        </div>

        {/* Email field */}
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />
          {state.errors?.email && <p>{state.errors.email[0]}</p>}
        </div>

        {/* Password field */}
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            minLength={6}
          />
          {state.errors?.password && <p>{state.errors.password[0]}</p>}
        </div>

        <SubmitButton />
      </form>

      <p>
        Already have an account? <a href="/login">Login</a>
      </p>
    </div>
  );
}
