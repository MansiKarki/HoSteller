export default function Hero() {
  return (
    <section className="min-h-[80vh] flex items-center justify-center bg-primarySoft px-6">
      <div className="max-w-3xl text-center">
        <h1 className="text-5xl font-semibold leading-tight">
          <span className="block word-flow">Smart hostel</span>
          <span className="block word-flow word-flow-delay-1">
            management
          </span>
          <span className="block word-flow word-flow-delay-2 text-primary">
            powered by AI
          </span>
        </h1>

        <p className="mt-6 text-lg text-slate-600 word-flow word-flow-delay-3">
          A modern MERN-based platform for students, wardens, and administrators.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <button className="px-6 py-3 rounded-xl bg-primary text-white font-medium
            transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/30">
            Get Started
          </button>

          <button className="px-6 py-3 rounded-xl border border-primary text-primary font-medium
            hover:bg-primary hover:text-white transition">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
}
