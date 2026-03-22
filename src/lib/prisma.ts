// 📌 CONCEPT: Prisma Client Singleton Pattern
// 📌 Development me multiple instances se bachne ke liye
// 📌 Production me ek hi instance use hota hai

import { PrismaClient } from "@prisma/client";

// 📌 Global type declaration for typeScript
//dekho global jo hota hai wo node.js me global object hota hai and browers me global hota hai window object toh waise hi "globalthis" jo hota hai wo dono jagha kaam karta hai browser me bhi and node.js me bhi

//node.js me --> globalThis === global & browser me --> globalThis === window

//as unknown as double casting hoti hai matlab sidha sa hota hai globalThis as unknown (reset kar do jo bhi iska type tha isse pahalae ) as {...} and ye type daal do
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// 📌 CONCEPT: Singleton - ek hi instance reuse karte hain

//globalForPrisma.prisma ?? new PrismaClient() ===  Agar globalForPrisma.prisma null/undefined hai, toh naya PrismaClient banao"
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["query", "error", "warn"], // 📌 Debugging ke liye logs
  });

// Dev me hot reload pe naya instance na bane
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;
