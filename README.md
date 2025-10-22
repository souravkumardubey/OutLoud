# 🧵 OutLoud

A modern full-stack social platform inspired by Threads / Twitter — built using **Next.js 14**, **MongoDB**, **Clerk**, and **TailwindCSS**.  
Users can post thoughts, comment, and interact within communities — all with a clean, responsive design and blazing-fast performance.

---

## 🚀 Overview

Threads Clone is a community-driven web application that allows users to:
- Create and share posts (threads)
- Join or create communities
- Engage in nested conversations
- Receive real-time notifications  
This project showcases how to architect a scalable full-stack application using the latest features of **Next.js**.

---

## ⚙️ Tech Stack

| Layer | Technologies |
|-------|---------------|
| **Frontend** | Next.js 14, TypeScript, Shadcn UI, TailwindCSS |
| **Backend** | Next.js App Router APIs, MongoDB, Mongoose |
| **Authentication** | Clerk (Email, Google, GitHub logins) |
| **Forms & Validation** | React Hook Form, Zod |
| **File Uploads** | UploadThing |
| **Other** | Webhooks, Server Actions, SSR, Middleware |

---

## 🌟 Features

- 🔐 **Secure Authentication** — Sign up or log in with email or social accounts via Clerk.  
- 🧵 **Post Threads** — Create posts to share your thoughts and ideas.  
- 💬 **Nested Commenting** — Engage in structured, multi-level discussions.  
- 👤 **Profile Pages** — View and edit your personal information and posts.  
- 👥 **Communities** — Build or join groups based on topics of interest.  
- 📈 **Search & Pagination** — Discover users and communities efficiently.  
- 📨 **Activity Feed** — Get notified when someone interacts with your posts.  
- 🧱 **Admin Tools** — Manage community members and roles.  
- ⚡ **Fast Performance** — Optimized rendering with SSR and route grouping.

---

## 🧰 Getting Started

### 1️⃣ Prerequisites
Ensure you have the following installed:
- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/) (v18+)
- [npm](https://www.npmjs.com/)

### 2️⃣ Clone the Repository
```bash
git clone https://github.com/<your-username>/threads-clone.git
cd threads-clone
```

### 3️⃣ Install Dependencies
```bash
npm install
```

### 4️⃣ Setup Environment Variables
Create a .env file in the root folder and add:
```bash
MONGODB_URI=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
UPLOADTHING_SECRET=
UPLOADTHING_APP_ID=
NEXT_CLERK_WEBHOOK_SECRET=
```
Get credentials from MongoDB Atlas
, Clerk
, and UploadThing
.

### 5️⃣ Run the Development Server
```bash
npm run dev
```
Now visit http://localhost:3000
 🎉

### 🧠 Key Learnings

- Structuring reusable components with Shadcn UI

- Building secure authentication with Clerk

- Implementing SSR & server actions in Next.js

- Handling complex MongoDB schemas

- Managing forms and validations with React Hook Form & Zod

- Responsive UI development with TailwindCSS

### 📂 Folder Structure
```php
threads-clone/
│
├── app/                # Next.js app router pages & layouts
├── components/         # Reusable UI and layout components
├── lib/                # DB connection & utility functions
├── models/             # MongoDB schemas (User, Thread, Community)
├── public/             # Static assets
├── styles/             # Global Tailwind styles
└── .env                # Environment variables
```