# User Service API Documentation

## Endpoint: `/users/register`

### Description
This endpoint is used to register a new user in the system. It validates the input data, hashes the password, and creates a new user record in the database. Upon successful registration, it returns a JSON Web Token (JWT) and the user details.

### Method
`POST`

### Request Body
The request body should be a JSON object with the following structure:

```json
{
  "fullname": {
    "firstname": "string (min 3 characters, required)",
    "lastname": "string (min 3 characters, optional)"
  },
  "email": "string (valid email format, required)",
  "password": "string (min 6 characters, required)"
}
```

### Response

#### Success (200 OK)
```json
{
  "token": "string (JWT token)",
  "user": {
    "_id": "string (user ID)",
    "fullname": {
      "firstname": "string",
      "lastname": "string"
    },
    "email": "string",
    "createdAt": "string (timestamp)",
    "updatedAt": "string (timestamp)"
  }
}
```

#### Error (400 Bad Request)
Occurs when validation fails or required fields are missing.

```json
{
  "errors": [
    {
      "msg": "string (error message)",
      "param": "string (field name)",
      "location": "string (location of the error, e.g., 'body')"
    }
  ]
}
```

#### Error (500 Internal Server Error)
Occurs when there is an issue on the server side.

```json
{
  "error": "string (error message)"
}
```

### Validation Rules
- `fullname.firstname`: Must be at least 3 characters long.
- `fullname.lastname`: Optional, but if provided, must be at least 3 characters long.
- `email`: Must be a valid email address.
- `password`: Must be at least 6 characters long.

### Example Request
```bash
curl -X POST http://localhost:<port>/users/register \
-H "Content-Type: application/json" \
-d '{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123"
}'
```

### Example Response
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "64f1a2b3c4d5e6f7890g1234",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "createdAt": "2023-10-01T12:00:00.000Z",
    "updatedAt": "2023-10-01T12:00:00.000Z"
  }
}
```

## Endpoint: `/users/login`

### Description
This endpoint is used to authenticate a user. It validates the input data, checks the credentials, and returns a JSON Web Token (JWT) along with the user details upon successful login.

### Method
`POST`

### Request Body
The request body should be a JSON object with the following structure:

```json
{
  "email": "string (valid email format, required)",
  "password": "string (min 6 characters, required)"
}
```

### Response

#### Success (200 OK)
```json
{
  "token": "string (JWT token)",
  "user": {
    "_id": "string (user ID)",
    "fullname": {
      "firstname": "string",
      "lastname": "string"
    },
    "email": "string",
    "createdAt": "string (timestamp)",
    "updatedAt": "string (timestamp)"
  }
}
```

#### Error (400 Bad Request)
Occurs when validation fails or required fields are missing.

```json
{
  "errors": [
    {
      "msg": "string (error message)",
      "param": "string (field name)",
      "location": "string (location of the error, e.g., 'body')"
    }
  ]
}
```

#### Error (401 Unauthorized)
Occurs when the email or password is invalid.

```json
{
  "message": "Invalid email or password"
}
```

#### Error (500 Internal Server Error)
Occurs when there is an issue on the server side.

```json
{
  "error": "string (error message)"
}
```

### Validation Rules
- `email`: Must be a valid email address.
- `password`: Must be at least 6 characters long.

### Example Request
```bash
curl -X POST http://localhost:<port>/users/login \
-H "Content-Type: application/json" \
-d '{
  "email": "john.doe@example.com",
  "password": "password123"
}'
```

### Example Response
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "64f1a2b3c4d5e6f7890g1234",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "createdAt": "2023-10-01T12:00:00.000Z",
    "updatedAt": "2023-10-01T12:00:00.000Z"
  }
}
```

### GET /user/profile

This endpoint retrieves the profile of the authenticated user.

#### Headers
- **Authorization**: Bearer `<JWT_TOKEN>`  
  (Replace `<JWT_TOKEN>` with the valid JWT token obtained during login)

#### Response
- **200 OK**: Returns the user's profile information.
  ```json
  {
    "id": "user_id",
    "email": "user@example.com",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "createdAt": "2025-03-30T12:00:00.000Z"
  }
  ```
- **401 Unauthorized**: If the token is missing or invalid.
  ```json
  {
    "message": "Unauthorized"
  }
  ```

#### Example Request
```bash
curl -X GET http://localhost:5000/user/profile \
-H "Authorization: Bearer <JWT_TOKEN>"
```

### GET /user/logout

This endpoint logs out the authenticated user by clearing the authentication token and blacklisting it.

#### Headers
- **Authorization**: Bearer `<JWT_TOKEN>`  
  (Replace `<JWT_TOKEN>` with the valid JWT token obtained during login)

#### Response

##### Success (200 OK)
If the user is successfully logged out:
```json
{
  "message": "Logged Out"
}
```

##### Error (401 Unauthorized)
If the token is missing or invalid:
```json
{
  "message": "Unauthorized"
}
```

#### Example Request
Using `curl`:
```bash
curl -X GET http://localhost:5000/user/logout \
-H "Authorization: Bearer <JWT_TOKEN>"
```

Using JavaScript (Axios):
```javascript
const axios = require("axios");

axios
  .get("http://localhost:5000/user/logout", {
    headers: {
      Authorization: "Bearer <JWT_TOKEN>",
    },
  })
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.error(error.response.data);
  });
```