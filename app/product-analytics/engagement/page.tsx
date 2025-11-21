"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
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
import { Users, MousePointer, Clock, Heart } from "lucide-react";

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

export default function UserEngagementPage() {
  const dailyActiveUsers = [
    { date: "Mon", users: 12450, sessions: 18200 },
    { date: "Tue", users: 13100, sessions: 19100 },
    { date: "Wed", users: 12800, sessions: 18800 },
    { date: "Thu", users: 14200, sessions: 20500 },
    { date: "Fri", users: 15100, sessions: 21800 },
    { date: "Sat", users: 10200, sessions: 14100 },
    { date: "Sun", users: 9800, sessions: 13500 },
  ];

  const sessionDuration = [
    { range: "0-1 min", users: 15 },
    { range: "1-3 min", users: 25 },
    { range: "3-5 min", users: 30 },
    { range: "5-10 min", users: 20 },
    { range: "10+ min", users: 10 },
  ];

  const featureUsage = [
    { feature: "Dashboard", usage: 92 },
    { feature: "Reports", usage: 78 },
    { feature: "Analytics", usage: 65 },
    { feature: "Settings", usage: 45 },
    { feature: "Integrations", usage: 38 },
  ];

  const userCohorts = [
    { name: "New Users", value: 25, color: "#3b82f6" },
    { name: "Active Users", value: 45, color: "#10b981" },
    { name: "Power Users", value: 20, color: "#f59e0b" },
    { name: "Churned", value: 10, color: "#ef4444" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">User Engagement</h1>
        <p className="text-gray-500 mt-2">
          Analyze user behavior, session patterns, and feature adoption
        </p>
      </div>

      {/* Key Engagement Metrics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Daily Active Users</CardTitle>
            <Users className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">13,245</div>
            <p className="text-xs text-green-600 mt-1">+12.5% from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Session Duration</CardTitle>
            <Clock className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8m 32s</div>
            <p className="text-xs text-green-600 mt-1">+1m 12s from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Engagement Rate</CardTitle>
            <MousePointer className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">73.5%</div>
            <p className="text-xs text-green-600 mt-1">+5.2% from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">User Satisfaction</CardTitle>
            <Heart className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.6/5.0</div>
            <p className="text-xs text-gray-500 mt-1">Based on 1,234 responses</p>
          </CardContent>
        </Card>
      </div>

      {/* Daily Active Users Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Daily Active Users & Sessions</CardTitle>
          <CardDescription>User activity over the past week</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={dailyActiveUsers}>
              <defs>
                <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorSessions" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area
                type="monotone"
                dataKey="users"
                stroke="#3b82f6"
                fillOpacity={1}
                fill="url(#colorUsers)"
                name="Active Users"
              />
              <Area
                type="monotone"
                dataKey="sessions"
                stroke="#10b981"
                fillOpacity={1}
                fill="url(#colorSessions)"
                name="Total Sessions"
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Session Duration Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Session Duration Distribution</CardTitle>
            <CardDescription>Percentage of users by session length</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={sessionDuration}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry: any) => `${entry.range}: ${entry.users}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="users"
                >
                  {sessionDuration.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* User Cohorts */}
        <Card>
          <CardHeader>
            <CardTitle>User Cohorts</CardTitle>
            <CardDescription>Distribution of users by engagement level</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={userCohorts}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry: any) => `${entry.name}: ${entry.value}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {userCohorts.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Feature Usage */}
      <Card>
        <CardHeader>
          <CardTitle>Feature Adoption</CardTitle>
          <CardDescription>Percentage of users engaging with each feature</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {featureUsage.map((item, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-900">{item.feature}</span>
                  <span className="text-sm font-bold text-gray-900">{item.usage}%</span>
                </div>
                <Progress value={item.usage} />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Engagement by Day */}
      <Card>
        <CardHeader>
          <CardTitle>Weekly Engagement Pattern</CardTitle>
          <CardDescription>User activity by day of week</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dailyActiveUsers}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="users" fill="#3b82f6" name="Active Users" />
              <Bar dataKey="sessions" fill="#10b981" name="Sessions" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
