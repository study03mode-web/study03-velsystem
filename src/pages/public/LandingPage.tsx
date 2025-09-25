import { Link } from "react-router-dom";
import {
  BarChart3,
  Wallet,
  PieChart,
  Shield,
  Zap,
  LucideIcon,
} from "lucide-react";
import React from "react";

// --------------------
// Reusable Button Component
// --------------------
interface ButtonProps {
  to: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg"; // NEW
}

const Button: React.FC<ButtonProps> = ({
  to,
  children,
  variant = "primary",
  size = "md",
}) => {
  const base =
    "inline-block rounded-full font-semibold transition shadow hover:shadow-lg";

  const variants: Record<"primary" | "secondary", string> = {
    primary:
      "bg-blue-600 text-white hover:bg-blue-700",
    secondary:
      "bg-white text-blue-700 hover:bg-gray-100",
  };

  const sizes: Record<"sm" | "md" | "lg", string> = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <Link to={to} className={`${base} ${variants[variant]} ${sizes[size]}`}>
      {children}
    </Link>
  );
};

// --------------------
// LandingPage Component
// --------------------
const LandingPage: React.FC = () => {
  const featureColorMap: Record<string, string> = {
    "blue-500": "text-blue-500",
    "yellow-400": "text-yellow-400",
    "green-500": "text-green-500",
  };

  type Badge = {
    icon: LucideIcon;
    text: string;
    color: string;
    style: string;
  };

  type Step = {
    icon: LucideIcon;
    title: string;
    desc: string;
  };

  type Feature = {
    icon: LucideIcon;
    title: string;
    desc: string;
    color: string;
  };

  type Faq = {
    q: string;
    a: string;
  };

  const badges: Badge[] = [
    {
      icon: Wallet,
      text: "Account Management",
      color: "text-blue-500",
      style: "absolute top-2 right-6",
    },
    {
      icon: BarChart3,
      text: "Category Management",
      color: "text-green-500",
      style: "absolute bottom-11 right-6",
    },
    {
      icon: PieChart,
      text: "Debt Management",
      color: "text-yellow-500",
      style: "absolute top-1/2 left-1/2 -translate-x-1/3 -translate-y-1/2",
    },
    {
      icon: Zap,
      text: "Automated Scheduling",
      color: "text-purple-500",
      style: "absolute bottom-6 left-8",
    },
  ];

  const steps: Step[] = [
    {
      icon: Wallet,
      title: "Add Accounts & Categories",
      desc: "Create categories and link multiple accounts in seconds.",
    },
    {
      icon: BarChart3,
      title: "Track & Schedule Transactions",
      desc: "Record transactions or let them sync automatically.",
    },
    {
      icon: PieChart,
      title: "Analyze & Manage Debt",
      desc: "Dashboards show spending, budgets, and debt at a glance.",
    },
  ];

  const features: Feature[] = [
    {
      icon: Shield,
      title: "Full Financial Suite",
      desc: "Manage categories, accounts, transactions, debt, and analysis.",
      color: "blue-500",
    },
    {
      icon: Zap,
      title: "Smart Scheduling",
      desc: "Automate recurring transactions easily.",
      color: "yellow-400",
    },
    {
      icon: BarChart3,
      title: "Actionable Insights",
      desc: "Understand spending patterns and hit goals faster.",
      color: "green-500",
    },
  ];

  const faqs: Faq[] = [
    {
      q: "How to create sub-categories?",
      a: "We provide sub-category functionality through Tags. For example, you can add a milk tag on each milk transaction while categorising it into the Food category to still get totals for Food.",
    },
    {
      q: "How to manage multiple accounts inside the app?",
      a: "Use Tags to simulate multiple accounts. For instance, add business and personal tags to transactions. You can then filter or view analysis for a single tag on the Custom View or analysis pages.",
    },
    {
      q: "What are transfer transactions?",
      a: "They are neither expense nor income but help track transfers between your different payment modes. E.g. paying a credit card bill or withdrawing cash from an ATM can be logged as a transfer transaction.",
    },
    {
      q: "How to edit or create new categories?",
      a: "The app provides 18 predefined categories (14 expense & 4 income). You can edit or add new categories on the Categories page.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50 via-white to-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/70 backdrop-blur border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <Link to="/" className="flex-shrink-0">
            <img
              src="/logo.png"
              alt="ExpenseTrace Logo"
              className="h-8 w-auto"
            />
          </Link>
          <Button to="/log-in-or-create-account" size="sm" variant="primary">
            Sign In
          </Button>
        </div>
      </header>

      <main className="flex-grow">
        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 text-white">
          <div className="max-w-7xl mx-auto px-6 py-24 lg:py-32 grid lg:grid-cols-2 gap-10 items-center">
            <div className="max-w-2xl mx-auto lg:mx-0 text-center lg:text-left">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 leading-snug">
                Manage & Automate{" "}
                <span className="text-blue-300">All Your Finances</span>
              </h1>

              <p className="text-base sm:text-lg md:text-xl text-blue-50/90 mb-6 max-w-xl mx-auto lg:mx-0">
                From categories to accounts, transactions, and debt – everything
                you need to stay in control of your money in one powerful app.
              </p>

              <Button to="/log-in-or-create-account" variant="secondary">
                Get Started
              </Button>
            </div>

            <div className="relative flex justify-center lg:justify-end">
              <img
                src="/app-screenshot.png"
                alt="Preview of the ExpenseTrace finance dashboard"
                loading="lazy"
                className="rounded-2xl shadow-2xl border border-gray-100 w-full max-w-sm sm:max-w-md lg:max-w-lg"
              />

              {/* Badges */}
              <div className="hidden sm:block w-full h-full">
                {badges.map((badge, idx) => (
                  <div
                    key={idx}
                    className={`${badge.style} bg-white shadow-xl px-4 py-3 rounded-2xl flex items-center gap-3 text-sm font-medium text-gray-700
                 transition transform hover:-translate-y-1 hover:shadow-2xl`}
                  >
                    <badge.icon
                      className={`w-6 h-6 ${badge.color} flex-shrink-0`}
                      aria-hidden="true"
                    />
                    <span>{badge.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="bg-gradient-to-b from-blue-50 to-white py-24">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12 sm:mb-16">
            How It Works in <span className="text-blue-600">3 Easy Steps</span>
          </h2>

          <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-16">
            {steps.map((step, idx) => (
              <div key={idx} className="flex flex-col items-center text-center">
                <div className="w-20 h-20 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full mb-4">
                  <step.icon className="w-10 h-10" aria-hidden="true" />
                </div>
                <h3 className="text-2xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Why Our App Stands Out */}
        <section className="bg-white py-20">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-16">
            Why Our App Stands Out
          </h2>

          <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-12">
            {features.map((feature, idx) => (
              <div key={idx} className="flex flex-col items-center text-center">
                <div
                  className={`w-24 h-24 flex items-center justify-center ${featureColorMap[feature.color]} mb-4`}
                >
                  <feature.icon className="w-16 h-16" aria-hidden="true" />
                </div>
                <h3 className="text-2xl font-semibold mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-white py-20">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Frequently Asked Questions
            </h2>

            {faqs.map((item, idx) => (
              <details key={idx} className="mb-4">
                <summary className="cursor-pointer text-lg font-semibold text-gray-800">
                  {item.q}
                </summary>
                <p className="mt-2 text-gray-600">{item.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 sm:py-20 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white text-center px-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
            Ready to take control of your finances?
          </h2>
          <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of people already using our app to manage accounts,
            categories, transactions, debt and analysis.
          </p>
          <Button to="/log-in-or-create-account" variant="secondary">
            Start Free Today
          </Button>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300">
        <div className="max-w-7xl mx-auto px-5 py-8 flex flex-col sm:flex-row justify-center sm:justify-between items-center gap-4">
          <div className="text-xs sm:text-sm text-gray-400 text-center sm:text-left">
            © {new Date().getFullYear()} ExpenseTrace. All rights reserved.
          </div>
          <div className="flex flex-wrap justify-center gap-4 text-sm sm:text-base">
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
};

export default LandingPage;