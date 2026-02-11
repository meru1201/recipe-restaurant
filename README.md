# Asian Food Recipe Management System

A full-stack web application for discovering and sharing authentic Asian recipes. Built with Node.js, Express, and MongoDB.

## Features

- **User Authentication**: Secure registration and login using JWT and bcrypt.
- **Recipe Management**: Create, read, update, and delete (CRUD) recipes.
- **Search & Filter**: Find recipes by keywords, cuisine type, or ingredients.
- **Responsive Design**: distinct mobile and desktop views for optimal user experience.
- **User Profiles**: Manage your personal information and view your shared recipes.
- **Security**: Protected API endpoints and data validation.

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Atlas)
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Authentication**: JSON Web Tokens (JWT)

## Setup Instructions

1.  **Clone the repository**
    ```bash
    git clone <repository-url>
    cd recipe-restaurant-2
    ```

2.  **Install Backend Dependencies**
    ```bash
    cd backend
    npm install
    ```

3.  **Configure Environment Variables**
    Create a `.env` file in the `backend` folder with the following content:
    ```env
    PORT=5000
    MONGO_URI=your_mongodb_atlas_connection_string
    JWT_SECRET=your_secure_jwt_secret
    SMTP_HOST=your_smtp_host
    SMTP_PORT=587
    SMTP_EMAIL=your_email
    SMTP_PASSWORD=your_email_password
    ```

4.  **Start the Server**
    ```bash
    npm start
    ```
    The server will run on `http://localhost:5000`.

5.  **Run the Frontend**
    Open `frontend/index.html` in your browser or use a live server extension.

## API Documentation

### Authentication

-   `POST /api/auth/register`
    -   Body: `{ username, email, password }`
    -   Description: Register a new user.
-   `POST /api/auth/login`
    -   Body: `{ email, password }`
    -   Description: Login and receive a JWT token.

### Users

-   `GET /api/users/profile`
    -   Headers: `Authorization: Bearer <token>`
    -   Description: Get current user profile.
-   `PUT /api/users/profile`
    -   Headers: `Authorization: Bearer <token>`
    -   Body: `{ username, email }`
    -   Description: Update user profile.

### Recipes

-   `GET /api/recipes`
    -   Description: Get all recipes.
-   `GET /api/recipes/my`
    -   Headers: `Authorization: Bearer <token>`
    -   Description: Get recipes created by the logged-in user (Requirement 3).
-   `POST /api/recipes`
    -   Headers: `Authorization: Bearer <token>`
    -   Body: `{ title, description, ingredients, instructions, cuisineType }`
    -   Description: Create a new recipe.
-   `GET /api/recipes/:id`
    -   Description: Get a specific recipe by ID.
-   `PUT /api/recipes/:id`
    -   Headers: `Authorization: Bearer <token>`
    -   Description: Update a recipe (only by author or admin).
-   `DELETE /api/recipes/:id`
    -   Headers: `Authorization: Bearer <token>`
    -   Description: Delete a recipe (only by author or admin).

## Folder Structure

```
.
├── backend
│   ├── config          # Database configuration
│   ├── controllers     # Request handlers
│   ├── middleware      # Auth and error handling middleware
│   ├── models          # Mongoose models (User, Recipe)
│   ├── routes          # API route definitions
│   └── server.js       # Entry point
└── frontend
    ├── css             # Stylesheets
    ├── js              # Client-side logic
    └── *.html          # HTML pages
```
