"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  LineChart,
  Line,
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
import { TrendingUp, DollarSign, Users, Globe } from "lucide-react";

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

export default function MarketAnalysisPage() {
  const marketGrowth = [
    { year: "2020", size: 120 },
    { year: "2021", size: 145 },
    { year: "2022", size: 178 },
    { year: "2023", size: 215 },
    { year: "2024", size: 260 },
    { year: "2025", size: 312 },
  ];

  const marketShare = [
    { name: "Our Company", value: 8, color: "#3b82f6" },
    { name: "Competitor A", value: 32, color: "#ef4444" },
    { name: "Competitor B", value: 18, color: "#f59e0b" },
    { name: "Competitor C", value: 12, color: "#8b5cf6" },
    { name: "Others", value: 30, color: "#94a3b8" },
  ];

  const regionalGrowth = [
    { region: "North America", growth: 15, size: 85 },
    { region: "Europe", growth: 22, size: 68 },
    { region: "Asia Pacific", growth: 38, size: 92 },
    { region: "Latin America", growth: 28, size: 24 },
    { region: "Middle East & Africa", growth: 31, size: 18 },
  ];

  const segments = [
    { segment: "Enterprise", value: 45 },
    { segment: "Mid-Market", value: 30 },
    { segment: "SMB", value: 15 },
    { segment: "Startups", value: 10 },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Market Analysis</h1>
        <p className="text-gray-500 mt-2">
          Comprehensive market insights, trends, and opportunities
        </p>
      </div>

      {/* Market Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Market Size</CardTitle>
            <DollarSign className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$260B</div>
            <p className="text-xs text-green-600 mt-1">+21% YoY growth</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Our Market Share</CardTitle>
            <TrendingUp className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8.2%</div>
            <p className="text-xs text-green-600 mt-1">+1.2% from last year</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Target Customers</CardTitle>
            <Users className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12.5M</div>
            <p className="text-xs text-gray-500 mt-1">Addressable market</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Growth Rate</CardTitle>
            <Globe className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">21% CAGR</div>
            <p className="text-xs text-gray-500 mt-1">2024-2028 forecast</p>
          </CardContent>
        </Card>
      </div>

      {/* Market Growth Trend */}
      <Card>
        <CardHeader>
          <CardTitle>Market Size Growth Trend</CardTitle>
          <CardDescription>Historical and projected market size ($B)</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={marketGrowth}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip formatter={(value: number) => `$${value}B`} />
              <Line
                type="monotone"
                dataKey="size"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={{ fill: "#3b82f6", r: 6 }}
                name="Market Size"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Market Share */}
        <Card>
          <CardHeader>
            <CardTitle>Market Share Distribution</CardTitle>
            <CardDescription>Current market share by player</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={marketShare}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {marketShare.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Customer Segments */}
        <Card>
          <CardHeader>
            <CardTitle>Customer Segment Distribution</CardTitle>
            <CardDescription>Revenue by customer segment</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={segments}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry: any) => `${entry.segment}: ${entry.value}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {segments.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Regional Growth */}
      <Card>
        <CardHeader>
          <CardTitle>Regional Growth Analysis</CardTitle>
          <CardDescription>Growth rate and market size by region</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={regionalGrowth}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="region" />
              <YAxis yAxisId="left" label={{ value: "Growth %", angle: -90, position: "insideLeft" }} />
              <YAxis yAxisId="right" orientation="right" label={{ value: "Size $B", angle: 90, position: "insideRight" }} />
              <Tooltip />
              <Legend />
              <Bar yAxisId="left" dataKey="growth" fill="#10b981" name="Growth Rate %" />
              <Bar yAxisId="right" dataKey="size" fill="#3b82f6" name="Market Size $B" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Market Trends */}
      <Card>
        <CardHeader>
          <CardTitle>Key Market Trends</CardTitle>
          <CardDescription>Emerging trends and opportunities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                title: "AI Integration",
                impact: "High",
                description: "Growing demand for AI-powered features across all segments",
              },
              {
                title: "Remote Collaboration",
                impact: "High",
                description: "Continued growth in distributed team solutions",
              },
              {
                title: "Data Privacy",
                impact: "Medium",
                description: "Increasing focus on data security and compliance",
              },
              {
                title: "Mobile-First",
                impact: "Medium",
                description: "Shift towards mobile-native experiences",
              },
              {
                title: "Integration Ecosystem",
                impact: "High",
                description: "Platform approach with extensive third-party integrations",
              },
            ].map((trend, index) => (
              <div key={index} className="flex items-start justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">{trend.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{trend.description}</p>
                </div>
                <Badge
                  variant={
                    trend.impact === "High"
                      ? "destructive"
                      : trend.impact === "Medium"
                      ? "warning"
                      : "secondary"
                  }
                >
                  {trend.impact} Impact
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
