import { Link } from "react-router-dom";

export default function PrivacyPolicyPage() {
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
        {/* Hero */}
        <section className="py-16 sm:py-28 lg:py-32 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white text-center">
          <div className="max-w-3xl mx-auto px-6 sm:px-8">
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-snug">
              Privacy Policy
            </h1>
            <p className="text-base sm:text-lg lg:text-xl leading-relaxed">
              Your privacy is important to us. Learn how we collect, use, and
              protect your information.
            </p>
          </div>
        </section>

        {/* Policy Content */}
        <section className="py-14 sm:py-20 lg:py-24 bg-white">
          <div className="max-w-5xl mx-auto px-6 sm:px-8 text-gray-700 space-y-10">
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">
                1. Information We Collect
              </h2>
              <p className="leading-relaxed">
                We may collect personal details such as your name, email address,
                and financial data you provide while using ExpenseTrace. This
                information helps us deliver services like expense tracking and
                budget insights.
              </p>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">
                2. How We Use Your Information
              </h2>
              <p className="leading-relaxed">
                We use your data to improve your financial management experience,
                provide insights, and ensure a personalized service. We never
                sell your data to third parties.
              </p>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">
                3. Data Security
              </h2>
              <p className="leading-relaxed">
                Protecting your information is our top priority. We use industry
                standard security practices to safeguard your data against
                unauthorized access, alteration, or disclosure.
              </p>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">
                4. Third-Party Services
              </h2>
              <p className="leading-relaxed">
                ExpenseTrace may integrate with trusted third-party services to
                enhance your experience. These services follow their own privacy
                policies, which we encourage you to review.
              </p>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">
                5. Your Rights
              </h2>
              <p className="leading-relaxed">
                You have the right to access, update, or delete your personal
                information at any time. Contact us if you wish to exercise these
                rights or have any privacy-related concerns.
              </p>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">
                6. Changes to This Policy
              </h2>
              <p className="leading-relaxed">
                We may update this Privacy Policy from time to time. Updates will
                be reflected on this page with a revised effective date.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 sm:py-28 lg:py-32 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white text-center">
          <div className="max-w-3xl mx-auto px-6 sm:px-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6">
              Have Questions?
            </h2>
            <p className="text-base sm:text-lg lg:text-xl mb-10 leading-relaxed">
              If you have any concerns about your privacy, feel free to reach out
              to our support team anytime.
            </p>
            <Link
              to="/about"
              className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-blue-600 rounded-full text-base sm:text-lg font-semibold hover:bg-gray-100 transition"
            >
              Contact Us
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
            <Link to="/terms" className="hover:text-white">
              Terms & Conditions
            </Link>
            <Link to="/about" className="hover:text-white">
              About
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
