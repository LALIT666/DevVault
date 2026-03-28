// 📌 CONCEPT: Dynamic robots.txt generation
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/", // 📌 Don't index API routes
          "/dashboard/", // 📌 Don't index private pages
          "/*?*", // 📌 Don't index query parameters
        ],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/api/", "/dashboard/"],
      },
    ],
    sitemap: "https://devvault.app/sitemap.xml",
    host: "https://devvault.app",
  };
}
