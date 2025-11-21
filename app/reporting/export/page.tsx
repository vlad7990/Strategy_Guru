"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { Download, FileSpreadsheet, File } from "lucide-react";

export default function DataExportPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Data Export</h1>
        <p className="text-gray-500 mt-2">Export your data in various formats</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Export Data</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Data Type</label>
            <Select className="mt-1">
              <option>All Metrics</option>
              <option>Revenue Data</option>
              <option>Customer Data</option>
              <option>Project Data</option>
            </Select>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Format</label>
            <Select className="mt-1">
              <option>CSV</option>
              <option>Excel (XLSX)</option>
              <option>JSON</option>
              <option>PDF</option>
            </Select>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Date Range</label>
            <Select className="mt-1">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 90 days</option>
              <option>All time</option>
            </Select>
          </div>
          <Button className="w-full">
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Exports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { name: "metrics-2024-01.csv", date: "Jan 20, 2024", size: "2.4 MB" },
              { name: "revenue-report.xlsx", date: "Jan 18, 2024", size: "1.8 MB" },
              { name: "customers-export.json", date: "Jan 15, 2024", size: "3.2 MB" },
            ].map((file, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <FileSpreadsheet className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="font-medium text-gray-900">{file.name}</p>
                    <p className="text-sm text-gray-500">{file.date} • {file.size}</p>
                  </div>
                </div>
                <Button size="sm" variant="outline">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
