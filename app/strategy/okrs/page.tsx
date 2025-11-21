"use client";

import { useStore } from "@/store/useStore";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Target, Plus, TrendingUp, AlertTriangle, CheckCircle2 } from "lucide-react";

export default function OKRsPage() {
  const { objectives } = useStore();

  const onTrack = objectives.filter((o) => o.status === "on-track").length;
  const atRisk = objectives.filter((o) => o.status === "at-risk").length;
  const behind = objectives.filter((o) => o.status === "behind").length;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "on-track":
        return "text-green-600 bg-green-100";
      case "at-risk":
        return "text-yellow-600 bg-yellow-100";
      case "behind":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "on-track":
        return <CheckCircle2 className="h-4 w-4" />;
      case "at-risk":
        return <AlertTriangle className="h-4 w-4" />;
      case "behind":
        return <AlertTriangle className="h-4 w-4" />;
      default:
        return <Target className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">OKRs & Goals</h1>
          <p className="text-gray-500 mt-2">
            Track and manage objectives and key results
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Objective
        </Button>
      </div>

      {/* Summary Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total OKRs</CardTitle>
            <Target className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{objectives.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">On Track</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{onTrack}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">At Risk</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{atRisk}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Behind</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{behind}</div>
          </CardContent>
        </Card>
      </div>

      {/* OKRs List */}
      <div className="space-y-6">
        {objectives.map((objective) => (
          <Card key={objective.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <CardTitle>{objective.title}</CardTitle>
                    <Badge
                      className={getStatusColor(objective.status)}
                      variant="secondary"
                    >
                      <span className="flex items-center gap-1">
                        {getStatusIcon(objective.status)}
                        {objective.status}
                      </span>
                    </Badge>
                  </div>
                  <CardDescription className="mt-2">
                    {objective.description}
                  </CardDescription>
                  <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                    <span>
                      <strong>Owner:</strong> {objective.owner}
                    </span>
                    <span>•</span>
                    <span>
                      {objective.quarter} {objective.year}
                    </span>
                    <span>•</span>
                    <Badge variant="outline">{objective.category}</Badge>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-gray-900">
                    {objective.progress}%
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Overall Progress</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <Progress value={objective.progress} />
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-sm text-gray-900">
                  Key Results
                </h4>
                {objective.keyResults.map((kr) => (
                  <div key={kr.id} className="border-l-2 border-gray-200 pl-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">
                          {kr.description}
                        </p>
                        <div className="mt-2">
                          <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                            <span>
                              {kr.currentValue.toFixed(0)} / {kr.targetValue}{" "}
                              {kr.unit}
                            </span>
                            <span>{kr.progress}%</span>
                          </div>
                          <Progress value={kr.progress} />
                        </div>
                      </div>
                      <Badge
                        variant={
                          kr.status === "on-track"
                            ? "success"
                            : kr.status === "at-risk"
                            ? "warning"
                            : "destructive"
                        }
                      >
                        {kr.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
