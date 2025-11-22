"use client";

import { useState } from "react";
import { useStore } from "@/store/useStore";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { AIAssistant } from "@/components/ai-assistant";
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import { Plus, AlertTriangle, TrendingUp, Award } from "lucide-react";

export default function CompetitiveIntelligencePage() {
  const { competitors } = useStore();
  const [showNewDialog, setShowNewDialog] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    marketShare: 0,
    threat: "medium",
  });

  const handleAddCompetitor = () => {
    console.log("Adding competitor:", formData);
    alert(`Competitor "${formData.name}" added successfully!`);
    setShowNewDialog(false);
    setFormData({ name: "", marketShare: 0, threat: "medium" });
  };

  const getThreatBadge = (threat: string) => {
    switch (threat) {
      case "high":
        return <Badge variant="destructive">High Threat</Badge>;
      case "medium":
        return <Badge variant="warning">Medium Threat</Badge>;
      case "low":
        return <Badge variant="secondary">Low Threat</Badge>;
      default:
        return <Badge>{threat}</Badge>;
    }
  };

  // Competitive positioning data
  const competitiveMetrics = [
    {
      metric: "Features",
      us: 85,
      competitorA: 90,
      competitorB: 70,
    },
    {
      metric: "Pricing",
      us: 80,
      competitorA: 60,
      competitorB: 85,
    },
    {
      metric: "UX",
      us: 90,
      competitorA: 70,
      competitorB: 95,
    },
    {
      metric: "Support",
      us: 88,
      competitorA: 75,
      competitorB: 80,
    },
    {
      metric: "Innovation",
      us: 85,
      competitorA: 80,
      competitorB: 90,
    },
    {
      metric: "Brand",
      us: 70,
      competitorA: 95,
      competitorB: 75,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Competitive Intelligence</h1>
          <p className="text-gray-500 mt-2">
            Monitor competitors and track market positioning
          </p>
        </div>
        <Button onClick={() => setShowNewDialog(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Competitor
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tracked Competitors</CardTitle>
            <Award className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{competitors.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Threat</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {competitors.filter((c) => c.threat === "high").length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Market Leader</CardTitle>
            <TrendingUp className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {competitors.reduce((max, c) => (c.marketShare > max ? c.marketShare : max), 0)}%
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Competitive Positioning Radar */}
      <Card>
        <CardHeader>
          <CardTitle>Competitive Positioning Analysis</CardTitle>
          <CardDescription>Multi-dimensional competitive comparison</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={450}>
            <RadarChart data={competitiveMetrics}>
              <PolarGrid />
              <PolarAngleAxis dataKey="metric" />
              <PolarRadiusAxis angle={90} domain={[0, 100]} />
              <Radar
                name="Us"
                dataKey="us"
                stroke="#3b82f6"
                fill="#3b82f6"
                fillOpacity={0.6}
              />
              <Radar
                name="Competitor A"
                dataKey="competitorA"
                stroke="#ef4444"
                fill="#ef4444"
                fillOpacity={0.3}
              />
              <Radar
                name="Competitor B"
                dataKey="competitorB"
                stroke="#10b981"
                fill="#10b981"
                fillOpacity={0.3}
              />
              <Legend />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Competitor Details */}
      <div className="space-y-6">
        {competitors.map((competitor) => (
          <Card key={competitor.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle>{competitor.name}</CardTitle>
                  <CardDescription className="mt-2">
                    Market Share: {competitor.marketShare}%
                  </CardDescription>
                </div>
                {getThreatBadge(competitor.threat)}
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                {/* Strengths */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                    Strengths
                  </h4>
                  <ul className="space-y-2">
                    {competitor.strengths.map((strength, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-600 mt-2" />
                        <span className="text-sm text-gray-700">{strength}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Weaknesses */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-600" />
                    Weaknesses
                  </h4>
                  <ul className="space-y-2">
                    {competitor.weaknesses.map((weakness, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-600 mt-2" />
                        <span className="text-sm text-gray-700">{weakness}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Recent Moves */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Recent Strategic Moves</h4>
                <div className="space-y-2">
                  {competitor.recentMoves.map((move, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg"
                    >
                      <Badge variant="outline" className="mt-0.5">
                        {new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                      </Badge>
                      <span className="text-sm text-gray-900">{move}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t">
                <Button variant="outline" size="sm">
                  View Full Analysis
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Competitive Matrix */}
      <Card>
        <CardHeader>
          <CardTitle>Feature Comparison Matrix</CardTitle>
          <CardDescription>Key feature availability across competitors</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4 font-semibold text-gray-900">Feature</th>
                  <th className="text-center p-4 font-semibold text-blue-600">Us</th>
                  <th className="text-center p-4 font-semibold text-gray-600">Competitor A</th>
                  <th className="text-center p-4 font-semibold text-gray-600">Competitor B</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: "Real-time Analytics", us: true, a: true, b: false },
                  { feature: "API Access", us: true, a: true, b: true },
                  { feature: "Mobile App", us: true, a: false, b: true },
                  { feature: "Advanced Reporting", us: true, a: true, b: false },
                  { feature: "Custom Integrations", us: true, a: false, b: true },
                  { feature: "AI-Powered Insights", us: true, a: true, b: true },
                  { feature: "White Label", us: false, a: true, b: false },
                  { feature: "24/7 Support", us: true, a: true, b: false },
                ].map((row, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="p-4 text-gray-900">{row.feature}</td>
                    <td className="p-4 text-center">
                      {row.us ? (
                        <span className="text-green-600 font-semibold">✓</span>
                      ) : (
                        <span className="text-gray-300">—</span>
                      )}
                    </td>
                    <td className="p-4 text-center">
                      {row.a ? (
                        <span className="text-green-600 font-semibold">✓</span>
                      ) : (
                        <span className="text-gray-300">—</span>
                      )}
                    </td>
                    <td className="p-4 text-center">
                      {row.b ? (
                        <span className="text-green-600 font-semibold">✓</span>
                      ) : (
                        <span className="text-gray-300">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* AI Assistant */}
      <AIAssistant context="competitive" />

      {/* New Competitor Dialog */}
      <Dialog open={showNewDialog} onOpenChange={setShowNewDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Competitor</DialogTitle>
            <DialogDescription>
              Track a new competitor and analyze their market position
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Competitor Name</label>
              <Input
                placeholder="e.g., Competitor X"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="mt-1"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Market Share (%)</label>
              <Input
                type="number"
                placeholder="e.g., 15"
                value={formData.marketShare || ""}
                onChange={(e) => setFormData({ ...formData, marketShare: parseFloat(e.target.value) || 0 })}
                className="mt-1"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Threat Level</label>
              <select
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                value={formData.threat}
                onChange={(e) => setFormData({ ...formData, threat: e.target.value })}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddCompetitor} disabled={!formData.name}>
              Add Competitor
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
