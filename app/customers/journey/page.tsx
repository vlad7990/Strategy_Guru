"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";

export default function JourneyMappingPage() {
  const journey = [
    { stage: "Awareness", touchpoints: ["Social Media", "Blog", "SEO"], conversion: 100, satisfaction: 4.2 },
    { stage: "Consideration", touchpoints: ["Product Demo", "Case Studies", "Pricing Page"], conversion: 42, satisfaction: 4.5 },
    { stage: "Purchase", touchpoints: ["Free Trial", "Sales Call", "Checkout"], conversion: 18, satisfaction: 4.3 },
    { stage: "Onboarding", touchpoints: ["Welcome Email", "Tutorial", "Support Chat"], conversion: 95, satisfaction: 4.6 },
    { stage: "Adoption", touchpoints: ["Feature Guides", "Webinars", "Success Manager"], conversion: 78, satisfaction: 4.4 },
    { stage: "Retention", touchpoints: ["Updates", "Community", "Account Reviews"], conversion: 92, satisfaction: 4.7 },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Customer Journey Mapping</h1>
        <p className="text-gray-500 mt-2">
          Visualize and optimize the customer experience across all touchpoints
        </p>
      </div>

      {/* Journey Flow */}
      <div className="grid gap-4 md:grid-cols-6">
        {journey.map((stage, index) => (
          <Card key={index} className={index === 0 ? "border-blue-500 border-2" : ""}>
            <CardHeader>
              <CardTitle className="text-base">{stage.stage}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-xs font-medium text-gray-500 mb-2">Touchpoints</p>
                {stage.touchpoints.map((touch, i) => (
                  <Badge key={i} variant="outline" className="text-xs mb-1 mr-1">
                    {touch}
                  </Badge>
                ))}
              </div>
              <div>
                <p className="text-xs text-gray-500">Conversion</p>
                <p className="text-xl font-bold text-blue-600">{stage.conversion}%</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Satisfaction</p>
                <div className="flex items-center gap-1">
                  <p className="text-xl font-bold text-gray-900">{stage.satisfaction}</p>
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pain Points */}
      <Card>
        <CardHeader>
          <CardTitle>Identified Pain Points</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { stage: "Purchase", issue: "Complex checkout process", impact: "High" },
              { stage: "Onboarding", issue: "Unclear value proposition", impact: "Medium" },
              { stage: "Adoption", issue: "Feature discovery challenges", impact: "High" },
            ].map((pain, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <AlertCircle className="h-5 w-5 text-red-600" />
                  <div>
                    <p className="font-medium text-gray-900">{pain.issue}</p>
                    <p className="text-sm text-gray-500">{pain.stage} stage</p>
                  </div>
                </div>
                <Badge variant={pain.impact === "High" ? "destructive" : "warning"}>
                  {pain.impact} Impact
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
