"use client";

import { useStore } from "@/store/useStore";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select } from "@/components/ui/select";
import { formatCurrency } from "@/lib/utils";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  ComposedChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { DollarSign, TrendingUp, Target, Activity } from "lucide-react";

export default function RevenueAnalyticsPage() {
  const { revenueData, metrics } = useStore();

  const mrrMetric = metrics.find((m) => m.name === "Monthly Recurring Revenue");
  const actualRevenue = revenueData.filter((d) => d.revenue > 0);
  const totalRevenue = actualRevenue.reduce((sum, d) => sum + d.revenue, 0);
  const avgGrowth =
    actualRevenue.reduce((sum, d) => sum + d.growth, 0) / actualRevenue.length;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Revenue Analytics</h1>
          <p className="text-gray-500 mt-2">
            Track revenue growth, trends, and forecasts
          </p>
        </div>
        <Select defaultValue="monthly">
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="quarterly">Quarterly</option>
        </Select>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current MRR</CardTitle>
            <DollarSign className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(mrrMetric?.value || 0)}
            </div>
            <p className="text-xs text-green-600 mt-1">
              +{mrrMetric?.change?.toFixed(1)}% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">YTD Revenue</CardTitle>
            <Activity className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(totalRevenue)}
            </div>
            <p className="text-xs text-gray-500 mt-1">Jan - Mar 2024</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Growth Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgGrowth.toFixed(1)}%</div>
            <p className="text-xs text-gray-500 mt-1">Month over month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Annual Target</CardTitle>
            <Target className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(30000000)}</div>
            <p className="text-xs text-gray-500 mt-1">
              {((totalRevenue / 30000000) * 100).toFixed(1)}% achieved
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Trend with Forecast */}
      <Card>
        <CardHeader>
          <CardTitle>Revenue Trend & Forecast</CardTitle>
          <CardDescription>
            Historical revenue with growth projections
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <ComposedChart data={revenueData}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="period" />
              <YAxis
                tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`}
              />
              <Tooltip
                formatter={(value: number) => formatCurrency(value)}
              />
              <Legend />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#3b82f6"
                fill="url(#colorRevenue)"
                name="Actual Revenue"
              />
              <Line
                type="monotone"
                dataKey="forecast"
                stroke="#94a3b8"
                strokeDasharray="5 5"
                strokeWidth={2}
                name="Forecast"
                dot={false}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Growth Rate */}
      <Card>
        <CardHeader>
          <CardTitle>Month-over-Month Growth Rate</CardTitle>
          <CardDescription>Percentage change in revenue</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={actualRevenue}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="period" />
              <YAxis tickFormatter={(value) => `${value}%`} />
              <Tooltip formatter={(value: number) => `${value.toFixed(1)}%`} />
              <Bar dataKey="growth" fill="#10b981" name="Growth %" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Revenue Breakdown */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>New Revenue</CardTitle>
            <CardDescription>From new customers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">
              {formatCurrency(450000)}
            </div>
            <p className="text-sm text-gray-500 mt-2">18% of total MRR</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Expansion Revenue</CardTitle>
            <CardDescription>From existing customers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">
              {formatCurrency(650000)}
            </div>
            <p className="text-sm text-gray-500 mt-2">27% of total MRR</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Churned Revenue</CardTitle>
            <CardDescription>Lost from churn</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600">
              -{formatCurrency(150000)}
            </div>
            <p className="text-sm text-gray-500 mt-2">6% of total MRR</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
