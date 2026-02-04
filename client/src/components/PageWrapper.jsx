export default function PageWrapper({ title, goBack, children }) {
  return (
    <div className="min-h-screen bg-[#F3FAED] p-6">
      <button onClick={goBack} className="text-green-600 mb-4">
        ← Back to Dashboard
      </button>

      <h2 className="text-2xl font-bold text-green-600 mb-6">
        {title}
      </h2>

      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
}
