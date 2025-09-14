import { useState, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Menu } from 'lucide-react';
import Sidebar from './Sidebar';

export default function PrivateLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile header */}
        <div className="lg:hidden bg-white shadow-sm border-b border-gray-200 px-2 sm:px-4 py-4 sm:py-3">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-1.5 sm:p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100"
            >
              <Menu className="h-4 w-4 sm:h-6 sm:w-6" />
            </button>
            <div className="flex items-center space-x-1">
              <span className="text-lg sm:text-2xl font-extrabold text-indigo-600">Expense
                <span className="text-base sm:text-xl font-bold text-gray-900">Trace</span>
              </span>
            </div>
            <div className="w-8 sm:w-10"></div> {/* Spacer for centering */}
          </div>
        </div>
        
        <main className="flex-1 overflow-y-auto">
          <Suspense fallback={
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
            </div>
          }>
            <Outlet />
          </Suspense>
        </main>
      </div>
    </div>
  );
}