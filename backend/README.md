# MediRwanda Backend Server

A comprehensive healthcare API backend built with Node.js, Express, and Sequelize ORM for MariaDB.

## 📋 Features

- **RESTful API** - Clean and organized API endpoints
- **Real-time Communication** - Socket.IO for live consultations and notifications
- **Authentication** - JWT-based user authentication with role-based access control
- **Security** - Helmet for security headers, CORS, rate limiting, password hashing
- **Database** - Sequelize ORM with MariaDB/MySQL integration
- **Logging** - Winston logger for request tracking and debugging
- **Error Handling** - Comprehensive error handling middleware
- **Health Checks** - Built-in health endpoints for monitoring

## 🚀 Getting Started

### Prerequisites

- **Node.js** >= 18.0.0
- **npm** >= 9.0.0
- **MariaDB** or **MySQL** server running
- **Redis** (optional, for caching)

### Installation

1. **Install dependencies:**
```bash
npm install
```

2. **Create `.env` file:**
```bash
cp .env.example .env
```

3. **Configure environment variables:**
```env
# Server
PORT=3000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173

# Database (MariaDB/MySQL)
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=
MYSQL_DATABASE=medirwanda

# JWT
JWT_SECRET=your_super_secret_jwt_key_change_in_production
JWT_EXPIRATION=7d
JWT_REFRESH_SECRET=your_refresh_secret_key
JWT_REFRESH_EXPIRATION=30d

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_app_password
SMTP_FROM=noreply@medirwanda.com

# Logging
LOG_LEVEL=debug
LOG_FILE=logs/app.log
```

### Running the Server

**Development mode with file watching:**
```bash
npm run dev
```

**Production mode:**
```bash
npm run start:prod
```

**Just the server file:**
```bash
npm run dev:server
```

## 📁 Project Structure

```
backend/
├── src/
│   ├── main.js                 # Entry point
│   ├── server.js               # Server configuration and startup
│   ├── config/
│   │   ├── database.js         # Database connection
│   │   └── ...
│   ├── middleware/
│   │   ├── error.handler.js    # Error handling
│   │   ├── request-logger.middleware.js
│   │   ├── auth.middleware.js
│   │   └── ...
│   ├── modules/
│   │   ├── auth/               # Authentication module
│   │   ├── users/              # User management
│   │   ├── consultations/      # Consultation management
│   │   └── ...
│   ├── services/
│   │   ├── logger.js           # Winston logger
│   │   ├── cache.service.js
│   │   └── ...
│   └── utils/
├── package.json
├── .env.example
└── README.md
```

## 🔌 API Endpoints

### Health Check
- `GET /health` - Basic health check
- `GET /api/health` - API health check
- `GET /api` - API information

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user (requires auth)

### Users
- `GET /api/users` - Get all users (admin only)
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user (admin only)

### Consultations
- `POST /api/consultations` - Create consultation
- `GET /api/consultations` - Get consultations
- `GET /api/consultations/:id` - Get consultation details
- `PUT /api/consultations/:id` - Update consultation

## 🔌 Socket.IO Events

### User Events
- `join_user` - Join user's personal room
- `joined` - Confirmation of joining

### Consultation Events
- `start_consultation` - Start a consultation
- `end_consultation` - End a consultation
- `consultation_started` - Receive consultation started notification
- `consultation_ended` - Receive consultation ended notification

### Messaging
- `send_message` - Send a message
- `receive_message` - Receive a message
- `typing` - Send typing indicator
- `user_typing` - Receive typing indicator

### Health Monitoring
- `update_vitals` - Update patient vitals
- `vitals_updated` - Receive vitals update notification

### Prescriptions
- `prescription_issued` - Issue prescription
- `prescription_received` - Receive prescription

### Notifications
- `notify_user` - Send notification
- `notification` - Receive notification

## 🔐 Security

- **Helmet** - Secures HTTP headers
- **CORS** - Controlled cross-origin requests
- **Rate Limiting** - Prevents abuse (100 requests per 15 minutes)
- **Password Hashing** - bcryptjs for secure password storage
- **JWT** - Token-based authentication
- **Input Validation** - Joi for request validation
- **Error Handling** - No sensitive information in error responses

## 🛠️ Middleware Pipeline

1. **Helmet** - Security headers
2. **CORS** - Cross-origin requests
3. **Body Parser** - JSON/URL-encoded parsing
4. **Request Logger** - Log all requests
5. **Rate Limiter** - Prevent abuse
6. **Routes** - API endpoints
7. **404 Handler** - Not found handler
8. **Error Handler** - Global error handling

## 📊 Logging

Logs are written to:
- **Console** - Development environment
- **logs/error.log** - Error logs
- **logs/all.log** - All logs

Log levels: `error`, `warn`, `info`, `http`, `debug`

## 🚨 Error Handling

All errors return consistent JSON response:
```json
{
  "success": false,
  "message": "Error description",
  "status": 500,
  "timestamp": "2025-11-20T10:30:00.000Z"
}
```

## 📡 Database Schema

### User Model
- `id` - UUID primary key
- `firstName`, `lastName` - Name fields
- `email` - Unique email
- `phone` - Unique phone number
- `password` - Hashed password
- `role` - User role (patient, doctor, pharmacist, admin)
- `isActive`, `isVerified` - Status flags
- `profileImage` - Optional image URL
- `timestamps` - createdAt, updatedAt

### Consultation Model
- `id` - UUID primary key
- `patientId` - Foreign key to User
- `doctorId` - Foreign key to User
- `title` - Consultation title
- `description` - Details
- `status` - scheduled, in-progress, completed, cancelled
- `scheduledAt` - Appointment time
- `notes` - Doctor's notes
- `prescription` - Prescription details
- `timestamps` - createdAt, updatedAt

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch
```

## 📝 Linting

```bash
# Check for linting errors
npm run lint

# Fix linting errors
npm run lint:fix
```

## 🔄 Graceful Shutdown

The server handles graceful shutdown on `SIGTERM` and `SIGINT` signals:
1. Stops accepting new connections
2. Closes database connections
3. Logs shutdown completion
4. Forces exit after 10 seconds if still running

## 🐛 Troubleshooting

### Server won't start
- Check if port 3000 is already in use
- Verify database connection credentials
- Check `.env` file is configured correctly

### Database connection errors
- Ensure MariaDB/MySQL is running
- Verify credentials in `.env`
- Check database exists or will be auto-created

### CORS errors
- Verify `FRONTEND_URL` in `.env`
- Check browser console for specific error

### Socket.IO not connecting
- Ensure Socket.IO is enabled
- Check browser console for connection errors
- Verify frontend URL matches

## 📚 Resources

- [Express.js Documentation](https://expressjs.com/)
- [Socket.IO Documentation](https://socket.io/docs/)
- [Sequelize ORM](https://sequelize.org/)
- [Winston Logger](https://github.com/winstonjs/winston)
- [Helmet Security](https://helmetjs.github.io/)

## 📄 License

MIT License - See LICENSE file for details

## 👥 Contributors

MediRwanda Team

---

**Last Updated:** November 20, 2025
**API Version:** v1
