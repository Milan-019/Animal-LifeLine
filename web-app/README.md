# Animal Lifeline - MERN Stack App

This is the converted MERN stack version of the Animal Lifeline application.

## Prerequisites
- [Node.js](https://nodejs.org/) installed.
- [MongoDB](https://www.mongodb.com/try/download/community) installed and running locally.

## Project Structure
- `server/`: Backend API (Express + MongoDB)
- `client/`: Frontend App (React + Vite)

## How to Run

### 1. Start the Database
Ensure your local MongoDB service is running. 
Default URI: `mongodb://localhost:27017/TheAnimalLifeline`

### 2. Start the Backend Server
Open a terminal and run:
```bash
cd server
npm install  # Install dependencies
npm run dev
```
The server will start on **http://localhost:5000**.

### 3. Start the Frontend Client
Open a **new** terminal and run:
```bash
cd client
npm install  # Install dependencies
npm run dev
```
The client will start on **http://localhost:5173**.

## Testing the Application

1.  **Register a User**:
    -   Go to `http://localhost:5173/register`
    -   Create an account.
    -   You will be redirected to Login (email check is simulated).

2.  **Login**:
    -   Use your new credentials to log in.

3.  **Report an Animal**:
    -   Click "Report Animal" in the nav.
    -   Fill in the details (Title, Location, Description).
    -   (Optional) Upload an image.
    -   Submit and see it appear on the Home page.

4.  **Admin Dashboard**:
    -   **Note**: To test Admin features, you need to manually change your user role to 'Admin' in the database or use the provided simulated Admin flow if available.
    -   Since we don't have a direct "Make Admin" button, you can use a MongoDB tool (like Compass) to update your user document: properties `role: "Admin"`.
    -   Once Admin, go to `/admin` to view stats and manage users.

## API Endpoints
-   `POST /api/users/register`
-   `POST /api/users/login`
-   `GET /api/reports`
-   `POST /api/reports`
