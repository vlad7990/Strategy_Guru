"use client";

import { useStore } from "@/store/useStore";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Plus, TrendingUp, Users, Target } from "lucide-react";
import { formatDate } from "@/lib/utils";

export default function ABTestingPage() {
  const { abTests } = useStore();

  const runningTests = abTests.filter((t) => t.status === "running");
  const completedTests = abTests.filter((t) => t.status === "completed");

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "running":
        return <Badge variant="default">Running</Badge>;
      case "completed":
        return <Badge variant="success">Completed</Badge>;
      case "paused":
        return <Badge variant="warning">Paused</Badge>;
      case "draft":
        return <Badge variant="secondary">Draft</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const calculateStatSignificance = (control: number, variant: number) => {
    const diff = Math.abs(variant - control);
    const avg = (variant + control) / 2;
    const significance = (diff / avg) * 100;

    if (significance > 10) return "high";
    if (significance > 5) return "medium";
    return "low";
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">A/B Testing</h1>
          <p className="text-gray-500 mt-2">
            Manage experiments and analyze results
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Experiment
        </Button>
      </div>

      {/* Summary Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tests</CardTitle>
            <Target className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{abTests.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Running Tests</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{runningTests.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <Target className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{completedTests.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Lift</CardTitle>
            <TrendingUp className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">+16.8%</div>
          </CardContent>
        </Card>
      </div>

      {/* Tests List */}
      <Tabs defaultValue="running">
        <TabsList>
          <TabsTrigger value="running">Running ({runningTests.length})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({completedTests.length})</TabsTrigger>
          <TabsTrigger value="all">All Tests ({abTests.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="running" className="space-y-4">
          {runningTests.map((test) => {
            const control = test.variants[0];
            const variant = test.variants[1];
            const lift = ((variant.conversionRate - control.conversionRate) / control.conversionRate) * 100;
            const significance = calculateStatSignificance(control.conversionRate, variant.conversionRate);

            return (
              <Card key={test.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle>{test.name}</CardTitle>
                      <CardDescription className="mt-2">
                        Testing: {test.metric} • Started {formatDate(test.startDate)}
                      </CardDescription>
                    </div>
                    {getStatusBadge(test.status)}
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Variant Comparison */}
                  <div className="grid gap-4 md:grid-cols-2">
                    {test.variants.map((variant, index) => (
                      <div
                        key={index}
                        className={`p-4 border-2 rounded-lg ${
                          index === 0 ? "border-gray-300" : "border-blue-500"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="font-semibold text-gray-900">{variant.name}</h4>
                          {index === 1 && lift > 0 && (
                            <Badge variant="success">
                              +{lift.toFixed(1)}% lift
                            </Badge>
                          )}
                        </div>

                        <div className="space-y-3">
                          <div>
                            <p className="text-sm text-gray-500">Traffic</p>
                            <p className="text-2xl font-bold text-gray-900">
                              {variant.traffic}%
                            </p>
                          </div>

                          <div>
                            <p className="text-sm text-gray-500">Conversions</p>
                            <p className="text-2xl font-bold text-gray-900">
                              {variant.conversions}
                            </p>
                          </div>

                          <div>
                            <p className="text-sm text-gray-500">Conversion Rate</p>
                            <p className="text-3xl font-bold text-blue-600">
                              {variant.conversionRate}%
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Visual Comparison */}
                  <div>
                    <ResponsiveContainer width="100%" height={200}>
                      <BarChart
                        data={test.variants.map((v) => ({
                          name: v.name,
                          rate: v.conversionRate,
                        }))}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="rate" fill="#3b82f6" name="Conversion Rate %" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={
                          significance === "high"
                            ? "success"
                            : significance === "medium"
                            ? "warning"
                            : "secondary"
                        }
                      >
                        {significance} significance
                      </Badge>
                      <span className="text-sm text-gray-500">
                        Sample size: {test.variants.reduce((sum, v) => sum + v.conversions, 0)} conversions
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">View Details</Button>
                      <Button variant="outline" size="sm">Stop Test</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          {completedTests.map((test) => {
            const control = test.variants[0];
            const variant = test.variants[1];
            const lift = ((variant.conversionRate - control.conversionRate) / control.conversionRate) * 100;

            return (
              <Card key={test.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle>{test.name}</CardTitle>
                      <CardDescription className="mt-2">
                        {formatDate(test.startDate)} - {formatDate(test.endDate!)} • Winner: {test.winner}
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(test.status)}
                      <Badge variant="success">+{lift.toFixed(1)}% lift</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    {test.variants.map((variant, index) => (
                      <div
                        key={index}
                        className={`p-4 border rounded-lg ${
                          variant.name === test.winner ? "border-green-500 bg-green-50" : "border-gray-200"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-gray-900">{variant.name}</h4>
                          {variant.name === test.winner && (
                            <Badge variant="success">Winner</Badge>
                          )}
                        </div>
                        <p className="text-3xl font-bold text-blue-600">
                          {variant.conversionRate}%
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          {variant.conversions} conversions
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </TabsContent>

        <TabsContent value="all" className="space-y-4">
          {abTests.map((test) => (
            <Card key={test.id}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{test.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {test.metric} • {formatDate(test.startDate)}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    {getStatusBadge(test.status)}
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
