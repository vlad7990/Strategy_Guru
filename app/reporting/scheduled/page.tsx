"use client";

import { useStore } from "@/store/useStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, Calendar, Mail } from "lucide-react";
import { formatDate } from "@/lib/utils";

export default function ScheduledReportsPage() {
  const { reports } = useStore();

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Scheduled Reports</h1>
          <p className="text-gray-500 mt-2">Automate report generation and delivery</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Schedule
        </Button>
      </div>

      <div className="space-y-4">
        {reports.map((report) => (
          <Card key={report.id}>
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{report.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{report.description}</p>
                  <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {report.frequency}
                    </span>
                    <span className="flex items-center gap-1">
                      <Mail className="h-4 w-4" />
                      {report.recipients.length} recipients
                    </span>
                    <span>Last: {formatDate(report.lastGenerated)}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={report.type === "executive" ? "default" : "outline"}>
                    {report.type}
                  </Badge>
                  <Button size="sm" variant="outline">Edit</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
