import { useState, useEffect } from "react"

const Settings = () => {

  // Load initial profile from localStorage or fallback to dummy data
  const initialProfile = JSON.parse(localStorage.getItem("adminProfile")) || {
    name: "Admin User",
    email: "admin@university.edu",
    role: "Administrator",
  }

  const [profileData, setProfileData] = useState(initialProfile)
  const [isEditing, setIsEditing] = useState(false)

  // Save profile to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("adminProfile", JSON.stringify(profileData))
  }, [profileData])


  // handle profile change
  const handleProfileChange = (e) => {
    const { name, value } = e.target
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }


  // handle form of profile update
  const handleProfileUpdate = (e) => {
    e.preventDefault()
    setIsEditing(false)
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admin Settings</h1>

      {/* Profile Settings */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Profile Information</h2>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
          >
            {isEditing ? "Cancel" : "Edit"}
          </button>
        </div>

        {isEditing ? (
          <form onSubmit={handleProfileUpdate} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={profileData.name}
                onChange={handleProfileChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={profileData.email}
                onChange={handleProfileChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-600 hover:bg-gray-200 dark:hover:bg-gray-500 rounded-md transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md transition-colors duration-200"
              >
                Save Changes
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Name</label>
              <p className="text-gray-900 dark:text-white">{profileData.name}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Email</label>
              <p className="text-gray-900 dark:text-white">{profileData.email}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Role</label>
              <p className="text-gray-900 dark:text-white">{profileData.role}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Settings
