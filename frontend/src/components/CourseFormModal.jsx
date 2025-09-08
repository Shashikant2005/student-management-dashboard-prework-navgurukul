import { useState, useEffect } from "react"
import useStudentStore from "../store/studentStore.js"
import axiosInstance from "../../utils/axiosInstance.js"
import FullScreenLoader from "./FullScreenLoader.jsx"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CourseFormModal = ({ isOpen, onClose, course }) => {

const { refreshCourseTable, setRefreshCourseTable } = useStudentStore()
  // separate states
  const [name, setName] = useState("")
  const [instructor, setInstructor] = useState("")
  const [duration, setDuration] = useState("")
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false);

  // Populate form when editing OR reset when adding
  useEffect(() => {
    if (course) {
      setName(course.name || "")
      setInstructor(course.instructor || "")
      setDuration(course.duration || "")
    } else {
      setName("")
      setInstructor("")
      setDuration("")
    }
    setErrors({})
  }, [course, isOpen]) // reset every time modal opens

  // Validation
  const validateForm = () => {
    const newErrors = {}
    if (!name.trim()) newErrors.name = "Course name is required"
    if (!instructor.trim()) newErrors.instructor = "Instructor is required"
    if (!duration.trim()) newErrors.duration = "Duration is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  
  // API call for updating course info
  const updateCourse = async (id, updatedCourse) => {
      setLoading(true);
    try {
      await axiosInstance.put(`/courses/${id}`, updatedCourse)
      setRefreshCourseTable((prev) => !prev) // trigger refresh
      toast("Course updated successfully ✏️")
      setLoading(false);
      onClose()
    } catch (error) {
        toast.error(` error : ${error?.response?.data?.error || "something went wrong"}`);
      setLoading(false);
      onClose()
    }
  }

  // API call for adding new course
  const addCourse = async (newCourse) => {
      setLoading(true);
    try {
      const res = await axiosInstance.post("/courses", newCourse)
      // console.log("hitted")
      // console.log(res.data)
      setRefreshCourseTable((prev) => !prev) // trigger refresh
      toast("Course created successfully 📘")
      setLoading(false);
      onClose()
    } catch (error) {
      // console.error( error?.response?.data?.error || "something went wrong" );
      toast.error(` error : ${error?.response?.data?.error || "something went wrong"}`);
      setLoading(false);
      onClose()
    }
  }

  // Submit handler
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validateForm()) return

    const formData = { name, instructor, duration }

    try {
      if (course) {
        updateCourse(course._id, formData)
       // alert("Course updated successfully!")
      } else {
        addCourse(formData)
        //alert("Course added successfully!")
      }
      
    } catch {
      alert("An error occurred. Please try again.")
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
       <FullScreenLoader loading={loading}/>
      <div className="flex items-center justify-center min-h-screen px-4">
        {/* Gray overlay */}
        <div
          className="fixed inset-0 bg-gray-100 bg-opacity-75"
          onClick={onClose}
        ></div>

        {/* Modal content */}
        <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-md">
          <h3 className="text-lg font-medium mb-4 text-gray-900 dark:text-white">
            {course ? "Edit Course" : "Add Course"}
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Course Name */}
            <div>
              <input
                type="text"
                placeholder="Course Name *"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`w-full border p-2 rounded ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.name && (
                <p className="text-red-600 text-sm">{errors.name}</p>
              )}
            </div>

            {/* Instructor */}
            <div>
              <input
                type="text"
                placeholder="Instructor *"
                value={instructor}
                onChange={(e) => setInstructor(e.target.value)}
                className={`w-full border p-2 rounded ${
                  errors.instructor ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.instructor && (
                <p className="text-red-600 text-sm">{errors.instructor}</p>
              )}
            </div>

            {/* Duration */}
            <div>
              <input
                type="text"
                placeholder="Duration *"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className={`w-full border p-2 rounded ${
                  errors.duration ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.duration && (
                <p className="text-red-600 text-sm">{errors.duration}</p>
              )}
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-200 rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded"
              >
                {course ? "Update Course" : "Add Course"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CourseFormModal
