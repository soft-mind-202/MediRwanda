# MediRwanda API Documentation

Complete API reference for the MediRwanda backend server.

## 📋 Table of Contents

1. [Authentication](#authentication)
2. [Users](#users)
3. [Patients](#patients)
4. [Doctors](#doctors)
5. [Consultations](#consultations)
6. [Prescriptions](#prescriptions)
7. [Pharmacies](#pharmacies)
8. [Error Handling](#error-handling)

---

## Authentication

### Register User

**POST** `/api/auth/register`

Register a new user account.

**Request Body:**
```json
{
  "fullName": "John Doe",
  "nationalId": "1234567890123456",
  "phone": "+250788123456",
  "email": "john@example.com",
  "dateOfBirth": "1990-01-15",
  "gender": "MALE",
  "password": "securePassword123",
  "role": "PATIENT"
}
```

**Valid Roles:** `PATIENT`, `DOCTOR`, `PHARMACIST`, `DELIVERY_AGENT`, `INSURER_ADMIN`, `MOH_ADMIN`, `SUPER_ADMIN`

**Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": 1,
      "uuid": "550e8400-e29b-41d4-a716-446655440000",
      "fullName": "John Doe",
      "email": "john@example.com",
      "phone": "+250788123456",
      "role": "PATIENT",
      "isVerified": false
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### Login

**POST** `/api/auth/login`

Authenticate a user and receive access tokens.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": { /* user object */ },
    "accessToken": "...",
    "refreshToken": "..."
  }
}
```

---

## Users

### Get All Users

**GET** `/api/users` (Admin only)

Retrieve all users in the system.

**Headers:**
```
Authorization: Bearer {accessToken}
```

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "uuid": "...",
      "fullName": "John Doe",
      "email": "john@example.com",
      "phone": "+250788123456",
      "role": "PATIENT",
      "isActive": true
    }
  ]
}
```

### Get User by ID

**GET** `/api/users/:id`

Get details of a specific user.

**Response (200):**
```json
{
  "success": true,
  "data": { /* user object */ }
}
```

### Get Current User

**GET** `/api/users/me`

Get the authenticated user's profile.

**Response (200):**
```json
{
  "success": true,
  "data": { /* current user object */ }
}
```

### Update User

**PUT** `/api/users/:id`

Update user profile information.

**Request Body:**
```json
{
  "fullName": "Jane Doe",
  "phone": "+250788654321"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "User updated successfully",
  "data": { /* updated user object */ }
}
```

---

## Patients

### Get All Patients

**GET** `/api/patients`

Retrieve all patient records (admin only).

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "userId": 1,
      "bloodGroup": "O+",
      "heightCm": 175.5,
      "weightKg": 75.2,
      "nhisMemberId": "NID123456",
      "nhisCategory": 2,
      "allergies": [],
      "chronicConditions": [],
      "user": { /* user object */ }
    }
  ]
}
```

### Get Patient by ID

**GET** `/api/patients/:id`

Get detailed patient information.

**Response (200):**
```json
{
  "success": true,
  "data": {
    "userId": 1,
    "bloodGroup": "O+",
    "heightCm": 175.5,
    "weightKg": 75.2,
    "primaryInsurer": { /* insurer object */ },
    "user": { /* user object */ }
  }
}
```

### Update Patient

**PUT** `/api/patients/:id`

Update patient health information.

**Request Body:**
```json
{
  "bloodGroup": "AB+",
  "heightCm": 176.0,
  "weightKg": 76.0,
  "allergies": ["Penicillin", "Nuts"],
  "chronicConditions": ["Hypertension"]
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Patient updated",
  "data": { /* updated patient object */ }
}
```

---

## Doctors

### Get All Doctors

**GET** `/api/doctors`

List all available doctors. Supports filtering by specialty.

**Query Parameters:**
- `specialty` - Filter by medical specialty
- `isOnline` - Filter by online status (true/false)
- `isAcceptingPatients` - Filter by acceptance status (true/false)

**Example:**
```
GET /api/doctors?specialty=Cardiology&isAcceptingPatients=true
```

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "userId": 2,
      "licenseNumber": "LIC123456",
      "specialty": "Cardiology",
      "yearsOfExperience": 10,
      "consultationFee": 5000,
      "averageRating": 4.8,
      "totalReviews": 45,
      "isOnline": true,
      "user": { /* user object */ }
    }
  ]
}
```

### Get Doctor by ID

**GET** `/api/doctors/:id`

Get detailed doctor information including recent consultations.

**Response (200):**
```json
{
  "success": true,
  "data": {
    "userId": 2,
    "specialty": "Cardiology",
    "consultationFee": 5000,
    "totalConsultations": 150,
    "averageRating": 4.8,
    "user": { /* user object */ },
    "consultations": [
      { /* recent consultation objects */ }
    ]
  }
}
```

### Update Doctor Profile

**PUT** `/api/doctors/:id`

Update doctor's professional information.

**Request Body:**
```json
{
  "specialty": "General Medicine",
  "yearsOfExperience": 12,
  "consultationFee": 6000,
  "isOnline": true,
  "isAcceptingPatients": true,
  "bio": "Experienced doctor with 12 years of practice"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Doctor profile updated",
  "data": { /* updated doctor object */ }
}
```

---

## Consultations

### Create Consultation

**POST** `/api/consultations`

Schedule a new consultation with a doctor.

**Request Body:**
```json
{
  "doctorId": 2,
  "consultationType": "VIDEO",
  "chiefComplaint": "Chest pain",
  "consultationFee": 5000,
  "scheduledAt": "2025-12-01T14:30:00Z"
}
```

**Valid Consultation Types:** `VIDEO`, `AUDIO`, `CHAT`, `EMERGENCY`

**Response (201):**
```json
{
  "success": true,
  "message": "Consultation created successfully",
  "data": {
    "id": 1,
    "uuid": "...",
    "patientId": 1,
    "doctorId": 2,
    "consultationType": "VIDEO",
    "status": "SCHEDULED",
    "scheduledAt": "2025-12-01T14:30:00Z"
  }
}
```

### Get Consultations

**GET** `/api/consultations`

Get consultations (filtered by user role automatically).

**Query Parameters:**
- `status` - Filter by status (SCHEDULED, ONGOING, COMPLETED, CANCELLED)

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "uuid": "...",
      "patientId": 1,
      "doctorId": 2,
      "status": "SCHEDULED",
      "consultationFee": 5000,
      "patient": { /* patient user object */ },
      "doctor": { /* doctor user object */ },
      "vitals": []
    }
  ]
}
```

### Get Consultation Details

**GET** `/api/consultations/:id`

Get detailed consultation information including vitals and prescriptions.

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "uuid": "...",
    "status": "COMPLETED",
    "patient": { /* user object */ },
    "doctor": { /* user object */ },
    "vitals": [
      {
        "id": 1,
        "bloodPressureSystolic": 120,
        "bloodPressureDiastolic": 80,
        "heartRate": 75,
        "temperature": 36.5,
        "oxygenSaturation": 98
      }
    ],
    "prescriptions": []
  }
}
```

### Update Consultation

**PUT** `/api/consultations/:id`

Update consultation status and details (doctors only).

**Request Body:**
```json
{
  "status": "COMPLETED",
  "diagnosis": "Hypertension",
  "doctorNotes": "Patient needs medication adjustment"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Consultation updated",
  "data": { /* updated consultation object */ }
}
```

---

## Prescriptions

### Get All Prescriptions

**GET** `/api/prescriptions`

List prescriptions with optional filtering.

**Query Parameters:**
- `status` - Filter by status
- `patientId` - Filter by patient

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "uuid": "...",
      "prescriptionNumber": "RX-20251120-ABC123",
      "status": "PENDING",
      "totalAmount": 15000,
      "patientCopay": 3000,
      "issuedAt": "2025-11-20T10:00:00Z",
      "expiresAt": "2025-12-20T10:00:00Z",
      "patient": { /* user object */ },
      "doctor": { /* user object */ }
    }
  ]
}
```

### Get Prescription Details

**GET** `/api/prescriptions/:id`

Get detailed prescription information.

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "prescriptionNumber": "RX-20251120-ABC123",
    "status": "DISPENSED",
    "totalAmount": 15000,
    "consultation": { /* consultation object */ },
    "patient": { /* user object */ },
    "doctor": { /* user object */ },
    "pharmacy": { /* pharmacy object */ }
  }
}
```

### Create Prescription

**POST** `/api/prescriptions` (Doctors only)

Issue a new prescription.

**Request Body:**
```json
{
  "consultationId": 1,
  "patientId": 1,
  "totalAmount": 15000,
  "patientCopay": 3000,
  "insuranceCoverage": 12000,
  "expiresAt": "2025-12-20T10:00:00Z",
  "specialInstructions": "Take with food, twice daily"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Prescription created",
  "data": { /* new prescription object */ }
}
```

### Update Prescription

**PUT** `/api/prescriptions/:id` (Doctors only)

Update prescription details.

**Request Body:**
```json
{
  "status": "PHARMACY_ACCEPTED",
  "pharmacyId": 1
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Prescription updated",
  "data": { /* updated prescription object */ }
}
```

---

## Pharmacies

### Get All Pharmacies

**GET** `/api/pharmacies`

List all registered pharmacies with filtering options.

**Query Parameters:**
- `district` - Filter by district
- `isActive` - Filter by active status (true/false)
- `accepts24Hours` - Filter by 24-hour service (true/false)

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Central Pharmacy",
      "licenseNumber": "PH-001",
      "phone": "+250788111111",
      "district": "Gasabo",
      "acceptsDelivery": true,
      "averageRating": 4.5,
      "totalReviews": 23,
      "owner": { /* user object */ }
    }
  ]
}
```

### Get Pharmacy Details

**GET** `/api/pharmacies/:id`

Get detailed pharmacy information.

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Central Pharmacy",
    "licenseNumber": "PH-001",
    "contactInfo": { /* contact details */ },
    "address": { /* address details */ },
    "prescriptions": [
      { /* prescription objects */ }
    ]
  }
}
```

### Create Pharmacy

**POST** `/api/pharmacies` (Admin only)

Register a new pharmacy.

**Request Body:**
```json
{
  "name": "Central Pharmacy",
  "licenseNumber": "PH-001",
  "licenseExpiryDate": "2026-11-20",
  "phone": "+250788111111",
  "email": "central@pharmacy.rw",
  "province": "Kigali",
  "district": "Gasabo",
  "sector": "Gacuriro",
  "acceptsDelivery": true,
  "acceptsInsurance": true
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Pharmacy created",
  "data": { /* new pharmacy object */ }
}
```

### Update Pharmacy

**PUT** `/api/pharmacies/:id` (Owner or Admin)

Update pharmacy information.

**Request Body:**
```json
{
  "phone": "+250788222222",
  "is24Hours": true,
  "acceptsDelivery": true
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Pharmacy updated",
  "data": { /* updated pharmacy object */ }
}
```

---

## Error Handling

### Error Response Format

All errors follow a consistent format:

```json
{
  "success": false,
  "message": "Description of the error",
  "status": 400,
  "timestamp": "2025-11-20T10:30:00.000Z"
}
```

### Common Status Codes

| Code | Meaning |
|------|---------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 500 | Server Error |

### Authentication Errors

**401 - No Token:**
```json
{
  "success": false,
  "message": "No token provided"
}
```

**401 - Invalid Token:**
```json
{
  "success": false,
  "message": "Invalid or expired token"
}
```

### Authorization Errors

**403 - Insufficient Permissions:**
```json
{
  "success": false,
  "message": "Forbidden: Admin access required"
}
```

---

## Authentication

All authenticated endpoints require an Authorization header:

```
Authorization: Bearer {accessToken}
```

**Token Format:** JWT with the following payload:
```json
{
  "id": 1,
  "email": "user@example.com",
  "role": "PATIENT",
  "iat": 1637414400,
  "exp": 1638019200
}
```

---

## Rate Limiting

- **Limit:** 100 requests per 15 minutes
- **Excluded:** Health check endpoints
- **Header:** `X-RateLimit-Remaining`

---

## Timestamps

All timestamps are in ISO 8601 format:
```
2025-11-20T10:30:00.000Z
```

---

## Data Types

### User Roles
- `PATIENT` - Regular patient
- `DOCTOR` - Medical doctor
- `PHARMACIST` - Pharmacy staff
- `DELIVERY_AGENT` - Delivery personnel
- `INSURER_ADMIN` - Insurance administrator
- `MOH_ADMIN` - Ministry of Health administrator
- `SUPER_ADMIN` - System administrator

### Consultation Status
- `SCHEDULED` - Appointment booked
- `WAITING` - Waiting to start
- `ONGOING` - In progress
- `COMPLETED` - Finished
- `CANCELLED` - Cancelled
- `NO_SHOW` - Patient didn't show up

### Prescription Status
- `PENDING` - Awaiting pharmacy pickup
- `PHARMACY_ACCEPTED` - Pharmacy received
- `PREPARING` - Being prepared
- `DISPENSED` - Ready for pickup
- `DELIVERED` - Delivered to patient
- `CANCELLED` - Cancelled
- `EXPIRED` - No longer valid

---

**API Base URL:** `http://localhost:3000/api`

**Last Updated:** November 20, 2025
