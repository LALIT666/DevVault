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
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Create Account</h2>
      </div>

      {state.error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-gumroad">
          <p className="font-semibold">{state.error}</p>
        </div>
      )}

      <form action={formAction} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-semibold text-gray-900 mb-2"
          >
            Name:
          </label>
          <input type="text" id="name" name="name" required className="input" />
          {state.errors?.name && (
            <p className="text-sm text-red-600 mt-1">{state.errors.name[0]}</p>
          )}
        </div>

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
            className="input"
          />
          {state.errors?.email && (
            <p className="text-sm text-red-600 mt-1">{state.errors.email[0]}</p>
          )}
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
          {state.errors?.password && (
            <p className="text-sm text-red-600 mt-1">
              {state.errors.password[0]}
            </p>
          )}
        </div>

        <SubmitButton />
      </form>

      <p className="text-center text-sm text-gray-600 pt-4 border-t border-gray-200">
        Already have an account?{" "}
        <a
          href="/login"
          className="font-semibold text-gray-900 hover:text-primary-500 transition-colors"
        >
          Login
        </a>
      </p>
    </div>
  );
}
