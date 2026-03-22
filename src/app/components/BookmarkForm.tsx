"use client";

import { useFormState } from "react-dom";
import { createBookmark } from "../actions/bookmark-actions";
import SubmitButton from "./SubmitButton";

const initialState = {
  errors: {},
  message: "",
};

export default function BookmarkForm() {
  const [state, formAction] = useFormState(createBookmark, initialState);

  return (
    <div>
      {state.errors?._form && (
        <div>
          <p>ERROR: {state.errors._form.join(", ")}</p>
        </div>
      )}

      {state.message && !state.errors?._form && (
        <div>
          <p>{state.message}</p>
        </div>
      )}

      <form action={formAction}>
        <div>
          <label htmlFor="title">Title: </label>
          <input type="text" id="title" name="title" />
          {state.errors?.title && <p>{state.errors.title.join(", ")}</p>}
        </div>

        <div>
          <label htmlFor="url">URL: </label>
          <input
            type="url"
            id="url"
            name="url"
            placeholder="https://example.com"
          />
          {state.errors?.url && <p>{state.errors.url.join(", ")}</p>}
        </div>

        <div>
          <label htmlFor="description">Description: </label>
          <textarea name="description" id="description" rows={3} />
          {state.errors?.description && (
            <p>{state.errors.description.join(", ")}</p>
          )}
        </div>

        <div>
          <label htmlFor="tags">Tags (comma-separated):</label>
          <input
            type="text"
            id="tags"
            name="tags"
            placeholder="nextjs, react, typescript"
          />
          {state.errors?.tags && <p>{state.errors.tags.join(", ")}</p>}
        </div>

        <div>
          <label>
            <input type="checkbox" name="isPublic" />
            Make public
          </label>
        </div>

        <SubmitButton label="Add Bokmark" loadingLabel="Adding..." />

        <a href="/bookmarks">Cancel</a>
      </form>
    </div>
  );
}
