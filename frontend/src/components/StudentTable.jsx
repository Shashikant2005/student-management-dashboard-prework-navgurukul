
import { useState } from "react"
import useStudentStore from "../store/studentStore.js"
import StudentFormModal from "./StudentFormModal.jsx"
import axiosInstance from "../../utils/axiosInstance.js"
import { useEffect } from "react"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import StudentImageModal from "./StudentImageModal.jsx"
import { exportToCSV } from "../../utils/exportCSV.js"
import { useMemo } from "react"

const StudentTable = () => {
  //const {  } = useStudentStore()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingStudent, setEditingStudent] = useState(null)
  const [students , setStudents] = useState([])
  const { refreshStudentTable,query,setQuery } = useStudentStore()
  const [selectedStudent, setSelectedStudent] = useState(null)
   const [selectedImage, setSelectedImage] = useState(null)
 const [AllStudents, setAllStudents] = useState([]); 
 
  // Handle edit student
  const handleEdit = (student) => {
    setEditingStudent(student)
    setIsModalOpen(true)
  }

  // filter students , memoized filterd student data for performance
  // useMemo to avoid unnecessary recalculations
  const filteredStudents = useMemo(() => {
     return students.filter((student) => {
     if (!query) return true;
     const fullName = `${student.firstname} ${student.middlename} ${student.lastname}`.toLowerCase();
     return (
      fullName.includes(query.toLowerCase()) ||
      student.firstname.toLowerCase().includes(query.toLowerCase()) ||
      student.middlename.toLowerCase().includes(query.toLowerCase()) ||
      student.lastname.toLowerCase().includes(query.toLowerCase()) ||
      student.email.toLowerCase().includes(query.toLowerCase()) ||
      student.course.toLowerCase().includes(query.toLowerCase())
    );
  });
}, [students, query]);

// Update AllStudents when query or students change
useEffect(()=>{
  if(query===''){
    setAllStudents(students)
  }
  else{
    setAllStudents(filteredStudents)
  }
},[query])



  // Delete student function
  const deleteStudent = async (id)=>{
    try {
      const response = await axiosInstance.delete(`/students/${id}`)
      toast("Student deleted successfully 🗑️")
      setStudents(students.filter((student)=>student._id !== id))
    } catch (error) {
      toast.error("Error deleting student. Please retry 🔄")
    }
  }


  // Fetch all students from the api
  const getAllStudents = async ()=>{

      try {
        const response =await axiosInstance.get('/students')
        setStudents((await response).data)
        setAllStudents(response.data)
      } catch (error) {
        toast.error("Something went wrong")
      }
  }

  // Initial fetch of students  when component mounts
    useEffect(()=>{
      getAllStudents()
    },[])


    // Refresh student table when refreshStudentTable changes
    useEffect(()=>{
      getAllStudents()
    },[refreshStudentTable])

   

  // Handle delete student with confirmation
  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      deleteStudent(id)
    }
  }

  // Handle add new student
  const handleAddNew = () => {
    setEditingStudent(null)
    setIsModalOpen(true)
  }



  return (
    <div className="space-y-6"> <ToastContainer />
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            Students
          </h1>

          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full sm:w-auto">
            <button
              onClick={() => exportToCSV(students)}
              className="bg-indigo-600 cursor-pointer hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 w-full sm:w-auto"
            >
              Export to CSV
            </button>
            <button
              onClick={handleAddNew}
              className="bg-indigo-600 cursor-pointer hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 w-full sm:w-auto"
            >
              Add Student
            </button>
          </div>
    </div>


      {/* Students table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-gray-700">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Profile
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Full Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Course
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>


          { true && <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {students.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                    No students found. Click "Add Student" to get started.
                  </td>
                </tr>
              ) : (
                AllStudents.map((student) => (
                  <tr onClick={()=>setSelectedStudent(student)} key={student._id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="w-10 h-10 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center overflow-hidden">
                        {student.profileImage ? (
                          <img
                            src={student.profileImage || "/placeholder.svg"}
                            alt="Profile"
                            className="w-full h-full object-cover cursor-pointer"
                            onClick={() => setSelectedImage(student.profileImage)}

                          />
                        ) : (
                          <span className="text-gray-600 dark:text-gray-300 font-medium">
                            {student.firstname?.charAt(0)}
                            {student.lastname?.charAt(0)}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {student.firstname} {student.middlename} {student.lastname}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600 dark:text-gray-300">{student.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200">
                        {student.course}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <button
                        onClick={() => handleEdit(student)}
                        className="text-indigo-600 px-6 cursor-pointer dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-300"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(student._id, `${student.firstname} ${student.lastname}`)}
                        className="text-red-600 cursor-pointer dark:text-red-400 hover:text-red-900 dark:hover:text-red-300"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>}
          </table>
        </div>
      </div>

      {/* Student form modal */}
      {isModalOpen && (
        <StudentFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} student={editingStudent} />
      )}

        {selectedImage && (
        <StudentImageModal
          imageUrl={selectedImage}
          onBack={() => setSelectedImage(null)}
        />
      )}
    </div>
  )
}

export default StudentTable
