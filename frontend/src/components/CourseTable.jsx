
import { useEffect, useState } from "react"
import useStudentStore from "../store/studentStore.js"
import CourseFormModal from "./CourseFormModal.jsx"
import axiosInstance from "../../utils/axiosInstance.js"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CourseTable = () => {

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingCourse, setEditingCourse] = useState(null)
  const [courses, setCourses] = useState([])
  const { refreshCourseTable ,setRefreshCourseTable, query,setQuery } = useStudentStore()
  const [allCourses,setAllCourses] = useState([])
  const [deleted,setDeleted] = useState(false)
   

  // Handle edit course
  const handleEdit = (course) => {
    setEditingCourse(course)
    setIsModalOpen(true)
  }

  // Fetch courses from API
  const getCoursesFromAPI = async () => {
    try {
      const featchedcourses = await axiosInstance.get("/courses")
      setCourses(featchedcourses.data)
      setAllCourses(featchedcourses.data)
     
    } catch (error) {
      console.error("Error fetching courses:", error)
      alert("Failed to fetch courses from the server.")
    }
  }

  // filterd data based on search query

   const filtered = courses.filter((course) => {
      if (!query) return true;

      return (
        course.name.toLowerCase().includes(query.toLowerCase()) ||
        course.instructor.toLowerCase().includes(query.toLowerCase()) ||
        course.duration.toLowerCase().includes(query.toLowerCase())
      );
    });

    // initial fetch when component mounts
  useEffect(() => {
    getCoursesFromAPI()
  }, [])


  // refetch when refreshCourseTable changes
   useEffect(() => {
    getCoursesFromAPI()
  }, [refreshCourseTable])

  useEffect(() => {
    getCoursesFromAPI()
  }, [deleted,setDeleted])

  // update allCourses when query or courses change
  useEffect(()=>{
      if(query===''){
        setAllCourses(courses)
      }
      else{
        setAllCourses(filtered)
      }
  },[query])


  // Handle delete course with confirmation
  const handleDelete =async (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
     try{
         const deleted = axiosInstance.delete(`/courses/${id}`)
         //alert("succesfully deleted course")
         toast("Course deleted successfully 🗑️")
          setCourses(courses.filter((course)=>course._id !== id)) 
         setRefreshCourseTable((prev) => !prev)
         setDeleted((prev)=>!prev)

     }
     catch(error){
         alert("something went wrong")
     }
    }
  }

  // Handle add new course
  const handleAddNew = () => {
    setEditingCourse(null)
    setIsModalOpen(true)
  }



  return (
    <div className="space-y-6"> <ToastContainer />
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Courses</h1>
        <button
          onClick={handleAddNew}
          className="bg-teal-500 cursor-pointer hover:bg-teal-600 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
        >
          Add Course
        </button>
      </div>

      {/* Courses table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-gray-700">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Course Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Instructor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Duration
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {allCourses.map((course) => (
                <tr key={course.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">{course.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-600 dark:text-gray-300">{course.instructor}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-200">
                      {course.duration}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button
                      onClick={() => handleEdit(course)}
                      className="text-teal-600 mx-6 cursor-pointer  dark:text-teal-400 hover:text-teal-900 dark:hover:text-teal-300"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(course._id, course.name)}
                      className="text-red-600 cursor-pointer dark:text-red-400 hover:text-red-900 dark:hover:text-red-300"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Course form modal */}
      {isModalOpen && (
        <CourseFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} course={editingCourse} />
      )}
    </div>
  )
}

export default CourseTable
