# Client Management System

## Setup and Running the Application

Follow these steps to set up and run the Client Management System on your local machine.

### Prerequisites

- Node.js (v14 or later)
- npm (usually comes with Node.js)
- Git

### Step 1: Clone the Repository

1. Open a terminal or command prompt.
2. URL to git repository will be provided in email
3. Run the following command to clone the repository:
   ```
   git clone https://github.com/dshields17/CodingChallenge-ClientManager.git
   cd client-management-system
   ```

### Step 2: Install Dependencies

1. Install root dependencies:
   ```
   npm install
   ```
2. Install backend dependencies:
   ```
   cd backend
   npm install
   ```
3. Install frontend dependencies:
   ```
   cd ../frontend
   npm install
   ```
4. Return to the root directory:
   ```
   cd ..
   ```

### Step 3: Start the Application

1. From the root directory, start both the backend and frontend concurrently:
   ```
   npm start
   ```

### Step 4: Access the Application

1. Open your web browser and navigate to `http://localhost:3000` to access the frontend.
2. The backend API will be running on `http://localhost:3001`.

## Additional Information

- The backend uses SQLite as the database, so no additional database setup is required.
- The `npm start` command in the root directory uses `concurrently` to start both the backend and frontend servers.
- If you need to run the backend or frontend independently:
  - For backend: In the `backend` directory, run `npm start`
  - For frontend: In the `frontend` directory, run `npm start`

## Troubleshooting

If you encounter any issues:
1. Ensure all dependencies are correctly installed.
2. Check that the required ports (3000 for frontend, 3001 for backend) are not in use.
3. If database issues occur, try deleting the `database.sqlite` file in the `backend` directory and rerun the setup command.

For any other problems, please open an issue on the GitHub repository.
