# ProStore

ProStore is a full stack e-commerce platform designed to provide a robust and scalable solution for online stores. Built with modern web development technologies, ProStore focuses on performance, flexibility, and developer experience.

## Features

- **Modern Frontend**: Built with [Next.js](https://nextjs.org/) for server-side rendering (SSR) and static site generation (SSG).
- **Database Integration**: Uses [NeonDB](https://neon.tech/) as the database provider, managed via [Prisma](https://www.prisma.io/)
- **TypeScript**: TypeScript for type safety and better developer tooling.
- **Authentication**: Seamless user authentication and account management.
- **Responsive Design**: Mobile-friendly, optimized for all devices.
- **Admin Dashboard**: Manage products, categories, and orders.
- **SEO Optimized**: Metadata configuration for better search engine ranking.

## Tech Stack

### Frontend

- **Next.js**: Framework for React with features like SSR, SSG, and API routes.
- **Tailwind CSS**: Utility-first CSS framework for responsive design.

### Bankend

- **Node.js**: JavaScript runtime for the server-side.
- **Prsima**: Database Object-Relational Mapper (ORM) for seamless integration and schema management.
- **NeonDB**: Serverless PostgreSQL database solution.

### Other Tools

- **Vercel**: Cloud deployment platform.

## Installation

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/)
- [Prisma CLI](https://www.prisma.io/docs/orm/tools/prisma-cli)

### Steps

1. Clone the repository:

```bash
git clone https://github.com/ericstober/prostore.git
cd prostore
```

2. Install dependencies:

```bash
npm install
```

3. Configure environment variables: Create a `.env` file at the root of your project with the variables found in the `.env-example` file.

4. Migrate the database:

```bash
npx prisma migrate dev
```

5. Start the development server:

```bash
npm run dev
```

6. Start the Prisma Studio visual editor for the database:

```bash
npx prisma studio
```

7. Access the application by opening your browser and naviage to `http://localhost:3000`.
