<div align="center">
  <img src="public/lb.jpeg" alt="Lord Buddha Club Logo" width="150"/>
</div>

# Lord Buddha Club

<p align="center">
  <!-- Framework -->
  <a href="https://nextjs.org/">
    <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js"/>
  </a>
  <!-- Language -->
  <a href="https://www.typescriptlang.org/">
    <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"/>
  </a>
  <!-- Styling -->
  <a href="https://tailwindcss.com/">
    <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS"/>
  </a>
  <!-- UI -->
  <a href="https://ui.shadcn.com/">
    <img src="https://img.shields.io/badge/shadcn/ui-000000?style=for-the-badge&logo=shadcnui&logoColor=white" alt="shadcn/ui"/>
  </a>
  <!-- ORM -->
  <a href="https://orm.drizzle.team/">
    <img src="https://img.shields.io/badge/Drizzle_ORM-C5F74F?style=for-the-badge&logo=drizzle&logoColor=black" alt="Drizzle ORM"/>
  </a>
  <!-- Auth -->
  <a href="https://next-auth.js.org/">
    <img src="https://img.shields.io/badge/NextAuth.js-000?style=for-the-badge&logo=nextauth.js&logoColor=white" alt="NextAuth.js"/>
  </a>
  <!-- License -->
  <a href="https://opensource.org/licenses/MIT">
    <img src="https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge" alt="License: MIT"/>
  </a>
  <!-- Add more badges as needed (e.g., build status, deployment status) -->
  <!-- Example Build Status: <img src="https://img.shields.io/github/actions/workflow/status/<your-github-user>/<repo-name>/<workflow-file>.yml?style=for-the-badge" alt="Build Status"/> -->
  <!-- Example Deployment: <img src="https://img.shields.io/website?url=https%3A%2F%2Fyour-live-url.com&style=for-the-badge" alt="Deployment Status"> -->
</p>

**[🌐 Live Demo Link (Add URL Here if applicable)]()**

---

## Welcome to the Lord Buddha Club Initiative!

This isn't just a repository; it's the digital embodiment of the **Lord Buddha Organisation's** commitment to fostering a new generation of tech-savvy, collaborative, and impactful individuals. Inspired by the legacy of a visionary Computer Science and Engineering senior, this platform serves as a crucible for **learning**, a hub for **connection**, and a launchpad for **innovation**.

Our core belief? That the world becomes a better place when the power of **open-source technology** is placed in the hands of passionate students. We aim to cultivate an environment where **collaboration** across diverse fields flourishes, sparking **awareness** of open-source principles and empowering students to **contribute meaningfully to society** through technology.

**This is more than code; it's a movement. Join us.**

---

## ✨ At a Glance

*   🚀 **Mission:** Ignite open-source passion, foster collaboration, empower students, impact society.
*   🤝 **Community:** Build a vibrant hub for learning, sharing, and project development.
*   💻 **Technology:** Leverage a modern stack (Next.js, TypeScript, Tailwind, Drizzle, etc.) for a cutting-edge platform.

---

## 📚 Table of Contents

- [🎉 Features](#-features)
- [📂 Project Structure](#-project-structure-overview-optional)
- [🛠️ Tech Stack](#️-tech-stack)
- [🚀 Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Using Docker](#using-docker)
- [📜 Available Scripts](#-available-scripts)
- [🔑 Environment Variables](#-environment-variables)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## 🎉 Core Features

This platform provides the essential tools for a thriving online community:

*   🔐 **User Authentication:** Secure sign-up, login, and profile management powered by NextAuth.js.
*   📝 **Content Creation:** Blog posts and event management capabilities.
*   🤝 **Community Interaction:** (Implicit through blog/events, potential for future expansion).
*   ✨ **Project Showcase:** Dedicated space to highlight member contributions and projects.
*   ⚙️ **Role-Based Access:** Granular control with distinct dashboards and permissions for different user roles (Admin, Owner, Member).
*   📞 **Contact & Connection:** Integrated contact form.

*(This list can be expanded as the platform evolves!)*

---

## 📂 Project Structure Overview (Optional)

*(Briefly describe the main directories and their purpose. You could use a tree structure.)*

```
project-root/
├── app/             # Next.js App Router: Pages, API routes, layouts
├── components/      # Reusable UI components (Shadcn/ui, custom)
├── lib/             # Core logic, utilities, database, auth config
├── public/          # Static assets (images, models)
├── styles/          # Global styles (if any beyond Tailwind)
├── .env.example     # Environment variable template
├── drizzle.config.ts # Drizzle ORM configuration
├── next.config.js   # Next.js configuration
├── package.json     # Project dependencies and scripts
└── tsconfig.json    # TypeScript configuration
```

---

## 🛠️ Technology Stack

We leverage a modern, robust, and scalable tech stack:

| Category         | Technology                                                                                                | Description                                                     |
| :--------------- | :-------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------- |
| **Framework**    | [**Next.js**](https://nextjs.org/)                                                                        | React framework for server-side rendering & static generation |
| **Language**     | [**TypeScript**](https://www.typescriptlang.org/)                                                         | Superset of JavaScript with static typing                       |
| **Styling**      | [**Tailwind CSS**](https://tailwindcss.com/)                                                              | Utility-first CSS framework                                     |
| **UI Components**| [**Shadcn/ui**](https://ui.shadcn.com/)                                                                   | Accessible components built on Radix UI & Tailwind              |
| **ORM**          | [**Drizzle ORM**](https://orm.drizzle.team/)                                                              | Modern TypeScript ORM for SQL databases                         |
| **Authentication**| [**NextAuth.js**](https://next-auth.js.org/)                                                              | Flexible authentication solution for Next.js                    |
| **Database**     | [**PostgreSQL**](https://www.postgresql.org/) ([Neon](https://neon.tech/))                                | Powerful, open-source relational database (Serverless option) |
| **Email**        | [**Resend**](https://resend.com/)                                                                         | Developer-focused email sending service                         |
| **Containerization**| [**Docker**](https://www.docker.com/)                                                                     | Platform for building, shipping, and running applications     |

---

## 🚀 Getting Started

Ready to dive in? Follow these steps to get the project running locally.

### Prerequisites

*   Node.js (v18 or later recommended)
*   npm or yarn or pnpm
*   Docker (if using the provided `docker-compose.yml`)
*   A database instance (e.g., PostgreSQL)

### Installation

1.  **Clone the repository:**
    ```sh
    git clone <your-repository-url>
    cd project
    ```

2.  **Install dependencies:**
    ```sh
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

3.  **Set up environment variables:**
    Copy the `.env.example` file to `.env` and fill in the required values.
    ```sh
    cp .env.example .env
    ```
    *See the [Environment Variables](#-environment-variables) section below for details.*

4.  **Run database migrations:**
    ```sh
    npx drizzle-kit push:pg # Adjust command based on your database driver
    ```

5.  **Run the development server:**
    ```sh
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
    ```sh
    docker-compose up --build -d
    ```
    *Note: You might need to run migrations manually after the database container is up.*

---

## 📜 Available Scripts

In the project directory, you can run the following scripts:

*   `npm run dev`: Runs the app in development mode. Open [http://localhost:3000](http://localhost:3000).
*   `npm run build`: Builds the app for production.
*   `npm run start`: Starts the production server.
*   `npm run lint`: Lints the codebase using Next.js' built-in ESLint configuration.
*   `npm run db:push`: Pushes schema changes to the database (using Drizzle Kit).
*   `npm run db:studio`: Opens Drizzle Studio to inspect the database.
*   `npm run db:generate`: Generates SQL migration files based on schema changes (using Drizzle Kit).

---

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

---

## 💖 Get Involved & Contribute!

This project thrives on community involvement! Whether you're a seasoned developer or just starting your open-source journey, your contributions are valuable.

**Ways to Contribute:**

*   🐛 **Report Bugs:** Find something broken? Let us know by opening an issue.
*   ✨ **Suggest Features:** Have an idea to make the platform better? Open an issue to discuss.
*   💻 **Write Code:** Tackle an existing issue or propose a new feature implementation via a Pull Request.
*   📖 **Improve Documentation:** Help make the README, guides, or code comments clearer.

**Standard Flow:**

1.  **Fork** the repository.
2.  Create a **new branch** (`git checkout -b feature/your-amazing-idea`).
3.  Make your **changes**.
4.  **Commit** your changes (`git commit -m 'feat: Implement amazing idea'`).
5.  **Push** to the branch (`git push origin feature/your-amazing-idea`).
6.  Open a **Pull Request** back to the main repository.

*(Consider adding links to specific contribution guidelines, code of conduct, or issue templates if they exist.)*

---

## 🙏 Acknowledgements

This project stands on the shoulders of the visionary Computer Science and Engineering senior who first conceived of this platform. Their passion continues to inspire our work.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details (if one exists, otherwise state the license).
