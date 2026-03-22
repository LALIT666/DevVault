// 📌 CONCEPT: Database seeding - Test data add karna
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seed...");

  // 📌 Delete existing data
  await prisma.bookmark.deleteMany();
  await prisma.snippet.deleteMany();
  await prisma.collection.deleteMany();
  await prisma.user.deleteMany();

  // 📌 Create test user
  const user = await prisma.user.create({
    data: {
      name: "Test User",
      email: "test@example.com",
      password: "hashed_password_here", // In real app, hash this!
    },
  });

  console.log("✅ Created user:", user.email);

  // 📌 Create collection
  const collection = await prisma.collection.create({
    data: {
      name: "Web Development",
      description: "Resources for web dev",
      userId: user.id,
    },
  });

  console.log("✅ Created collection:", collection.name);

  // 📌 Create bookmarks
  const bookmark1 = await prisma.bookmark.create({
    data: {
      title: "Next.js Documentation",
      url: "https://nextjs.org/docs",
      description: "Official Next.js docs - everything you need",
      tags: ["nextjs", "react", "documentation"],
      isPublic: true,
      userId: user.id,
      collectionId: collection.id,
    },
  });

  const bookmark2 = await prisma.bookmark.create({
    data: {
      title: "TypeScript Handbook",
      url: "https://www.typescriptlang.org/docs/handbook/intro.html",
      description: "Complete TypeScript guide",
      tags: ["typescript", "javascript"],
      isPublic: true,
      userId: user.id,
    },
  });

  const bookmark3 = await prisma.bookmark.create({
    data: {
      title: "Prisma Documentation",
      url: "https://www.prisma.io/docs",
      description: "Next-generation Node.js and TypeScript ORM",
      tags: ["prisma", "database", "orm"],
      isPublic: true,
      userId: user.id,
      collectionId: collection.id,
    },
  });

  console.log(
    "✅ Created bookmarks:",
    bookmark1.title,
    bookmark2.title,
    bookmark3.title,
  );

  // 📌 Create snippets
  const snippet1 = await prisma.snippet.create({
    data: {
      title: "Array Map Example",
      code: `const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);
console.log(doubled); // [2, 4, 6, 8, 10]`,
      language: "javascript",
      description: "Transform array elements using map",
      isPublic: true,
      userId: user.id,
    },
  });

  const snippet2 = await prisma.snippet.create({
    data: {
      title: "Async/Await Pattern",
      code: `async function fetchData() {
  try {
    const response = await fetch('https://api.example.com/data');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
}`,
      language: "javascript",
      description: "Modern async handling in JavaScript",
      isPublic: true,
      userId: user.id,
      collectionId: collection.id,
    },
  });

  const snippet3 = await prisma.snippet.create({
    data: {
      title: "Prisma Query Example",
      code: `// Find all users with their posts
const users = await prisma.user.findMany({
  include: {
    posts: true,
    profile: true
  }
});`,
      language: "typescript",
      description: "Prisma query with relations",
      isPublic: true,
      userId: user.id,
    },
  });

  console.log(
    "✅ Created snippets:",
    snippet1.title,
    snippet2.title,
    snippet3.title,
  );

  console.log("🎉 Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
