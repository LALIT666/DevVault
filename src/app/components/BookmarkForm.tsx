"use client";

import { useFormState } from "react-dom";
import { createBookmark } from "../actions/bookmark.actions";
import SubmitButton from "./SubmitButton";

const initialState = {
  errors: {},
  message: "",
};

export default function BookmarkForm() {
  const [state, formAction] = useFormState(createBookmark, initialState);

  return (
    <div className="max-w-2xl mx-auto">
      {state.errors?._form && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-gumroad mb-6">
          <p className="font-semibold">
            ERROR: {state.errors._form.join(", ")}
          </p>
        </div>
      )}

      {state.message && !state.errors?._form && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-gumroad mb-6">
          <p className="font-semibold">{state.message}</p>
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
          <input type="text" id="title" name="title" className="input" />
          {state.errors?.title && (
            <p className="text-sm text-red-600 mt-1">
              {state.errors.title.join(", ")}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="url"
            className="block text-sm font-semibold text-gray-900 mb-2"
          >
            URL:
          </label>
          <input
            type="url"
            id="url"
            name="url"
            placeholder="https://example.com"
            className="input"
          />
          {state.errors?.url && (
            <p className="text-sm text-red-600 mt-1">
              {state.errors.url.join(", ")}
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
            name="description"
            id="description"
            rows={3}
            className="textarea"
          />
          {state.errors?.description && (
            <p className="text-sm text-red-600 mt-1">
              {state.errors.description.join(", ")}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="tags"
            className="block text-sm font-semibold text-gray-900 mb-2"
          >
            Tags (comma-separated):
          </label>
          <input
            type="text"
            id="tags"
            name="tags"
            placeholder="nextjs, react, typescript"
            className="input"
          />
          {state.errors?.tags && (
            <p className="text-sm text-red-600 mt-1">
              {state.errors.tags.join(", ")}
            </p>
          )}
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isPublic"
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
          <SubmitButton label="Add Bookmark" loadingLabel="Adding..." />
          <a href="/bookmarks" className="btn btn-secondary">
            Cancel
          </a>
        </div>
      </form>
    </div>
  );
}
