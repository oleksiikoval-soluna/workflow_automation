# Workflow Automation Tool with Next.js and Django Backend

This project is a web-based workflow automation tool designed to streamline client ticketing for new requests or issues. It allows clients to input their data and requests, automates tasks in project management tools, and syncs information across different platforms.

## Table of Contents
- [Workflow Automation Tool with Next.js and Django Backend](#workflow-automation-tool-with-nextjs-and-django-backend)
  - [Table of Contents](#table-of-contents)
  - [Technology Used and How It Works](#technology-used-and-how-it-works)
    - [\> Technology Stack :](#-technology-stack-)
      - [1. **Django**](#1-django)
      - [2. **Next.js**](#2-nextjs)
      - [3. **Zapier**](#3-zapier)
      - [4. **Monday.com**](#4-mondaycom)
      - [5. **PostgreSQL**](#5-postgresql)
      - [6. **Render**](#6-render)
      - [7. **Vercel**](#7-vercel)
    - [\> How It Works :](#-how-it-works-)
  - [Resources](#resources)
  - [Installation and Environment Setup](#installation-and-environment-setup)
    - [Prerequisites](#prerequisites)
    - [Steps](#steps)
      - [1. Clone the repository:](#1-clone-the-repository)
      - [2. Set up the backend:](#2-set-up-the-backend)
      - [3. Set up the frontend:](#3-set-up-the-frontend)
  - [API endpoints in Django](#api-endpoints-in-django)
    - [Available Endpoints:](#available-endpoints)
  - [Assumtions](#assumtions)
    - [Frontend and Backend Separation:](#frontend-and-backend-separation)
    - [Workflow Automation:](#workflow-automation)
    - [Database:](#database)
    - [Deployment:](#deployment)
  - [Contact](#contact)


## Technology Used and How It Works

### > Technology Stack :

#### 1. **Django**
   - **Role**: Backend Framework
   - **Description**: Django is used to build the RESTful API that handles data processing, authentication, and storage. It provides a robust and scalable foundation for the backend.
   - **How It Works**:
     - Django receives client data from the frontend via API requests.
     - It processes the data, performs validations, and stores it in the PostgreSQL database.
     - Django also integrates with Zapier to trigger workflow automation.

#### 2. **Next.js**
   - **Role**: Frontend Framework
   - **Description**: Next.js is used to build a responsive and dynamic web application that allows clients to submit their requests and view responses.
   - **How It Works**:
     - The frontend communicates with the Django backend via REST API.
     - It provides a user-friendly interface for clients to input their data and view the status of their requests.

#### 3. **Zapier**
   - **Role**: Workflow Automation
   - **Description**: Zapier is used to automate tasks between the web application and project management tools like Monday.com.
   - **How It Works**:
     - When a client submits a request, Zapier triggers an automation to create a new task in Monday.com.
     - It also sends email notifications to the relevant team members and updates the client once the request is resolved.

#### 4. **Monday.com**
   - **Role**: Project Management Tool
   - **Description**: Monday.com is used to manage and track client requests as tasks.
   - **How It Works**:
     - Tasks are automatically created in Monday.com when a client submits a request.
     - Team members can update the status of tasks, and the client is notified via email once the task is resolved.

#### 5. **PostgreSQL**
   - **Role**: Database
   - **Description**: PostgreSQL is used as the primary database to store client data and request details.
   - **How It Works**:
     - All client data and request information are securely stored in PostgreSQL.
     - The Django backend interacts with PostgreSQL to retrieve and update data as needed.

#### 6. **Render**
   - **Role**: Backend Deployment
   - **Description**: Render is used to deploy the Django backend.
   - **How It Works**:
     - The Django application is hosted on Render, providing a scalable and reliable backend service.
     - Render automatically handles environment variables, database connections, and deployment pipelines.

#### 7. **Vercel**
   - **Role**: Frontend Deployment
   - **Description**: Vercel is used to deploy the Next.js frontend.
   - **How It Works**:
     - The Next.js application is hosted on Vercel, ensuring fast and efficient delivery of the frontend to users.
     - Vercel provides automatic builds and deployments whenever changes are pushed to the repository.


### > How It Works :
1. **Client Submits a Request**:
   - The client fills out a form on the Next.js frontend and submits their request.
   - The data is sent to the Django backend via an API request.

2. **Backend Processes the Request**:
   - Django validates the data and stores it in the PostgreSQL database.
   - Zapier is triggered to create a new task in Monday.com and send email notifications to the team.

3. **Team Handles the Request**:
   - The team updates the task status in Monday.com as they work on the request.
   - Once the request is resolved, Zapier sends an email notification to the client.

4. **Client Receives Updates**:
   - The client can view the status of their request on the frontend.
   - They receive an email notification once their request is resolved.


<br>

## Resources
> Deployment Link
  ```bash
    https://workflow-automation-carbonethics.vercel.app/
  ```
<br>

> Demo Videos URL
  ```bash
    https://drive.google.com/drive/folders/1wKAo7Hn8MdqlWhaW2RCxi6Ct1-59MS0A?usp=sharing
  ```
<br>

> Github Repository
  ```bash
    https://github.com/arvinaufal/workflow-automation-carbonethics
  ```




<br>

## Installation and Environment Setup

### Prerequisites
- Python 3.x
- Node.js and npm
- PostgreSQL
- Git

### Steps
#### 1. Clone the repository:
  + Clone the github repository
    ```bash
    git clone https://github.com/arvinaufal/workflow-automation-carbonethics.git
    ```
  + Move to the project folder
    ```bash
    cd workflow-automation-carbonethics
    ```

#### 2. Set up the backend:
  + Move to the backend project folder from your root project folder
    ```bash
      cd backend
    ```

  + Install the required packages
    ```bash
      pip install -r requirements.txt
    ```
  + In the backend project folder, add a `.env` file with the following content:
    ```env
      ZAPIER_WEBHOOK_URL=YOUR ZAPIER WEBHOOK URL
      DATABASE_URL=YOUR DATABASE URL
      DEBUG=True
    ```

  + Create the database on your local computer or live database

  + Create a virtual environment
    ```bash
      python -m venv venv
    ```

  + Run the virtual environment
    ```bash
      source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
    ```
  
  + Run the migration
    ```bash
      pip install -r requirements.txt
    ```

  + Run the development server
    ```bash
      python manage.py runserver
    ```

#### 3. Set up the frontend:
  + Move to the frontend project folder from your root project folder
    ```bash
      cd frontend
    ```
  + Install the required packages
    ```bash
    npm install
    ```

  + In the frontend project folder, add a `.env` file with the following content:
    ```bash
      NEXT_PUBLIC_API_URL=YOUR API URL
    ```

  + Run the development project
    ```bash
      npm run dev
    ```

## API endpoints in Django
### Available Endpoints:

 + GET /api/tickets/ - List all tickets.

 + POST /api/tickets/ - Create a new ticket.

 + GET /api/tickets/{id}/ - Retrieve a specific ticket.

 + PUT/PATCH /api/tickets/{id}/ - Update a specific ticket.

 + DELETE /api/tickets/{id}/ - Delete a specific ticket.

## Assumtions
### Frontend and Backend Separation:

 + The frontend (Next.js) and backend (Django) are developed and deployed separately.

 + Communication between them is handled via REST API.

### Workflow Automation:

 + Zapier is used for workflow automation.

 + Tasks are automatically created in Monday.com when a ticket is submitted.

### Database:

 + PostgreSQL is used for data storage.

 + Local and production environments use separate databases.

### Deployment:

 + The backend is deployed on Render.

 + The frontend is deployed on Vercel.

## Contact

If you have any questions or encounter any problems during the installation, please do not hesitate to contact me on WhatsApp: +625175104250 or on Gmail: happysolarion@gmail.com
