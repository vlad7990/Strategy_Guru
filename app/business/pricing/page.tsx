"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";

export default function PricingAnalysisPage() {
  const plans = [
    { name: "Starter", price: 29, users: 1234, revenue: 35786, features: ["Basic Analytics", "5 Projects", "Email Support"] },
    { name: "Professional", price: 99, users: 456, revenue: 45144, features: ["Advanced Analytics", "Unlimited Projects", "Priority Support", "API Access"] },
    { name: "Enterprise", price: 299, users: 89, revenue: 26611, features: ["Custom Analytics", "Unlimited Everything", "Dedicated Support", "SLA", "SSO"] },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Pricing Analysis</h1>
        <p className="text-gray-500 mt-2">Analyze pricing tiers, plan performance, and revenue optimization</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {plans.map((plan, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <div className="text-4xl font-bold text-gray-900 mt-4">
                <span className="text-sm text-gray-500 align-top">$</span>{plan.price}<span className="text-lg text-gray-500">/mo</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Subscribers</p>
                <p className="text-2xl font-bold text-gray-900">{plan.users}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Monthly Revenue</p>
                <p className="text-2xl font-bold text-blue-600"><span className="text-sm">$</span>{plan.revenue.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Features</p>
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-2 mb-1">
                    <Check className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-gray-600">{feature}</span>
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
