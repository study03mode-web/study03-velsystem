import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit, Target, ChevronRight } from 'lucide-react';
import { useBudgetSummary } from '../../hooks/useBudgets';
import { Budget } from '../../types/budget';
import { MONTHS } from '../../types/budget';
import { useFormatters } from '../../hooks/useFormatters';

const tabs = ['Monthly', 'Yearly'];

function Budgets() {
  const [activeTab, setActiveTab] = useState(0);
  const { data: summary, isLoading } = useBudgetSummary();
  const { formatCurrency } = useFormatters();

  const getProgressPercentage = (spent: number, budget: number) => {
    return budget > 0 ? Math.min((spent / budget) * 100, 100) : 0;
  };

  const BudgetCard = ({ budget, isActive = false }: { budget: Budget; isActive?: boolean }) => {
    const percentage = getProgressPercentage(budget.totalSpent, budget.totalLimit);

    return (
      <Link
        to={`/budgets/analysis/${budget.id}?type=${activeTab === 0 ? 'monthly' : 'yearly'}`}
        className="bg-white rounded-xl shadow p-4 flex flex-col hover:shadow-md transition"
      >
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="font-medium text-gray-900">
              {activeTab === 0
                ? `${MONTHS[budget.month! - 1]} ${budget.year}`
                : budget.year}
            </h3>
            <p className="text-xs text-gray-500 capitalize">{budget.status} Budget</p>
          </div>
          <div className="flex items-center gap-2">
            {isActive && (
              <Link
                to={`/budgets/edit/${budget.id}?type=${budget.type}`}
                onClick={(e) => e.stopPropagation()}
                className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-indigo-600"
              >
                <Edit className="w-4 h-4" />
              </Link>
            )}
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
          <div
            className={`h-2 rounded-full transition-all duration-300 
              ${percentage >= 90 ? 'bg-red-500' : percentage >= 75 ? 'bg-yellow-500' : 'bg-green-500'}`}
            style={{ width: `${Math.min(percentage, 100)}%` }}
          />
        </div>

        {/* Budget details */}
        <div className="space-y-1 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Budget</span>
            <span className="font-medium">{formatCurrency(budget.totalLimit)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Spent</span>
            <span className="font-medium">{formatCurrency(budget.totalSpent)}</span>
          </div>
          {isActive && (
            <div className="flex justify-between">
              <span className="text-gray-600">Balance</span>
              <span
                className={`font-medium ${(budget.totalLimit - budget.totalSpent) >= 0
                  ? 'text-green-600'
                  : 'text-red-600'
                  }`}
              >
                {formatCurrency(budget.totalLimit - budget.totalSpent)}
              </span>
            </div>
          )}
        </div>
      </Link>
    );
  };

  const EmptyState = ({ type, status }: { type: string; status: string }) => (
    <div className="p-10 text-center">
      <Target className="w-12 h-12 text-gray-300 mx-auto mb-4" />
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        No {status} {type.toLowerCase()} budgets
      </h3>
      <p className="text-sm text-gray-500 mb-6">
        {status === 'active'
          ? `Create your first ${type.toLowerCase()} budget to start tracking your expenses`
          : `You don't have any ${status} ${type.toLowerCase()} budgets yet`}
      </p>
      {(status === 'active' || status === 'upcoming') && (
        <Link
          to="/budgets/add"
          className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-xl shadow hover:bg-indigo-700 transition"
        >
          <Plus className="w-4 h-4" />
          Add Budget
        </Link>
      )}
    </div>
  );

  if (isLoading) {
    return (
      <div className="p-4 sm:p-6 max-w-7xl mx-auto">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-28 bg-gray-200 rounded-xl animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  const currentData = activeTab === 0 ? summary?.monthly : summary?.yearly;
  const budgetType = activeTab === 0 ? 'Monthly' : 'Yearly';

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Budgets</h1>
          <p className="text-sm text-gray-500">Track and manage your spending limits</p>
        </div>
        <Link
          to="/budgets/add"
          className="mt-3 sm:mt-0 inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-xl shadow hover:bg-indigo-700 transition"
        >
          <Plus className="w-4 h-4" />
          Add Budget
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex justify-evenly gap-2 bg-gray-100 rounded-full p-1 sm:w-fit mb-4">
        {tabs.map((tab, index) => {
          const active = activeTab === index;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(index)}
              className={`px-4 w-full py-2 rounded-full text-sm font-medium transition ${active
                ? 'bg-white shadow text-gray-900'
                : 'text-gray-500 hover:text-gray-900'
                }`}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {/* Active Budget */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Active {budgetType} Budget</h2>
        {currentData?.present ? (
          <BudgetCard budget={currentData.present} isActive={true} />
        ) : (
          <EmptyState type={budgetType} status="active" />
        )}
      </div>

      {/* Upcoming Budgets */}
      {(currentData?.upcoming.length || currentData?.present) && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            Upcoming {budgetType} Budgets
          </h2>

          {currentData.upcoming?.length ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {currentData.upcoming.map((budget) => (
                <BudgetCard key={budget.id} budget={budget} />
              ))}
            </div>
          ) : (
              <EmptyState type={budgetType} status="upcoming" />
          )}
        </div>
      )}

      {/* Past Budgets */}
      {currentData && currentData?.past?.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Past {budgetType} Budgets</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {currentData.past.map((budget) => (
              <BudgetCard key={budget.id} budget={budget} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Budgets;