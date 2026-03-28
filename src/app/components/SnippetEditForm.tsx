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
    <div className="max-w-2xl mx-auto">
      {state.errors?._form && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-gumroad mb-6">
          <p className="font-semibold">
            ERROR: {state.errors._form.join(", ")}
          </p>
        </div>
      )}

      <form action={formAction} className="space-y-6">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-semibold text-gray-900 mb-2"
          >
            Title:
          </label>
          <input
            type="text"
            id="title"
            name="title"
            defaultValue={snippet.title}
            className="input"
          />
          {state.errors?.title && (
            <p className="text-sm text-red-600 mt-1">
              {state.errors.title.join(", ")}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="language"
            className="block text-sm font-semibold text-gray-900 mb-2"
          >
            Language:
          </label>
          <select
            id="language"
            name="language"
            defaultValue={snippet.language}
            className="input"
          >
            <option value="javascript">JavaScript</option>
            <option value="typescript">TypeScript</option>
            <option value="python">Python</option>
            <option value="html">HTML</option>
            <option value="css">CSS</option>
            <option value="sql">SQL</option>
          </select>
          {state.errors?.language && (
            <p className="text-sm text-red-600 mt-1">
              {state.errors.language.join(", ")}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="code"
            className="block text-sm font-semibold text-gray-900 mb-2"
          >
            Code:
          </label>
          <textarea
            id="code"
            name="code"
            rows={10}
            defaultValue={snippet.code}
            className="textarea font-mono text-sm"
          />
          {state.errors?.code && (
            <p className="text-sm text-red-600 mt-1">
              {state.errors.code.join(", ")}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-semibold text-gray-900 mb-2"
          >
            Description:
          </label>
          <textarea
            id="description"
            name="description"
            defaultValue={snippet.description || ""}
            rows={3}
            className="textarea"
          />
          {state.errors?.description && (
            <p className="text-sm text-red-600 mt-1">
              {state.errors.description.join(", ")}
            </p>
          )}
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isPublic"
            defaultChecked={snippet.isPublic}
            id="isPublic"
            className="w-4 h-4 accent-gray-900"
          />
          <label
            htmlFor="isPublic"
            className="text-sm font-medium text-gray-700"
          >
            Make public
          </label>
        </div>

        <div className="flex items-center gap-4 pt-4">
          <SubmitButton label="Save Changes" loadingLabel="Saving..." />
          <a href={`/snippets/${snippet.id}`} className="btn btn-secondary">
            Cancel
          </a>
        </div>
      </form>
    </div>
  );
}
