FULL STACK BLOG WORKFLOW

BACKEND
Setup

Init project, install express, mongoose, cors, dotenv, bcrypt, jsonwebtoken

Models

User — username, email, hashed password
Post — title, body, author (ref User), createdAt
Comment — body, author (ref User), post (ref Post), createdAt

Routes

Auth — register, login (returns JWT token)
Posts — get all, get one, create, edit, delete
Comments — get by post, add, delete

Middleware

Protect route — verify JWT token, attach user to request


FRONTEND
Setup

Create React app, install axios and react-router-dom

Pages

Home — list all posts
Single Post — full content and comments
Login and Register
Create Post and Edit Post

Components

Navbar, PostCard, PostForm, CommentSection, ProtectedRoute

Auth Flow

Store JWT after login
Send token in headers for protected requests
Redirect to login if no token


BUILD ORDER

Express server and MongoDB connection
User model and auth routes
Post model and CRUD routes
Comment model and routes
React setup and routing
Login and register pages
Home page with all posts
Single post page with comments
Create and edit post pages
Protected routes
Deploy to Vercel and MongoDB Atlas
