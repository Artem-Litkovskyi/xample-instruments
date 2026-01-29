# XAMPLE iNSTRUMENTS

A website for a fictional company that develops and sells software for music production and sound design.

[Explore the Live Demo](https://xample-instruments.vercel.app)

## 📖 Project Overview

This is a full-stack e-commerce platform. The project uses a decoupled architecture, featuring a React-based single-page application (SPA) that communicates with a Django REST API.

### Key Features

- **Dynamic Product Catalog**: Browse and explore a variety of software instruments and audio effects.
- **Interactive Product Pages**: Detailed views with interactive screenshot areas (image maps) and audio demos.
- **User Accounts & Orders**: Secure user authentication and a persistent purchase history for all acquired software.
- **Dual Management Interfaces**:
    - **React Admin**: A custom-built frontend interface for managing the home page and specific product details.
    - **Django Admin**: A full-featured backend administration site.
- **Responsive Design**: Optimized for both desktop and mobile devices.

## 🛠 Tech Stack

### Frontend
- **React** with **TypeScript**
- **Vite** for fast development and building
- **React Router** for navigation

### Backend
- **Django**
- **Django REST Framework** (API)
- **WhiteNoise** for static file serving
- **Gunicorn** (production WSGI server)

### Database
- **PostgreSQL** or **SQLite** (configurable)

### Infrastructure
- **Docker & Docker Compose** for containerization
- **Vercel** (for frontend deployment)
- **Render** (for backend deployment)

## 🚀 Getting Started

### Prerequisites

- [Docker](https://docs.docker.com/get-started/get-docker/) and [Docker Compose](https://docs.docker.com/compose/install/) installed on your machine.

### Installation

1. **Clone the repository**

	```bash
	git clone https://github.com/Artem-Litkovskyi/xample-instruments.git
	cd xample-instruments
	```

2. **Start the environment**

	```bash
	docker-compose up
	```

   _The database will be automatically prefilled with demo records._


3. **Access the application**

   - Frontend: [http://localhost:3000/](http://localhost:3000/)
   - Backend API: [http://localhost:8000/api/](http://localhost:8000/api/)

## 👑 Content Management

Manage the application using the following default administrator credentials:

- **Email**: `admin@example.com`
- **Password**: `admin`

### Admin Access Points

- **Frontend Admin (React):** [http://localhost:3000/admin/](http://localhost:3000/admin/) - Use this to edit the home page or delete products.
- **Backend Admin (Django):** [http://localhost:8000/admin/](http://localhost:8000/admin/) - Fully functional admin site created automatically by Django.


## ⚙️ Environment Variables

The following variables can be configured in a .env file at the root of the project to customize the behavior:

| Variable | Description                                                          | Default                               |
| :--- |:---------------------------------------------------------------------|:--------------------------------------|
| `USE_SQLITE` | Set to `1` to use SQLite instead of PostgreSQL                       | `0`                                   |
| `POSTGRES_DB` | PostgreSQL database name                                             | `postgres`                            |
| `POSTGRES_USER` | PostgreSQL user                                                      | `postgres`                            |
| `POSTGRES_PASSWORD` | PostgreSQL password                                                  | `postgres`                            |
| `DJANGO_DEV` | Set to `1` for development mode (debug enabled, HTTPS not required). | `1`                                   |
| `DJANGO_SECRET_KEY` | Django secret key for security                                       | -                                     |
| `DJANGO_ALLOWED_HOSTS` | Comma-separated list of allowed hosts                                | `0.0.0.0,localhost,127.0.0.1,backend` |
| `DJANGO_CSRF_TRUSTED_ORIGINS` | Trusted origins for CSRF protection                                  | `http://localhost:3000`               |
| `DJANGO_CORS_ALLOWED_ORIGINS` | Allowed origins for CORS                                             | `http://localhost:3000`               |
| `DJANGO_SUPERUSER_USERNAME` | Default admin username                                               | `admin`                               |
| `DJANGO_SUPERUSER_EMAIL` | Default admin email                                                  | `admin@example.com`                   |
| `DJANGO_SUPERUSER_PASSWORD` | Default admin password                                               | `admin`                               |
| `VITE_BACKEND_URL` | URL of the backend API for the frontend                              | `http://localhost:8000`               |


## 🎨 Inspiration & Credits

- **Product Concepts**: The software instruments displayed on the website are conceptual remakes or "mashups" of industry-standard plugins from [Native Instruments](https://www.native-instruments.com/), [Xfer Records](https://xferrecords.com/), [Kilohearts](https://kilohearts.com/), [Image-Line](https://www.image-line.com/), [oeksound](https://oeksound.com/) and [Lennar Digital](https://www.lennardigital.com/).

- **UI/UX & Asset Design**: To simulate a professional product line, all screenshots and branding were custom-designed in Figma.
