"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Calendar, CheckCircle2 } from "lucide-react";

export default function SprintAnalyticsPage() {
  const sprints = [
    { name: "Sprint 23", start: "Jan 15", end: "Jan 29", planned: 45, completed: 42, velocity: 93, status: "completed" },
    { name: "Sprint 24", start: "Jan 29", end: "Feb 12", planned: 48, completed: 45, velocity: 94, status: "completed" },
    { name: "Sprint 25", start: "Feb 12", end: "Feb 26", planned: 50, completed: 32, velocity: 64, status: "active" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Sprint Analytics</h1>
        <p className="text-gray-500 mt-2">Track sprint performance and team velocity</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Sprint</CardTitle>
            <Calendar className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Sprint 25</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Velocity</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">84%</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tasks This Sprint</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">32/50</div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        {sprints.map((sprint, index) => (
          <Card key={index}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{sprint.name}</CardTitle>
                <Badge variant={sprint.status === "completed" ? "success" : "default"}>
                  {sprint.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span>{sprint.start} - {sprint.end}</span>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Planned</p>
                  <p className="text-xl font-bold text-gray-900">{sprint.planned}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Completed</p>
                  <p className="text-xl font-bold text-green-600">{sprint.completed}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Velocity</p>
                  <p className="text-xl font-bold text-blue-600">{sprint.velocity}%</p>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                  <span>Sprint Progress</span>
                  <span>{sprint.velocity}%</span>
                </div>
                <Progress value={sprint.velocity} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
