import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Suspense, lazy } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastProvider } from './contexts/ToastContext';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import PrivateLayout from './components/Layout/PrivateLayout';
import LoadingSpinner from './components/LoadingSpinner';
import PrivacyPolicyPage from './pages/public/PrivacyPolicyPage';
import TermsAndConditionsPage from './pages/public/TermsAndConditionsPage';

// Lazy load components
const LandingPage = lazy(() => import('./pages/public/LandingPage'));
const Auth = lazy(() => import('./pages/public/Auth'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Analysis = lazy(() => import('./pages/Analysis'));
const About = lazy(() => import('./pages/public/About'));
const PlaceholderPage = lazy(() => import('./pages/placeholder/PlaceholderPage'));
const Categories = lazy(() => import('./pages/categories/Categories'));
const CategoryForm = lazy(() => import('./pages/categories/CategoryForm'));
const Tags = lazy(() => import('./pages/Tags'));
const ScheduledTransactions = lazy(() => import('./pages/scheduledTransactions/ScheduledTransactions'));
const ScheduledTransactionForm = lazy(() => import('./pages/scheduledTransactions/ScheduledTransactionForm'));
const Budgets = lazy(() => import('./pages/budget/Budgets'));
const BudgetForm = lazy(() => import('./pages/budget/BudgetForm'));
const BudgetAnalysis = lazy(() => import('./pages/budget/BudgetAnalysis'));
const Accounts = lazy(() => import('./pages/account/Accounts'));
const AccountForm = lazy(() => import('./pages/account/AccountForm'));
const AccountDetail = lazy(() => import('./pages/account/AccountDetail'));
const Transactions = lazy(() => import('./pages/transaction/Transactions'));
const TransactionForm = lazy(() => import('./pages/transaction/TransactionForm'));
const Debts = lazy(() => import('./pages/debt/Debts'));
const DebtForm = lazy(() => import('./pages/debt/DebtForm'));
const DebtRecords = lazy(() => import('./pages/debt/record/DebtRecords'));
const DebtRecordForm = lazy(() => import('./pages/debt/record/DebtRecordForm'));
const Settings = lazy(() => import('./pages/Settings'));
const CalendarView = lazy(() => import('./pages/views/CalendarView'));
const DayView = lazy(() => import('./pages/views/DayView'));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <Suspense fallback={<LoadingSpinner />}>
          <Router>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={
                <PublicRoute>
                  <LandingPage />
                </PublicRoute>
              } />
              <Route path="/log-in-or-create-account" element={
                <PublicRoute>
                  <Auth />
                </PublicRoute>
              } />

              {/* Protected Routes */}
              <Route path="/" element={
                <ProtectedRoute>
                  <PrivateLayout />
                </ProtectedRoute>
              }>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="analysis" element={<Analysis />} />
                <Route path="accounts" element={<Accounts />} />
                <Route path="accounts/add" element={<AccountForm />} />
                <Route path="accounts/edit/:id" element={<AccountForm />} />
               <Route path="accounts/detail/:id" element={<AccountDetail />} />
                <Route path="transactions" element={<Transactions />} />
                <Route path="transactions/add" element={<TransactionForm />} />
                <Route path="transactions/edit/:id" element={<TransactionForm />} />
                <Route path="tags" element={<Tags />} />
                <Route path="budgets" element={<Budgets />} />
                <Route path="budgets/add" element={<BudgetForm />} />
                <Route path="budgets/edit/:id" element={<BudgetForm />} />
                <Route path="budgets/analysis/:budgetId" element={<BudgetAnalysis />} />
                <Route path="categories" element={<Categories />} />
                <Route path="categories/add" element={<CategoryForm />} />
                <Route path="categories/edit/:id" element={<CategoryForm />} />
                <Route path="scheduled" element={<ScheduledTransactions />} />
                <Route path="scheduled/add" element={<ScheduledTransactionForm />} />
                <Route path="scheduled/edit/:id" element={<ScheduledTransactionForm />} />
                <Route path="debts" element={<Debts />} />
                <Route path="debts/add" element={<DebtForm />} />
                <Route path="debts/edit/:id" element={<DebtForm />} />
                <Route path="debts/:debtId/records" element={<DebtRecords />} />
                <Route path="debts/:debtId/records/add" element={<DebtRecordForm />} />
                <Route path="debts/:debtId/records/edit/:recordId" element={<DebtRecordForm />} />
                <Route path="views/day" element={<DayView />} />
                <Route path="views/calendar" element={<CalendarView />} />
                <Route path="views/custom" element={
                  <PlaceholderPage
                    title="Custom Views"
                    description="Create and manage custom views of your financial data"
                  />
                } />
                <Route path="settings" element={<Settings />} />

              </Route>
              <Route path="about" element={<About />} />
              <Route path="privacy" element={<PrivacyPolicyPage />} />
              <Route path="terms" element={<TermsAndConditionsPage />} />
              {/* Redirect to dashboard for authenticated users */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Router>
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            className="!top-4 !right-4"
            toastClassName="!rounded-lg !shadow-lg"
            closeButton={false}
          />
        </Suspense>
      </ToastProvider>
    </QueryClientProvider>
  );
}

export default App;