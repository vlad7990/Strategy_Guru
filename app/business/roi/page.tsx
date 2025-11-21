"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, DollarSign, Target } from "lucide-react";

export default function ROITrackingPage() {
  const investments = [
    { name: "Marketing Campaign Q1", invested: 250000, returned: 420000, roi: 68, status: "completed" },
    { name: "Product Feature Launch", invested: 180000, returned: 310000, roi: 72, status: "completed" },
    { name: "Sales Team Expansion", invested: 320000, returned: 580000, roi: 81, status: "in-progress" },
    { name: "Infrastructure Upgrade", invested: 150000, returned: 195000, roi: 30, status: "completed" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">ROI Tracking</h1>
        <p className="text-gray-500 mt-2">Track return on investment across all initiatives</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Invested</CardTitle>
            <DollarSign className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold"><span className="text-sm text-gray-500">$</span>900K</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Return</CardTitle>
            <TrendingUp className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600"><span className="text-sm">$</span>1.5M</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average ROI</CardTitle>
            <Target className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">63%</div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        {investments.map((inv, index) => (
          <Card key={index}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{inv.name}</h3>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                    <span>Invested: <span className="text-sm">$</span>{(inv.invested / 1000).toFixed(0)}K</span>
                    <span>•</span>
                    <span>Returned: <span className="text-sm">$</span>{(inv.returned / 1000).toFixed(0)}K</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-3xl font-bold text-green-600">{inv.roi}%</p>
                    <p className="text-xs text-gray-500">ROI</p>
                  </div>
                  <Badge variant={inv.status === "completed" ? "success" : "default"}>
                    {inv.status}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
