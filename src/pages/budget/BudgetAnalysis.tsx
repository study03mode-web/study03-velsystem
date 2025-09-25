import { useParams, useSearchParams, Link } from "react-router-dom";
import {
  ChevronLeft,
  Edit,
  TrendingDown,
  CheckCircle,
  PieChart,
  Trash,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from "recharts";
import { useBudgetAnalysis, useDeleteBudget } from "../../hooks/useBudgets";
import { MONTHS } from "../../types/budget";
import { useFormatters } from "../../hooks/useFormatters";
import CategoryIcon from "../../components/CategoryIcon";
import { useState } from "react";
import ConfirmationModal from "../../components/ConfirmationModal";

function BudgetAnalysis() {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const deleteBudget = useDeleteBudget();

  const { budgetId } = useParams<{ budgetId: string }>();
  const [searchParams] = useSearchParams();
  const budgetType =
    (searchParams.get("type") as "monthly" | "yearly") || "monthly";

  const { data: budget, isLoading } = useBudgetAnalysis(budgetId || "");
  const { formatCurrency } = useFormatters();

  // Color mapper
  const getCategoryColorHex = (colorName: string): string => {
    const colorMap: Record<string, string> = {
      indigo: "#6366F1",
      teal: "#14B8A6",
      yellow: "#F59E0B",
      orange: "#F97316",
      maroon: "#991B1B",
      pink: "#EC4899",
      lime: "#84CC16",
      violet: "#8B5CF6",
      rose: "#F43F5E",
      slate: "#64748B",
      sky: "#0EA5E9",
      purple: "#A855F7",
      stone: "#78716C",
      red: "#EF4444",
      green: "#22C55E",
      blue: "#3B82F6",
      amber: "#F59E0B",
      cyan: "#06B6D4",
      emerald: "#10B981",
      fuchsia: "#D946EF",
      gray: "#6B7280",
      zinc: "#71717A",
      brown: "#92400E",
      magenta: "#BE185D",
      bronze: "#A16207",
      peach: "#FED7AA",
      lavender: "#DDD6FE",
      mint: "#BBF7D0",
      olive: "#365314",
      navy: "#1E3A8A",
      gold: "#FBBF24",
      charcoal: "#374151",
      coral: "#FCA5A5",
      aqua: "#A7F3D0",
      plum: "#6B21A8",
      mustard: "#D97706",
      ruby: "#B91C1C",
      sapphire: "#1E3A8A",
      topaz: "#FDE047",
    };
    return colorMap[colorName] || "#6B7280";
  };

  if (isLoading) {
    return <div className="p-6">Loading...</div>;
  }

  if (!budget) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-500">Budget not found</p>
        <Link
          to="/budgets"
          className="text-indigo-600 hover:text-indigo-700 mt-2 inline-block text-sm sm:text-base"
        >
          Back to Budgets
        </Link>
      </div>
    );
  }

  const availableBalance = budget.totalLimit - budget.totalSpent;

  return (
    <div className="p-3 sm:p-4 md:p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="min-w-0">
          <Link
            to="/budgets"
            className="flex items-center text-gray-600 hover:text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
            Back to Budgets
          </Link>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 truncate">
            Budget Analysis
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-gray-500">
            {budgetType === "monthly"
              ? `${MONTHS[budget.month! - 1]} ${budget.year}`
              : budget.year}
          </p>
        </div>

        <div className="flex gap-2">
          <Link
            to={`/budgets/edit/${budgetId}?type=${budgetType}`}
            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-xl shadow hover:bg-indigo-700 transition"
          >
            <Edit className="w-4 h-4" />
            Edit
          </Link>

          <button
            onClick={() => setIsDeleteOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-xl shadow hover:bg-red-700 transition"
          >
            <Trash className="w-4 h-4" />
            Delete
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-3 mb-6">
        {/* Budget Card */}
        <div className="bg-white rounded-xl shadow p-4 flex items-center gap-4">
          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center">
            <PieChart className="w-6 h-6 text-indigo-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Budget</p>
            <p className="text-lg sm:text-xl md:text-2xl font-bold text-indigo-600">
              {formatCurrency(budget.totalLimit)}
            </p>
          </div>
        </div>

        {/* Spent Card */}
        <div className="bg-white rounded-xl shadow p-4 flex items-center gap-4">
          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
            <TrendingDown className="w-6 h-6 text-red-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Spent</p>
            <p className="text-lg sm:text-xl md:text-2xl font-bold text-red-600">
              {formatCurrency(budget.totalSpent)}
            </p>
          </div>
        </div>

        {/* Available Card */}
        <div className="bg-white rounded-xl shadow p-4 flex items-center gap-4">
          <div
            className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${availableBalance >= 0 ? "bg-green-100" : "bg-red-100"
              }`}
          >
            <CheckCircle
              className={`w-6 h-6 ${availableBalance >= 0 ? "text-green-600" : "text-red-600"
                }`}
            />
          </div>
          <div>
            <p className="text-sm text-gray-500">Available</p>
            <p
              className={`text-lg sm:text-xl md:text-2xl font-bold ${availableBalance >= 0 ? "text-green-600" : "text-red-600"
                }`}
            >
              {formatCurrency(availableBalance)}
            </p>
          </div>
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="bg-white rounded-lg shadow p-3 sm:p-4 md:p-6">
        <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 mb-3 sm:mb-4 md:mb-6">
          Category Breakdown
        </h3>
        <div className="h-56 sm:h-72 md:h-80 lg:h-96 mb-3 sm:mb-4 md:mb-6">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={budget.categories.map((c) => ({
                name: c.name.length > 12 ? c.name.slice(0, 12) + "…" : c.name,
                budget: c.limit,
                spent: c.spent,
              }))}
              margin={{ top: 10, right: 10, left: 0, bottom: 20 }} // 🔽 reduced from 40
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />

              <XAxis
                dataKey="name"
                tick={{ fontSize: 10, fill: "#374151" }}
                interval={0}
                angle={-25} // 🔽 less tilt → less space needed
                textAnchor="end"
                height={35} // 🔽 reduced from 50
              />

              <YAxis
                tick={{ fontSize: 11, fill: "#6B7280" }}
                width={45}
              />

              <Tooltip
                formatter={(value: number, name) => [formatCurrency(value), name]}
                contentStyle={{
                  fontSize: "0.8rem",
                  borderRadius: "0.5rem",
                }}
              />

              <Bar dataKey="budget" fill="#E5E7EB" name="Budget" barSize={18} />
              <Bar dataKey="spent" name="Spent" radius={[4, 4, 0, 0]} barSize={18}>
                {budget.categories.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={getCategoryColorHex(budget.categories[index].color)}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Category list */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mt-4 sm:mt-6">
          {budget.categories.map((c, idx) => {
            const percent = (c.spent / (budget.totalSpent || 1)) * 100;
            return (
              <div
                key={idx}
                className="rounded-xl shadow p-4 hover:shadow-md transition"
              >
                <div className="flex items-center gap-2 sm:gap-3 mb-2">
                  <CategoryIcon icon={c.icon} color={c.color} size="md" />
                  <div>
                    <p className="font-medium text-gray-900 text-sm sm:text-base">
                      {c.name}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-500">
                      {formatCurrency(c.spent)}
                    </p>
                  </div>
                  <p className="ml-auto text-xs sm:text-sm text-gray-500">
                    {percent.toFixed(1)}%
                  </p>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div
                    className="h-2 rounded-full bg-red-500"
                    style={{ width: `${percent}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <ConfirmationModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={() =>
          deleteBudget.mutate(budgetId!, {
            onSuccess: () => setIsDeleteOpen(false),
          })
        }
        title="Delete Budget"
        message="Are you sure you want to delete this budget? This action cannot be undone."
        confirmText="Delete"
        confirmButtonClass="bg-red-600 hover:bg-red-700"
        isPending={deleteBudget.isPending}
      />
    </div>
  );
}

export default BudgetAnalysis;