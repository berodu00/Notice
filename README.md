# 📢 Notice Management System (IT 공지 관리 시스템)

> **Enterprise-grade Notice Management System leveraging Spring Boot 3 and React (Vite).**  
> Designed for seamless integration with MS Graph API (Outlook) and multi-channel notifications.

![Project Status](https://img.shields.io/badge/Status-Development-blue)
![Backend](https://img.shields.io/badge/Backend-Spring%20Boot%203.2-green)
![Frontend](https://img.shields.io/badge/Frontend-React%20%2B%20Vite-61DAFB)
![Database](https://img.shields.io/badge/Database-PostgreSQL-336791)

---

## 📖 Overview

The **Notice Management System** is a robust web application designed to modernize corporate IT announcements. It replaces traditional, fragmented email threads with a centralized, tracked, and approved announcement workflow.

### Key Objectives
*   **Systematized Workflow**: Transitions from manual emails to a strict Draft -> Approval -> Dispatch lifecycle.
*   **Outlook Integration**: Automatically books "IT Maintenance" events on corporate calendars via **MS Graph API** (Stubbed/Ready for integration).
*   **Response & Visibility**: Provides real-time status updates (Draft, Pending, Approved, Completed) and prioritized visibility.

---

## 🚀 Features

### 1. Notice Lifecycle Management
*   **Create**: Admin/Managers can create notices with rich details (Title, Content, Severity, Affected Service, Target Audience).
*   **Approval Workflow**: Mandatory approval process. Managers can **Approve** (triggers dispatch) or **Reject** (returns to draft) notices.
*   **Status Tracking**: Real-time status badges (`PENDING`, `APPROVED`, `REJECTED`, `COMPLETED`).

### 2. Modern User Interface
*   **Dashboard**: Card-based grid view of all active notices.
*   **Responsive Design**: Built with React and optimized for Desktop and Mobile web views.
*   **Premium Aesthetics**: Modern UI with hover effects, glassmorphism elements, and clear typographic hierarchy.

### 3. Backend Architecture
*   **REST API**: Fully documented REST endpoints for notice management.
*   **Transactional Integrity**: ACID compliancy for all state changes using Spring `@Transactional`.
*   **Scalable Schema**: Normalized PostgreSQL database design separated into Master, Schedule, and Approval Logs.

---

## 🛠 Tech Stack

### Backend
*   **Language**: Java 17
*   **Framework**: Spring Boot 3.2.0
*   **Build Tool**: Gradle
*   **Database**: PostgreSQL
*   **ORM**: Spring Data JPA (Hibernate)
*   **Library**: Lombok, Validation

### Frontend
*   **Framework**: React 18
*   **Build Tool**: Vite
*   **Styling**: Vanilla CSS (Modular & Global)
*   **Routing**: React Router DOM 6
*   **HTTP Client**: Axios
*   **Icons**: Lucide React

---

## 📂 Project Structure

```bash
notice-system/
├── src/main/java/com/sorin/notice/  # Spring Boot Backend
│   ├── controller/                  # REST Controllers
│   ├── domain/                      # JPA Entities & Enums
│   ├── repository/                  # Data Access Layer
│   └── service/                     # Business Logic
├── frontend/                        # React Frontend
│   ├── src/
│   │   ├── pages/                   # Dashboard, Write, Detail
│   │   ├── components/              # (Future use)
│   │   └── api.js                   # Axios setup
│   └── public/
└── db/                              # Database Scripts (Schema)
```

---

## ⚡ Getting Started

### Prerequisites
*   Java 17+ (JDK)
*   Node.js 18+ & npm
*   PostgreSQL Database (`noticedb`)

### Installation & Run

#### 1. Database Setup
Create a PostgreSQL database named `noticedb`. The application is configured to automatically update the schema (`ddl-auto=update`), but you can manually apply `db/schema.sql` if preferred.

#### 2. Backend (Spring Boot)
```bash
# Windows
./gradlew bootRun

# Linux/Mac
./gradlew bootRun
```
*   Server runs on: `http://localhost:8080`

#### 3. Frontend (React)
```bash
cd frontend
npm install
npm run dev
```
*   Client runs on: `http://localhost:5173`

---

## 📝 API Reference

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/notices` | Retrieve all notices |
| `POST` | `/api/notices/register` | Create a new notice |
| `POST` | `/api/notices/{id}/approve` | Approve/Reject a notice |

---

## 🔮 Future Roadmap (Phase 2)

*   [ ] **MS Graph Production Integration**: Replace `MSGraphServiceStub` with real Azure AD authentication and Graph API calls.
*   [ ] **Batch Scheduling**: Implement `@Scheduled` tasks to batch send emails at 08:30 / 17:30.
*   [ ] **Calendar View**: Add a full-calendar view to the frontend dashboard.
*   [ ] **SSO Integration**: Integrate corporate Single Sign-On.

---

**Developed for Sorin Co. Project**