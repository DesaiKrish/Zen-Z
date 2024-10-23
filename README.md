Zen-Z
=====

Zen-Z is a full-stack MERN application designed to provide users with a seamless experience for managing their tasks and profiles. This project uses MongoDB, Express, React, and Node.js to offer a responsive, user-friendly platform for managing user information and authentication.

Features
--------

-   **User Authentication**: Secure sign-up and login functionality with JWT-based token authentication.
-   **Profile Management**: Users can update their personal details, including profile picture uploads.
-   **Responsive Design**: Built with Tailwind CSS to ensure a smooth and responsive interface across all devices.
-   **API Integration**: RESTful API endpoints for user management and data handling.
-   **Multer and Cloudinary**: For handling user profile picture uploads and storing them on Cloudinary.
-   **Password Security**: Secure password storage with hashing and JWT tokens for access management.

Technologies Used
-----------------

### Frontend

-   **React (with TypeScript)**: The frontend is built with React and TypeScript for type safety and better scalability.
-   **Tailwind CSS**: Used for styling and making the UI responsive.

### Backend

-   **Node.js**: Runtime environment to execute JavaScript code on the server.
-   **Express.js**: Framework for building the server and RESTful APIs.
-   **MongoDB**: NoSQL database to store user data.
-   **Mongoose**: For interacting with MongoDB in an organized and efficient way.

### Authentication

-   **JWT**: Used for secure authentication and token-based sessions.

### Other Tools

-   **Multer**: Middleware for handling multipart/form-data, used for uploading files like profile pictures.
-   **Cloudinary**: For storing uploaded profile pictures in the cloud.

Installation and Setup
----------------------

To run this project locally, follow these steps:

### Prerequisites

Make sure you have the following installed:

-   Node.js (v14 or above)
-   MongoDB
-   Git

### Clone the Repository

```bash
git clone https://github.com/DesaiKrish/Zen-Z.git
```


### Install Dependencies

#### Backend

```bash
cd backend
npm install
```

#### Frontend

```bash
cd frontend
npm install
```

### Set up Environment Variables

Create a `.env` file in the root of the `backend` folder with the following variables:

```bash
MONGO_URI=<your_mongo_db_connection_string>
JWT_SECRET=<your_jwt_secret>
CLOUDINARY_CLOUD_NAME=<your_cloudinary_cloud_name>
CLOUDINARY_API_KEY=<your_cloudinary_api_key>
CLOUDINARY_API_SECRET=<your_cloudinary_api_secret>
```

### Running the Application

#### Backend

To start the backend server, run the following command from the `backend` directory:

```bash
npm run dev
```

The backend server will be running on `http://localhost:5000`.

#### Frontend

To start the frontend server, run the following command from the `frontend` directory:

```bash
npm start
```

The frontend will be running on `http://localhost:3000`.

### Test User Credentials

You can create a new user by signing up via the application.

Folder Structure
----------------
```
project   
└───backend
│   │   controllers
│   │   models
|   |   routes
|   |   middleware
|   |   utils
└───frontend
│       │   public
│       │   src
|       |    └───components
└───package.json
└───.gitignore
```

-   **frontend**: Contains the React-based frontend code.
-   **backend**: Contains the Node.js, Express.js, and MongoDB backend code.
-   **models**: Mongoose schemas and models for managing user data.
-   **routes**: API routes for user registration, login, and profile management.
-   **controllers**: Logic for handling API requests.
-   **middleware**: Custom middlewares for authentication and file uploads.

Contributions
-------------

Contributions, issues, and feature requests are welcome! Feel free to check the code section and create an issue if you have any ideas or encounter any bugs.

Developers
-------
- [Krish Desai](https://github.com/DesaiKrish)
- [Jeet Bhuptani](https://github.com/jeetbhuptani)
