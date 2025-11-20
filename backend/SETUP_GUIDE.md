# Backend Setup Guide

Complete instructions for setting up the MediRwanda backend.

## Prerequisites

Before starting, ensure you have:
- **Node.js** >= 18.0.0
- **npm** >= 9.0.0
- **MariaDB** or **MySQL** server installed and running
- **Git** (optional, for version control)

## Step 1: Install Dependencies

Navigate to the backend folder and install all required packages:

```bash
cd backend
npm install
```

This will install:
- **Express.js** - Web server framework
- **Sequelize** - ORM for database operations
- **MySQL2** - MySQL/MariaDB driver
- **Socket.IO** - Real-time communication
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **Winston** - Logging
- **Helmet** - Security headers
- **CORS** - Cross-origin requests
- **dotenv** - Environment variables
- And more...

## Step 2: Create Database

Create a new MariaDB/MySQL database:

```sql
CREATE DATABASE medirwanda;
```

Or import the provided SQL schema:

```bash
mysql -u root -p medirwanda < medirwanda.sql
```

## Step 3: Configure Environment Variables

Copy the example environment file:

```bash
cp .env.example .env
```

Edit `.env` with your settings:

```env
# Database Configuration
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=your_password
MYSQL_DATABASE=medirwanda

# JWT Configuration
JWT_SECRET=your_super_secret_key_change_this
JWT_EXPIRATION=7d
JWT_REFRESH_SECRET=your_refresh_secret_key
JWT_REFRESH_EXPIRATION=30d

# Server Configuration
PORT=3000
NODE_ENV=development
API_URL=http://localhost:3000
FRONTEND_URL=http://localhost:5173

# Email Configuration (Optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_app_password
SMTP_FROM=noreply@medirwanda.com

# Redis (Optional)
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=
```

## Step 4: Start the Server

### Development Mode (with auto-reload)

```bash
npm run dev
```

The server will start on `http://localhost:3000` and automatically reload when files change.

### Production Mode

```bash
npm run start:prod
```

### Output

When the server starts successfully, you should see:

```
============================================================
🚀 MediRwanda Backend Server Started Successfully!
============================================================
   📍 API Server: http://localhost:3000
   🏥 API Base:   http://localhost:3000/api
   💚 Health:     http://localhost:3000/health
   🔌 Socket.IO:  ws://localhost:3000
   🌍 Frontend:   http://localhost:5173
============================================================
```

## Step 5: Verify Installation

### Health Check

Test if the server is running:

```bash
curl http://localhost:3000/health
```

Expected response:
```json
{
  "status": "OK",
  "timestamp": "2025-11-20T10:30:00.000Z",
  "uptime": 5.234,
  "environment": "development"
}
```

### API Health Check

```bash
curl http://localhost:3000/api/health
```

Expected response:
```json
{
  "success": true,
  "message": "API is running",
  "version": "v1",
  "timestamp": "2025-11-20T10:30:00.000Z"
}
```

## Database Schema

The database includes the following tables:

### Core Tables
- **users** - All user accounts
- **patients** - Patient-specific data
- **doctors** - Doctor profiles
- **pharmacies** - Pharmacy information

### Clinical Tables
- **consultations** - Doctor-patient appointments
- **consultation_vitals** - Patient vitals during consultations
- **prescriptions** - Medication prescriptions
- **drug_catalog** - Complete drug database

### Insurance Tables
- **insurers** - Insurance providers
- **insurance_claims** - Claim processing
- **insurance_coverages** - Patient coverage

### Supporting Tables
- **patient_addresses** - Patient delivery addresses
- **doctor_availability** - Doctor schedules
- **pharmacy_inventory** - Drug stock management
- **user_tokens** - Authentication tokens

## Project Structure

```
backend/
├── src/
│   ├── main.js                 # Entry point
│   ├── server.js               # Server configuration
│   ├── config/
│   │   ├── database.js         # Sequelize setup
│   │   └── ...
│   ├── database/
│   │   └── models/             # Sequelize models
│   ├── middleware/
│   │   ├── auth.middleware.js
│   │   ├── error.handler.js
│   │   └── ...
│   ├── modules/
│   │   ├── auth/
│   │   ├── users/
│   │   ├── patients/
│   │   ├── doctors/
│   │   ├── consultations/
│   │   ├── prescriptions/
│   │   └── pharmacies/
│   ├── services/
│   │   ├── logger.js
│   │   └── ...
│   └── websocket/              # Socket.IO handlers
├── package.json
├── .env.example
├── README.md
└── API_DOCUMENTATION.md
```

## Available Scripts

```bash
# Start development server with auto-reload
npm run dev

# Start production server
npm run start:prod

# Just run the server
npm run dev:server

# Install dependencies
npm install

# Run tests (when configured)
npm test

# Lint code
npm run lint
```

## Common Issues

### Database Connection Error

**Problem:** `Error: connect ECONNREFUSED 127.0.0.1:3306`

**Solution:**
1. Ensure MariaDB/MySQL is running
2. Check credentials in `.env`
3. Verify database exists

### Port Already in Use

**Problem:** `Error: listen EADDRINUSE :::3000`

**Solution:**
```bash
# Kill the process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use a different port
PORT=3001 npm run dev
```

### JWT Secret Not Set

**Problem:** `Error: JWT_SECRET is not defined`

**Solution:**
1. Set `JWT_SECRET` in `.env`
2. Use a strong random string
3. Never commit `.env` to git

### Database Models Not Found

**Problem:** `Error: Cannot find module 'User'`

**Solution:**
- Models are auto-loaded from database config
- Ensure database connection is established
- Check that models are properly defined

## Testing the API

### Register a User

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "John Doe",
    "nationalId": "1234567890123456",
    "phone": "+250788123456",
    "email": "john@example.com",
    "dateOfBirth": "1990-01-15",
    "gender": "MALE",
    "password": "password123",
    "role": "PATIENT"
  }'
```

### Login

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Get Current User (with token)

```bash
curl -H "Authorization: Bearer {token}" \
  http://localhost:3000/api/users/me
```

## Logs

Logs are stored in the `logs/` directory:

- **error.log** - Errors only
- **all.log** - All log levels

Logs in development mode also appear in the console.

## Security Best Practices

1. **Change JWT_SECRET** - Use a strong random string
2. **Environment Variables** - Never commit `.env` to git
3. **HTTPS** - Use HTTPS in production
4. **Rate Limiting** - Enabled by default
5. **Password Hashing** - Uses bcryptjs with 10 salt rounds
6. **CORS** - Configured for frontend URL
7. **Helmet** - Security headers enabled

## Database Backup

### Create a Backup

```bash
mysqldump -u root -p medirwanda > backup.sql
```

### Restore from Backup

```bash
mysql -u root -p medirwanda < backup.sql
```

## Next Steps

1. **Set up Frontend** - Start the React application
2. **Configure Email** - Set up SMTP for notifications
3. **Set up Redis** - For caching (optional)
4. **Create Initial Users** - Add doctors, pharmacies, etc.
5. **Test Integrations** - Socket.IO, payments, etc.

## Support

For issues or questions:
1. Check the API documentation: `API_DOCUMENTATION.md`
2. Review error logs in `logs/` directory
3. Check `.env` configuration
4. Verify database connection

## Additional Resources

- [Sequelize Documentation](https://sequelize.org/)
- [Express.js Guide](https://expressjs.com/)
- [Socket.IO Docs](https://socket.io/docs/)
- [JWT Best Practices](https://tools.ietf.org/html/rfc7519)
- [MySQL Documentation](https://dev.mysql.com/doc/)

---

**Version:** 1.0.0  
**Last Updated:** November 20, 2025  
**Node Version:** >= 18.0.0  
**npm Version:** >= 9.0.0
