"use client";

import { useStore } from "@/store/useStore";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  BarChart,
  Bar,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { formatNumber } from "@/lib/utils";
import { Star, TrendingUp, Users } from "lucide-react";

export default function FeatureAnalyticsPage() {
  const { featureAnalytics } = useStore();

  const radarData = featureAnalytics.map((f) => ({
    feature: f.featureName,
    adoption: f.adoptionRate,
    engagement: f.engagementScore * 10,
    retention: f.retentionRate,
    satisfaction: f.satisfactionScore * 20,
  }));

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Feature Analytics</h1>
        <p className="text-gray-500 mt-2">
          Analyze feature adoption, engagement, and satisfaction
        </p>
      </div>

      {/* Feature Comparison Radar */}
      <Card>
        <CardHeader>
          <CardTitle>Feature Performance Comparison</CardTitle>
          <CardDescription>
            Multi-dimensional view of feature metrics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <RadarChart data={radarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="feature" />
              <PolarRadiusAxis angle={90} domain={[0, 100]} />
              <Radar
                name="Adoption Rate"
                dataKey="adoption"
                stroke="#3b82f6"
                fill="#3b82f6"
                fillOpacity={0.5}
              />
              <Radar
                name="Engagement"
                dataKey="engagement"
                stroke="#10b981"
                fill="#10b981"
                fillOpacity={0.5}
              />
              <Radar
                name="Retention"
                dataKey="retention"
                stroke="#f59e0b"
                fill="#f59e0b"
                fillOpacity={0.5}
              />
              <Legend />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Feature Adoption Bar Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Feature Adoption Rates</CardTitle>
          <CardDescription>Percentage of users adopting each feature</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={featureAnalytics}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="featureName" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="adoptionRate" fill="#3b82f6" name="Adoption Rate %" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Feature Details Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {featureAnalytics.map((feature) => (
          <Card key={feature.id}>
            <CardHeader>
              <CardTitle>{feature.featureName}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                  <Users className="h-8 w-8 text-blue-600" />
                  <div>
                    <p className="text-xs text-gray-500">Active Users</p>
                    <p className="text-lg font-bold text-gray-900">
                      {formatNumber(feature.activeUsers)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <TrendingUp className="h-8 w-8 text-green-600" />
                  <div>
                    <p className="text-xs text-gray-500">Engagement</p>
                    <p className="text-lg font-bold text-gray-900">
                      {feature.engagementScore.toFixed(1)}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    Adoption Rate
                  </span>
                  <span className="text-sm font-bold text-gray-900">
                    {feature.adoptionRate}%
                  </span>
                </div>
                <Progress value={feature.adoptionRate} />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    Retention Rate
                  </span>
                  <span className="text-sm font-bold text-gray-900">
                    {feature.retentionRate}%
                  </span>
                </div>
                <Progress value={feature.retentionRate} />
              </div>

              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-yellow-600 fill-yellow-600" />
                  <span className="text-sm font-medium text-gray-700">
                    Satisfaction Score
                  </span>
                </div>
                <span className="text-lg font-bold text-gray-900">
                  {feature.satisfactionScore.toFixed(1)}/5.0
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
