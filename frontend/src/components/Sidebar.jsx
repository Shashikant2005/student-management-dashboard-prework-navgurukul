
const Sidebar = ({ currentPage, setCurrentPage, sidebarOpen, setSidebarOpen }) => {
  
   // data to show in sidebar
  const menuItems = [
    { id: "dashboard", name: "Dashboard", icon: "📊" },
    { id: "students", name: "Students", icon: "👥" },
    { id: "courses", name: "Courses", icon: "📚" },
    { id: "settings", name: "Settings", icon: "⚙️" },
  ]

  return (
    <>
      {/*  Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-20 bg-white bg-opacity-50 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed inset-y-0 left-0 z-30 w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static lg:inset-0
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        <div className="flex items-center justify-center h-16 bg-indigo-600 dark:bg-indigo-700">
          <h1 className="text-xl font-bold text-white">Student Portal</h1>
        </div>

        <nav className="mt-8">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setCurrentPage(item.id)
                setSidebarOpen(false) // Close sidebar on mobile after selection
              }}
              className={`
                w-full flex items-center px-6 py-3 text-left transition-colors duration-200
                ${
                  currentPage === item.id
                    ? "bg-indigo-50 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 border-r-4 border-indigo-600"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                }
              `}
            >
              <span className="mr-3 text-lg">{item.icon}</span>
              <span className="font-medium">{item.name}</span>
            </button>
          ))}
        </nav>
      </div>
    </>
  )
}

export default Sidebar
