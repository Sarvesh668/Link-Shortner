🔗 Link Shortener — Full Stack Project

A simple full-stack URL shortener built to learn and practice modern web development using React, Spring Boot, and PostgreSQL.

This project focuses on core system design concepts such as REST APIs, database persistence, frontend–backend integration, and clean project structure.
It is intended as a learning project, not a production-ready service.

✨ Features

Shorten long URLs into compact, shareable links

Redirect short URLs to their original destinations

Clean and minimal frontend UI

Single-input UX (input → shortened output)

RESTful backend API

Persistent storage using PostgreSQL

🧱 Tech Stack
Frontend

-React
-TypeScript
-Vite
-CSS (custom styling)

Backend
-Java
-Spring Boot
-Maven

REST APIs

Database

PostgreSQL

📁 Project Structure
Link-Shortner/
├── frontend/    # React + TypeScript frontend
├── shortner/    # Spring Boot backend
├── .gitignore
└── README.md

🚀 Getting Started
Prerequisites

Make sure you have the following installed:

Node.js (v18+ recommended)

Java (JDK 17 or compatible)

Maven

PostgreSQL

🔧 Backend Setup (Spring Boot)

Navigate to the backend directory:

cd shortner


Configure PostgreSQL in application.properties:

spring.datasource.url=jdbc:postgresql://localhost:5432/link_shortner
spring.datasource.username=your_username
spring.datasource.password=your_password


Run the backend:

mvnw spring-boot:run


Backend will start on:

http://localhost:8080

🎨 Frontend Setup (React)

Navigate to the frontend directory:

cd frontend


Install dependencies:

npm install


Start the development server:

npm run dev


Frontend will be available at:

http://localhost:5173

🔌 API Overview
Create Short URL
POST /api/shorten


Request Body

{
  "url": "https://www.example.com"
}


Response

{
  "shortCode": "8iN9Miq"
}

Redirect
GET /{shortCode}


Redirects to the original URL.

⚠️ Notes & Limitations

This project is built for learning purposes

No authentication or rate limiting

No analytics or expiration logic

Not hardened for production use



📌 Why This Project Exists

This project was created to:

Understand frontend ↔ backend communication

Learn REST API design with Spring Boot

Practice PostgreSQL integration

Improve Git and repository structuring skills

Build confidence with full-stack development

📄 License

This project is open for learning and experimentation.

🙌 Acknowledgements

Inspired by common URL shortener systems and built as a hands-on learning exercise.

✅ Next Recommended Improvements (Optional)

URL validation on frontend and backend

Prevent re-shortening already shortened URLs

Copy-to-clipboard feedback

Deployment (Render / Railway / Vercel)

Dockerization
