// utils/exportCSV.js
export const exportToCSV = (students) => {
  const headers = ["firstname","middlename","lastname","Email", "Course","image"];

  const rows = students.map((s) => [
  s.firstname,
  s.middlename,
  s.lastname,
  s.email,
  s.course,
  s.profileImage
]);


  const csvContent = [
    headers.join(","), 
    ...rows.map((row) => row.join(","))
  ].join("\n");

  // Create downloadable link
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "students.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
