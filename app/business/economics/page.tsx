"use client";

import { useStore } from "@/store/useStore";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { DollarSign, TrendingUp, TrendingDown, Target } from "lucide-react";

export default function UnitEconomicsPage() {
  const { unitEconomics } = useStore();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Unit Economics</h1>
        <p className="text-gray-500 mt-2">
          Track customer acquisition, lifetime value, and profitability metrics
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {unitEconomics.map((item, index) => {
          const isPositive = item.change && item.change > 0;
          const isRatio = item.metric.includes("Ratio") || item.metric.includes("Period");

          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-sm font-medium">{item.metric}</CardTitle>
                <DollarSign className="h-5 w-5 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900">
                  {isRatio ? item.value.toFixed(1) + "x" : formatCurrency(item.value)}
                </div>
                {item.previousValue && item.change && (
                  <div className="flex items-center gap-2 mt-3">
                    {isPositive ? (
                      <TrendingUp className="h-4 w-4 text-green-600" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-600" />
                    )}
                    <span className={isPositive ? "text-sm text-green-600" : "text-sm text-red-600"}>
                      {isPositive ? "+" : ""}{item.change.toFixed(1)}%
                    </span>
                    <span className="text-sm text-gray-500">from previous period</span>
                  </div>
                )}
                {item.target && (
                  <div className="mt-3 flex items-center gap-2 text-sm text-gray-500">
                    <Target className="h-4 w-4" />
                    <span>
                      Target: {isRatio ? item.target.toFixed(1) + "x" : formatCurrency(item.target)}
                    </span>
                  </div>
                )}
                {item.previousValue && (
                  <p className="text-sm text-gray-500 mt-2">
                    Previous: {isRatio ? item.previousValue.toFixed(1) + "x" : formatCurrency(item.previousValue)}
                  </p>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Unit Economics Analysis</CardTitle>
          <CardDescription>Key insights and recommendations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <h4 className="font-semibold text-green-900 mb-2">Strong Performance</h4>
              <p className="text-sm text-green-800">
                LTV:CAC ratio of 9.3x indicates excellent unit economics. Industry standard is 3-5x.
              </p>
            </div>
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">Opportunity</h4>
              <p className="text-sm text-blue-800">
                Payback period of 8 months is competitive. Reducing to 6 months would improve cash flow.
              </p>
            </div>
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h4 className="font-semibold text-yellow-900 mb-2">Recommendation</h4>
              <p className="text-sm text-yellow-800">
                Focus on increasing LTV through upsells and reducing churn to improve overall unit economics.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
