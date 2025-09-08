import React, { useState, useEffect } from "react"
import useStudentStore from "../store/studentStore.js"
import axiosInstance from "../../utils/axiosInstance.js"
import FullScreenLoader from "./FullScreenLoader.jsx"
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const StudentFormModal = ({ isOpen, onClose, student }) => {

  const { refreshStudentTable, setRefreshStudentTable ,query,setQuery } = useStudentStore()
  const { courses } = useStudentStore()
  const [loading, setLoading] = useState(false);
  
  const [firstName, setFirstName] = useState("")
  const [middleName, setMiddleName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [course, setCourse] = useState("")
  const [profileImage, setProfileImage] = useState(null); // File object
  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({})

  // Populate form when editing OR reset when adding
  useEffect(() => {
    if (student) {
      setFirstName(student.firstname || "")
      setMiddleName(student.middlename || "")
      setLastName(student.lastname || "")
      setEmail(student.email || "")
      setCourse(student.course || "")
      setProfileImage(student.profileImage || "")
      setImagePreview(student.profileImage || "")
    } else {
      setFirstName("")
      setMiddleName("")
      setLastName("")
      setEmail("")
      setCourse("")
      setProfileImage("")
      setImagePreview("")
    }
    setErrors({})
  }, [student, isOpen]) //  reset whenever modal opens

  // Image upload + preview

 const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file); // Save File object for backend

      const reader = new FileReader();
      reader.onload = (ev) => {
        setImagePreview(ev.target.result); // Preview image
      };
      reader.readAsDataURL(file);
    }
  };


  // Validation
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

  const validateForm = () => {
    const newErrors = {}
    if (!firstName.trim()) newErrors.firstName = "First name is required"
    if (!middleName.trim()) newErrors.middleName = "Middle name is required"
    if (!lastName.trim()) newErrors.lastName = "Last name is required"
    if (!email.trim()) newErrors.email = "Email is required"
    else if (!validateEmail(email)) newErrors.email = "Invalid email"
    if (!course) newErrors.course = "Please select a course"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // update student api call 
  const updateStudent = async (id, updatedStudent) => {
      const formData = new FormData();
      formData.append("firstname", firstName);
      formData.append("middlename", middleName);
      formData.append("lastname", lastName);
      formData.append("email", email);
      formData.append("course", course);
      if (profileImage) formData.append("profileImage", profileImage);
      setLoading(true);
    try {
      const res = await axios.put(
        `https://student-dash-backend.onrender.com/api/students/${id}`,
        formData
      );
      setRefreshStudentTable((prev) => !prev) // trigger refresh
      setLoading(false);
      toast("Student details updated successfully ✏️")
      setQuery('')
      onClose()

    } catch (err) {
      setLoading(false);
      onClose()
      toast.error(`${err.response?.data?.error || "something went wrong"}`);
    }
  }

  // add Student app call
    const addStudent = async (studentData) => {
       try {
      const formData = new FormData();
      formData.append("firstname", firstName);
      formData.append("middlename", middleName);
      formData.append("lastname", lastName);
      formData.append("email", email);
      formData.append("course", course);
      if (profileImage) formData.append("profileImage", profileImage);

      setLoading(true);
      const res = await axios.post(
        "https://student-dash-backend.onrender.com/api/students",
        formData
      );
        
      setLoading(false);
      console.log("Student added:", res.data);
      setRefreshStudentTable((prev) => !prev) // trigger refresh
      toast("Student added successfully ✅");
      onClose();
       
      // Reset form
      setFirstName("");
      setMiddleName("");
      setLastName("");
      setEmail("");
      setCourse("");
      setProfileImage(null);
      setImagePreview(null);
      setErrors({});

    } catch (err) {
     // console.error(err.response?.data || err.message);
      setLoading(false);
     // console.log(err.response?.data  );
      toast.error(`${err.response?.data?.error || "something went wrong"}`);
    }
        
  };


  // 
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validateForm()) return

    const studentData = {
      firstname : firstName,
      middlename :middleName,
      lastname :lastName,
      email,
      course,
      profileImage,
    }

    try {
      if (student) {
        updateStudent(student._id, studentData)
      } else {
        addStudent(studentData) 
      }
      //onClose()
    } catch {
      toast.error("An error occurred. Please try again.")
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto"> 
       <FullScreenLoader loading={loading}/>
      <div className="flex items-center justify-center min-h-screen px-4">
        <div
          className="fixed inset-0 bg-gray-100 bg-opacity-75"
          onClick={onClose}
        ></div>

        <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-md">
          <h3 className="text-lg font-medium mb-4 text-gray-900 dark:text-white">
            {student ? "Edit Student" : "Add Student"}
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Profile Image */}
            <div>
              <label className="block text-sm mb-2">Profile Image</label>
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    "📷"
                  )}
                </div>
                <input className="cursor-pointer" type="file" accept="image/*" onChange={handleImageChange} />
              </div>
            </div>

            {/* First Name */}
            <div>
              <input
                type="text"
                placeholder="First Name *"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className={`w-full border p-2 rounded ${
                  errors.firstName ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.firstName && (
                <p className="text-red-600 text-sm">{errors.firstName}</p>
              )}
            </div>

            {/* Middle Name */}
            <div>
              <input
                type="text"
                placeholder="Middle Name"
                value={middleName}
                onChange={(e) => setMiddleName(e.target.value)}
                className="w-full border p-2 rounded border-gray-300"
              />
            </div>

            {/* Last Name */}
            <div>
              <input
                type="text"
                placeholder="Last Name *"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className={`w-full border p-2 rounded ${
                  errors.lastName ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.lastName && (
                <p className="text-red-600 text-sm">{errors.lastName}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <input
                type="email"
                placeholder="Email *"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full border p-2 rounded ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.email && (
                <p className="text-red-600 text-sm">{errors.email}</p>
              )}
            </div>

            {/* Course */}
            <div>
                <input
                type="text"
                placeholder="course Name "
                value={course}
                  onChange={(e) => setCourse(e.target.value)}
                className={`w-full border p-2 rounded ${
                  errors.course ? "border-red-500" : "border-gray-300"
                }`}
              />
             
              {errors.course && (
                <p className="text-red-600 text-sm">{errors.course}</p>
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
                {student ? "Update Student" : "Add Student"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default React.memo(StudentFormModal)
