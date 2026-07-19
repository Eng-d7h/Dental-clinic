# Dental Clinic – Frontend

A responsive web application for a dental clinic, featuring a public appointment booking site and a protected admin dashboard for clinic management.

## Features

### Public Site
- Browse clinic services and information
- Book an appointment by selecting a doctor, date, and available time slot
- Real-time available time slots based on doctor schedule and existing bookings

### Admin Dashboard
- Secure login (JWT-based authentication)
- View, filter (All / Active / Cancelled), cancel, and delete appointments
- Manage doctors (add, edit, delete)
- Manage each doctor's weekly working schedule
- Manually block specific time slots (e.g. for doctor leave)

## Tech Stack
- React
- TypeScript
- Tailwind CSS
- React Router

## Getting Started

### Prerequisites
- Node.js installed
- The [backend API](#) running locally (see backend repository)

### Installation
```bash
npm install
```

### Run the development server
```bash
npm run dev
```

The app will be available at `http://localhost:5173` (or the port shown in your terminal).

## Project Structure