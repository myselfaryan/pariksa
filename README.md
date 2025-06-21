# Pariksa 📚🖊️

**Pariksa** is an ensemble testing platform designed for coding contests, problem solving, and automated code evaluation. It features a modern frontend built with React and Tailwind CSS, and a robust backend using Node.js, Express, and Prisma ORM.

---

## 🚀 Features

- **User Authentication**: Secure signup and login for users, organizers, and admins.
- **Problem Management**: Create, edit, and view coding problems with rich descriptions and test cases.
- **Submission Evaluation**: Automated code execution and result feedback using a scalable backend.
- **Role-Based Dashboards**: Separate dashboards for users, organizers, and admins.
- **Test Case Management**: Add, edit, and view test cases for each problem.
- **Decks & Problemsets**: Organize problems into decks and sets for contests or practice.
- **Real-Time Feedback**: Get instant feedback on code submissions.
- **Modern UI**: Responsive and accessible interface with beautiful design.

---

## 🏗️ Project Structure

```
pariksa/
├── frontend/   # React + Vite + Tailwind CSS frontend
├── server/     # Node.js + Express + Prisma backend
└── LICENSE     # GNU AGPL v3
```

---

## ⚡ Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/pariksa.git
cd pariksa
```

### 2. Setup the Backend
```bash
cd server
npm install
# Set up your .env file for database connection
bunx prisma migrate dev --name init
npm start
```

### 3. Setup the Frontend
```bash
cd ../frontend
npm install
npm run dev
```

The frontend will be available at `http://localhost:5173` and the backend at `http://localhost:3000` by default.

---

## 📝 Tech Stack

- **Frontend**: React, Vite, Tailwind CSS, Radix UI, CodeMirror
- **Backend**: Node.js, Express, Prisma ORM, PostgreSQL
- **Auth**: JWT-based authentication
- **Messaging**: RabbitMQ (for code execution queue)
- **Code Execution**: [Piston API](https://github.com/engineer-man/piston) (for running user-submitted code in multiple languages)

---

## 📂 License

This project is licensed under the GNU Affero General Public License v3.0. See the [LICENSE](LICENSE) file for details.

---

## 🤝 Contributing

Contributions are welcome! Please open issues or submit pull requests for improvements.

---


