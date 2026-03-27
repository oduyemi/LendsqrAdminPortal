# Lendsqr Admin Portal 

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

**Lendsqr Dashboard** is a modern, responsive React/TypeScript dashboard for managing users, authentication, and application state. It includes a fully-featured user management system with filtering, detail views, authentication, and persistent state management with **Zustand**.

This project is built using **React 19, TypeScript, Vite, Zustand, and Jest for testing**.

---

## **Table of Contents**

1. [Features](#features)
2. [Tech Stack](#tech-stack)
3. [Getting Started](#getting-started)
4. [Running Tests](#running-tests)
5. [Testing Strategy](#testing-strategy)
6. [Components Overview](#components-overview)
7. [Contributing](#contributing)
8. [License](#license)

---

## **Features**

* Responsive dashboard layout with collapsible sidebar.
* User management: listing, filtering, and detailed views.
* Login authentication with persistent storage (`Zustand + localStorage`).
* Positive and negative scenario unit testing for components, services, and store.
* Mocked API service for rapid development and testing.

---

## **Tech Stack**

* **Frontend:** React 19, TypeScript, Vite, Bootstrap, Framer Motion
* **State Management:** Zustand (with persistence)
* **Routing:** React Router DOM v7
* **Icons:** Lucide React
* **Testing:** Jest, React Testing Library, @testing-library/user-event
* **Linting:** ESLint, @typescript-eslint

---

## **Getting Started**

### **Prerequisites**

* Node.js >= 20.x
* Yarn >= 1.22.x

### **Install Dependencies**

```bash
yarn install
```

### **Run Development Server**

```bash
yarn dev
```

Open [http://localhost:5173](http://localhost:5173) to view in browser.

### **Build**

```bash
yarn build
```

---

## **Running Tests**

* Unit tests are powered by **Jest** and **React Testing Library**.
* Run all tests in watch mode:

```bash
yarn test
```

* Run tests once:

```bash
yarn test --ci
```

> All components, services, and Zustand stores include **positive and negative scenario tests** to ensure robust coverage.

---

## **Testing Strategy**

1. **Component Tests**

   * **LoginForm:** checks input validation, successful login, and failed login.
   * **Users Page:** validates API data rendering, filtering, and localStorage behavior.
   * **UserDetails:** ensures correct user details load from localStorage, and skeleton displays if missing.

2. **Service Tests**

   * `getUsers` and `getUserById` tested for:

     * Correct pagination and filtering (positive)
     * Not found or empty responses (negative)

3. **State Management Tests**

   * Zustand auth store tested for:

     * Login, logout, setting email/password (positive)
     * Persistence in localStorage (negative/edge cases)

4. **Mocking**

   * API calls are mocked using Jest.
   * localStorage is mocked to simulate persistence.

---

## **Components Overview**

### **LoginForm**

* Handles email/password input.
* Validation for empty and incorrect fields.
* Calls `loginUser` API and updates Zustand store.

### **Users Page**

* Fetches users from `getUsers` service.
* Displays table with filters, menu actions, and pagination.
* Stores selected user in localStorage for details view.

### **UserDetails**

* Fetches user from localStorage using `selectedUser`.
* Shows skeleton if no data is available.

---

## **Contributing**

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit changes: `git commit -m 'Add my feature'`
4. Push branch: `git push origin feature/my-feature`
5. Create a Pull Request
