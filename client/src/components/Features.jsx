const features = [
  "Student Dashboard",
  "Admin Control Panel",
  "Night Out Approval",
  "Maintenance Requests",
  "Digital ID Card",
  "24×7 Emergency Support",
];

export default function Features() {
  return (
    <section className="py-20 px-6 bg-white">
      <h2 className="text-3xl font-semibold text-center mb-12">
        Built for real hostel life
      </h2>

      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {features.map((item, index) => (
          <div
            key={index}
            className="bg-white border border-green-100 rounded-2xl p-6
              transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/20"
          >
            <p className="text-lg font-medium text-slate-700">
              {item}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
