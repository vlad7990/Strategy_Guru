"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { MousePointer, Eye, Clock, Smartphone } from "lucide-react";

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"];

export default function UserBehaviorPage() {
  const pageViews = [
    { page: "/dashboard", views: 45230, avgTime: "3:24", bounceRate: 12 },
    { page: "/analytics", views: 28450, avgTime: "5:12", bounceRate: 18 },
    { page: "/reports", views: 19280, avgTime: "4:45", bounceRate: 15 },
    { page: "/settings", views: 8920, avgTime: "2:18", bounceRate: 35 },
    { page: "/integrations", views: 6540, avgTime: "3:56", bounceRate: 22 },
  ];

  const userFlow = [
    { step: "Landing", users: 10000 },
    { step: "Sign Up", users: 4200 },
    { step: "Onboarding", users: 3800 },
    { step: "First Action", users: 3200 },
    { step: "Active User", users: 2850 },
  ];

  const deviceBreakdown = [
    { name: "Desktop", value: 65 },
    { name: "Mobile", value: 28 },
    { name: "Tablet", value: 7 },
  ];

  const clickPatterns = [
    { hour: "00:00", clicks: 820 },
    { hour: "04:00", clicks: 450 },
    { hour: "08:00", clicks: 2100 },
    { hour: "12:00", clicks: 3400 },
    { hour: "16:00", clicks: 2900 },
    { hour: "20:00", clicks: 1600 },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">User Behavior Analysis</h1>
        <p className="text-gray-500 mt-2">
          Deep dive into how users interact with your product
        </p>
      </div>

      {/* Key Behavior Metrics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Page Views</CardTitle>
            <Eye className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">108,420</div>
            <p className="text-xs text-green-600 mt-1">+15.2% from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Time on Page</CardTitle>
            <Clock className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3:48</div>
            <p className="text-xs text-green-600 mt-1">+24s from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Click-Through Rate</CardTitle>
            <MousePointer className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">68.5%</div>
            <p className="text-xs text-green-600 mt-1">+3.2% from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Mobile Users</CardTitle>
            <Smartphone className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">28%</div>
            <p className="text-xs text-green-600 mt-1">+5% from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Page Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Top Pages Performance</CardTitle>
          <CardDescription>Views, time spent, and bounce rates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {pageViews.map((page, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{page.page}</p>
                  <p className="text-sm text-gray-500 mt-1">{page.views.toLocaleString()} views</p>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <p className="text-sm text-gray-500">Avg Time</p>
                    <p className="font-semibold text-gray-900">{page.avgTime}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-500">Bounce Rate</p>
                    <p className="font-semibold text-gray-900">{page.bounceRate}%</p>
                  </div>
                  <Badge variant={page.bounceRate < 20 ? "success" : page.bounceRate < 30 ? "warning" : "destructive"}>
                    {page.bounceRate < 20 ? "Excellent" : page.bounceRate < 30 ? "Good" : "Needs Work"}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        {/* User Flow */}
        <Card>
          <CardHeader>
            <CardTitle>User Conversion Funnel</CardTitle>
            <CardDescription>User drop-off at each stage</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={userFlow} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="step" type="category" width={100} />
                <Tooltip />
                <Bar dataKey="users" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Device Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Device Distribution</CardTitle>
            <CardDescription>User sessions by device type</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={deviceBreakdown}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {deviceBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Click Patterns */}
      <Card>
        <CardHeader>
          <CardTitle>User Activity by Time of Day</CardTitle>
          <CardDescription>Click patterns throughout the day</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={clickPatterns}>
              <defs>
                <linearGradient id="colorClicks" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="hour" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="clicks"
                stroke="#3b82f6"
                fillOpacity={1}
                fill="url(#colorClicks)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
