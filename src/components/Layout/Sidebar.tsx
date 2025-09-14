import { Link, NavLink, useLocation } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import {
  BarChart3,
  TrendingUp,
  CreditCard,
  ArrowUpDown,
  Tag,
  Target,
  FolderOpen,
  Calendar,
  Users,
  Eye,
  CalendarDays,
  Sliders as Sliders3,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronDown,
  ChevronRight,
  X,
} from "lucide-react";
import { useLogout } from "../../hooks/useAuth";

/* ---- Flat Menu Config ---- */
const menuConfig = [
  { name: "Dashboard", path: "/dashboard", icon: BarChart3 },
  { name: "Analysis", path: "/analysis", icon: TrendingUp },
  { name: "Accounts", path: "/accounts", icon: CreditCard },
  { name: "Transactions", path: "/transactions", icon: ArrowUpDown },
  { name: "Tags", path: "/tags", icon: Tag },
  { name: "Budgets", path: "/budgets", icon: Target },
  { name: "Categories", path: "/categories", icon: FolderOpen },
  { name: "Scheduled Transactions", path: "/scheduled", icon: Calendar },
  { name: "Debts", path: "/debts", icon: Users },
  {
    name: "Views",
    icon: Eye,
    submenu: [
      { name: "Day", path: "/views/day", icon: CalendarDays },
      { name: "Calendar", path: "/views/calendar", icon: Calendar },
      { name: "Custom", path: "/views/custom", icon: Sliders3 },
    ],
  },
  { name: "Settings", path: "/settings", icon: Settings },
];

/* ---- Tooltip for condensed mode ---- */
function SidebarTooltip({ label }: { label: string }) {
  return (
    <div
      role="tooltip"
      className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50"
    >
      {label}
    </div>
  );
}

/* ---- Sidebar Item ---- */
function SidebarItem({
  item,
  shouldShowCondensed,
  isOpen,
  onClose,
}: {
  item: { name: string; path: string; icon: any };
  shouldShowCondensed: boolean;
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <div key={item.name} className="relative group">
      <NavLink
        to={item.path}
        onClick={() => {
          if (isOpen) onClose();
        }}
        aria-label={shouldShowCondensed ? item.name : undefined}
        className={({ isActive }) =>
          `flex items-center px-2 sm:px-3 py-2 text-sm font-medium rounded-md transition-colors 
          focus:outline-none focus-visible:ring focus-visible:ring-indigo-300
          ${isActive
            ? "bg-indigo-50 text-blue-600 border-r-2 border-blue-600"
            : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
          }
          ${shouldShowCondensed ? "justify-center" : ""}`
        }
      >
        <item.icon
          className={`h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0 ${shouldShowCondensed ? "" : "mr-2 sm:mr-3"
            }`}
          aria-hidden
        />
        <span
          className={`transition-[max-width,opacity] duration-300 overflow-hidden truncate ${shouldShowCondensed ? "max-w-0 opacity-0" : "max-w-full opacity-100"
            }`}
          title={item.name}
        >
          {item.name}
        </span>
      </NavLink>
      {shouldShowCondensed && <SidebarTooltip label={item.name} />}
    </div>
  );
}

/* ---- Sidebar Submenu ---- */
function SidebarSubMenu({
  section,
  isViewsExpanded,
  setIsViewsExpanded,
  shouldShowCondensed,
  isOpen,
  onClose,
}: {
  section: any;
  isViewsExpanded: boolean;
  setIsViewsExpanded: (v: boolean) => void;
  shouldShowCondensed: boolean;
  isOpen: boolean;
  onClose: () => void;
}) {
  const location = useLocation();

  // check if current route matches any child submenu path
  const isAnyChildActive = section.submenu.some((item: any) =>
    location.pathname.startsWith(item.path)
  );

  // auto-expand if a submenu child is active
  useEffect(() => {
    if (isAnyChildActive) setIsViewsExpanded(true);
  }, [isAnyChildActive, setIsViewsExpanded]);

  return (
    <div className="relative group">
      <button
        onClick={() => setIsViewsExpanded(!isViewsExpanded)}
        aria-expanded={isViewsExpanded}
        aria-controls="views-submenu"
        className={`w-full flex items-center py-2 text-sm font-medium rounded-md transition-colors
        focus:outline-none focus-visible:ring focus-visible:ring-indigo-300
        ${isAnyChildActive
            ? `bg-indigo-50 text-blue-600 ${shouldShowCondensed && `border-r-2 border-blue-600`}`
            : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
          }
        ${shouldShowCondensed ? "justify-center px-2" : "justify-between px-2 sm:px-3"}`}
      >
        <div className="flex items-center">
          <section.icon
            className={`h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0 ${shouldShowCondensed ? "" : "mr-2 sm:mr-3"
              }`}
            aria-hidden
          />
          <span
            className={`transition-[max-width,opacity] duration-300 overflow-hidden ${shouldShowCondensed ? "max-w-0 opacity-0" : "max-w-full opacity-100"
              }`}
          >
            {section.name}
          </span>
        </div>
        {!shouldShowCondensed && (
          <div className="transition-transform duration-200">
            {isViewsExpanded ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </div>
        )}
      </button>

      {shouldShowCondensed && <SidebarTooltip label={section.name} />}

      {/* Submenu */}
      {!shouldShowCondensed && (
        <div
          id="views-submenu"
          className={`ml-4 sm:ml-6 mt-1 overflow-hidden transition-all duration-300 
    ${isViewsExpanded
              ? "max-h-screen opacity-100"
              : "max-h-0 opacity-0"
            }`}
          aria-hidden={!isViewsExpanded}
        >
          <div className="space-y-1">
            {section.submenu.map((item: any) => (
              <SidebarItem
                key={item.name}
                item={item}
                shouldShowCondensed={shouldShowCondensed}
                isOpen={isOpen}
                onClose={onClose}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ---- Sidebar Main ---- */
interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const logout = useLogout();
  const [isViewsExpanded, setIsViewsExpanded] = useState(false);
  const [isCondensed, setIsCondensed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [logoutError, setLogoutError] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const prev = document.body.style.overflow;
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = prev || "";
    return () => {
      document.body.style.overflow = prev || "";
    };
  }, [isOpen]);

  const shouldShowCondensed = useMemo(
    () => isCondensed && !isHovered && !isOpen,
    [isCondensed, isHovered, isOpen]
  );

  useEffect(() => {
    if (shouldShowCondensed) setIsViewsExpanded(false);
  }, [shouldShowCondensed]);

  const handleLogout = () => {
    setLogoutError(null);
    logout.mutate(undefined, {
      onError: (err: any) => {
        const message =
          err?.response?.data?.message ||
          err?.message ||
          "Logout failed. Please try again.";
        setLogoutError(message);
      },
    });
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
          aria-hidden
        />
      )}

      <aside
        aria-hidden={!isOpen && isMobile}
        className={`fixed lg:static inset-y-0 left-0 z-50 bg-white shadow-lg h-screen flex flex-col transform transition-all duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        ${shouldShowCondensed ? "w-16" : "w-64 sm:w-72 lg:w-64"}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Mobile Close */}
        <div className="lg:hidden absolute top-3 right-3 sm:top-4 sm:right-4">
          <button
            onClick={onClose}
            className="p-1.5 sm:p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-indigo-300"
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>
        </div>

        {/* Header */}
        <div className="p-1 sm:p-2 border-b border-gray-200 flex-shrink-0">
          <div className={`flex items-center ${shouldShowCondensed ? "justify-center" : "justify-between"}`}>
            {/* Logo */}
            <Link to="/">
              {shouldShowCondensed ? (
                <img
                  src="/logo1.png"
                  alt="Logo Icon"
                  className="h-8 w-8 sm:h-10 sm:w-10 object-contain"
                />
              ) : (
                <img
                  src="/logo.png"
                  alt="ExpenseTrace Logo"
                  className="h-8 sm:h-10 lg:h-12 w-auto object-contain"
                />
              )}
            </Link>

            {!shouldShowCondensed && (
              <button
                onClick={() => setIsCondensed((s) => !s)}
                className="hidden lg:block p-1.5 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-indigo-300"
              >
                <ChevronLeft
                  className="h-5 w-5 transition-transform duration-300"
                />
              </button>
            )}
          </div>
        </div>

        {/* Menu */}
        <nav
          className="flex-1 overflow-y-auto scrollbar-hide p-3 sm:p-4"
          aria-label="Primary"
        >
          <div className="space-y-1">
            {menuConfig.map((item) =>
              item.submenu ? (
                <SidebarSubMenu
                  key={item.name}
                  section={item}
                  isViewsExpanded={isViewsExpanded}
                  setIsViewsExpanded={setIsViewsExpanded}
                  shouldShowCondensed={shouldShowCondensed}
                  isOpen={isOpen}
                  onClose={onClose}
                />
              ) : (
                <SidebarItem
                  key={item.name}
                  item={item}
                  shouldShowCondensed={shouldShowCondensed}
                  isOpen={isOpen}
                  onClose={onClose}
                />
              )
            )}
          </div>
        </nav>

        {/* Footer - Logout */}
        <div className="p-3 sm:p-4 border-t border-gray-200">
          <div className="relative group">
            <button
              onClick={handleLogout}
              disabled={logout.isPending}
              className={`w-full flex items-center px-2 sm:px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 rounded-md transition-colors disabled:opacity-50 focus:outline-none focus-visible:ring focus-visible:ring-indigo-300 ${shouldShowCondensed ? "justify-center" : ""
                }`}
            >
              <LogOut
                className={`h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0 ${shouldShowCondensed ? "" : "mr-2 sm:mr-3"
                  }`}
                aria-hidden
              />
              <span
                className={`transition-[max-width,opacity] duration-300 overflow-hidden ${shouldShowCondensed ? "max-w-0 opacity-0" : "max-w-xs opacity-100"
                  }`}
              >
                {logout.isPending ? "Signing out..." : "Sign Out"}
              </span>
            </button>
            {shouldShowCondensed && <SidebarTooltip label="Sign Out" />}
          </div>
          {logoutError && (
            <div className="mt-2 text-xs text-red-600 px-2" role="alert">
              {logoutError}
            </div>
          )}
        </div>
      </aside>
    </>
  );
}