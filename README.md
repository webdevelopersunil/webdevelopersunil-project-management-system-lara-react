# ONGC Request Management System (RMS)

## Overview
The Request Management System (RMS) is a comprehensive platform designed to streamline portal development requests, resource allocation, and project tracking within ONGC. This system facilitates efficient communication between requestors, project managers, and developers while maintaining high security and compliance standards.

## Key Features
* **Role-Based Access Control:** Distinct roles and permissions for Admin, Project Manager, Developer, and Requestor.
* **Workflow Automation:** Complete lifecycle tracking from request submission, review & approval, developer assignment, to deployment.
* **LDAP Integration:** Seamless enterprise login utilizing LdapRecord alongside local database fallback authentication.
* **Document Management:** Secure file uploads and tracking for portal requirements and project deliverables.
* **Interactive Dashboards:** Real-time metrics on portals, requests, system health, and developer workload.
* **Collaborator Management:** Assign developers to specific portal projects with ease.

## Technology Stack
### Backend
* **Framework:** [Laravel](https://laravel.com/) (PHP)
* **Authentication:** [Laravel Fortify](https://laravel.com/docs/fortify) & [LdapRecord](https://ldaprecord.com/)
* **Roles & Permissions:** [Spatie Laravel Permission](https://spatie.be/docs/laravel-permission)
* **Database:** Configurable (MySQL, MariaDB, PostgreSQL, or SQLite)

### Frontend
* **Framework:** [React.js](https://reactjs.org/)
* **Language:** [TypeScript](https://www.typescriptlang.org/)
* **Routing/Bridging:** [Inertia.js](https://inertiajs.com/) (Server-Side Rendering supported)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **Icons:** [Lucide React](https://lucide.dev/)

## Requirements
* PHP 8.2 or higher
* Node.js (v18+) & NPM
* Composer
* Supported Database (MySQL/MariaDB/SQLite/Postgres)
* LDAP server access (optional, for enterprise auth)

## Installation Guide

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd request.ongc.co.in
   ```

2. **Install Backend Dependencies**
   ```bash
   composer install
   ```

3. **Install Frontend Dependencies**
   ```bash
   npm install
   ```

4. **Environment Setup**
   Copy the example environment file and configure your local settings (Database, LDAP configuration, Mail, etc.).
   ```bash
   cp .env.example .env
   ```

5. **Generate Application Key**
   ```bash
   php artisan key:generate
   ```

6. **Database Migration and Seeding**
   Run the migrations and seeders to create the necessary tables, default Spatie roles, and initial users.
   ```bash
   php artisan migrate --seed
   ```
   *(Note: The default seeder creates standard roles: admin, developer, project-manager, and requestor, along with default testing accounts).*

7. **Compile Frontend Assets**
   ```bash
   npm run dev
   # or compile for production:
   # npm run build
   ```

8. **Serve the Application**
   If you are not using Laravel Herd or Laravel Valet, you can serve the application using the built-in PHP server:
   ```bash
   php artisan serve
   ```
   Visit `http://localhost:8000` in your browser.