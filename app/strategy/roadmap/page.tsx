"use client";

import { useState } from "react";
import { useStore } from "@/store/useStore";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { AIAssistant } from "@/components/ai-assistant";
import { Plus, Calendar, Flag, Users } from "lucide-react";

export default function ProductRoadmapPage() {
  const { roadmapItems } = useStore();
  const [showNewDialog, setShowNewDialog] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    quarter: "Q1",
    year: 2024,
    priority: "should-have",
    impact: "medium",
    category: "Feature",
    owner: "",
  });

  const handleCreateInitiative = () => {
    console.log("Creating initiative:", formData);
    alert(`Initiative "${formData.title}" added to roadmap!`);
    setShowNewDialog(false);
    setFormData({
      title: "",
      description: "",
      quarter: "Q1",
      year: 2024,
      priority: "should-have",
      impact: "medium",
      category: "Feature",
      owner: "",
    });
  };

  const plannedItems = roadmapItems.filter((i) => i.status === "planned");
  const inProgressItems = roadmapItems.filter((i) => i.status === "in-progress");
  const launchedItems = roadmapItems.filter((i) => i.status === "launched");

  const q1Items = roadmapItems.filter((i) => i.quarter === "Q1" && i.year === 2024);
  const q2Items = roadmapItems.filter((i) => i.quarter === "Q2" && i.year === 2024);
  const q3Items = roadmapItems.filter((i) => i.quarter === "Q3" && i.year === 2024);
  const q4Items = roadmapItems.filter((i) => i.quarter === "Q4" && i.year === 2024);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "planned":
        return <Badge variant="secondary">Planned</Badge>;
      case "in-progress":
        return <Badge variant="default">In Progress</Badge>;
      case "launched":
        return <Badge variant="success">Launched</Badge>;
      case "cancelled":
        return <Badge variant="destructive">Cancelled</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "must-have":
        return <Badge variant="destructive">Must Have</Badge>;
      case "should-have":
        return <Badge variant="warning">Should Have</Badge>;
      case "nice-to-have":
        return <Badge variant="outline">Nice to Have</Badge>;
      default:
        return <Badge>{priority}</Badge>;
    }
  };

  const getImpactBadge = (impact: string) => {
    switch (impact) {
      case "high":
        return <Badge className="bg-purple-100 text-purple-800">High Impact</Badge>;
      case "medium":
        return <Badge className="bg-blue-100 text-blue-800">Medium Impact</Badge>;
      case "low":
        return <Badge className="bg-gray-100 text-gray-800">Low Impact</Badge>;
      default:
        return <Badge>{impact}</Badge>;
    }
  };

  const RoadmapCard = ({ item }: { item: typeof roadmapItems[0] }) => (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg">{item.title}</CardTitle>
            <CardDescription className="mt-2">{item.description}</CardDescription>
          </div>
          {getStatusBadge(item.status)}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {getPriorityBadge(item.priority)}
          {getImpactBadge(item.impact)}
          <Badge variant="outline">{item.category}</Badge>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-500 flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Timeline
            </p>
            <p className="font-medium text-gray-900">
              {item.quarter} {item.year}
            </p>
          </div>
          <div>
            <p className="text-gray-500 flex items-center gap-2">
              <Users className="h-4 w-4" />
              Owner
            </p>
            <p className="font-medium text-gray-900">{item.owner}</p>
          </div>
        </div>

        {item.dependencies && item.dependencies.length > 0 && (
          <div>
            <p className="text-sm text-gray-500 mb-1">Dependencies</p>
            <div className="flex flex-wrap gap-1">
              {item.dependencies.map((dep, i) => (
                <Badge key={i} variant="outline" className="text-xs">
                  #{dep}
                </Badge>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-end pt-2 border-t">
          <Button variant="outline" size="sm">
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Product Roadmap</h1>
          <p className="text-gray-500 mt-2">
            Plan and track product initiatives across quarters
          </p>
        </div>
        <Button onClick={() => setShowNewDialog(true)}>
          <Plus className="h-4 w-4 mr-2" />
          New Initiative
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Initiatives</CardTitle>
            <Flag className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{roadmapItems.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <Flag className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{inProgressItems.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Planned</CardTitle>
            <Flag className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{plannedItems.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Launched</CardTitle>
            <Flag className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{launchedItems.length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Roadmap Views */}
      <Tabs defaultValue="timeline">
        <TabsList>
          <TabsTrigger value="timeline">Timeline View</TabsTrigger>
          <TabsTrigger value="status">By Status</TabsTrigger>
          <TabsTrigger value="priority">By Priority</TabsTrigger>
        </TabsList>

        <TabsContent value="timeline" className="space-y-8">
          {/* Q1 */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <h2 className="text-xl font-bold text-gray-900">Q1 2024</h2>
              <Badge>{q1Items.length} initiatives</Badge>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {q1Items.map((item) => (
                <RoadmapCard key={item.id} item={item} />
              ))}
            </div>
          </div>

          {/* Q2 */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <h2 className="text-xl font-bold text-gray-900">Q2 2024</h2>
              <Badge>{q2Items.length} initiatives</Badge>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {q2Items.map((item) => (
                <RoadmapCard key={item.id} item={item} />
              ))}
            </div>
          </div>

          {/* Q3 */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <h2 className="text-xl font-bold text-gray-900">Q3 2024</h2>
              <Badge>{q3Items.length} initiatives</Badge>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {q3Items.map((item) => (
                <RoadmapCard key={item.id} item={item} />
              ))}
            </div>
          </div>

          {/* Q4 */}
          {q4Items.length > 0 && (
            <div>
              <div className="flex items-center gap-3 mb-4">
                <h2 className="text-xl font-bold text-gray-900">Q4 2024</h2>
                <Badge>{q4Items.length} initiatives</Badge>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {q4Items.map((item) => (
                  <RoadmapCard key={item.id} item={item} />
                ))}
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="status" className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              In Progress ({inProgressItems.length})
            </h3>
            <div className="grid gap-4 md:grid-cols-2">
              {inProgressItems.map((item) => (
                <RoadmapCard key={item.id} item={item} />
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Planned ({plannedItems.length})
            </h3>
            <div className="grid gap-4 md:grid-cols-2">
              {plannedItems.map((item) => (
                <RoadmapCard key={item.id} item={item} />
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Launched ({launchedItems.length})
            </h3>
            <div className="grid gap-4 md:grid-cols-2">
              {launchedItems.map((item) => (
                <RoadmapCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="priority" className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Must Have</h3>
            <div className="grid gap-4 md:grid-cols-2">
              {roadmapItems
                .filter((i) => i.priority === "must-have")
                .map((item) => (
                  <RoadmapCard key={item.id} item={item} />
                ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Should Have</h3>
            <div className="grid gap-4 md:grid-cols-2">
              {roadmapItems
                .filter((i) => i.priority === "should-have")
                .map((item) => (
                  <RoadmapCard key={item.id} item={item} />
                ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Nice to Have</h3>
            <div className="grid gap-4 md:grid-cols-2">
              {roadmapItems
                .filter((i) => i.priority === "nice-to-have")
                .map((item) => (
                  <RoadmapCard key={item.id} item={item} />
                ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* AI Assistant */}
      <AIAssistant context="roadmap" />

      {/* New Initiative Dialog */}
      <Dialog open={showNewDialog} onOpenChange={setShowNewDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Initiative</DialogTitle>
            <DialogDescription>
              Add a new product initiative to your roadmap
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Title</label>
              <Input
                placeholder="e.g., Advanced Analytics Dashboard"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="mt-1"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Description</label>
              <Input
                placeholder="Describe the initiative"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="mt-1"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Quarter</label>
                <select
                  className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                  value={formData.quarter}
                  onChange={(e) => setFormData({ ...formData, quarter: e.target.value })}
                >
                  <option value="Q1">Q1</option>
                  <option value="Q2">Q2</option>
                  <option value="Q3">Q3</option>
                  <option value="Q4">Q4</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Year</label>
                <Input
                  type="number"
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
                  className="mt-1"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Priority</label>
                <select
                  className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                  value={formData.priority}
                  onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                >
                  <option value="must-have">Must Have</option>
                  <option value="should-have">Should Have</option>
                  <option value="nice-to-have">Nice to Have</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Impact</label>
                <select
                  className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                  value={formData.impact}
                  onChange={(e) => setFormData({ ...formData, impact: e.target.value })}
                >
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Category</label>
              <select
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                <option value="Feature">Feature</option>
                <option value="Enhancement">Enhancement</option>
                <option value="Infrastructure">Infrastructure</option>
                <option value="Design">Design</option>
                <option value="Research">Research</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Owner</label>
              <Input
                placeholder="e.g., Product Team"
                value={formData.owner}
                onChange={(e) => setFormData({ ...formData, owner: e.target.value })}
                className="mt-1"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateInitiative} disabled={!formData.title || !formData.owner}>
              Create Initiative
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
