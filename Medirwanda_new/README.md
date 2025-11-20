# MediRwanda Frontend

A modern healthcare platform frontend built with React, TypeScript, and Vite.

## Features

- User Authentication (Register/Login)
- Patient Dashboard
- Consultation Management
- Responsive Design
- Real-time Updates (Socket.io ready)

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The application will start at `http://localhost:5173`

### Building

```bash
npm run build
```

### Type Checking

```bash
npm run type-check
```

## Project Structure

```
src/
├── components/       # Reusable components
├── pages/           # Page components
├── services/        # API services
├── store/           # Zustand stores
├── hooks/           # Custom hooks
├── types/           # TypeScript types
├── lib/             # Utilities and API client
└── assets/          # Static assets
```

## Technologies

- React 18
- TypeScript
- Vite
- Zustand (State Management)
- React Router
- Axios
- Tailwind CSS
- Socket.io Client

## Environment Variables

Create a `.env` file based on `.env.example`

```
VITE_API_URL=http://localhost:3000/api
```

## API Integration

All API calls are made through the `axios` instance in `src/lib/api.ts` with automatic token injection for authenticated routes.
