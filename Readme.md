<div align="center">
  <img src="public/lb.jpeg" alt="Lord Buddha Club Logo" width="150"/>
</div>

# Lord Buddha Club

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

This project is the official web application for the Lord Buddha Organisation, originally conceived by a senior from the Computer Science and Engineering Department.

The vision of this project is to foster awareness of open-source principles among students, encourage collaboration across various fields, and contribute positively to society through technology. We believe the world becomes a better place when everyone can access and contribute to open-source technology.

## ✨ Features

*   User Authentication (Login, Sign up, Profile Management)
*   Blog Section
*   Events Management
*   Project Showcase
*   Contact Form
*   Dashboard for Admins/Members (Post Management, Event Management, etc.)
*   Role Management

## 🛠️ Tech Stack

*   **Framework:** [Next.js](https://nextjs.org/)
*   **Language:** [TypeScript](https://www.typescriptlang.org/)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
*   **UI Components:** [Shadcn/ui](https://ui.shadcn.com/)
*   **ORM:** [Drizzle ORM](https://orm.drizzle.team/)
*   **Authentication:** [NextAuth.js](https://next-auth.js.org/)
*   **Database:** [PostgreSQL](https://www.postgresql.org/) (using Neon)
*   **Email:** [Resend](https://resend.com/)
*   **Containerization:** [Docker](https://www.docker.com/)

## 🚀 Getting Started

### Prerequisites

*   Node.js (v18 or later recommended)
*   npm or yarn or pnpm
*   Docker (if using the provided `docker-compose.yml`)
*   A database instance (e.g., PostgreSQL)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd project
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

3.  **Set up environment variables:**
    Copy the `.env.example` file to `.env` and fill in the required values.
    ```bash
    cp .env.example .env
    ```
    *See the [Environment Variables](#-environment-variables) section below for details.*

4.  **Run database migrations:**
    ```bash
    npx drizzle-kit push:pg # Adjust command based on your database driver
    ```

5.  **Run the development server:**
    ```bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Using Docker

Alternatively, you can use Docker Compose to set up the development environment (ensure your database service is configured in `docker-compose.yml`):

1.  **Set up environment variables** (as described above).
2.  **Build and run the containers:**
    ```bash
    docker-compose up --build -d
    ```
    *Note: You might need to run migrations manually after the database container is up.*

## 📜 Available Scripts

In the project directory, you can run the following scripts:

*   `npm run dev`: Runs the app in development mode. Open [http://localhost:3000](http://localhost:3000).
*   `npm run build`: Builds the app for production.
*   `npm run start`: Starts the production server.
*   `npm run lint`: Lints the codebase using Next.js' built-in ESLint configuration.
*   `npm run db:push`: Pushes schema changes to the database (using Drizzle Kit).
*   `npm run db:studio`: Opens Drizzle Studio to inspect the database.
*   `npm run db:generate`: Generates SQL migration files based on schema changes (using Drizzle Kit).

## 🔑 Environment Variables

Create a `.env` file by copying `.env.example` (`cp .env.example .env`) and fill in the following values:

```env
# Database (Neon PostgreSQL recommended)
DATABASE_URL="postgresql://[user]:[password]@[neon-host]/[dbname]?sslmode=require"

# GitHub OAuth Credentials (Register an app on GitHub: https://github.com/settings/developers)
GITHUB_CLIENT_ID=""
GITHUB_CLIENT_SECRET=""

# Resend API Key (For sending emails, e.g., verification: https://resend.com/)
RESEND_API_KEY=""

# Application URL
NEXT_PUBLIC_APP_URL="http://localhost:3000" # Your local or deployment URL

# NextAuth.js Configuration
NEXTAUTH_URL="http://localhost:3000"       # Should match NEXT_PUBLIC_APP_URL in most cases
NEXTAUTH_SECRET=""                         # Generate a strong secret: openssl rand -base64 32
AUTH_TRUST_HOST="true"                     # Set to "true" for development environments
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/your-feature-name`).
3.  Make your changes.
4.  Commit your changes (`git commit -m 'Add some feature'`).
5.  Push to the branch (`git push origin feature/your-feature-name`).
6.  Open a Pull Request.

*(Optionally, add more detailed contribution guidelines, code of conduct, etc.)*

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details (if one exists, otherwise state the license).
