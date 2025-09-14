import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, CreditCard, Target, Calendar } from 'lucide-react';
import { useFormatters } from '../hooks/useFormatters';

const monthlyData = [
  { name: 'Jan', spending: 2400, budget: 3000 },
  { name: 'Feb', spending: 2800, budget: 3000 },
  { name: 'Mar', spending: 2200, budget: 3000 },
  { name: 'Apr', spending: 3100, budget: 3000 },
  { name: 'May', spending: 2900, budget: 3000 },
  { name: 'Jun', spending: 2600, budget: 3000 },
];

const categoryData = [
  { name: 'Food', value: 35, color: '#8B5CF6' },
  { name: 'Transportation', value: 20, color: '#10B981' },
  { name: 'Shopping', value: 15, color: '#F59E0B' },
  { name: 'Entertainment', value: 12, color: '#EF4444' },
  { name: 'Utilities', value: 10, color: '#3B82F6' },
  { name: 'Other', value: 8, color: '#6B7280' },
];

function Dashboard() {
  const { formatCurrency } = useFormatters();

  return (
    <div className="p-3 sm:p-4 lg:p-6 max-w-7xl mx-auto min-h-screen">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm sm:text-base text-gray-600 mt-1">Track your expenses and financial goals</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
        <div className="bg-white rounded-lg shadow p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-600">Total Spending</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">{formatCurrency(2840)}</p>
            </div>
            <div className="bg-red-100 rounded-full p-2 sm:p-3">
              <TrendingDown className="h-5 w-5 sm:h-6 sm:w-6 text-red-600" />
            </div>
          </div>
          <div className="mt-3 sm:mt-4 flex items-center">
            <span className="text-xs sm:text-sm text-red-600">-12%</span>
            <span className="text-xs sm:text-sm text-gray-600 ml-2">from last month</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-600">Monthly Budget</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">{formatCurrency(3000)}</p>
            </div>
            <div className="bg-blue-100 rounded-full p-2 sm:p-3">
              <Target className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-3 sm:mt-4 flex items-center">
            <span className="text-xs sm:text-sm text-green-600">{formatCurrency(160)} left</span>
            <span className="text-xs sm:text-sm text-gray-600 ml-2">this month</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-600">Income</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">{formatCurrency(5200)}</p>
            </div>
            <div className="bg-green-100 rounded-full p-2 sm:p-3">
              <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
            </div>
          </div>
          <div className="mt-3 sm:mt-4 flex items-center">
            <span className="text-xs sm:text-sm text-green-600">+8%</span>
            <span className="text-xs sm:text-sm text-gray-600 ml-2">from last month</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-600">Savings Rate</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">45%</p>
            </div>
            <div className="bg-purple-100 rounded-full p-2 sm:p-3">
              <DollarSign className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-3 sm:mt-4 flex items-center">
            <span className="text-xs sm:text-sm text-green-600">+5%</span>
            <span className="text-xs sm:text-sm text-gray-600 ml-2">from last month</span>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <div className="bg-white rounded-lg shadow p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Monthly Spending vs Budget</h3>
          <div className="h-48 sm:h-64 md:h-72 lg:h-80">
            <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="spending" fill="#6366F1" />
              <Bar dataKey="budget" fill="#E5E7EB" />
            </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Spending by Category</h3>
          <div className="h-48 sm:h-64 md:h-72 lg:h-80">
            <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 sm:p-6 border-b border-gray-200">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900">Recent Transactions</h3>
        </div>
        <div className="p-4 sm:p-6">
          <div className="space-y-3 sm:space-y-4">
            {[
              { id: 1, description: 'Grocery Store', category: 'Food', amount: -85.50, date: '2025-01-15' },
              { id: 2, description: 'Gas Station', category: 'Transportation', amount: -45.20, date: '2025-01-14' },
              { id: 3, description: 'Salary', category: 'Income', amount: 2600.00, date: '2025-01-13' },
              { id: 4, description: 'Netflix', category: 'Entertainment', amount: -15.99, date: '2025-01-12' },
              { id: 5, description: 'Amazon', category: 'Shopping', amount: -129.99, date: '2025-01-11' },
            ].map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between py-2 sm:py-3 border-b border-gray-100 last:border-b-0 gap-2 sm:gap-3 lg:gap-4">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    transaction.amount > 0 ? 'bg-green-100' : 'bg-red-100'
                  }`}>
                    {transaction.amount > 0 ? (
                      <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
                    ) : (
                      <CreditCard className="h-4 w-4 sm:h-5 sm:w-5 text-red-600" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm sm:text-base font-medium text-gray-900 truncate">{transaction.description}</p>
                    <p className="text-xs sm:text-sm text-gray-600 truncate block sm:hidden lg:block">{transaction.category}</p>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className={`text-sm sm:text-base font-medium ${
                    transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {transaction.amount > 0 ? '+' : ''}{formatCurrency(Math.abs(transaction.amount))}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-600 hidden md:block">{transaction.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;