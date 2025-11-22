"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { AIAssistant } from "@/components/ai-assistant";
import { Plus, FileText, Download } from "lucide-react";

export default function CustomReportsPage() {
  const [showNewDialog, setShowNewDialog] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    type: "product",
    frequency: "weekly",
  });

  const handleCreateReport = () => {
    console.log("Creating report:", formData);
    alert(`Report "${formData.name}" created successfully!`);
    setShowNewDialog(false);
    setFormData({ name: "", type: "product", frequency: "weekly" });
  };

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
        <Button onClick={() => setShowNewDialog(true)}>
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

      {/* AI Assistant */}
      <AIAssistant context="reports" />

      {/* New Report Dialog */}
      <Dialog open={showNewDialog} onOpenChange={setShowNewDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Custom Report</DialogTitle>
            <DialogDescription>
              Define a new custom report template
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Report Name</label>
              <Input
                placeholder="e.g., Weekly Performance Summary"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="mt-1"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Report Type</label>
              <select
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              >
                <option value="executive">Executive</option>
                <option value="product">Product</option>
                <option value="financial">Financial</option>
                <option value="customer">Customer</option>
                <option value="operational">Operational</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Frequency</label>
              <select
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                value={formData.frequency}
                onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
                <option value="on-demand">On Demand</option>
              </select>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateReport} disabled={!formData.name}>
              Create Report
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
