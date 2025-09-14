import { Link } from "react-router-dom";

export default function TermsAndConditionsPage() {
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
              Terms & Conditions
            </h1>
            <p className="text-base sm:text-lg lg:text-xl leading-relaxed">
              Please read these terms carefully before using ExpenseTrace.
            </p>
          </div>
        </section>

        {/* Terms Content */}
        <section className="py-14 sm:py-20 lg:py-24 bg-white">
          <div className="max-w-5xl mx-auto px-6 sm:px-8 text-gray-700 space-y-10">
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">
                1. Acceptance of Terms
              </h2>
              <p className="leading-relaxed">
                By accessing or using ExpenseTrace, you agree to comply with
                these Terms & Conditions. If you do not agree, please do not use
                our services.
              </p>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">
                2. Use of Services
              </h2>
              <p className="leading-relaxed">
                ExpenseTrace provides tools to track income, expenses, and
                budgets. You agree to use the platform for lawful purposes and
                not misuse or disrupt the service in any way.
              </p>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">
                3. User Responsibilities
              </h2>
              <p className="leading-relaxed">
                You are responsible for maintaining the confidentiality of your
                account and ensuring the accuracy of the information you provide
                within ExpenseTrace.
              </p>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">
                4. Intellectual Property
              </h2>
              <p className="leading-relaxed">
                All content, trademarks, and intellectual property on
                ExpenseTrace belong to us or our licensors. You may not copy,
                distribute, or exploit them without permission.
              </p>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">
                5. Limitation of Liability
              </h2>
              <p className="leading-relaxed">
                ExpenseTrace is provided on an &quot;as-is&quot; basis. We are not
                liable for any losses or damages resulting from the use of our
                platform.
              </p>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">
                6. Changes to Terms
              </h2>
              <p className="leading-relaxed">
                We may update these Terms & Conditions from time to time. The
                latest version will always be available on this page with a
                revised effective date.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 sm:py-28 lg:py-32 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white text-center">
          <div className="max-w-3xl mx-auto px-6 sm:px-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6">
              Need Assistance?
            </h2>
            <p className="text-base sm:text-lg lg:text-xl mb-10 leading-relaxed">
              If you have questions about these Terms & Conditions, feel free to
              contact our team.
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
            <Link to="/privacy" className="hover:text-white">
              Privacy Policy
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