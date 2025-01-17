`# Business Hero Assignment - Task Manager API

## Project Overview

This repository contains the backend API code for the **Task Manager Application**. It provides functionality to manage user auth and CRUD operations for task management. 

#### Key features include:

- **User Authentication:** Users can register and log-in using JSON Web Tokens (JWT).
- **Task Management:** Create, retrieve, update, and delete tasks with endpoints protected for authenticated users.
- **Tech Used :** Node.js and Express.js.
- **Testing:** All endpoints are tested using Postman.

---

## Setting Up the Project

Follow the steps below to set up the project on your local machine:

1. Clone the repository:
   ```bash
   git clone https://github.com/LandePranav/business_hero
   cd business_hero `

2.  Install dependencies:

    ```bash
       npm install
3.  Create a `.env` file with the following variables:
    ```bash
    PORT = your_port_number
    MONGO_URI = your_mongo_connection_string
    JWT_SECRET = your_jwt_secret_key

4.  Start the server:

    ```bash
    nodemon app.js

 Alternatively, you can use:
   ```bash
    node app.js
   ```

* * * * *

Testing with Postman
--------------------

### Base URLs

-   **Local Base URL:** `http://localhost:5000`
-   **Hosted Base URL:** <https://business-hero.onrender.com>

### Endpoints

#### 1\. Test API

-   **GET: **   `https://business-hero.onrender.com/api/test`\
    Test if the server is running successfully.

#### 2\. Authentication Endpoints

-   **Register User**

    -   **POST: ** `https://business-hero.onrender.com/api/auth/register`\
        **Body (JSON):**

        `{ "username": "xyz", "password": "xyz" }`

-   **Login User**

    -   **POST:** `https://business-hero.onrender.com/api/auth/login`\
        **Body (JSON):**

        `{ "username": "xyz", "password": "xyz" }`

#### 3\. Task Management Endpoints

-   **Create Task**

    -   **POST:** `https://business-hero.onrender.com/api/task`\
        **Body (JSON):**

        `{ "title": "Task Title", "description": "Task Description", "status": "completed" }`

-   **Get All Tasks**

    -   **GET:** `https://business-hero.onrender.com/api/task`\
        Retrieve all tasks for the logged-in user.
-   **Update Task**

    -   **PUT:** `https://business-hero.onrender.com/api/task/<task_id>`\
        **Body (JSON):**

        `{ "title": "Updated Title", "description": "Updated Description", "status": "Updated Status" }`

-   **Delete Task**

    -   **DELETE:** `https://business-hero.onrender.com/api/task/<task_id>`\
        Delete the specified task.

* * * * *

### Note for Local Testing

If you are testing protected task routes locally, you must manually set the request header with the authentication token:

1.  Call the **Login User** endpoint.
2.  Copy the `set-cookie` header value from the response.
3.  Add this header as `cookie: token` when calling any protected task route.

* * * * *
