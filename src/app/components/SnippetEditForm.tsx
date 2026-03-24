"use client";

import { useFormState } from "react-dom";
import { updateSnippet } from "@/app/actions/snippet.actions";
import SubmitButton from "./SubmitButton";

type SnippetEditFormProps = {
  snippet: {
    id: string;
    title: string;
    code: string;
    language: string;
    description: string | null;
    isPublic: boolean;
  };
};

const initialState = {
  errors: {},
  message: "",
};

export default function SnippetEditForm({ snippet }: SnippetEditFormProps) {
  const updateSnippetWithId = updateSnippet.bind(null, snippet.id);
  const [state, formAction] = useFormState(updateSnippetWithId, initialState);

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
          <input
            type="text"
            id="title"
            name="title"
            defaultValue={snippet.title}
          />
          {state.errors?.title && <p>{state.errors.title.join(", ")}</p>}
        </div>

        <div>
          <label htmlFor="language">Language:</label>
          <select id="language" name="language" defaultValue={snippet.language}>
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
            defaultValue={snippet.code}
          />
          {state.errors?.code && <p>{state.errors.code.join(", ")}</p>}
        </div>

        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            defaultValue={snippet.description || ""}
            rows={3}
          />
          {state.errors?.description && (
            <p>{state.errors.description.join(", ")}</p>
          )}
        </div>

        <div>
          <label>
            <input
              type="checkbox"
              name="isPublic"
              defaultChecked={snippet.isPublic}
            />
            Make public
          </label>
        </div>

        <SubmitButton label="Save Changes" loadingLabel="Saving..." />

        <a href={`/snippets/${snippet.id}`}>Cancel</a>
      </form>
    </div>
  );
}
