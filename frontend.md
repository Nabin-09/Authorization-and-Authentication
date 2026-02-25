

# Backend Technical Specification: Unified Civic Services Platform

## 1. Technical Stack (Finalized)

| Category | Selection |
| --- | --- |
| **Runtime** | Node.js (LTS) |
| **Framework** | Express.js |
| **Database** | MongoDB (Atlas) |
| **ODM** | Mongoose |
| **Authentication** | JWT + Refresh Token (HttpOnly Cookies) |
| **Security** | Helmet, Rate limiting, bcrypt, RBAC |
| **Validation** | Zod |
| **File Uploads** | Multer + Cloudinary |
| **Payments** | Razorpay (Test Mode) |
| **Logging** | Winston |
| **Deployment** | Render / Railway |

---

## 2. System Architecture

The backend utilizes a **Layered Architecture** to ensure high maintainability and clear separation of concerns.

* **Routes:** Entry points that define the API surface.
* **Controllers:** Manage the HTTP request/response cycle.
* **Services:** House the core business logic and third-party integrations (Razorpay, Cloudinary).
* **Models:** Define data structures and interact with the MongoDB database.

---

## 3. Database Schemas (Mongoose)

### User Model

> Defines the identity and role-based access for the platform.

* `name`: String
* `phone`: String (Unique index for OTP login)
* `role`: Enum (`Citizen`, `Admin`, `Operator`)
* `language`: String (default: 'en')

### Complaint Model

* `userId`: ObjectId (Reference to User)
* `serviceType`: Enum (`Electricity`, `Water`, `Gas`, `Municipal`)
* `status`: Enum (`Pending`, `In Progress`, `Resolved`)
* `attachments`: Array of strings (Cloudinary URLs)
* `assignedTo`: ObjectId (Reference to User/Operator)

### Payment Model

* `transactionId`: String (Razorpay Order ID)
* `status`: Enum (`Created`, `Success`, `Failed`)
* `receiptUrl`: String (Link to generated PDF)

---

## 4. API Endpoint Map

### Auth & User

* `POST /api/v1/auth/send-otp` — Initiates the login flow.
* `POST /api/v1/auth/verify-otp` — Returns JWT and sets cookies.
* `GET /api/v1/user/profile` — Retrieves role-specific data.

### Complaints & Services

* `POST /api/v1/complaints` — Citizen submission with Multer upload.
* `GET /api/v1/complaints/my` — Fetch history for the logged-in citizen.
* `PATCH /api/v1/admin/complaints/:id` — Update status (Admin only).

### Payments

* `POST /api/v1/payments/initiate` — Creates a Razorpay order.
* `POST /api/v1/payments/verify` — Validates the payment signature.

---

## 5. Security & Logic Flows

### Authentication Flow

1. **Client** requests OTP via Phone.
2. **Server** generates OTP and stores it (Redis/Database) with an expiration.
3. **Client** submits OTP.
4. **Server** verifies and issues a **short-lived Access Token** and a **long-lived Refresh Token** in an `HttpOnly` cookie.

### High-Level Infrastructure

---

## 6. Implementation Folder Structure

```bash
src/
├── config/          # Database & Cloudinary configurations
├── controllers/     # Request handlers
├── middlewares/     # Auth, RBAC, and Error handlers
├── models/          # Mongoose schemas
├── routes/          # API route definitions
├── services/        # Business logic (Payment, SMS, FileUpload)
├── utils/           # Zod schemas & Helpers
└── app.js           # Express app initialization

```

---

## 7. Deployment Roadmap

* **Phase 1:** Setup MongoDB Atlas cluster and environment variables (JWT secrets, Cloudinary keys).
* **Phase 2:** Implement Core Auth and Complaint modules.
* **Phase 3:** Integrate Razorpay Webhooks and PDF generation for receipts.
* **Phase 4:** Final deployment to Render/Railway with health check monitoring.

Would you like me to **generate the Mongoose schema code and Zod validation** for the Complaint module so you can start coding the models?