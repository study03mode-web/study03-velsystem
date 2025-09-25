import { useState } from 'react';
import {
  TrendingUp,
  TrendingDown,
  ChevronLeft,
  ChevronRight,
  DollarSign,
  BarChart3
} from 'lucide-react';
import { useFormatters } from '../hooks/useFormatters';
import { useAnalysisSummary, AnalysisParams } from '../hooks/useAnalysis';
import DateRangeModal from '../components/DateRangeModal';
import CategoryIcon from '../components/CategoryIcon';
import { Cell, Pie, ResponsiveContainer, Tooltip } from 'recharts';
import { PieChart } from 'recharts';

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
  const [activeTab, setActiveTab] = useState(1);
  const [isDateRangeModalOpen, setIsDateRangeModalOpen] = useState(false);

  const currentDate = new Date();
  const [currentWeek, setCurrentWeek] = useState(currentDate);
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth() + 1);
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
  const [customParams, setCustomParams] = useState<Partial<AnalysisParams>>({});
  const [customDisplayText, setCustomDisplayText] = useState('Custom');

  // ✅ Parse YYYY-MM-DD correctly
  const formatDisplayDate = (dateStr: string) => {
    const [year, month, day] = dateStr.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    return date.toLocaleDateString();
  };

  const getAnalysisParams = (): AnalysisParams => {
    switch (activeTab) {
      case 0: {
        // ✅ Week uses from/to instead of date+month+year
        const { start, end } = getWeekDates(currentWeek);
        const format = (d: Date) => d.toISOString().split('T')[0]; // YYYY-MM-DD
        return {
          type: 1,
          from: format(start),
          to: format(end),
        };
      }
      case 1:
        return {
          type: 2,
          month: currentMonth,
          year: currentYear,
        };
      case 2:
        return {
          type: 3,
          year: currentYear,
        };
      case 3:
        return {
          type: customParams.type === 'all' ? 'all' : 4,
          ...customParams,
        };
      default:
        return {
          type: 2,
          month: currentMonth,
          year: currentYear,
        };
    }
  };

  const { data: analysisData, isLoading, isFetching } = useAnalysisSummary(getAnalysisParams());

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
    setActiveTab(3); // ✅ switch to Custom tab only after modal confirm
    setCustomParams(params);

    if (params.type === 'all') {
      setCustomDisplayText('All Time');
    } else if (params.type === 4 && params.from && params.to) {
      setCustomDisplayText(`${formatDisplayDate(params.from)} - ${formatDisplayDate(params.to)}`);
    } else {
      setCustomDisplayText('Custom Range');
    }
  };

  const getDisplayText = () => {
    switch (activeTab) {
      case 0: {
        const { start, end } = getWeekDates(currentWeek);
        return `${start.toLocaleDateString()} - ${end.toLocaleDateString()}`;
      }
      case 1: {
        const monthNames = [
          'January', 'February', 'March', 'April', 'May', 'June',
          'July', 'August', 'September', 'October', 'November', 'December'
        ];
        return `${monthNames[currentMonth - 1]} ${currentYear}`;
      }
      case 2:
        return currentYear.toString();
      case 3:
        return customDisplayText;
      default:
        return '';
    }
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
  const showMainLoading = isLoading && !analysisData;
  const showCustomLoading = activeTab === 3 && (isFetching);

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-gray-900">Analysis</h1>
        <p className="text-sm text-gray-500">Detailed insights into your spending patterns</p>
      </div>

      {/* Tabs */}
      <div className="flex justify-evenly gap-2 bg-gray-100 rounded-full p-1 sm:w-fit mb-4">
        {tabs.map((tab, index) => {
          const active = activeTab === index;
          return (
            <button
              key={tab}
              onClick={() => {
                if (index === 3) {
                  // ✅ Custom tab -> open modal instead of switching immediately
                  setIsDateRangeModalOpen(true);
                } else {
                  setActiveTab(index);
                }
              }}
              className={`w-full px-4 py-2 rounded-full text-sm font-medium transition ${active
                ? 'bg-white shadow text-gray-900'
                : 'text-gray-500 hover:text-gray-900'
                }`}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {/* Date Navigation */}
      <div className={`bg-white rounded-xl shadow p-2 mb-4 flex items-center justify-between ${showCustomLoading ? 'opacity-50' : ''}`}>
        <button
          onClick={() => {
            if (activeTab === 0) navigateWeek('prev');
            else if (activeTab === 1) navigateMonth('prev');
            else if (activeTab === 2) navigateYear('prev');
          }}
          disabled={activeTab === 3}
          className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        </button>

        <div className="text-center">
          <h2 className="text-lg font-semibold text-gray-900">{getDisplayText()}</h2>
        </div>

        <button
          onClick={() => {
            if (activeTab === 0) navigateWeek('next');
            else if (activeTab === 1) navigateMonth('next');
            else if (activeTab === 2) navigateYear('next');
          }}
          disabled={activeTab === 3}
          className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronRight className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Summary Cards */}
      {showMainLoading ? (
        <div className="grid gap-4 sm:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 bg-gray-200 rounded-xl animate-pulse"></div>
          ))}
        </div>
      ) : (
        <div className={`grid gap-4 sm:grid-cols-3 transition-opacity ${showCustomLoading ? 'opacity-50' : ''}`}>
          <div className="bg-white rounded-xl shadow p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Spending</p>
                <p className="text-xl font-bold text-red-600">
                  {formatCurrency(analysisData?.spending || 0)}
                </p>
              </div>
              <div className="bg-red-100 rounded-full p-3">
                <TrendingDown className="h-5 w-5 text-red-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Income</p>
                <p className="text-xl font-bold text-green-600">
                  {formatCurrency(analysisData?.income || 0)}
                </p>
              </div>
              <div className="bg-green-100 rounded-full p-3">
                <TrendingUp className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Balance</p>
                <p className={`text-xl font-bold ${balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {balance >= 0 ? '+' : ''}{formatCurrency(Math.abs(balance))}
                </p>
              </div>
              <div className={`rounded-full p-3 ${balance >= 0 ? 'bg-green-100' : 'bg-red-100'}`}>
                <DollarSign className={`h-5 w-5 ${balance >= 0 ? 'text-green-600' : 'text-red-600'}`} />
              </div>
            </div>
          </div>
        </div>
      )}


      <div className={`mt-4 space-y-2 sm:space-y-4 transition-opacity ${showCustomLoading ? 'opacity-50' : ''}`}>

        {/* Spending Categories */}
        {spendingChartData.length > 0 && (
          <div
            className={`bg-white rounded-xl shadow p-4 sm:p-6 ${isFetching && !showCustomLoading ? "relative" : ""}`}
          >
            {isFetching && !showCustomLoading && (
              <div className="absolute top-2 right-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-indigo-600"></div>
              </div>
            )}
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              Category-wise Spending
            </h3>


            <>
              {/* Chart */}
              <div className="relative h-72 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={spendingChartData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      innerRadius={60}
                      dataKey="value"
                      label={({ percent }) => `${((percent ?? 0) * 100).toFixed(0)}%`}
                    >
                      {spendingChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value, name) => [
                        formatCurrency(Number(value)),
                        name,
                      ]}
                    />
                  </PieChart>
                </ResponsiveContainer>
                {/* Total in center */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <p className="text-sm text-gray-500">Total</p>
                  <p className="text-xl font-bold text-red-600">
                    {formatCurrency(analysisData?.spending || 0)}
                  </p>
                </div>
              </div>

              {/* Category List - now 3/3 layout */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {analysisData?.spendingCategory?.map((item, index) => {
                  const percentage =
                    ((item.amount / (analysisData?.spending || 1)) * 100).toFixed(1);
                  return (
                    <div
                      key={index}
                      className="rounded-xl shadow p-4 hover:shadow-md transition"
                    >
                      <div className="flex justify-between items-center gap-3">
                        <div className="flex items-center gap-3 mb-2">
                          <CategoryIcon
                            icon={item.category.icon}
                            color={item.category.color}
                            size="sm"
                          />
                          <div>
                            <p className="font-medium text-gray-900">{item.category.name}</p>
                            <p className="text-xs text-gray-500">
                              {formatCurrency(item.amount)}
                            </p>
                          </div>
                        </div>
                        <p className="text-xs text-gray-500 mt-1 text-right">{percentage}%</p>
                      </div>
                      {/* Progress bar */}
                      <div className="w-full bg-gray-100 rounded-full h-2">
                        <div
                          className="h-2 rounded-full bg-red-500"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          </div>
        )}


        {/* Income Categories */}
        {incomeChartData.length > 0 && (
          <div
            className={`bg-white rounded-xl shadow p-4 sm:p-6 ${isFetching && !showCustomLoading ? "relative" : ""}`}
          >
            {isFetching && !showCustomLoading && (
              <div className="absolute top-2 right-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-indigo-600"></div>
              </div>
            )}
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              Category-wise Income
            </h3>
            <>
              {/* Chart */}
              <div className="relative h-72 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={incomeChartData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      innerRadius={60}
                      dataKey="value"
                      label={({ percent }) => `${((percent ?? 0) * 100).toFixed(0)}%`}
                    >
                      {incomeChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value, name) => [
                        formatCurrency(Number(value)),
                        name,
                      ]}
                    />
                  </PieChart>
                </ResponsiveContainer>

                {/* Total in center */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <p className="text-sm text-gray-500">Total</p>
                  <p className="text-xl font-bold text-green-600">
                    {formatCurrency(analysisData?.income || 0)}
                  </p>
                </div>
              </div>

              {/* Category List - now 3/3 layout */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {analysisData?.incomeCategory?.map((item, index) => {
                  const percentage =
                    ((item.amount / (analysisData?.income || 1)) * 100).toFixed(1);
                  return (
                    <div
                      key={index}
                      className="rounded-xl shadow p-4 hover:shadow-md transition"
                    >
                      <div className="flex justify-between items-center gap-3">
                        <div className="flex items-center gap-3 mb-2">
                          <CategoryIcon
                            icon={item.category.icon}
                            color={item.category.color}
                            size="sm"
                          />
                          <div>
                            <p className="font-medium text-gray-900">{item.category.name}</p>
                            <p className="text-xs text-gray-500">
                              {formatCurrency(item.amount)}
                            </p>
                          </div>
                        </div>
                        <p className="text-xs text-gray-500 mt-1 text-right">{percentage}%</p>
                      </div>
                      {/* Progress bar */}
                      <div className="w-full bg-gray-100 rounded-full h-2">
                        <div
                          className="h-2 rounded-full bg-green-500"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>

                    </div>
                  );
                })}
              </div>
            </>
          </div>
        )}



        {/* Payment Modes Section */}
        {(analysisData?.spendingAccount?.length || analysisData?.incomeAccount?.length || analysisData?.transfersAccount?.length) && (
          <div className={`bg-white rounded-xl shadow p-4 sm:p-6 ${isFetching && !showCustomLoading ? "relative" : ""}`}>
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-4">
              Payment Modes
            </h3>
            <div className="space-y-4">
              {/* Spending Accounts */}
              {((analysisData?.spendingAccount?.length ?? 0) > 0) && (
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                    Spending Accounts
                  </h4>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {analysisData?.spendingAccount.map((item, i) => (
                      <div
                        key={`sp-${i}`}
                        className="rounded-xl shadow p-4 flex justify-between items-center hover:shadow-md transition"
                      >
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <span className="text-lg">{getAccountIcon(item.accountResponseDto.type)}</span>
                          <div>
                            <h3 className="font-medium text-gray-900 truncate">
                              {item.accountResponseDto.name}
                            </h3>
                            <p className="text-xs text-gray-500">
                              {getAccountTypeName(item.accountResponseDto.type)}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold text-red-600">
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
              )}

              {/* Income Accounts */}
              {((analysisData?.incomeAccount?.length ?? 0) > 0) && (
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                    Income Accounts
                  </h4>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {analysisData?.incomeAccount.map((item, i) => (
                      <div
                        key={`in-${i}`}
                        className="rounded-xl shadow p-4 flex justify-between items-center hover:shadow-md transition"
                      >
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <span className="text-lg">{getAccountIcon(item.accountResponseDto.type)}</span>
                          <div>
                            <h3 className="font-medium text-gray-900 truncate">
                              {item.accountResponseDto.name}
                            </h3>
                            <p className="text-xs text-gray-500">
                              {getAccountTypeName(item.accountResponseDto.type)}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold text-green-600">
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
              )}

              {/* Transfer Accounts */}
              {((analysisData?.transfersAccount?.length ?? 0) > 0) && (
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                    Transfer Accounts
                  </h4>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {analysisData?.transfersAccount.map((item, i) => (
                      <div
                        key={`tr-${i}`}
                        className="rounded-xl shadow p-4 flex justify-between items-center hover:shadow-md transition"
                      >
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <span className="text-lg">{getAccountIcon(item.accountResponseDto.type)}</span>
                          <div>
                            <h3 className="font-medium text-gray-900 truncate">
                              {item.accountResponseDto.name}
                            </h3>
                            <p className="text-xs text-gray-500">
                              {getAccountTypeName(item.accountResponseDto.type)}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold text-blue-600">
                            {formatCurrency(item.amount)}
                          </p>
                          <p className="text-xs text-gray-500">Transfer</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Statistics Section */}
        <div
          className={`bg-white rounded-xl shadow p-4 sm:p-6 ${isFetching && !showCustomLoading ? "relative" : ""
            }`}
        >

          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
            Statistics
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Transactions */}
            <div className="bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition p-4 flex flex-col">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-full bg-indigo-100">
                    <BarChart3 className="w-5 h-5 text-indigo-600" />
                  </div>
                  <h4 className="text-sm font-medium text-gray-700">Transactions</h4>
                </div>
              </div>
              <p className="text-xs text-gray-500">
                <span className="text-2xl font-bold text-gray-900">{analysisData?.numberOfTransactions || 0}</span> Total transactions
              </p>
            </div>

            {/* Average Spending */}
            <div className="bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition p-4 flex flex-col">
              <h4 className="text-sm font-medium text-gray-700 mb-3">
                Average Spending
              </h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-xs text-gray-600">Per Day</span>
                  <span className="text-sm font-semibold text-red-600">
                    {formatCurrency(analysisData?.averageSpendingPerDay || 0)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-gray-600">Per Transaction</span>
                  <span className="text-sm font-semibold text-red-600">
                    {formatCurrency(analysisData?.averageSpendingPerTransaction || 0)}
                  </span>
                </div>
              </div>
            </div>

            {/* Average Income */}
            <div className="bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition p-4 flex flex-col">
              <h4 className="text-sm font-medium text-gray-700 mb-3">
                Average Income
              </h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-xs text-gray-600">Per Day</span>
                  <span className="text-sm font-semibold text-green-600">
                    {formatCurrency(analysisData?.averageIncomePerDay || 0)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-gray-600">Per Transaction</span>
                  <span className="text-sm font-semibold text-green-600">
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