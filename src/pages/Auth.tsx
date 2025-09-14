import { Link } from "react-router-dom";
import { initiateGoogleLogin } from "../hooks/useAuth";

function Auth() {
  const handleGoogleLogin = () => {
    initiateGoogleLogin();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      {/* Logo */}
      <Link to="/" className="flex-shrink-0">
        <img
          src="../logo.png"
          alt="ExpenseTrace Logo"
          className="h-10 sm:h-12 lg:h-14 w-auto"
        />
      </Link>

      {/* Title */}
      <h2 className="mt-8 text-center text-2xl sm:text-3xl font-semibold text-gray-900">
        Log in or sign up
      </h2>

      {/* Tagline */}
      <p className="mt-2 text-center text-sm sm:text-base text-gray-600">
        Track your spending, grow your savings, and get smarter with money.
      </p>

      {/* Google Button */}
      <div className="mt-10 w-full flex justify-center">
        <button
          onClick={handleGoogleLogin}
          className="w-full max-w-sm flex justify-center items-center py-2 sm:py-3 px-2 border rounded-full text-base font-medium text-gray-700 bg-white hover:bg-gray-100 shadow-sm transition"
        >
          <svg className="w-6 h-6 mr-3" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Login with Google
        </button>
      </div>

      {/* Footer links */}
      <p className="mt-8 text-sm text-gray-500 text-center">
        <Link to="/terms" className="text-indigo-600 hover:text-indigo-500">
          Terms of Service
        </Link>
        <span className="mx-2 text-gray-400">•</span>
        <Link to="/privacy" className="text-indigo-600 hover:text-indigo-500">
          Privacy Policy
        </Link>
      </p>
    </div>
  );
}

export default Auth;