"use client";

import { useStore } from "@/store/useStore";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  Target,
  AlertCircle,
  CheckCircle2,
  Clock,
} from "lucide-react";

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

export default function Dashboard() {
  const { metrics, objectives, revenueData, alerts, projects } = useStore();

  // Get top 4 key metrics
  const topMetrics = metrics.slice(0, 4);

  // OKR summary
  const okrSummary = {
    onTrack: objectives.filter((o) => o.status === "on-track").length,
    atRisk: objectives.filter((o) => o.status === "at-risk").length,
    behind: objectives.filter((o) => o.status === "behind").length,
    total: objectives.length,
  };

  // Project summary
  const projectSummary = {
    inProgress: projects.filter((p) => p.status === "in-progress").length,
    planning: projects.filter((p) => p.status === "planning").length,
    completed: projects.filter((p) => p.status === "completed").length,
    total: projects.length,
  };

  // Recent revenue data
  const recentRevenue = revenueData.filter((d) => d.revenue > 0);

  // Unread alerts
  const unreadAlerts = alerts.filter((a) => !a.read);

  const MetricCard = ({ metric }: { metric: typeof metrics[0] }) => {
    const isPositive = metric.changeType === "increase" ? metric.change! > 0 : metric.change! < 0;

    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{metric.name}</CardTitle>
          {isPositive ? (
            <TrendingUp className="h-4 w-4 text-green-600" />
          ) : (
            <TrendingDown className="h-4 w-4 text-red-600" />
          )}
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {metric.unit === "currency"
              ? formatCurrency(metric.value)
              : metric.unit === "percent"
              ? `${metric.value}%`
              : formatNumber(metric.value)}
          </div>
          <p className="text-xs text-gray-500 mt-1">
            <span
              className={isPositive ? "text-green-600" : "text-red-600"}
            >
              {isPositive ? "+" : ""}
              {metric.change?.toFixed(1)}%
            </span>{" "}
            from last period
          </p>
          {metric.target && (
            <div className="mt-2">
              <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                <span>Progress to target</span>
                <span>{((metric.value / metric.target) * 100).toFixed(0)}%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 rounded-full"
                  style={{
                    width: `${Math.min(100, (metric.value / metric.target) * 100)}%`,
                  }}
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Executive Dashboard</h1>
        <p className="text-gray-500 mt-2">
          Real-time overview of your business performance and key metrics
        </p>
      </div>

      {/* Critical Alerts */}
      {unreadAlerts.length > 0 && (
        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-900">
              <AlertCircle className="h-5 w-5" />
              {unreadAlerts.length} Unread Alert{unreadAlerts.length !== 1 && "s"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {unreadAlerts.slice(0, 3).map((alert) => (
                <div
                  key={alert.id}
                  className="flex items-start gap-3 rounded-lg bg-white p-3"
                >
                  <AlertCircle
                    className={`h-5 w-5 mt-0.5 ${
                      alert.severity === "critical"
                        ? "text-red-600"
                        : alert.severity === "warning"
                        ? "text-yellow-600"
                        : "text-blue-600"
                    }`}
                  />
                  <div className="flex-1">
                    <p className="font-medium text-sm text-gray-900">
                      {alert.title}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      {alert.description}
                    </p>
                  </div>
                  <Badge
                    variant={
                      alert.severity === "critical"
                        ? "destructive"
                        : alert.severity === "warning"
                        ? "warning"
                        : "default"
                    }
                  >
                    {alert.severity}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Key Metrics Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {topMetrics.map((metric) => (
          <MetricCard key={metric.id} metric={metric} />
        ))}
      </div>

      {/* Revenue & OKR Overview */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Revenue Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue Trend</CardTitle>
            <CardDescription>Monthly recurring revenue over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={recentRevenue}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="period" />
                <YAxis
                  tickFormatter={(value) =>
                    `$${(value / 1000000).toFixed(1)}M`
                  }
                />
                <Tooltip
                  formatter={(value: number) => [
                    formatCurrency(value),
                    "Revenue",
                  ]}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#3b82f6"
                  fillOpacity={1}
                  fill="url(#colorRevenue)"
                />
                <Line
                  type="monotone"
                  dataKey="forecast"
                  stroke="#94a3b8"
                  strokeDasharray="5 5"
                  dot={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* OKR Status */}
        <Card>
          <CardHeader>
            <CardTitle>OKR Status</CardTitle>
            <CardDescription>Quarterly objectives progress</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="flex items-center justify-center h-16 w-16 mx-auto rounded-full bg-green-100">
                    <CheckCircle2 className="h-8 w-8 text-green-600" />
                  </div>
                  <p className="mt-2 text-2xl font-bold text-gray-900">
                    {okrSummary.onTrack}
                  </p>
                  <p className="text-xs text-gray-500">On Track</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center h-16 w-16 mx-auto rounded-full bg-yellow-100">
                    <Clock className="h-8 w-8 text-yellow-600" />
                  </div>
                  <p className="mt-2 text-2xl font-bold text-gray-900">
                    {okrSummary.atRisk}
                  </p>
                  <p className="text-xs text-gray-500">At Risk</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center h-16 w-16 mx-auto rounded-full bg-red-100">
                    <AlertCircle className="h-8 w-8 text-red-600" />
                  </div>
                  <p className="mt-2 text-2xl font-bold text-gray-900">
                    {okrSummary.behind}
                  </p>
                  <p className="text-xs text-gray-500">Behind</p>
                </div>
              </div>

              <div className="space-y-3 mt-6">
                {objectives.slice(0, 3).map((objective) => (
                  <div key={objective.id}>
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-medium text-gray-900">
                        {objective.title}
                      </p>
                      <span className="text-sm text-gray-500">
                        {objective.progress}%
                      </span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          objective.status === "on-track"
                            ? "bg-green-600"
                            : objective.status === "at-risk"
                            ? "bg-yellow-600"
                            : "bg-red-600"
                        }`}
                        style={{ width: `${objective.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Projects & Team */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Active Projects */}
        <Card>
          <CardHeader>
            <CardTitle>Active Projects</CardTitle>
            <CardDescription>
              {projectSummary.inProgress} in progress, {projectSummary.planning}{" "}
              in planning
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {projects.slice(0, 3).map((project) => (
                <div key={project.id} className="border-l-4 border-blue-600 pl-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{project.name}</h4>
                      <p className="text-sm text-gray-500 mt-1">
                        {project.owner} • {project.team.length} team members
                      </p>
                    </div>
                    <Badge
                      variant={
                        project.status === "in-progress"
                          ? "default"
                          : project.status === "planning"
                          ? "secondary"
                          : "success"
                      }
                    >
                      {project.status}
                    </Badge>
                  </div>
                  <div className="mt-3">
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                      <span>Progress</span>
                      <span>{project.progress}%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-600 rounded-full"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>
                  {project.budget && project.spent && (
                    <p className="text-xs text-gray-500 mt-2">
                      Budget: {formatCurrency(project.spent)} /{" "}
                      {formatCurrency(project.budget)}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Stats</CardTitle>
            <CardDescription>At a glance metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Users className="h-8 w-8 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-500">Active Users</p>
                    <p className="text-xl font-bold text-gray-900">
                      {formatNumber(45230)}
                    </p>
                  </div>
                </div>
                <Badge variant="success">+4.9%</Badge>
              </div>

              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <DollarSign className="h-8 w-8 text-green-600" />
                  <div>
                    <p className="text-sm text-gray-500">MRR</p>
                    <p className="text-xl font-bold text-gray-900">
                      {formatCurrency(2450000)}
                    </p>
                  </div>
                </div>
                <Badge variant="success">+11.4%</Badge>
              </div>

              <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Target className="h-8 w-8 text-purple-600" />
                  <div>
                    <p className="text-sm text-gray-500">NPS Score</p>
                    <p className="text-xl font-bold text-gray-900">72</p>
                  </div>
                </div>
                <Badge variant="default">+5.9%</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
