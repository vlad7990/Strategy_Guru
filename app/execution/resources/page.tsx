"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Users, Briefcase } from "lucide-react";

export default function ResourcePlanningPage() {
  const resources = [
    { name: "Engineering", allocated: 15, available: 5, utilization: 75 },
    { name: "Design", allocated: 5, available: 2, utilization: 60 },
    { name: "Product Management", allocated: 4, available: 1, utilization: 75 },
    { name: "Marketing", allocated: 8, available: 3, utilization: 62 },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Resource Planning</h1>
        <p className="text-gray-500 mt-2">Optimize resource allocation across projects</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Resources</CardTitle>
            <Users className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">32</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Utilization</CardTitle>
            <Briefcase className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">68%</div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        {resources.map((resource, index) => (
          <Card key={index}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">{resource.name}</h3>
                <Badge variant={resource.utilization > 70 ? "warning" : "success"}>
                  {resource.utilization}% utilized
                </Badge>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-500">Allocated</p>
                  <p className="text-xl font-bold text-gray-900">{resource.allocated}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Available</p>
                  <p className="text-xl font-bold text-green-600">{resource.available}</p>
                </div>
              </div>
              <Progress value={resource.utilization} />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
