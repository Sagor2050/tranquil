# Authentication System Documentation

This guide explains how the Tranquil authentication system works.

## Overview

Tranquil uses JWT (JSON Web Tokens) for authentication with a PostgreSQL database to store user information. Passwords are securely hashed using bcryptjs.

## Architecture

```
┌─────────────────┐
│   Client App    │
│  (Next.js UI)   │
└────────┬────────┘
         │
    ┌────▼────────────────┐
    │  Login/Signup Page  │
    │  - Form validation  │
    │  - API calls        │
    └────┬───────────────┘
         │
         │  POST /api/auth/login
         │  POST /api/auth/signup
         │
    ┌────▼──────────────────┐
    │   API Routes           │
    │ (Next.js Route Handlers)│
    │ - Validate input       │
    │ - Hash password        │
    │ - Generate JWT         │
    └────┬──────────────────┘
         │
    ┌────▼──────────────────┐
    │  PostgreSQL Database  │
    │  - Store users        │
    │  - Verify passwords   │
    └───────────────────────┘
```

## User Flow

### Signup Flow

```
1. User enters email, name, password, confirm password
   ↓
2. Client validates form:
   - All fields filled
   - Passwords match
   - Password at least 8 chars
   ↓
3. POST /api/auth/signup with { name, email, password }
   ↓
4. Server validates:
   - Input present
   - Password long enough
   - Email doesn't exist
   ↓
5. Server hashes password with bcryptjs
   ↓
6. Server stores user in PostgreSQL:
   - id (auto-generated)
   - email
   - name
   - password_hash
   - created_at
   ↓
7. Server generates JWT token with user ID and email
   ↓
8. Client stores token in localStorage
   ↓
9. User redirected to /dashboard
```

### Login Flow

```
1. User enters email and password
   ↓
2. POST /api/auth/login with { email, password }
   ↓
3. Server finds user by email in PostgreSQL
   ↓
4. If not found → Return 401 "Invalid email or password"
   ↓
5. Server compares provided password with stored hash
   ↓
6. If no match → Return 401 "Invalid email or password"
   ↓
7. Server generates JWT token
   ↓
8. Client stores token in localStorage
   ↓
9. User redirected to /dashboard
```

### Protected Route Flow

```
1. User accesses /dashboard
   ↓
2. Component checks localStorage for token
   ↓
3. If no token → Redirect to /login
   ↓
4. If token exists → Render dashboard
   ↓
5. For API requests:
   - Include "Authorization: Bearer <token>" header
   - Server verifies token signature
   - If valid → Process request
   - If invalid → Return 401 Unauthorized
```

## Database Schema

### Users Table

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  avatar_url VARCHAR(500),
  bio TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_email ON users(email);
```

## API Routes

### Signup
- **Endpoint:** `POST /api/auth/signup`
- **Body:**
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securepassword123"
  }
  ```
- **Success Response (201):**
  ```json
  {
    "message": "Account created successfully",
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "user": {
      "id": 1,
      "email": "john@example.com",
      "name": "John Doe",
      "avatar_url": null
    }
  }
  ```
- **Error Responses:**
  - `400` - Missing fields or invalid input
  - `409` - Email already in use
  - `500` - Server error

### Login
- **Endpoint:** `POST /api/auth/login`
- **Body:**
  ```json
  {
    "email": "john@example.com",
    "password": "securepassword123"
  }
  ```
- **Success Response (200):**
  ```json
  {
    "message": "Login successful",
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "user": {
      "id": 1,
      "email": "john@example.com",
      "name": "John Doe",
      "avatar_url": null
    }
  }
  ```
- **Error Responses:**
  - `400` - Missing email or password
  - `401` - Invalid credentials
  - `500` - Server error

### Get User Profile
- **Endpoint:** `GET /api/user/profile`
- **Headers:** `Authorization: Bearer <token>`
- **Success Response (200):**
  ```json
  {
    "user": {
      "id": 1,
      "email": "john@example.com",
      "name": "John Doe",
      "avatar_url": null,
      "created_at": "2025-02-14T10:30:00Z"
    }
  }
  ```
- **Error Responses:**
  - `401` - No token or invalid token
  - `404` - User not found
  - `500` - Server error

## Security Features

### Password Hashing

Passwords are never stored in plain text. Instead, they're hashed using bcryptjs:

```typescript
// Hashing
const hashedPassword = await hashPassword(plainPassword);
// Result: $2a$10$K8Xlvz.qH.K8X.qH.K8X...

// Verifying
const isValid = await verifyPassword(plainPassword, hashedPassword);
```

**Security:**
- One-way encryption (can't reverse)
- Salted (random data added before hashing)
- Expensive computation (time-consuming, prevents brute force)

### JWT Tokens

JWTs are cryptographically signed tokens containing user information:

```
Header: { "alg": "HS256", "typ": "JWT" }
Payload: { "id": 1, "email": "john@example.com", "iat": 1234567890, "exp": 1234654290 }
Signature: HMACSHA256(header.payload, JWT_SECRET)
```

**Token Structure:**
- **Header:** Encryption algorithm
- **Payload:** User data and expiration
- **Signature:** Ensures token wasn't tampered with

**Expiration:**
- Tokens expire after 7 days
- Users must login again for new token
- Expired tokens are rejected

### Environment Variables

**Critical secrets (never commit these!):**

```env
JWT_SECRET=your-super-secret-key-change-in-production
DB_PASSWORD=your_postgres_password
```

Store these in `.env.local` (gitignored) or use a secrets manager in production.

## Code Examples

### Using Authentication in Components

```typescript
// components/ProtectedComponent.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ProtectedComponent() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      router.push('/login');
      return;
    }

    // Get user data
    const storedUser = localStorage.getItem('user');
    setUser(JSON.parse(storedUser || '{}'));
  }, [router]);

  if (!user) return <div>Loading...</div>;

  return <div>Welcome, {user.name}!</div>;
}
```

### Making Authenticated API Calls

```typescript
// Example: Fetch user profile
const token = localStorage.getItem('token');

const response = await fetch('/api/user/profile', {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
});

const data = await response.json();
```

### Creating Protected API Routes

```typescript
// app/api/protected-route/route.ts
import { withAuth, DecodedToken } from '@/lib/middleware';
import { NextRequest, NextResponse } from 'next/server';

async function handler(request: NextRequest, decoded: DecodedToken) {
  // decoded.id and decoded.email are available here
  
  return NextResponse.json({
    message: 'This is a protected route',
    userId: decoded.id
  });
}

export const GET = (request: NextRequest) => withAuth(handler)(request);
```

## Troubleshooting

### "Invalid token" Error

**Causes:**
- Token expired (older than 7 days)
- Token corrupted or modified
- Wrong JWT_SECRET

**Solution:**
- Clear localStorage: `localStorage.clear()`
- Logout and login again
- Check JWT_SECRET in `.env.local`

### "User not found" Error

**Causes:**
- User was deleted
- Database connection issue

**Solution:**
- Check database connection
- Verify user exists in PostgreSQL
- Try signing up with new account

### "Email already in use" Error

**Causes:**
- Account with that email already exists
- Previous signup was successful but not redirected

**Solution:**
- Use different email
- Try logging in instead
- Contact admin to reset password

## Best Practices

1. **Never commit secrets** - Use `.env.local` (gitignored)
2. **Use HTTPS in production** - Prevent token interception
3. **Set strong JWT_SECRET** - At least 32 characters
4. **Validate input** - Both client and server side
5. **Use secure cookies** - Consider secure, httpOnly cookies
6. **Implement refresh tokens** - For better security
7. **Monitor failed login attempts** - Prevent brute force
8. **Regularly rotate secrets** - For production systems

## Future Enhancements

Planned authentication improvements:

- [ ] Google/GitHub OAuth integration
- [ ] Two-factor authentication (2FA)
- [ ] Refresh token rotation
- [ ] Email verification
- [ ] Password reset flow
- [ ] Session management
- [ ] Rate limiting on auth endpoints
- [ ] Remember me functionality

## Resources

- [JWT Introduction](https://jwt.io/introduction)
- [bcryptjs Documentation](https://github.com/dcodeIO/bcrypt.js)
- [Next.js Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [OWASP Authentication Guide](https://owasp.org/www-community/attacks/authentication_cheat_sheet)
