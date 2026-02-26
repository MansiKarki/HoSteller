import { useState, useEffect, useCallback } from "react";
import img2 from "../assets/2.png";
import img3 from "../assets/3.png";
import img4 from "../assets/4.jpg";
import img5 from "../assets/5.jpg";

const slides = [
    {
        title: "Campus Hostels",
        subtitle: "Comfort and Convenience for Students",
        description:
            "Our campus has 34 hostels, each with 37 rooms and modern facilities like Wi-Fi, cooking gas, and more. Designed for comfort and safety, every hostel offers a friendly and peaceful environment for students to live and learn.",
        image: img4,
    },
    {
        title: "Safety & Mess Facilities",
        subtitle: "Secure and Healthy Living",
        description:
            "Each hostel ensures 24×7 security with CCTV and dedicated wardens, offering a safe and comfortable stay for every student. The mess provides nutritious, hygienic meals daily, ensuring a healthy dining experience in a friendly environment.",
        image: img2,
    },
    {
        title: "Student Community",
        subtitle: "A Home Away From Home",
        description:
            "Join a vibrant student community with dedicated study halls, recreation rooms, and collaborative spaces. Our hostel environment fosters friendship, teamwork, and an enriching campus life experience for every resident.",
        image: img3,
    },
    {
        title: "Modern Amenities",
        subtitle: "Everything You Need, All in One Place",
        description:
            "Enjoy high-speed internet, laundry services, medical support, and sports facilities all within the campus. Our hostels are equipped with everything a student needs to focus on academics and personal growth.",
        image: img4,
    },
    {
        title: "Hostel Buildings",
        subtitle: "Well-Structured & Spacious Living Spaces",
        description:
            "Our well-maintained multi-storey hostel buildings provide a safe and comfortable home for hundreds of students. Each block is designed to offer ample space, ventilation, and easy access to all campus facilities.",
        image: img5,
    },
];


export default function HeroCarousel() {
    const [current, setCurrent] = useState(0);
    const [animating, setAnimating] = useState(false);

    const goTo = useCallback(
        (index) => {
            if (animating) return;
            setAnimating(true);
            setTimeout(() => {
                setCurrent((index + slides.length) % slides.length);
                setAnimating(false);
            }, 300);
        },
        [animating]
    );

    const prev = () => goTo(current - 1);
    const next = () => goTo(current + 1);

    // Auto-advance every 3 seconds
    useEffect(() => {
        const timer = setInterval(() => next(), 3000);
        return () => clearInterval(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [current]);

    const slide = slides[current];

    return (
        <section className="relative bg-[#F3FAED] select-none overflow-hidden">
            {/* Left Arrow */}
            <button
                id="carousel-prev"
                onClick={prev}
                aria-label="Previous slide"
                className="absolute left-5 top-1/2 -translate-y-1/2 z-10 text-green-500 hover:text-green-700 transition-colors duration-200 p-2"
            >
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 18 9 12 15 6" />
                </svg>
            </button>

            {/* Right Arrow */}
            <button
                id="carousel-next"
                onClick={next}
                aria-label="Next slide"
                className="absolute right-5 top-1/2 -translate-y-1/2 z-10 text-green-500 hover:text-green-700 transition-colors duration-200 p-2"
            >
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6" />
                </svg>
            </button>

            {/* Main content */}
            <div
                className="max-w-7xl mx-auto px-20 py-14 flex items-center gap-12"
                style={{ minHeight: "440px" }}
            >
                {/* Left — Text */}
                <div
                    className="flex-1 transition-all duration-300"
                    style={{ opacity: animating ? 0 : 1, transform: animating ? "translateX(-16px)" : "translateX(0)" }}
                >
                    <h2 className="text-5xl font-bold text-green-600 mb-2 leading-tight">{slide.title}</h2>
                    <h3 className="text-2xl font-semibold text-gray-800 mb-4">{slide.subtitle}</h3>
                    <p className="text-gray-500 text-base leading-relaxed max-w-lg">{slide.description}</p>

                    {/* Dots */}
                    <div className="flex gap-3 mt-9">
                        {slides.map((_, i) => (
                            <button
                                key={i}
                                id={`carousel-dot-${i}`}
                                onClick={() => goTo(i)}
                                aria-label={`Go to slide ${i + 1}`}
                                className={`h-3 rounded-full transition-all duration-300 ${i === current ? "bg-green-600 w-9" : "bg-green-200 w-3"
                                    }`}
                            />
                        ))}
                    </div>
                </div>

                {/* Right — Image */}
                <div
                    className="shrink-0 transition-all duration-300"
                    style={{
                        opacity: animating ? 0 : 1,
                        transform: animating ? "translateX(16px)" : "translateX(0)",
                    }}
                >
                    <img
                        src={slide.image}
                        alt={slide.title}
                        className="w-[460px] h-[320px] object-cover rounded-3xl shadow-2xl"
                    />
                </div>
            </div>
        </section>
    );
}
