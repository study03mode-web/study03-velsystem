import { Link } from "react-router-dom";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  CreditCard,
  ArrowUpDown,
} from "lucide-react";
import { useFormatters } from "../hooks/useFormatters";
import {
  useRecentTransactions,
  useTransactionSummary,
} from "../hooks/useTransactions";
import CategoryIcon from "../components/CategoryIcon";
import { TRANSACTION_TYPES } from "../types/transaction";
import { useState } from "react";

function Dashboard() {
  const { formatCurrency } = useFormatters();

  // 🔹 state for summary type
  const [rangeCode, setRangeCode] = useState<1 | 2 | 3>(1);

  const { data: summary, isLoading: summaryLoading } = useTransactionSummary(rangeCode);
  const { data: recentTransactions, isLoading: recentLoading } =
    useRecentTransactions();

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">
          Track your expenses and financial goals
        </p>
      </div>

      {/* Summary Range Selector */}
      <div className="flex justify-start mb-4">
        <div className="inline-flex bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setRangeCode(1)}
            className={`px-4 py-1.5 text-sm font-medium rounded-md transition ${rangeCode === 1 ? "bg-indigo-600 text-white shadow" : "text-gray-600"
              }`}
          >
            All Time
          </button>
          <button
            onClick={() => setRangeCode(2)}
            className={`px-4 py-1.5 text-sm font-medium rounded-md transition ${rangeCode === 2 ? "bg-indigo-600 text-white shadow" : "text-gray-600"
              }`}
          >
            Month
          </button>
          <button
            onClick={() => setRangeCode(3)}
            className={`px-4 py-1.5 text-sm font-medium rounded-md transition ${rangeCode === 3 ? "bg-indigo-600 text-white shadow" : "text-gray-600"
              }`}
          >
            Year
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 mb-4">
        {/* Total Spending */}
        <div className="bg-white rounded-xl shadow p-5 hover:shadow-md transition flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500">Total Spending</p>
            {summaryLoading ? (
              <div className="h-6 w-24 bg-gray-200 rounded animate-pulse mt-1" />
            ) : (
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(summary?.totalExpense || 0)}
              </p>
            )}
          </div>
          <div className="bg-red-100 rounded-full p-3">
            <TrendingDown className="w-6 h-6 text-red-600" />
          </div>
        </div>

        {/* Income */}
        <div className="bg-white rounded-xl shadow p-5 hover:shadow-md transition flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500">Income</p>
            {summaryLoading ? (
              <div className="h-6 w-24 bg-gray-200 rounded animate-pulse mt-1" />
            ) : (
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(summary?.totalIncome || 0)}
              </p>
            )}
          </div>
          <div className="bg-green-100 rounded-full p-3">
            <TrendingUp className="w-6 h-6 text-green-600" />
          </div>
        </div>

        {/* Total Balance */}
        <div className="bg-white rounded-xl shadow p-5 hover:shadow-md transition flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500">Total Balance</p>
            {summaryLoading ? (
              <div className="h-6 w-16 bg-gray-200 rounded animate-pulse mt-1" />
            ) : (
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(((summary?.totalIncome ?? 0) - (summary?.totalExpense ?? 0)) || 0)}
              </p>
            )}
          </div>
          <div className="bg-purple-100 rounded-full p-3">
            <DollarSign className="w-6 h-6 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Recent Transactions
        </h3>
        <Link
          to="/transactions"
          className="text-sm font-medium text-indigo-600 hover:underline"
        >
          View All
        </Link>
      </div>

      {recentLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-28 bg-gray-200 rounded-xl animate-pulse"
            />
          ))}
        </div>
      ) : recentTransactions?.length ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {recentTransactions.map((txn) => (
            <div
              key={txn.id}
              className="bg-white rounded-xl shadow-sm border p-4 hover:shadow-md transition flex flex-col justify-between"
            >
              <div className="flex items-center gap-3">
                {txn.category ? (
                  <CategoryIcon
                    icon={txn.category.icon}
                    color={txn.category.color}
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                    {txn.type === 2 ? (
                      <TrendingUp className="w-5 h-5 text-green-600" />
                    ) : (
                      <TrendingDown className="w-5 h-5 text-red-600" />
                    )}
                  </div>
                )}
                <div className="min-w-0">
                  <h3 className="text-sm font-medium text-gray-900 truncate">
                    {txn.description}
                  </h3>
                  <p className="text-xs text-gray-500">
                    {txn.category?.name || TRANSACTION_TYPES[txn.type]}
                  </p>
                </div>
              </div>

              <div className="flex justify-between items-center mt-3">
                <span
                  className={`text-sm font-semibold ${txn.type === 2 ? "text-green-600" : "text-red-600"
                    }`}
                >
                  {txn.type === 2 ? "+" : "-"}
                  {formatCurrency(txn.amount)}
                </span>
                <span className="text-xs text-gray-500">
                  {new Date(txn.txnDate).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-10 text-center text-gray-500">
          <ArrowUpDown className="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No recent transactions
          </h3>
          <p className="text-sm text-gray-500 mb-4">
            Start tracking your expenses and income by adding a transaction
          </p>
          <Link
            to="/transactions/add"
            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition"
          >
            <CreditCard className="w-4 h-4" /> Add Transaction
          </Link>
        </div>
      )}
    </div>
  );
}

export default Dashboard;