
// model to see profile image in big form
const StudentImageModal = ({ imageUrl, onBack }) => {
  if (!imageUrl) return null

  return (
  <div className="fixed inset-0 flex items-center justify-center bg-white/60 bg-opacity-40 z-50">
  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-4 max-w-lg w-full text-center">
    {/* Profile Image */}
    <img
      src={imageUrl}
      alt="Student"
      className="w-full max-h-[70vh] object-contain rounded-lg"
    />

    {/* Back Button */}
    <button
      onClick={onBack}
      className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg shadow-md transition"
    >
      ← Back
    </button>
  </div>
</div>
  )
}

export default StudentImageModal
