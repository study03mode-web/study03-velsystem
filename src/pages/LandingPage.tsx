import { Link } from "react-router-dom";
import { ArrowRight, BarChart3, Wallet, PieChart } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="w-full">
        <div className="flex w-full px-4 sm:px-6 py-4 items-center justify-between max-w-7xl mx-auto">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <img
              src="../logo.png"
              alt="ExpenseTrace Logo"
              className="h-8 sm:h-10 lg:h-12 w-auto"
            />
          </Link>

          {/* Sign In */}
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
        <section className="pt-16 sm:pt-28 lg:pt-32 pb-14 sm:pb-20 lg:pb-24">
          <div className="max-w-4xl mx-auto px-6 sm:px-8 text-center">
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-5 sm:mb-8 leading-snug">
              Take Control of Your{" "}
              <span className="text-blue-600">Expenses</span> &{" "}
              <span className="text-blue-600">Savings</span>
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-gray-700 mb-10 sm:mb-12 leading-relaxed">
              Track your income and expenses effortlessly. Get insights that
              help you save more and spend smarter.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
              <Link
                to="/log-in-or-create-account"
                className="px-5 py-3 lg:px-8 lg:py-4 
             bg-blue-600 text-white rounded-full 
             text-sm sm:text-base lg:text-lg font-semibold 
             hover:bg-blue-700 transition 
             flex items-center justify-center gap-2"
              >
                Get Started <ArrowRight size={18} className="sm:w-5 sm:h-5" />
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section
          id="how-it-works"
          className="py-14 sm:py-24 lg:py-28 bg-white"
        >
          <div className="max-w-7xl mx-auto px-6 sm:px-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-gray-900 mb-12 sm:mb-16 lg:mb-20">
              How ExpenseTrace Works
            </h2>
            <div className="grid md:grid-cols-3 gap-8 sm:gap-12 max-w-6xl mx-auto">
              <div className="p-6 sm:p-8 bg-gray-50 rounded-2xl shadow-sm hover:shadow-md transition flex flex-col items-center text-center">
                <Wallet className="w-10 h-10 sm:w-12 sm:h-12 text-blue-600 mb-4 sm:mb-6" />
                <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">
                  Track Transactions
                </h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  Log your income and expenses with ease. Stay on top of where
                  your money goes.
                </p>
              </div>
              <div className="p-6 sm:p-8 bg-gray-50 rounded-2xl shadow-sm hover:shadow-md transition flex flex-col items-center text-center">
                <BarChart3 className="w-10 h-10 sm:w-12 sm:h-12 text-green-600 mb-4 sm:mb-6" />
                <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">
                  Get Insights
                </h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  Visualize your spending patterns and identify opportunities to
                  save more.
                </p>
              </div>
              <div className="p-6 sm:p-8 bg-gray-50 rounded-2xl shadow-sm hover:shadow-md transition flex flex-col items-center text-center">
                <PieChart className="w-10 h-10 sm:w-12 sm:h-12 text-purple-600 mb-4 sm:mb-6" />
                <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">
                  Budget Smarter
                </h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  Create budgets and stick to them. Achieve your financial goals
                  faster.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call-to-Action Section */}
        <section className="py-16 sm:py-28 lg:py-32 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white text-center">
          <div className="max-w-3xl mx-auto px-6 sm:px-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-5 sm:mb-8">
              Start Managing Your Finances Today
            </h2>
            <p className="text-base sm:text-lg lg:text-xl mb-10 sm:mb-12 leading-relaxed">
              Simplify the way you manage money. Track expenses, set budgets,
              and achieve your financial goals with ease.
            </p>
            <Link
              to="/log-in-or-create-account"
              className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-blue-600 rounded-full text-base sm:text-lg font-semibold hover:bg-gray-100 transition"
            >
              Create Free Account
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
            <Link to="/about" className="hover:text-white">
              About
            </Link>
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