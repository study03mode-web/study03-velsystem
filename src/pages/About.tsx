import { Link } from "react-router-dom";
import { Users, Target, ShieldCheck, Github, Linkedin } from "lucide-react"; // 🔹 Added icons

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="w-full bg-white shadow-sm">
        <div className="flex w-full px-4 sm:px-6 py-4 items-center justify-between max-w-7xl mx-auto">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <img
              src="../logo.png"
              alt="ExpenseTrace Logo"
              className="h-8 sm:h-10 lg:h-12 w-auto"
            />
          </Link>

          {/* Back to Home */}
          <Link
            to="/log-in-or-create-account"
            className="px-4 sm:px-5 py-2 border border-gray-300 rounded-full text-sm sm:text-base font-medium text-gray-700 hover:bg-gray-100 transition"
          >
            Sign In
          </Link>
        </div>
      </header>

      {/* Main */}
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-16 sm:py-28 lg:py-32 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white text-center">
          <div className="max-w-3xl mx-auto px-6 sm:px-8">
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-snug">
              About <span className="text-yellow-300">ExpenseTrace</span>
            </h1>
            <p className="text-base sm:text-lg lg:text-xl leading-relaxed">
              We’re on a mission to make personal finance simple, smart, and
              stress-free for everyone.
            </p>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-14 sm:py-20 lg:py-24 bg-gray-50">
          <div className="max-w-6xl mx-auto px-6 sm:px-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-gray-900 mb-12">
              Our Core Values
            </h2>
            <div className="grid md:grid-cols-3 gap-8 sm:gap-12">
              <div className="p-6 sm:p-8 bg-white rounded-2xl shadow-sm hover:shadow-md transition flex flex-col items-center text-center">
                <Users className="w-12 h-12 text-blue-600 mb-5" />
                <h3 className="text-lg sm:text-xl font-semibold mb-3">
                  Simplicity
                </h3>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                  We believe financial tools should be intuitive, clear, and
                  easy for everyone to use.
                </p>
              </div>

              <div className="p-6 sm:p-8 bg-white rounded-2xl shadow-sm hover:shadow-md transition flex flex-col items-center text-center">
                <Target className="w-12 h-12 text-green-600 mb-5" />
                <h3 className="text-lg sm:text-xl font-semibold mb-3">
                  Empowerment
                </h3>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                  We provide insights that help users take control of their
                  money and reach their goals faster.
                </p>
              </div>

              <div className="p-6 sm:p-8 bg-white rounded-2xl shadow-sm hover:shadow-md transition flex flex-col items-center text-center">
                <ShieldCheck className="w-12 h-12 text-purple-600 mb-5" />
                <h3 className="text-lg sm:text-xl font-semibold mb-3">
                  Trust
                </h3>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                  Security and privacy are at the heart of everything we build.
                  Your data is always safe with us.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* About Developer */}
        <section className="py-14 sm:py-20 lg:py-24 bg-white">
          <div className="max-w-4xl mx-auto px-6 sm:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-8">
              About the Developer
            </h2>
            <div className="p-6 sm:p-8 bg-gray-50 rounded-2xl shadow-sm">
              {/* Name + Role */}
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2">
                Ezhil Selvan P
              </h3>
              <p className="text-gray-600 mb-4">Full-Stack Developer</p>

              {/* App Intro */}
              <p className="text-gray-700 text-sm sm:text-base mb-4">
                🚀 Building <strong>ExpenseTrace</strong> – a personal finance &
                budget tracking app that makes money management simple and
                stress-free.
              </p>

              {/* Tech Stack */}
              <p className="text-gray-700 text-sm sm:text-base mb-6">
                Spring · React js · PostgreSQL · Docker
              </p>

              {/* Social Icons */}
              <div className="flex justify-center gap-6 text-2xl">
                <a
                  href="https://github.com/ezhilselvan1109"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-900 hover:text-gray-700 transition"
                >
                  <Github />
                </a>
                <a
                  href="https://www.linkedin.com/in/ezhilselvan1109"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 transition"
                >
                  <Linkedin />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Call-to-Action */}
        <section className="py-16 sm:py-28 lg:py-32 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white text-center">
          <div className="max-w-3xl mx-auto px-6 sm:px-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6">
              Join Us on the Journey
            </h2>
            <p className="text-base sm:text-lg lg:text-xl mb-10 leading-relaxed">
              ExpenseTrace is more than just an app — it’s a step toward a
              brighter financial future.
            </p>
            <Link
              to="/log-in-or-create-account"
              className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-blue-600 rounded-full text-base sm:text-lg font-semibold hover:bg-gray-100 transition"
            >
              Get Started Free
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 py-10 flex flex-col sm:flex-row justify-center sm:justify-between items-center gap-5 sm:gap-6">
          <div className="text-xs sm:text-sm text-gray-400 text-center sm:text-left">
            © {new Date().getFullYear()} ExpenseTrace. All rights reserved.
          </div>
          <div className="flex gap-6 text-sm sm:text-base">
            <Link to="/privacy" className="hover:text-white">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-white">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}