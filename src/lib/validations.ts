// 📌 CONCEPT: Zod Schemas - Type-safe validation
import { z } from "zod";

// 📌 CONCEPT: Bookmark validation schema
export const bookmarkSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required") // 📌 Custom error message
    .max(200, "Title must be less than 200 characters"),

  url: z.string().min(1, "URL is required").url("Please enter a valid URL"), // 📌 URL validation

  description: z
    .string()
    .max(1000, "Description too long")
    .optional()
    .or(z.literal("")), // 📌 Empty string = optional

  //z.literal kya hai --> agar litreally "" empty string hai to wo bhi valid hai

  //ye tags wala kahe raha hai ki ya toh string ho "hello" toh bhi thik hai optional (undefine ho ) toh bhi thik hai ya phir empty string ho tab bhi thik hai

  // tags: z.string().optional().transform(val => val || undefined) //aisa bhi likh sakatae hai hum okay
  tags: z.string().optional().or(z.literal("")),

  isPublic: z.boolean().default(false),
});

// 📌 CONCEPT: TypeScript type from Zod schema
export type BookmarkFormData = z.infer<typeof bookmarkSchema>;

// 📌 CONCEPT: Snippet validation schema
export const snippetSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(200, "Title must be less than 200 characters"),

  code: z.string().min(1, "Code is required").max(10000, "Code is too long"),

  language: z.string().min(1, "Language is required"),

  description: z
    .string()
    .max(1000, "Description too long")
    .optional()
    .or(z.literal("")),

  isPublic: z.boolean().default(false),
});

export type SnippetFormData = z.infer<typeof snippetSchema>;
