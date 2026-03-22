"use client";

import { useFormState } from "react-dom";
import { updateBookmark } from "@/app/actions/bookmark-actions";
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
  // 📌 CONCEPT: bind() with useFormState

  //both are same
  // const updateBookmarkWithId = async (prevState: any, formData: FormData) => {
  //   return updateBookmark(bookmark.id, prevState, formData);
  // };
  const updateBookmarkWithId = updateBookmark.bind(null, bookmark.id);
  const [state, formAction] = useFormState(updateBookmarkWithId, initialState);

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
            defaultValue={bookmark.title}
          />
          {state.errors?.title && <p>{state.errors.title.join(", ")}</p>}
        </div>

        <div>
          <label htmlFor="url">URL:</label>
          <input type="url" id="url" name="url" defaultValue={bookmark.url} />
          {state.errors?.url && <p>{state.errors.url.join(", ")}</p>}
        </div>

        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            defaultValue={bookmark.description || ""}
            rows={3}
          />
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
            defaultValue={bookmark.tags.join(", ")}
          />
          {state.errors?.tags && <p>{state.errors.tags.join(", ")}</p>}
        </div>

        <div>
          <label>
            <input
              type="checkbox"
              name="isPublic"
              defaultChecked={bookmark.isPublic}
            />
            Make public
          </label>
        </div>

        <SubmitButton label="Save Changes" loadingLabel="Saving..." />

        <a href={`/bookmarks/${bookmark.id}`}>Cancel</a>
      </form>
    </div>
  );
}
