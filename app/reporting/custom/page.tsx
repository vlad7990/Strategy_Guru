"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, FileText, Download } from "lucide-react";

export default function CustomReportsPage() {
  const reports = [
    { name: "Executive Summary", type: "executive", lastRun: "2024-01-20", status: "ready" },
    { name: "Product Metrics", type: "product", lastRun: "2024-01-19", status: "ready" },
    { name: "Financial Overview", type: "financial", lastRun: "2024-01-18", status: "generating" },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Custom Reports</h1>
          <p className="text-gray-500 mt-2">Create and manage custom reports</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Report
        </Button>
      </div>

      <div className="space-y-4">
        {reports.map((report, index) => (
          <Card key={index}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <FileText className="h-8 w-8 text-blue-600" />
                  <div>
                    <h3 className="font-semibold text-gray-900">{report.name}</h3>
                    <p className="text-sm text-gray-500">Last run: {report.lastRun}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant={report.type === "executive" ? "default" : "outline"}>
                    {report.type}
                  </Badge>
                  <Badge variant={report.status === "ready" ? "success" : "warning"}>
                    {report.status}
                  </Badge>
                  <Button size="sm" variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
