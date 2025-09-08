

const DarkModeToggle = ({ darkMode, toggleDarkMode }) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h3 className="text-sm font-medium text-gray-900 dark:text-white">Dark Mode</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">Toggle between light and dark themes</p>
      </div>
      <button
        onClick={toggleDarkMode}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
          darkMode ? "bg-indigo-600" : "bg-gray-200"
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            darkMode ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  )
}

export default DarkModeToggle
