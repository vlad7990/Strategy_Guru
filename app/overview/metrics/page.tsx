"use client";

import { useStore } from "@/store/useStore";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select } from "@/components/ui/select";
import { formatCurrency, formatNumber, formatPercent } from "@/lib/utils";
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
import { TrendingUp, TrendingDown, ArrowUp, ArrowDown } from "lucide-react";

export default function KeyMetricsPage() {
  const { metrics } = useStore();

  const getChangeColor = (metric: typeof metrics[0]) => {
    const isPositive = metric.changeType === "increase" ? metric.change! > 0 : metric.change! < 0;
    return isPositive ? "text-green-600" : "text-red-600";
  };

  const getChangeIcon = (metric: typeof metrics[0]) => {
    const isPositive = metric.changeType === "increase" ? metric.change! > 0 : metric.change! < 0;
    return isPositive ? (
      <TrendingUp className="h-5 w-5 text-green-600" />
    ) : (
      <TrendingDown className="h-5 w-5 text-red-600" />
    );
  };

  // Prepare trend data
  const trendData = [
    { period: "6 months ago", value: 1800000 },
    { period: "5 months ago", value: 1950000 },
    { period: "4 months ago", value: 2050000 },
    { period: "3 months ago", value: 2100000 },
    { period: "2 months ago", value: 2200000 },
    { period: "Last month", value: 2350000 },
    { period: "This month", value: 2450000 },
  ];

  const userTrendData = [
    { period: "6 months ago", value: 38000 },
    { period: "5 months ago", value: 39500 },
    { period: "4 months ago", value: 41000 },
    { period: "3 months ago", value: 42000 },
    { period: "2 months ago", value: 43100 },
    { period: "Last month", value: 44200 },
    { period: "This month", value: 45230 },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Key Metrics Summary</h1>
          <p className="text-gray-500 mt-2">
            Comprehensive view of all business metrics and KPIs
          </p>
        </div>
        <Select defaultValue="30days">
          <option value="7days">Last 7 days</option>
          <option value="30days">Last 30 days</option>
          <option value="90days">Last 90 days</option>
          <option value="1year">Last year</option>
        </Select>
      </div>

      {/* All Metrics Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {metrics.map((metric) => (
          <Card key={metric.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-base">{metric.name}</CardTitle>
                </div>
                {getChangeIcon(metric)}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="text-3xl font-bold text-gray-900">
                  {metric.unit === "currency"
                    ? formatCurrency(metric.value)
                    : metric.unit === "percent"
                    ? `${metric.value}%`
                    : formatNumber(metric.value)}
                </div>
                <p className={`text-sm mt-1 ${getChangeColor(metric)}`}>
                  {metric.change! > 0 ? "+" : ""}
                  {metric.change?.toFixed(1)}% from previous period
                </p>
              </div>

              {metric.previousValue && (
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>Previous</span>
                  <span className="font-medium">
                    {metric.unit === "currency"
                      ? formatCurrency(metric.previousValue)
                      : metric.unit === "percent"
                      ? `${metric.previousValue}%`
                      : formatNumber(metric.previousValue)}
                  </span>
                </div>
              )}

              {metric.target && (
                <div>
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                    <span>Target Progress</span>
                    <span className="font-medium">
                      {((metric.value / metric.target) * 100).toFixed(0)}%
                    </span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        (metric.value / metric.target) * 100 >= 90
                          ? "bg-green-600"
                          : (metric.value / metric.target) * 100 >= 70
                          ? "bg-blue-600"
                          : "bg-yellow-600"
                      }`}
                      style={{
                        width: `${Math.min(100, (metric.value / metric.target) * 100)}%`,
                      }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Target: {metric.unit === "currency"
                      ? formatCurrency(metric.target)
                      : metric.unit === "percent"
                      ? `${metric.target}%`
                      : formatNumber(metric.target)}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Trend Charts */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Trend</CardTitle>
            <CardDescription>6-month revenue growth trajectory</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={trendData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="period" angle={-45} textAnchor="end" height={80} />
                <YAxis tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`} />
                <Tooltip formatter={(value: number) => formatCurrency(value)} />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#3b82f6"
                  fillOpacity={1}
                  fill="url(#colorValue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>User Growth Trend</CardTitle>
            <CardDescription>Active users over the last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={userTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="period" angle={-45} textAnchor="end" height={80} />
                <YAxis tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`} />
                <Tooltip formatter={(value: number) => formatNumber(value)} />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#10b981"
                  strokeWidth={2}
                  dot={{ fill: "#10b981" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Metric Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>Metric Performance Comparison</CardTitle>
          <CardDescription>Current vs previous period</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={metrics.map((m) => ({
                name: m.name,
                current: m.value,
                previous: m.previousValue || 0,
              }))}
              layout="horizontal"
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" width={150} />
              <Tooltip />
              <Legend />
              <Bar dataKey="current" fill="#3b82f6" name="Current Period" />
              <Bar dataKey="previous" fill="#94a3b8" name="Previous Period" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
