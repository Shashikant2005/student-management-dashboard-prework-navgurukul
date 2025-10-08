import {  useEffect } from "react"
import axiosInstance from "../../utils/axiosInstance.js"
import useStudentStore from "../store/studentStore.js"
import { useState } from "react"
import DashboardCharts from "./DashboardCharts.jsx"


const DashboardCards = () => {
  
  const [studentsCount, setStudentsCount] = useState(0)
  const [coursesCount, setCoursesCount] = useState(0)
  const [students,setStudents] = useState([])
  const [courses,setCourses] = useState([])
  const {query , setQuery} = useStudentStore()

  // Initial fetch on mount
  useEffect(() => {
    setQuery('')
    getStudentsCount()
    getCoursesCount()
  }, [])


  // Fetch students data from API
  const getStudentsCount = async () => {
    try {
      const response = await axiosInstance.get("/students")
      // Assuming the response contains an array of students
      setStudents(await response.data)
      setStudentsCount(response.data.length)
        
    } catch (error) {
      console.error("Error fetching students:", error)
    }
  }


  // Fetch courses data from API
  const getCoursesCount = async () => {
    try {
      const response = await axiosInstance.get("/courses")
      // Assuming the response contains an array of courses
      setCourses(response.data)
      setCoursesCount(response.data.length)
    } catch (error) {
      console.error("Error fetching courses:", error)
      
    }
  }

  // Card data structure for display in dashboard
  const cards = [
    {
      title: "Total Students",
      count: studentsCount,
      icon: "👥",
      color: "bg-indigo-600",
      textColor: "text-indigo-600",
    },
    {
      title: "Total Courses",
      count: coursesCount,
      icon: "📚",
      color: "bg-teal-500",
      textColor: "text-teal-600",
    },
    // {
    //   title: "Total Teachers",
    //   count: teachers.length,
    //   icon: "👨‍🏫",
    //   color: "bg-amber-500",
    //   textColor: "text-amber-600",
    // },
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>

      {/* Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-red-400 dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{card.title}</p>
                <p className={`text-3xl font-bold ${card.textColor} dark:text-white mt-2`}>{card.count}</p>
              </div>
              <div className={`w-12 h-12 ${card.color} rounded-lg flex items-center justify-center`}>
                <span className="text-2xl">{card.icon}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
       
      
       <DashboardCharts students={students} courses={courses}  />
      
        
      {/* <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Recent Activity</h2>
        <div className="space-y-3">
          <div className="flex items-center space-x-3 text-sm text-gray-600 dark:text-gray-400">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            <span>New student registered: John Doe</span>
            <span className="text-xs">2 hours ago</span>
          </div>
          <div className="flex items-center space-x-3 text-sm text-gray-600 dark:text-gray-400">
            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
            <span>Course updated: Computer Science</span>
            <span className="text-xs">5 hours ago</span>
          </div>
        </div>
      </div> */}

    </div>
  )
}

export default DashboardCards
