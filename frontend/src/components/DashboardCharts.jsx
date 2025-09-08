

import React from "react"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts"

const DashboardCharts = ({ students, courses }) => {

    console.log(students)
  // Count students per course
  const studentCourseData = courses.map((course) => ({
    course: course.name,
    students: students.filter((s) => s.course === course.name).length,
  }))

  // High-level comparison
  const summaryData = [
    { name: "Students", value: students.length },
    { name: "Courses", value: courses.length },
  ]

  const COLORS = ["#4F46E5", "#22C55E", "#F59E0B", "#EF4444"]

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Bar Chart */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Students per Course</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={studentCourseData}>
            <XAxis dataKey="course"  />
            <YAxis  allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="students" fill="#4F46E5" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Chart */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Overall Distribution</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={summaryData}
              cx="50%"
              cy="50%"
              outerRadius={100}
              dataKey="value"
              label
            >
              {summaryData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default React.memo(DashboardCharts)
