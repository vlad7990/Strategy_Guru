"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Activity, Zap, Clock, AlertCircle } from "lucide-react";

export default function PerformanceMetricsPage() {
  const performanceData = [
    { time: "00:00", responseTime: 120, throughput: 850, errorRate: 0.2 },
    { time: "04:00", responseTime: 110, throughput: 920, errorRate: 0.1 },
    { time: "08:00", responseTime: 180, throughput: 1450, errorRate: 0.5 },
    { time: "12:00", responseTime: 220, throughput: 1680, errorRate: 0.8 },
    { time: "16:00", responseTime: 195, throughput: 1520, errorRate: 0.6 },
    { time: "20:00", responseTime: 145, throughput: 1100, errorRate: 0.3 },
  ];

  const endpointData = [
    { endpoint: "/api/users", avgTime: 145, calls: 12450, errors: 12 },
    { endpoint: "/api/products", avgTime: 210, calls: 18340, errors: 45 },
    { endpoint: "/api/orders", avgTime: 320, calls: 8920, errors: 8 },
    { endpoint: "/api/analytics", avgTime: 580, calls: 5420, errors: 23 },
    { endpoint: "/api/auth", avgTime: 95, calls: 22100, errors: 5 },
  ];

  const databaseMetrics = [
    { metric: "Query Time", value: "45ms", status: "good", change: -12 },
    { metric: "Connection Pool", value: "78%", status: "warning", change: 5 },
    { metric: "Slow Queries", value: "23", status: "warning", change: -8 },
    { metric: "Cache Hit Rate", value: "94.2%", status: "good", change: 3 },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Performance Metrics</h1>
        <p className="text-gray-500 mt-2">
          Monitor application performance, response times, and system health
        </p>
      </div>

      {/* Key Performance Indicators */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
            <Clock className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">145ms</div>
            <p className="text-xs text-green-600 mt-1">-12% from yesterday</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Throughput</CardTitle>
            <Activity className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,245 req/s</div>
            <p className="text-xs text-green-600 mt-1">+8% from yesterday</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Error Rate</CardTitle>
            <AlertCircle className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0.42%</div>
            <p className="text-xs text-green-600 mt-1">-0.15% from yesterday</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Uptime</CardTitle>
            <Zap className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">99.97%</div>
            <p className="text-xs text-gray-500 mt-1">Last 30 days</p>
          </CardContent>
        </Card>
      </div>

      {/* Performance Trends */}
      <Tabs defaultValue="response">
        <TabsList>
          <TabsTrigger value="response">Response Time</TabsTrigger>
          <TabsTrigger value="throughput">Throughput</TabsTrigger>
          <TabsTrigger value="errors">Error Rate</TabsTrigger>
        </TabsList>

        <TabsContent value="response">
          <Card>
            <CardHeader>
              <CardTitle>Response Time Over Time</CardTitle>
              <CardDescription>Average response time (ms) by hour</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <AreaChart data={performanceData}>
                  <defs>
                    <linearGradient id="colorResponse" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="responseTime"
                    stroke="#3b82f6"
                    fillOpacity={1}
                    fill="url(#colorResponse)"
                    name="Response Time (ms)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="throughput">
          <Card>
            <CardHeader>
              <CardTitle>Throughput Over Time</CardTitle>
              <CardDescription>Requests per second by hour</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="throughput"
                    stroke="#10b981"
                    strokeWidth={2}
                    name="Requests/sec"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="errors">
          <Card>
            <CardHeader>
              <CardTitle>Error Rate Over Time</CardTitle>
              <CardDescription>Error percentage by hour</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <AreaChart data={performanceData}>
                  <defs>
                    <linearGradient id="colorError" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="errorRate"
                    stroke="#ef4444"
                    fillOpacity={1}
                    fill="url(#colorError)"
                    name="Error Rate (%)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Endpoint Performance */}
      <Card>
        <CardHeader>
          <CardTitle>API Endpoint Performance</CardTitle>
          <CardDescription>Response time and call volume by endpoint</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={endpointData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="endpoint" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Bar yAxisId="left" dataKey="avgTime" fill="#3b82f6" name="Avg Time (ms)" />
              <Bar yAxisId="right" dataKey="calls" fill="#10b981" name="Total Calls" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Database Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>Database Performance</CardTitle>
          <CardDescription>Database query and connection metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {databaseMetrics.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div>
                    <p className="font-medium text-gray-900">{item.metric}</p>
                    <p className="text-sm text-gray-500">
                      {item.change > 0 ? "+" : ""}
                      {item.change}% from yesterday
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-bold text-gray-900">{item.value}</span>
                  <Badge
                    variant={
                      item.status === "good"
                        ? "success"
                        : item.status === "warning"
                        ? "warning"
                        : "destructive"
                    }
                  >
                    {item.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
