# Notely - A Modern Full-Stack Note-Taking App

Notely is a beautifully designed, full-stack web application that provides a seamless and secure note-taking experience. Built with a modern tech stack, it features robust user authentication, including email/password sign-up with OTP verification and Google OAuth 2.0. The user interface is clean, responsive, and enhanced with subtle animations for an elegant user experience.

✨ **Live Demo**  
https://notely-khaki-psi.vercel.app/

---

## Features

### 🔐 Secure Authentication
- Standard sign-up and sign-in with email and password.  
- Secure password hashing using **bcryptjs**.  
- OTP Email Verification for new accounts using **Nodemailer**.  
- Google OAuth 2.0 for one-click sign-in and sign-up.  

### 📝 Full CRUD for Notes
- Authenticated users can **Create, Read, and Delete** their personal notes.

### 💻 Modern & Responsive UI
- A stunning, responsive design that looks great on all devices, from mobile phones to desktops.  
- Custom date picker for an improved user experience.  

### 🔑 JWT-Based Sessions
- Secure and stateless session management using **JSON Web Tokens (JWT)**.

### 🚦 Client-Side Routing
- A smooth SPA experience powered by **React Router**.

---

## 🛠️ Tech Stack

This project is a monorepo containing a separate frontend client and backend server.

**Frontend:**  
React, Vite, TypeScript, Tailwind CSS, React Router, React Hook Form, Zod, Axios, @react-oauth/google, react-datepicker, aos  

**Backend:**  
Node.js, Express, TypeScript, Mongoose (MongoDB ODM)  

**Database:**  
MongoDB Atlas (Cloud Database)  

**Auth:**  
JWT (JSON Web Tokens), bcryptjs, Google Auth Library, Nodemailer  

**Deployment:**  
Vercel (Frontend Hosting), Render (Backend Hosting)

---

## 🚀 Getting Started

To run this project locally, you will need Node.js, npm, and Git installed.

### 1. Clone the Repository
```bash
git clone https://github.com/aditys-jsx/notely.git
cd notely
```

### 2. Backend Setup
The backend server handles all API logic, database interactions, and authentication.

```bash
cd server
npm install
```

Create an environment file (`.env`) inside the `server` directory:

```env
# MongoDB
MONGO_URL=your_mongodb_atlas_connection_string

# JWT
JWT_USER_PASSWORD=your_super_secret_jwt_key

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Nodemailer (for OTP)
EMAIL_USER=your_gmail_address
EMAIL_PASS=your_gmail_app_password

# Frontend URL
CLIENT_URL=http://localhost:5173
```

Run the server:
```bash
npm run dev
```
The backend will run on: [http://localhost:3000](http://localhost:3000)

---

### 3. Frontend Setup

Navigate to the client directory:
```bash
cd client
npm install
```

Create an environment file (`.env`) inside the `client` directory:

```env
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

Run the client:
```bash
npm run dev
```
The frontend will run on: [http://localhost:5173](http://localhost:5173)

---

## 🔑 Environment Variables Guide

| Variable             | Description                                   | Where to Get It |
|----------------------|-----------------------------------------------|-----------------|
| MONGO_URL            | Your MongoDB connection string.               | MongoDB Atlas Cluster |
| JWT_USER_PASSWORD    | A secret string used to sign JWTs.            | Generate via password manager / generator |
| GOOGLE_CLIENT_ID     | Google OAuth client ID.                       | Google Cloud Console |
| GOOGLE_CLIENT_SECRET | Google OAuth client secret.                   | Google Cloud Console |
| EMAIL_USER           | Gmail address used to send OTPs.              | Your Gmail account |
| EMAIL_PASS           | Gmail App Password (not regular password).    | Google Account Settings → Security → App passwords |
| CLIENT_URL           | URL of your frontend. Local: `http://localhost:5173` | Deployment URL / Local |
| VITE_GOOGLE_CLIENT_ID| Same as Google Client ID but for frontend.    | Google Cloud Console |

---

## ☁️ Deployment

This app uses a **split-hosting strategy**:

- **Frontend (React)** → Hosted on **Vercel**  
  - Root Directory: `client`  
  - Uses `vercel.json` for client-side routing  

- **Backend (Node.js)** → Hosted on **Render**  
  - Root Directory: `server`  

Refer to [Vercel Docs](https://vercel.com/docs) and [Render Docs](https://render.com/docs) for setup instructions.

---

## 📂 Project Structure

```
/
├── client/
│   ├── public/
│   │   ├── auth-image.png     # Decorative image for auth pages
│   │   └── icon.png           # App logo
│   ├── src/
│   │   ├── components/
│   │   │   └── ProtectedRoute.tsx # Protects routes that require authentication
│   │   ├── context/
│   │   │   └── AuthContext.tsx    # React Context for managing global auth state (user, token)
│   │   ├── pages/
│   │   │   ├── SigninPage.tsx     # Component for the Sign In page
│   │   │   ├── SignupPage.tsx     # Component for the Sign Up page
│   │   │   └── WelcomePage.tsx    # The main dashboard for authenticated users
│   │   ├── services/
│   │   │   └── api.ts             # Axios instance and API call definitions
│   │   ├── App.tsx                # Main app component with React Router setup
│   │   ├── index.css              # Global styles and Tailwind CSS imports
│   │   └── main.tsx               # Application entry point, renders the App component
│   ├── .env                     # Frontend environment variables (VITE_GOOGLE_CLIENT_ID)
│   ├── package.json             # Frontend dependencies and scripts
│   ├── tsconfig.json            # TypeScript configuration for the client
│   └── vercel.json              # Vercel deployment configuration for SPA rewrites
│
└── server/
    ├── src/
    │   ├── utils/
    │   │   └── mailer.ts        # Nodemailer setup for sending OTP emails
    │   ├── config.ts            # Loads and exports all environment variables
    │   ├── db.ts                # Mongoose schemas for Users and Notes
    │   ├── index.ts             # Main Express server file, defines all API routes
    │   └── middleware.ts        # JWT authentication middleware to protect routes
    ├── .env                     # Backend environment variables (database, secrets, etc.)
    ├── package.json             # Backend dependencies and scripts
    └── tsconfig.json            # TypeScript configuration for the server

```
