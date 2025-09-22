
# 📚 API Documentation

## Authentication Endpoints

### Register a New User
**POST** `/api/auth/register`  
Register a new user account.

**Body:**
```
{ 
  "email": "user@example.com", 
  "password": "yourpassword", 
  "name": "User Name" 
}
```
**Returns:** User data and JWT token.

---

### Login
**POST** `/api/auth/login`  
Login with email and password.

**Body:**
```
{ 
  "email": "user@example.com", 
  "password": "yourpassword" 
}
```
**Returns:** User data and JWT token.

---

### Login with Google OAuth
**POST** `/api/auth/google`  
Login using Google OAuth.

**Body:**
```
{ 
  "id_token": "<google_id_token>" 
}
```
**Returns:** User data and JWT token.

---

### Get Current User Profile
**GET** `/api/auth/profile`

**Headers:**
```
Authorization: Bearer <token>
```
**Returns:** User profile data.

---

### Update User Profile
**PUT** `/api/auth/profile`

**Headers:**
```
Authorization: Bearer <token>
```

**Body:**
```
{ 
  "name": "New Name", 
  "bio": "User bio", 
  "profile_picture": "url_or_base64_image" 
}
```
**Returns:** Updated profile data.

---

## Posts Endpoints

### Get All Published Posts
**GET** `/api/posts`  
**Returns:** Array of posts with author info.

---

### Get Single Post by ID
**GET** `/api/posts/:id`  
**Returns:** Post details with comments and author info.  
Automatically increments view count.

---

### Create a New Post
**POST** `/api/posts`

**Headers:**
```
Authorization: Bearer <token>
```

**Body:**
```
{ 
  "title": "Post Title", 
  "content": "Post content", 
  "tags": ["tag1", "tag2"], 
  "image": "url_or_base64_image" 
}
```
**Returns:** Created post data.

---

### Update Existing Post
**PUT** `/api/posts/:id`

**Headers:**
```
Authorization: Bearer <token>
```

**Body:**
```
{ 
  "title": "Updated Title", 
  "content": "Updated content", 
  "tags": ["tag1", "tag3"], 
  "image": "url_or_base64_image" 
}
```
**Returns:** Updated post data.

---

### Delete a Post
**DELETE** `/api/posts/:id`

**Headers:**
```
Authorization: Bearer <token>
```
**Returns:** Success message.

---

### Get Posts by Specific User
**GET** `/api/posts/user/:userId`

**Headers:**
```
Authorization: Bearer <token>
```
**Returns:** Array of user's posts.

---

### Like or Unlike a Post
**POST** `/api/posts/:id/like`

**Headers:**
```
Authorization: Bearer <token>
```
**Returns:** Updated like count.

---

### Add Comment to a Post
**POST** `/api/posts/:id/comments`

**Headers:**
```
Authorization: Bearer <token>
```

**Body:**
```
{ 
  "content": "Comment content" 
}
```
**Returns:** New comment data.

---

## Response Format

### Success Response
```
{
  "message": "Success message",
  "data": { ... }
}
```

### Error Response
```
{
  "message": "Error description",
  "error": "Detailed error information"
}
```

---

## Status Codes

| Code | Meaning               |
|------|-----------------------|
| 200  | Success               |
| 201  | Created               |
| 400  | Bad Request           |
| 401  | Unauthorized          |
| 403  | Forbidden             |
| 404  | Not Found             |
| 500  | Internal Server Error |
```
