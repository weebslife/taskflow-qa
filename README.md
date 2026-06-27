# TaskFlow QA Playground

A task management web application built with Next.js, React, TypeScript, and Tailwind CSS. This application is specifically designed as a **QA Manual testing practice and portfolio building tool**.

## 🎯 Project Purpose

TaskFlow QA Playground is intentionally created with **hidden bugs** to serve as a practical learning environment for:

- **Manual QA Testing** - Practice test execution on a real web application
- **Bug Reporting** - Find and document bugs with proper severity classification
- **Test Case Writing** - Create comprehensive test scenarios and test cases
- **QA Portfolio Building** - Build a portfolio of QA documentation

## 🚀 Tech Stack

- **Next.js** (App Router) - React framework
- **React** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Font Awesome** - Icons
- **LocalStorage** - Client-side data persistence

## 📋 Prerequisites

- Node.js 18.x or later
- npm 9.x or later

## 🛠️ Installation

```bash
# Clone the repository
git clone <repository-url>
cd qa-app-porto

# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔑 Dummy Account

| Field    | Value              |
|----------|--------------------|
| Email    | qauser@mail.com    |
| Password | password123        |

## 📁 Project Structure

```
src/
  app/              # Next.js App Router pages
    login/          # Login page
    dashboard/      # Dashboard and Tasks pages
    profile/        # Profile page
  core/             # Business logic layer
    entities/       # Domain entities (Task, User)
    usecases/       # Business logic (AuthUseCase, TaskUseCase)
    repositories/   # Repository interfaces
  infrastructure/   # External implementations
    storage/        # LocalStorage manager
    repositories/   # Repository implementations
  presentation/     # UI layer
    components/     # Reusable UI components
    layouts/        # Layout components
    hooks/          # Custom hooks
  shared/           # Shared utilities
    constants/      # Application constants
    utils/          # Helper functions
    types/          # TypeScript type definitions
```

## 🧪 Features

- **Login** - Authentication with email and password
- **Dashboard** - Task overview with statistics
- **Task Management** - Create, edit, delete, search, filter, and paginate tasks
- **Profile** - User profile with task statistics

## 📄 Documentation for QA Practice

This project includes documentation files to guide your QA practice:

- **REQUIREMENTS.md** - Feature requirements and acceptance criteria
- **QA_SEED_BUGS.md** - List of intentionally planted bugs (for mentors/developers)
- **QA_PORTFOLIO_GUIDE.md** - Guide for building QA portfolio

## 🎨 Design Notes

- Cream-based color scheme with colorful accents
- WCAG compliant with clear contrast ratios
- Responsive design for desktop and mobile
- Accessible with keyboard navigation and screen reader support

## 📝 License

This project is for educational and portfolio purposes.
