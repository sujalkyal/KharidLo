# Kharidlo E-Commerce Monorepo

Kharidlo is a full-featured e-commerce platform built as a monorepo using [Turborepo](https://turbo.build/repo). It includes separate Next.js applications for admin and user interfaces, a shared database package powered by Prisma, and a modular architecture for scalability and maintainability.

## Project Structure

```
├── apps/
│   ├── admin/      # Admin dashboard (Next.js)
│   └── user/       # User-facing storefront (Next.js)
├── packages/
│   └── db/         # Shared Prisma database package
├── package.json    # Root config, npm workspaces, scripts
├── turbo.json      # Turborepo configuration
```

### Apps
- **admin**: Admin dashboard for managing products, customers, sales, and more. Built with Next.js, includes authentication, analytics, and product management features.
- **user**: User-facing storefront for browsing products, managing cart, wishlist, checkout, and account. Built with Next.js, includes authentication, product search, reviews, and more.

### Packages
- **db**: Shared Prisma database schema and client, used by both apps for data access.

## Key Features
- Modular monorepo architecture with [Turborepo](https://turbo.build/repo)
- Next.js apps for admin and user experiences
- Authentication via [next-auth](https://next-auth.js.org/)
- Database access via [Prisma](https://www.prisma.io/)
- Data visualization with [Recharts](https://recharts.org/)
- PDF generation with [jsPDF](https://github.com/parallax/jsPDF) and [jsPDF-Autotable](https://github.com/simonbengtsson/jsPDF-AutoTable)
- Toast notifications with [react-toastify](https://fkhadra.github.io/react-toastify/)
- Carousel and UI enhancements with [Swiper](https://swiperjs.com/) and [DaisyUI](https://daisyui.com/)
- Shared components and utilities


## Getting Started

### 1. Install Dependencies

```cmd
npm install
```

### 2. Environment Variables

Each app (`admin`, `user`) and the database package may require environment variables for proper operation (e.g., database connection, authentication secrets, API keys). Copy the example file if available, or create a `.env.local` file in each app and fill in the required values:

```
apps/admin/.env.local
apps/user/.env.local
packages/db/.env
```

Common variables:
- `DATABASE_URL` (for Prisma)
- `NEXTAUTH_SECRET`, `NEXTAUTH_URL` (for authentication)
- Any third-party API keys used in your project

Refer to each app's documentation or code for the exact variables needed.

### 3. Database Setup

Prisma migrations and schema are managed in `packages/db/prisma`. To set up the database:

```cmd
npx prisma migrate dev --schema=packages/db/prisma/schema.prisma
```

### 4. Running the Apps

Start all apps and packages in development mode:

```cmd
npm run dev
```

Or run a specific app:

```cmd
cd apps/admin
npm run dev

cd apps/user
npm run dev
```

### 5. Build for Production

Build all apps and packages:

```cmd
npm run build
```

---
This project is maintained by the Kharidlo team.

## Useful Links

- [Next.js Docs](https://nextjs.org/docs)
- [Prisma Docs](https://www.prisma.io/docs)

### Build

To build all apps and packages, run the following command:

```
cd my-turborepo
npm build
```

### Develop

To develop all apps and packages, run the following command:

```
cd my-turborepo
npm dev
```

### Remote Caching

> [!TIP]
> Vercel Remote Cache is free for all plans. Get started today at [vercel.com](https://vercel.com/signup?/signup?utm_source=remote-cache-sdk&utm_campaign=free_remote_cache).

Turborepo can use a technique known as [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup?utm_source=turborepo-examples), then enter the following commands:

```
cd my-turborepo
npx turbo login
```

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your Turborepo:

```
npx turbo link
```

## Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks)
- [Caching](https://turbo.build/repo/docs/core-concepts/caching)
- [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching)
- [Filtering](https://turbo.build/repo/docs/core-concepts/monorepos/filtering)
- [Configuration Options](https://turbo.build/repo/docs/reference/configuration)
- [CLI Usage](https://turbo.build/repo/docs/reference/command-line-reference)
