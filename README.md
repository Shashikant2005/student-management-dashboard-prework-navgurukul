 🎓 Student Management Dashboard

A responsive Student Management Dashboard built using React (Vite) + Tailwind CSS + Zustand + chart.js

This project allows adding, editing, and viewing Students, Courses with a clean UI.  

The app connects to a **self-hosted backend** for storing and retrieving data.

Backend server URL =  https://student-dash-backend.onrender.com

Live Link : https://student-management-dashboard-lime.vercel.app/
---

## 🚀 Features

### 📌 General
- Responsive layout (Sidebar + Topbar + Searchbar + Main Content)
- Fixed Sidebar, Searchbar , Navbar
- Mobile-friendly design (Tailwind responsive utilities only)

### 📊 Dashboard
- Summary cards with dummy counts:
  - Total Students
  - Total Courses
  - Graphs for visualizing data

### 👩‍🎓 Students
- Table with:
  - Profile Image, Full Name, Email, Enrolled Course, Actions
- Add/Edit student using modal form:
- First, Middle, Last Name
- Email (validated)
- Course (dropdown)
- Profile image upload + preview
- Delete student with confirmation
- Search Students by name, email, or course.
- Export Students data as CSV.

### 📚 Courses
- Table with:
  - Course Name, Instructor, Duration, Actions
- Add/Edit courses with modal form
- Search courses by name, email, or course.
- Export courses data as CSV.


### Admin Settings

- Shows dummy admin details (Name, Email, Role).  
- Allows editing and updating profile information.  
- Changes are saved in **localStorage** for persistence.  
- Toggle between view and edit modes with Cancel/Save options.  


---

## 🛠️ Tech Stack

- **React (Vite)** – Frontend framework
- **Tailwind CSS** – Utility-first styling
- **Zustand** – State management with persistence
- **Chart.js** – For visualizing data
 
---

## ⚡ Performance Optimizations

This project uses React’s built-in optimization techniques to improve rendering performance:

- **React.memo** → Prevents unnecessary re-renders of pure functional components (e.g., tables, cards).

- **useCallback** → Memoizes callback functions so they don’t get re-created on every render (e.g., edit, delete, search handlers).

- **useMemo** → Caches expensive computations (e.g., filtering/searching students and courses) for faster UI updates.

---

## 📂 Folder Structure

 student-management-dashboard/
 ├──frontend/
    ├── public/
    │   ├── favicon.ico
    │   └── index.html
    ├── src/
    │   ├── assets/
    │   ├── components/
    │   │   ├── common/
    │   │   ├── dashboard/
    │   │   ├── students/
    │   │   ├── courses/
    │   │   └── settings/
    │   │   
    │   ├── store/
    │   ├── utils/
    │   ├── App.jsx
    │   ├── App.css
    │   ├── index.css
    │   └── main.jsx
    ├── package.json
    ├── README.md
    └── vite.config.js



## 🚀 Getting Started

 1> git clone https://github.com/Shashikant2005/student-management-dashboard

 2> cd frontend

 3> Install dependencies:  npm install

 4> Run the frontend : npm run dev
