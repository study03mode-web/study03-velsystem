import { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import {
  TrendingUp,
  TrendingDown,
  BarChart3,
  ChevronLeft,
  ChevronRight,
  DollarSign,
  ArrowUpDown,
  Settings
} from 'lucide-react';
import { useFormatters } from '../hooks/useFormatters';
import { useAnalysisSummary, AnalysisParams } from '../hooks/useAnalysis';
import CategoryIcon from '../components/CategoryIcon';
import DateRangeModal from '../components/DateRangeModal';

const tabs = ['Week', 'Month', 'Year', 'Custom'];

const getWeekDates = (date: Date) => {
  const startOfWeek = new Date(date);
  const day = startOfWeek.getDay();
  const diff = startOfWeek.getDate() - day;
  startOfWeek.setDate(diff);

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);

  return { start: startOfWeek, end: endOfWeek };
};

function Analysis() {
  const { formatCurrency } = useFormatters();
  const [activeTab, setActiveTab] = useState(1); // Default to Month
  const [isDateRangeModalOpen, setIsDateRangeModalOpen] = useState(false);

  // Current date state
  const currentDate = new Date();
  const [currentWeek, setCurrentWeek] = useState(currentDate);
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth() + 1);
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
  const [customParams, setCustomParams] = useState<Partial<AnalysisParams>>({});

  // Build API parameters based on active tab
  const getAnalysisParams = (): AnalysisParams => {
    switch (activeTab) {
      case 0: // Week
        return {
          type: 'week',
          date: currentWeek.getDate(),
          month: currentWeek.getMonth() + 1,
          year: currentWeek.getFullYear(),
        };
      case 1: // Month
        return {
          type: 'month',
          month: currentMonth,
          year: currentYear,
        };
      case 2: // Year
        return {
          type: 'year',
          year: currentYear,
        };
      case 3: // Custom
        return {
          type: customParams.type || 'custom',
          ...customParams,
        };
      default:
        return {
          type: 'month',
          month: currentMonth,
          year: currentYear,
        };
    }
  };

  const { data: analysisData, isLoading } = useAnalysisSummary(getAnalysisParams());

  // Navigation functions
  const navigateWeek = (direction: 'prev' | 'next') => {
    const newWeek = new Date(currentWeek);
    newWeek.setDate(newWeek.getDate() + (direction === 'next' ? 7 : -7));
    setCurrentWeek(newWeek);
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      if (currentMonth === 1) {
        setCurrentMonth(12);
        setCurrentYear(currentYear - 1);
      } else {
        setCurrentMonth(currentMonth - 1);
      }
    } else {
      if (currentMonth === 12) {
        setCurrentMonth(1);
        setCurrentYear(currentYear + 1);
      } else {
        setCurrentMonth(currentMonth + 1);
      }
    }
  };

  const navigateYear = (direction: 'prev' | 'next') => {
    setCurrentYear(currentYear + (direction === 'next' ? 1 : -1));
  };

  const handleCustomDateRange = (params: Partial<AnalysisParams>) => {
    setCustomParams(params);
  };

  // Get color hex value from category color name
  const getCategoryColorHex = (colorName: string): string => {
    const colorMap: Record<string, string> = {
      'indigo': '#6366F1',
      'teal': '#14B8A6',
      'yellow': '#F59E0B',
      'orange': '#F97316',
      'maroon': '#991B1B',
      'pink': '#EC4899',
      'lime': '#84CC16',
      'violet': '#8B5CF6',
      'rose': '#F43F5E',
      'slate': '#64748B',
      'sky': '#0EA5E9',
      'purple': '#A855F7',
      'stone': '#78716C',
      'red': '#EF4444',
      'green': '#22C55E',
      'blue': '#3B82F6',
      'amber': '#F59E0B',
      'cyan': '#06B6D4',
      'emerald': '#10B981',
      'fuchsia': '#D946EF',
      'gray': '#6B7280',
      'zinc': '#71717A',
      'brown': '#92400E',
      'magenta': '#BE185D',
      'bronze': '#A16207',
      'peach': '#FED7AA',
      'lavender': '#DDD6FE',
      'mint': '#BBF7D0',
      'olive': '#365314',
      'navy': '#1E3A8A',
      'gold': '#FBBF24',
      'charcoal': '#374151',
      'coral': '#FCA5A5',
      'aqua': '#A7F3D0',
      'plum': '#6B21A8',
      'mustard': '#D97706',
      'ruby': '#B91C1C',
      'sapphire': '#1E3A8A',
      'topaz': '#FDE047'
    };
    return colorMap[colorName] || '#6B7280';
  };

  // Get account type icon
  const getAccountIcon = (type: number) => {
    switch (type) {
      case 1: // Bank
        return '🏦';
      case 2: // Wallet  
        return '👛';
      case 3: // Credit Card
        return '💳';
      case 4: // Cash
        return '💵';
      default:
        return '🏦';
    }
  };

  // Get account type name
  const getAccountTypeName = (type: number) => {
    switch (type) {
      case 1: return 'Bank Account';
      case 2: return 'Wallet';
      case 3: return 'Credit Card';
      case 4: return 'Cash';
      default: return 'Account';
    }
  };

  // Format display text
  const getDisplayText = () => {
    switch (activeTab) {
      case 0: // Week
        {
          const { start, end } = getWeekDates(currentWeek);
          return `${start.toLocaleDateString()} - ${end.toLocaleDateString()}`;
        }
      case 1: // Month
        {
          const monthNames = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
          ];
          return `${monthNames[currentMonth - 1]} ${currentYear}`;
        }
      case 2: // Year
        return currentYear.toString();
      case 3: // Custom
        if (customParams.type === 'all') {
          return 'All Time';
        } else if (customParams.type === 'custom') {
          return 'Custom Range';
        }
        return 'Custom';
      default:
        return '';
    }
  };

  // Prepare chart data
  const spendingChartData = analysisData?.spendingCategory?.map(item => ({
    name: item.category.name,
    value: item.amount,
    color: getCategoryColorHex(item.category.color),
  })) || [];

  const incomeChartData = analysisData?.incomeCategory?.map(item => ({
    name: item.category.name,
    value: item.amount,
    color: getCategoryColorHex(item.category.color),
  })) || [];

  const balance = (analysisData?.income || 0) - (analysisData?.spending || 0);

  if (isLoading) {
    return (
      <div className="p-3 sm:p-4 lg:p-6 max-w-7xl mx-auto">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-48 mb-6"></div>
          <div className="h-12 bg-gray-200 rounded mb-6"></div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-64 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-3 sm:p-4 lg:p-6 max-w-7xl mx-auto min-h-screen">
      <div className="mb-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Analysis</h1>
        <p className="text-sm sm:text-base text-gray-600 mt-1">Detailed insights into your spending patterns</p>
      </div>

      {/* Tabs */}
      <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
        {tabs.map((tab, index) => {
          const active = activeTab === index;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(index)}
              className={`flex-1 text-xs sm:text-sm font-medium rounded-lg py-2 transition-all duration-200 ${active
                ? "bg-white shadow text-black"
                : "text-gray-500 hover:text-black"
                }`}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {/* Date Navigation */}
      <div className="bg-white rounded-lg shadow p-4 sm:p-6 mb-6">
        <div className="flex items-center justify-between">
          <button
            onClick={() => {
              if (activeTab === 0) navigateWeek('prev');
              else if (activeTab === 1) navigateMonth('prev');
              else if (activeTab === 2) navigateYear('prev');
            }}
            disabled={activeTab === 3}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
          </button>

          <div className="text-center">
            <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900">
              {getDisplayText()}
            </h2>
            <p className="text-sm text-gray-500 capitalize">{tabs[activeTab]} Analysis</p>
          </div>

          {activeTab === 3 ? (
            <button
              onClick={() => setIsDateRangeModalOpen(true)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Settings className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
            </button>
          ) : (
            <button
              onClick={() => {
                if (activeTab === 0) navigateWeek('next');
                else if (activeTab === 1) navigateMonth('next');
                else if (activeTab === 2) navigateYear('next');
              }}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
            </button>
          )}
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <div className="bg-white rounded-lg shadow p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-600">Total Spending</p>
              <p className="text-xl sm:text-2xl font-bold text-red-600">
                {formatCurrency(analysisData?.spending || 0)}
              </p>
            </div>
            <div className="bg-red-100 rounded-full p-2 sm:p-3">
              <TrendingDown className="h-5 w-5 sm:h-6 sm:w-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-600">Total Income</p>
              <p className="text-xl sm:text-2xl font-bold text-green-600">
                {formatCurrency(analysisData?.income || 0)}
              </p>
            </div>
            <div className="bg-green-100 rounded-full p-2 sm:p-3">
              <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-600">Balance</p>
              <p className={`text-xl sm:text-2xl font-bold ${balance >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                {balance >= 0 ? '+' : ''}{formatCurrency(Math.abs(balance))}
              </p>
            </div>
            <div className={`rounded-full p-2 sm:p-3 ${balance >= 0 ? 'bg-green-100' : 'bg-red-100'
              }`}>
              <DollarSign className={`h-5 w-5 sm:h-6 sm:w-6 ${balance >= 0 ? 'text-green-600' : 'text-red-600'
                }`} />
            </div>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="space-y-6 sm:space-y-8">
        {/* Spending Categories */}
        <div className="bg-white rounded-lg shadow p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 sm:mb-6">
            Category-wise Spending
          </h3>

          {spendingChartData.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Chart */}
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={spendingChartData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ percent }) => `${((percent ?? 0) * 100).toFixed(0)}%`}
                    >
                      {spendingChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Category List */}
              <div className="max-h-60 overflow-y-auto">
                <div className="space-y-3">
                  {analysisData?.spendingCategory?.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-center space-x-3">
                        <CategoryIcon
                          icon={item.category.icon}
                          color={item.category.color}
                          size="sm"
                        />
                        <div>
                          <p className="font-medium text-gray-900">{item.category.name}</p>
                          <p className="text-xs text-gray-500">Expense Category</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-red-600">
                          {formatCurrency(item.amount)}
                        </p>
                        <p className="text-xs text-gray-500">
                          {((item.amount / (analysisData?.spending || 1)) * 100).toFixed(1)}%
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              No spending data available for this period
            </div>
          )}
        </div>

        {/* Income Categories */}
        <div className="bg-white rounded-lg shadow p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 sm:mb-6">
            Category-wise Income
          </h3>

          {incomeChartData.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Chart */}
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={incomeChartData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                    >
                      {incomeChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Category List */}
              <div className="max-h-60 overflow-y-auto">
                <div className="space-y-3">
                  {analysisData?.incomeCategory?.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-center space-x-3">
                        <CategoryIcon
                          icon={item.category.icon}
                          color={item.category.color}
                          size="sm"
                        />
                        <div>
                          <p className="font-medium text-gray-900">{item.category.name}</p>
                          <p className="text-xs text-gray-500">Income Category</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-green-600">
                          {formatCurrency(item.amount)}
                        </p>
                        <p className="text-xs text-gray-500">
                          {((item.amount / (analysisData?.income || 1)) * 100).toFixed(1)}%
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              No income data available for this period
            </div>
          )}
        </div>

        {/* Payment Modes Section */}
        <div className="bg-white rounded-lg shadow p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 sm:mb-6">
            Payment Modes
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
            {/* Spending Accounts */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                <TrendingDown className="w-4 h-4 mr-2 text-red-600" />
                Spending Accounts
              </h4>
              <div className="space-y-3">
                {analysisData?.spendingAccount?.length ? (
                  analysisData.spendingAccount.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 border border-red-200 rounded-lg bg-red-50 hover:bg-red-100 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-lg">{getAccountIcon(item.accountResponseDto.type)}</span>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{item.accountResponseDto.name}</p>
                          <p className="text-xs text-gray-600">{getAccountTypeName(item.accountResponseDto.type)}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-red-600">{formatCurrency(item.amount)}</p>
                        <p className="text-xs text-gray-500">
                          {((item.amount / (analysisData?.spending || 1)) * 100).toFixed(1)}%
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-4">
                    <p className="text-sm text-gray-500">No spending accounts</p>
                  </div>
                )}
              </div>
            </div>

            {/* Income Accounts */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                <TrendingUp className="w-4 h-4 mr-2 text-green-600" />
                Income Accounts
              </h4>
              <div className="space-y-3">
                {analysisData?.incomeAccount?.length ? (
                  analysisData.incomeAccount.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 border border-green-200 rounded-lg bg-green-50 hover:bg-green-100 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-lg">{getAccountIcon(item.accountResponseDto.type)}</span>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{item.accountResponseDto.name}</p>
                          <p className="text-xs text-gray-600">{getAccountTypeName(item.accountResponseDto.type)}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-green-600">{formatCurrency(item.amount)}</p>
                        <p className="text-xs text-gray-500">
                          {((item.amount / (analysisData?.income || 1)) * 100).toFixed(1)}%
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-4">
                    <p className="text-sm text-gray-500">No income accounts</p>
                  </div>
                )}
              </div>
            </div>

            {/* Transfer Accounts */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                <ArrowUpDown className="w-4 h-4 mr-2 text-blue-600" />
                Transfer Accounts
              </h4>
              <div className="space-y-3">
                {analysisData?.transfersAccount?.length ? (
                  analysisData.transfersAccount.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 border border-blue-200 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-lg">{getAccountIcon(item.accountResponseDto.type)}</span>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{item.accountResponseDto.name}</p>
                          <p className="text-xs text-gray-600">{getAccountTypeName(item.accountResponseDto.type)}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-blue-600">{formatCurrency(item.amount)}</p>
                        <p className="text-xs text-gray-500">Transfer</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-4">
                    <p className="text-sm text-gray-500">No transfer accounts</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>


        {/* Statistics Section */}
        <div className="bg-white rounded-lg shadow p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 sm:mb-6">
            Statistics
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Number of Transactions */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-medium text-gray-700">Transactions</h4>
                <BarChart3 className="w-5 h-5 text-indigo-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">
                {analysisData?.numberOfTransactions || 0}
              </p>
              <p className="text-xs text-gray-500">Total transactions</p>
            </div>

            {/* Average Spending */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Average Spending</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-xs text-gray-600">Per Day:</span>
                  <span className="text-sm font-medium text-red-600">
                    {formatCurrency(analysisData?.averageSpendingPerDay || 0)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-gray-600">Per Transaction:</span>
                  <span className="text-sm font-medium text-red-600">
                    {formatCurrency(analysisData?.averageSpendingPerTransaction || 0)}
                  </span>
                </div>
              </div>
            </div>

            {/* Average Income */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Average Income</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-xs text-gray-600">Per Day:</span>
                  <span className="text-sm font-medium text-green-600">
                    {formatCurrency(analysisData?.averageIncomePerDay || 0)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-gray-600">Per Transaction:</span>
                  <span className="text-sm font-medium text-green-600">
                    {formatCurrency(analysisData?.averageIncomePerTransaction || 0)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Date Range Modal */}
      <DateRangeModal
        isOpen={isDateRangeModalOpen}
        onClose={() => setIsDateRangeModalOpen(false)}
        onApply={handleCustomDateRange}
      />
    </div>
  );
}

export default Analysis;