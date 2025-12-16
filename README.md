# IT 공지 관리 시스템 (IT Notice Management System)

## 📌 프로젝트 개요
기존 이메일 기반의 비효율적인 IT 공지 업무를 개선하기 위한 **웹 기반 IT 공지 통합 관리 시스템**입니다.
Outlook 일정(MS Graph API)과 연동하여 공지 등록 시 자동으로 캘린더에 반영되며, 메일/메신저/포털 등 다양한 채널로 알림을 발송합니다.

## 🚀 핵심 기능
* **공지 업무 시스템화**: 웹 인터페이스를 통한 공지 등록, 결재(승인/반려), 통합 조회 기능.
* **Outlook 자동 연동**: 승인된 공지는 MS Graph API를 통해 Outlook 'IT 공지일정' 캘린더에 자동 등록.
* **통합 알림**: 이메일, 사내 메신저, 포털, 모바일 앱 등 다채널 알림 지원.
* **사용자 편의성**: SSO 연동을 통한 로그인 없는 접근, 직관적인 대시보드 및 타임라인 뷰 제공.

## 🛠 기술 스택 (Tech Stack)

### Backend
* **Language**: Java
* **Framework**: Spring Boot
* **Database**: PostgreSQL
* **API**: MS Graph API (Outlook Calendar & Mail)

### Frontend
* **Framework**: React (Vite)
* **Styling**: CSS Modules / Vanilla CSS
* **Build Tool**: npm / yarn

## 📂 프로젝트 구조
```
d:\berodu\SORIN\project\Notice
├── src/main/java       # Spring Boot Backend Source
├── frontend/           # React Frontend Source
├── db/                 # Database Scripts
└── ...
```

## ⚙️ 설치 및 실행 (Setup)

### Backend (Spring Boot)
```bash
./gradlew bootRun
```

### Frontend (React)
```bash
cd frontend
npm install
npm run dev
```

## 📝 라이선스
This project is private.