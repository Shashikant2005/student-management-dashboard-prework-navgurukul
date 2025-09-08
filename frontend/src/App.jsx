
import { useState, useEffect } from "react"
import Sidebar from "./components/Sidebar.jsx"
import Topbar from "./components/Topbar.jsx"
import DashboardCards from "./components/DashboardCards.jsx"
import StudentTable from "./components/StudentTable.jsx"
import CourseTable from "./components/CourseTable.jsx"
import TeacherTable from "./components/TeacherTable.jsx"
import Settings from "./components/Settings.jsx"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  const [currentPage, setCurrentPage] = useState("dashboard")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(false)



  // Render current page content
  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <DashboardCards />
      case "students":
        return <StudentTable />
      case "courses":
        return <CourseTable />
      // case "teachers":
      //   return <TeacherTable />
      case "settings":
        return <Settings  />
      default:
        return <DashboardCards />
    }
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* <ToastContainer/> */}
      {/* Sidebar */}
      <Sidebar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <Topbar setSidebarOpen={setSidebarOpen} />

        {/* Page content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 dark:bg-gray-900 p-6">{renderPage()}</main>
      </div>
    </div>
  )
}

export default App
