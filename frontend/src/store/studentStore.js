import { create } from "zustand"

// Zustand store for managing students with localStorage persistence
const useStudentStore = create((set, get) => ({
 
  
  refreshStudentTable: false,
  refreshCourseTable: false,

  // Set individual flags
  setRefreshStudentTable: (value) => set({ refreshStudentTable: value }),
  setRefreshCourseTable: (value) => set({ refreshCourseTable: value }),

   query: '',
  setQuery: (q) => set({ query: q }),
 

}))


export default useStudentStore
