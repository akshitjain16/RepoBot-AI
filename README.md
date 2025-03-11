# RepoBot AI

![Logo](repobot.png)

RepoBot AI is an intelligent assistant designed to help developers navigate and understand their GitHub repositories. By leveraging natural language processing and machine learning, RepoBot AI can answer questions about your codebase, explain complex functions, and provide insights into your project structure.

## Table of Contents

- [About](#about)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Built Using](#built-using)
- [Authors](#authors)
- [Acknowledgements](#acknowledgements)

## About

RepoBot AI is a powerful tool that bridges the gap between developers and their codebase. It uses advanced AI techniques to analyze your GitHub repositories and provide intelligent responses to your queries. Whether you're a new team member trying to understand the project structure or an experienced developer looking for quick insights, RepoBot AI is here to assist you.

Key features:
- Natural language interaction with your codebase
- Quick answers to questions about your project structure and functionality
- Code explanation and documentation assistance
- Intelligent search across your entire repository

## Getting Started

Follow these instructions to get RepoBot AI up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js and npm (for Next.js and tRPC)
- A GitHub account and personal access token

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/akshitjain16/repobot-ai.git
   ```
   

2. Navigate to the project directory:
   
   ```
   cd repobot-ai
   ```
   

3. Install the required dependencies:
   ```
   npm install
   ```
   

4. Set up your environment variables:
   - Create a `.env` file in the root directory
   - Add the following variables:
     ```
     DATABASE_URL=your_database_connection_string
     GITHUB_CLIENT_ID=your_github_oauth_client_id
     GITHUB_CLIENT_SECRET=your_github_oauth_client_secret
     NEXTAUTH_SECRET=your_nextauth_secret
     ```
     

5. Start the development server:
   ```
   npm run dev
   ```
   

## Usage

1. Connect RepoBot AI to your GitHub account using the OAuth flow provided in the application.
2. Your connected repositories will be automatically fetched and stored.
3. Select a project to work with. This selection is likely stored in your browser's local storage for convenience.
4. Use the application to interact with your codebase. For example:
   - "Show me the implementation of the `useProject` hook"
   - "Explain the `createProject` mutation"
   - "What does the `getCommits` function do?"
   - "List all the API routes in this project"

## Built Using

- [Next.js](https://nextjs.org/) - React Framework for the frontend
- [tRPC](https://trpc.io/) - End-to-end typesafe APIs for the backend
- [Prisma](https://www.prisma.io/) - Database ORM
- [TypeScript](https://www.typescriptlang.org/) - Programming Language
- [usehooks-ts](https://usehooks-ts.com/) - React Hooks library (specifically for `useLocalStorage`)
- [zod](https://zod.dev/) - Schema validation library

## Authors

* **Akshit Jain** - *Initial work* -(https://github.com/akshitjain16)

## 🎉 Acknowledgements <a name = "acknowledgement"></a>

- OpenAI and the creators of large language models for the underlying AI technology that powers RepoBot AI.
- Vercel and the Next.js team for the powerful and flexible React framework.
- tRPC contributors for the excellent type-safe API framework.
- The Prisma team for the intuitive and efficient database ORM.
- The creators and maintainers of usehooks-ts for providing useful React hooks.
- Colin McDonnell and contributors for creating zod, the schema validation library.