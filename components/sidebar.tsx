"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useStore } from "@/store/useStore";
import {
  LayoutDashboard,
  BarChart3,
  Target,
  Users,
  DollarSign,
  Rocket,
  FileText,
  Settings,
  ChevronDown,
  ChevronRight,
  Search,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import { Input } from "./ui/input";

interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  children?: {
    title: string;
    href: string;
  }[];
}

const navigation: NavItem[] = [
  {
    title: "Overview",
    href: "/",
    icon: LayoutDashboard,
    children: [
      { title: "Executive Dashboard", href: "/" },
      { title: "Key Metrics", href: "/overview/metrics" },
      { title: "Alerts", href: "/overview/alerts" },
    ],
  },
  {
    title: "Product Analytics",
    href: "/product-analytics",
    icon: BarChart3,
    children: [
      { title: "Performance Metrics", href: "/product-analytics/performance" },
      { title: "Feature Analytics", href: "/product-analytics/features" },
      { title: "User Engagement", href: "/product-analytics/engagement" },
      { title: "A/B Testing", href: "/product-analytics/ab-testing" },
    ],
  },
  {
    title: "Strategy & Planning",
    href: "/strategy",
    icon: Target,
    children: [
      { title: "OKRs & Goals", href: "/strategy/okrs" },
      { title: "Product Roadmap", href: "/strategy/roadmap" },
      { title: "Market Analysis", href: "/strategy/market" },
      { title: "Competitive Intelligence", href: "/strategy/competitive" },
    ],
  },
  {
    title: "Customer Insights",
    href: "/customers",
    icon: Users,
    children: [
      { title: "User Behavior", href: "/customers/behavior" },
      { title: "Customer Feedback", href: "/customers/feedback" },
      { title: "Journey Mapping", href: "/customers/journey" },
      { title: "Segmentation", href: "/customers/segments" },
    ],
  },
  {
    title: "Business Metrics",
    href: "/business",
    icon: DollarSign,
    children: [
      { title: "Revenue Analytics", href: "/business/revenue" },
      { title: "Unit Economics", href: "/business/economics" },
      { title: "Pricing Analysis", href: "/business/pricing" },
      { title: "ROI Tracking", href: "/business/roi" },
    ],
  },
  {
    title: "Execution",
    href: "/execution",
    icon: Rocket,
    children: [
      { title: "Project Management", href: "/execution/projects" },
      { title: "Resource Planning", href: "/execution/resources" },
      { title: "Team Performance", href: "/execution/team" },
      { title: "Sprint Analytics", href: "/execution/sprints" },
    ],
  },
  {
    title: "Reporting",
    href: "/reporting",
    icon: FileText,
    children: [
      { title: "Custom Reports", href: "/reporting/custom" },
      { title: "Data Export", href: "/reporting/export" },
      { title: "Scheduled Reports", href: "/reporting/scheduled" },
      { title: "Historical Analysis", href: "/reporting/historical" },
    ],
  },
  {
    title: "Administration",
    href: "/admin",
    icon: Settings,
    children: [
      { title: "User Management", href: "/admin/users" },
      { title: "Data Sources", href: "/admin/sources" },
      { title: "Integrations", href: "/admin/integrations" },
      { title: "Settings", href: "/admin/settings" },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const { sidebarOpen, toggleSidebar } = useStore();
  const [expandedSections, setExpandedSections] = useState<string[]>([
    "Overview",
  ]);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleSection = (title: string) => {
    setExpandedSections((prev) =>
      prev.includes(title)
        ? prev.filter((t) => t !== title)
        : [...prev, title]
    );
  };

  const filteredNavigation = navigation
    .map((item) => ({
      ...item,
      children: item.children?.filter((child) =>
        child.title.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter(
      (item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.children && item.children.length > 0)
    );

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 h-screen w-72 transform border-r border-gray-200 bg-white transition-transform duration-200 ease-in-out lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-200 p-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Strategy Guru</h2>
              <p className="text-xs text-gray-500">CPO & Strategy Platform</p>
            </div>
            <button
              onClick={toggleSidebar}
              className="lg:hidden text-gray-500 hover:text-gray-700"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Search */}
          <div className="border-b border-gray-200 p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-1">
              {filteredNavigation.map((item) => {
                const isExpanded = expandedSections.includes(item.title);
                const isActive =
                  pathname === item.href ||
                  item.children?.some((child) => pathname === child.href);

                return (
                  <li key={item.title}>
                    <button
                      onClick={() => toggleSection(item.title)}
                      className={cn(
                        "flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                        isActive
                          ? "bg-blue-50 text-blue-700"
                          : "text-gray-700 hover:bg-gray-100"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <item.icon className="h-5 w-5" />
                        <span>{item.title}</span>
                      </div>
                      {item.children && (
                        <>
                          {isExpanded ? (
                            <ChevronDown className="h-4 w-4" />
                          ) : (
                            <ChevronRight className="h-4 w-4" />
                          )}
                        </>
                      )}
                    </button>

                    {/* Children */}
                    {item.children && isExpanded && (
                      <ul className="ml-8 mt-1 space-y-1">
                        {item.children.map((child) => {
                          const isChildActive = pathname === child.href;
                          return (
                            <li key={child.href}>
                              <Link
                                href={child.href}
                                className={cn(
                                  "block rounded-lg px-3 py-2 text-sm transition-colors",
                                  isChildActive
                                    ? "bg-blue-50 text-blue-700 font-medium"
                                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                )}
                              >
                                {child.title}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* User info */}
          <div className="border-t border-gray-200 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white font-semibold">
                SJ
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Sarah Johnson</p>
                <p className="text-xs text-gray-500">Chief Product Officer</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile menu button */}
      <button
        onClick={toggleSidebar}
        className="fixed bottom-4 right-4 z-50 rounded-full bg-blue-600 p-4 text-white shadow-lg lg:hidden"
      >
        <Menu className="h-6 w-6" />
      </button>
    </>
  );
}
