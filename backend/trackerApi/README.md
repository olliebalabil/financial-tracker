# Node.js Authentication App

This is a simple Node.js application for user authentication with three main routes: `login`, `register`, and `showId`.

## Setup

1. Clone the repository.
   ```sh
   git clone <repository-url>
   ```
2. **Navigate to the project directory:**
   ```sh
   cd authentication
   ```
3. **Install dependencies:**
   ```sh
   npm install
   ```
4. **Configure environment variables:**
   Create a `.env` file in the root directory and add the following variables:
   ```env
   PORT=3000
   DB_URL=<your-database-uri>
   ```
   Replace `<your-database-uri>` with the URL of your SQL database.
5. **Start the server:**
   ```sh
   npm run dev
   ```

## Routes

### Login
- **URL:** `/users/login`
- **Method:** `POST`
- **Request Body:**
  - `username`: User's username
  - `password`: User's password

### Register
- **URL:** `users//register`
- **Method:** `POST`
- **Request Body:**
  - `username`: User's desired username
  - `password`: User's desired password


### ShowId
- **URL:** `/users/showId`
- **Method:** `GET`
- **Request Body:**
  - `token`: User's token (given on login)
