# Project Paytm

This is a backend application for a simplified Paytm clone, built using Express, MongoDB, JWT authentication, and Bcrypt for password hashing.

## Table of Contents

* [Installation](#installation)
* [Technologies Used](#technologies-used)
* [Endpoints](#endpoints)

  * [Sign Up](#sign-up)
  * [Sign In](#sign-in)
  * [Auth Middleware](#auth-middleware)
  * [Check Balance](#check-balance)
  * [Update User](#update-user)
  * [Profile](#profile)
  * [Transaction](#transaction)
* [License](#license)

---

## Installation

1. Clone the repository

   ```bash
   git clone https://github.com/yourusername/project-paytm.git
   ```

2. Install dependencies

   ```bash
   cd project-paytm
   npm install
   ```

3. Set up environment variables (create `.env` file)

   ```bash
   JWT_SECRET=your-jwt-secret-key
   DB_URI=mongodb://localhost:27017/paytm
   ```

4. Run the project

   ```bash
   npm run dev
   ```

---

## Technologies Used

* **Node.js**
* **Express**
* **MongoDB**
* **JWT (JSON Web Token)**
* **Bcrypt**

---

## Endpoints

### 1. Sign Up

**POST /signup**

This endpoint allows a new user to sign up by providing a username, email, and password.

**Request Body:**

```json
{
  "username": "user123",
  "email": "user123@example.com",
  "password": "password123"
}
```

**Response:**

```json
{
  "message": "User successfully created."
}
```

---

### 2. Sign In

**POST /signin**

This endpoint allows a user to sign in with their email and password. Upon successful login, a JWT token is returned.

**Request Body:**

```json
{
  "email": "user123@example.com",
  "password": "password123"
}
```

**Response:**

```json
{
  "token": "your-jwt-token"
}
```

---

### 3. Auth Middleware

**Middleware**: `authMiddleware`

This middleware is used to authenticate a user by verifying the JWT token in the request header.

**Usage:**

```javascript
app.use('/transaction', authMiddleware);
```

This middleware checks for a valid JWT token in the `Authorization` header (`Bearer <token>`), and adds the user’s ID to `req.userId` if valid.

---

### 4. Check Balance

**GET /balance**

This endpoint retrieves the balance of the currently authenticated user.

**Response:**

```json
{
  "balance": 1000
}
```

---

### 5. Update User

**PUT /update-user**

This endpoint allows the user to update their profile information, such as username, email, or password.

**Request Body:**

```json
{
  "username": "newusername",
  "email": "newemail@example.com",
  "password": "newpassword123"
}
```

**Response:**

```json
{
  "message": "User profile updated successfully."
}
```

---

### 6. Profile

**GET /profile**

This endpoint retrieves the profile information of the currently authenticated user.

**Response:**

```json
{
  "username": "user123",
  "email": "user123@example.com"
}
```

---

### 7. Transaction

**POST /transaction**

This endpoint allows the user to perform a transaction, such as transferring money or adding balance.

**Request Body:**

```json
{
  "amount": 500,
  "transactionType": "deposit"
}
```

**Response:**

```json
{
  "message": "Transaction completed successfully."
}
```

---

##
