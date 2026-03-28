"use client";

import { useFormState } from "react-dom";
import { updateBookmark } from "@/app/actions/bookmark.actions";
import SubmitButton from "./SubmitButton";

type BookmarkEditFormProps = {
  bookmark: {
    id: string;
    title: string;
    url: string;
    description: string | null;
    tags: string[];
    isPublic: boolean;
  };
};

const initialState = {
  errors: {},
  message: "",
};

export default function BookmarkEditForm({ bookmark }: BookmarkEditFormProps) {
  const updateBookmarkWithId = updateBookmark.bind(null, bookmark.id);
  const [state, formAction] = useFormState(updateBookmarkWithId, initialState);

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
            defaultValue={bookmark.title}
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
            htmlFor="url"
            className="block text-sm font-semibold text-gray-900 mb-2"
          >
            URL:
          </label>
          <input
            type="url"
            id="url"
            name="url"
            defaultValue={bookmark.url}
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
            id="description"
            name="description"
            defaultValue={bookmark.description || ""}
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
            defaultValue={bookmark.tags.join(", ")}
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
            defaultChecked={bookmark.isPublic}
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
          <a href={`/bookmarks/${bookmark.id}`} className="btn btn-secondary">
            Cancel
          </a>
        </div>
      </form>
    </div>
  );
}
