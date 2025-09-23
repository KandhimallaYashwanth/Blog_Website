
## 📚 API Documentation

### Authentication Endpoints

| Endpoint             | Method | Description                 | Request Body / Params            | Auth Required | Example Request                                                                | Example Response                                                                                                                                      |
| -------------------- | ------ | --------------------------- | -------------------------------- | ------------- | ------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/api/auth/register` | POST   | Register a new user account | `{ name, email, password }`      | No            | `{ "name": "John Doe", "email": "john@example.com", "password": "secret123" }` | `{ "message": "User registered successfully", "data": { "id": "uuid", "name": "John Doe", "email": "john@example.com", "token": "jwt_token_here" } }` |
| `/api/auth/login`    | POST   | Login with email/password   | `{ email, password }`            | No            | `{ "email": "john@example.com", "password": "secret123" }`                     | `{ "message": "Login successful", "data": { "id": "uuid", "name": "John Doe", "email": "john@example.com", "token": "jwt_token_here" } }`             |
| `/api/auth/google`   | POST   | Login with Google OAuth     | `{ id_token }`                   | No            | `{ "id_token": "google_id_token_here" }`                                       | `{ "message": "Login successful", "data": { "id": "uuid", "name": "John Doe", "email": "john@example.com", "token": "jwt_token_here" } }`             |
| `/api/auth/profile`  | GET    | Get current user profile    | —                                | Yes           | Header: `Authorization: Bearer <token>`                                        | `{ "message": "Profile fetched", "data": { "id": "uuid", "name": "John Doe", "email": "john@example.com", "bio": "", "profile_picture": "" } }`       |
| `/api/auth/profile`  | PUT    | Update current user profile | `{ name, bio, profile_picture }` | Yes           | `{ "name": "John Doe", "bio": "Developer", "profile_picture": "https://..." }` | `{ "message": "Profile updated", "data": { "id": "uuid", "name": "John Doe", "bio": "Developer", "profile_picture": "https://..." } }`                |
| `/api/auth/logout`   | POST   | Logout the current user     | —                                | Yes           | Header: `Authorization: Bearer <token>`                                        | `{ "message": "Logout successful", "data": {} }`                                                                                                      |


### Posts Endpoints


| Endpoint                  | Method | Description                                                                    | Request Body / Params             | Auth Required | Example Request                                                                                | Example Response                                                                                                                                                                                                                                                                                  |
| ------------------------- | ------ | ------------------------------------------------------------------------------ | --------------------------------- | ------------- | ---------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/api/posts/`             | GET    | Get all posts. Optional token includes user-specific info (liked posts, etc.)  | —                                 | Optional      | —                                                                                              | `{ "message": "Posts fetched", "data": [ { "id": "uuid", "title": "My Post", "author": { "id": "uuid", "name": "John Doe" }, "likes": 5, "comments": 2 } ] }`                                                                                                                                     |
| `/api/posts/:id`          | GET    | Get a single post by ID. Increments view count                                 | URL param: `id`                   | Optional      | —                                                                                              | `{ "message": "Post fetched", "data": { "id": "uuid", "title": "My Post", "content": "Content here", "tags": ["tag1"], "author": { "id": "uuid", "name": "John Doe" }, "likes": 5, "comments": [ { "id": "uuid", "content": "Nice post!", "author": { "id": "uuid", "name": "Jane Doe" } } ] } }` |
| `/api/posts/user/:userId` | GET    | Get all posts by a specific user                                               | URL param: `userId`               | Yes           | Header: `Authorization: Bearer <token>`                                                        | `{ "message": "User posts fetched", "data": [ { "id": "uuid", "title": "My Post" } ] }`                                                                                                                                                                                                           |
| `/api/posts/`             | POST   | Create a new post                                                              | `{ title, content, tags, image }` | Yes           | `{ "title": "New Post", "content": "Content here", "tags": ["tech"], "image": "https://..." }` | `{ "message": "Post created", "data": { "id": "uuid", "title": "New Post" } }`                                                                                                                                                                                                                    |
| `/api/posts/:id`          | PUT    | Update an existing post                                                        | `{ title, content, tags, image }` | Yes           | `{ "title": "Updated Post", "content": "Updated content" }`                                    | `{ "message": "Post updated", "data": { "id": "uuid", "title": "Updated Post" } }`                                                                                                                                                                                                                |
| `/api/posts/:id`          | DELETE | Delete a post                                                                  | URL param: `id`                   | Yes           | Header: `Authorization: Bearer <token>`                                                        | `{ "message": "Post deleted", "data": {} }`                                                                                                                                                                                                                                                       |
| `/api/posts/:id/like`     | POST   | Like or unlike a post. Returns updated like count                              | URL param: `id`                   | Yes           | Header: `Authorization: Bearer <token>`                                                        | `{ "message": "Post liked/unliked", "data": { "id": "uuid", "likes": 6 } }`                                                                                                                                                                                                                       |
| `/api/posts/:id/comment`  | POST   | Add a comment to a post                                                        | `{ content }`                     | Yes           | `{ "content": "Great post!" }`                                                                 | `{ "message": "Comment added", "data": { "id": "uuid", "content": "Great post!", "author": { "id": "uuid", "name": "John Doe" } } }`                                                                                                                                                              |
| `/api/posts/upload`       | POST   | Upload an image for a post. Max size: 5MB. Allowed types: jpeg, png, gif, webp | Form-data: `image`                | Yes           | Form-data with `image` field                                                                   | `{ "message": "Image uploaded", "data": { "url": "https://..." } }`                                                                                                                                                                                                                               |

### Response Format

All API responses follow this format:

**Success Response:**
```json
{
  "message": "Success message",
  "data": { ... }
}
```

**Error Response:**
```json
{
  "message": "Error description",
  "error": "Detailed error information"
}
```

### Status Codes

| Code | Meaning               |
| ---- | --------------------- |
| 200  | Success               |
| 201  | Created               |
| 400  | Bad Request           |
| 401  | Unauthorized          |
| 403  | Forbidden             |
| 404  | Not Found             |
| 500  | Internal Server Error |

