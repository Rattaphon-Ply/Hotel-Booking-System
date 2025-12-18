# Hotel Booking System

A hotel booking system built for learning purposes. Users can search for rooms, view details, and make bookings. Admins can manage rooms and reservations.

---

## ✨ Features

- 🔍 Search rooms by conditions (price, capacity, availability)
- 🏷️ View room details
- 📅 Room booking system
- 🧾 Room management (Create / Update / Delete) *(Admin)*
- 📱 Responsive UI

---

## 🛠 Tech Stack

**Frontend**
- React.js
- Shad CN / Material UI / Tailwind CSS
- Axios
- Zustand
- React Router

**Backend**
- Node.js
- Express.js
- Database: supabase
**Other**
- JWT Authentication
- REST API

---

## 📂 Project Structure

```
Hotel-Booking-System/
├── client/        # Frontend (React)
├── server/        # Backend (Node.js + Express)
├── README.md
└── package.json
```

---

## ⚙️ Installation

### 1. Clone repository

```bash
git clone https://github.com/your-username/Hotel-Booking-System.git
cd Hotel-Booking-System
```

### 2. Install backend dependencies

```bash
cd server
npm install
```

### 3. Install frontend dependencies

```bash
cd ../client
npm install
```

---

## 🔐 Environment Variables

Create `.env` file in **server** folder

```env
DATABASE_URL=your_database_url
JWT_SECRET=your_secret_key
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key
```

---

## ▶️ Run Project

### Start backend

```bash
cd server
npm start
```

### Start frontend

```bash
cd client
npm run dev
```

Open browser: `http://localhost:5002`

---

## 📡 API Endpoints

### Rooms
- `GET /api/rooms` – Get all rooms
- `GET /api/rooms/:id` – Get room detail
- `POST /api/rooms/search` – Search Rooms
- `POST /api/rooms` – Create room *(Admin)*
- `PATCH /api/rooms/:id` – Update room *(Admin)*
- `PATCH /api/rooms/:id/status` – Update room status *(Admin)*
- `DELETE /api/rooms/:id` – Delete room *(Admin)*
- `POST /api/rooms/:id/amenities` – Assign amenities to room *(Admin)*

### Bookings
- `POST /api/bookings` – Create booking
- `GET /api/bookings/me` – Get bookings of the logged-in user
- `PATCH /api/bookings/:id/cancel` – Cancel a booking
- `GET /api/bookings/:id/booked-dates` – Get booked dates for a room
- `GET /api/bookings` – Get all bookings *(Admin)*
- `PATCH  /api/bookings/:id/complete` – Mark booking as completed *(Admin)*

### Auth
- `POST /api/auth/register` – Register new user
- `POST /api/auth/login` – Login and receive JWT token

---


## 📌 Notes

This project is created for **educational purposes** to practice full‑stack development.

---

## 📄 License

MIT License

