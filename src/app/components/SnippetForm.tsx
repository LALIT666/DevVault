"use client";

import { useFormState } from "react-dom";
import { createSnippet } from "@/app/actions/snippet.actions";
import SubmitButton from "./SubmitButton";

const initialState = {
  errors: {},
  message: "",
};

export default function SnippetForm() {
  const [state, formAction] = useFormState(createSnippet, initialState);

  return (
    <div>
      {state.errors?._form && (
        <div>
          <p>ERROR: {state.errors._form.join(", ")}</p>
        </div>
      )}

      <form action={formAction}>
        <div>
          <label htmlFor="title">Title:</label>
          <input type="text" id="title" name="title" />
          {state.errors?.title && <p>{state.errors.title.join(", ")}</p>}
        </div>

        <div>
          <label htmlFor="language">Language:</label>
          <select id="language" name="language">
            <option value="">Select language</option>
            <option value="javascript">JavaScript</option>
            <option value="typescript">TypeScript</option>
            <option value="python">Python</option>
            <option value="html">HTML</option>
            <option value="css">CSS</option>
            <option value="sql">SQL</option>
          </select>
          {state.errors?.language && <p>{state.errors.language.join(", ")}</p>}
        </div>

        <div>
          <label htmlFor="code">Code:</label>
          <textarea
            id="code"
            name="code"
            rows={10}
            placeholder="// Your code here"
          />
          {state.errors?.code && <p>{state.errors.code.join(", ")}</p>}
        </div>

        <div>
          <label htmlFor="description">Description:</label>
          <textarea id="description" name="description" rows={3} />
          {state.errors?.description && (
            <p>{state.errors.description.join(", ")}</p>
          )}
        </div>

        <div>
          <label>
            <input type="checkbox" name="isPublic" />
            Make public
          </label>
        </div>

        <SubmitButton label="Add Snippet" loadingLabel="Adding..." />

        <a href="/snippets">Cancel</a>
      </form>
    </div>
  );
}
