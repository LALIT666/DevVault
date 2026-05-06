# 📦 DevVault

> **Organize your dev life, perfectly.**  
> A high-performance, Neubrutalist-style (Gumroad inspired) bookmark and code snippet manager for modern developers.

---

## ✨ Features

- 📑 **Smart Bookmarking**: Save links with auto-tagging and descriptions.
- 💻 **Snippet Vault**: Store your reusable code blocks with syntax highlighting.
- 🗂 **Collections**: Group your resources into custom folders.
- 🐙 **GitHub Auth**: Secure login via GitHub OAuth.
- ⚡ **Built for Speed**: Powered by Next.js 14 and Prisma.
- 🎨 **Neubrutalist UI**: Bold, high-contrast design inspired by Gumroad.

---

## 🛠 Tech Stack

- **Framework**: [Next.js 14 (App Router)](https://nextjs.org/)
- **Auth**: [NextAuth.js](https://next-auth.js.org/)
- **Database**: [PostgreSQL](https://www.postgresql.org/)
- **ORM**: [Prisma](https://www.prisma.io/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Infrastructure**: [Docker](https://www.docker.com/)

---

## 🚀 Getting Started

Follow these steps to set up the project locally.

### 1. Prerequisites

You must have **Docker Desktop** installed on your machine to run the database.

- 📥 [Download Docker Desktop](https://www.docker.com/products/docker-desktop/)

### 2. Clone the Repository

```bash
git clone https://github.com/your-username/devvault.git
cd devvault
```

#### 1. Start the PostgreSQL container

```bash
docker compose up -d
```

#### 2. Sync Prisma schema with database (Create tables)

```bash
npx prisma db push
```

#### 3. Generate Prisma Client

```bash
npx prisma generate
```

#### 4. Run locally

```bash
npm install
npm run dev
```
