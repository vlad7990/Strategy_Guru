"use client";

import { useState } from "react";
import { useStore } from "@/store/useStore";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { EnhancedAIAssistant } from "@/components/enhanced-ai-assistant";
import { AIObjectiveGenerator } from "@/components/ai-okr-generator";
import { OKRPlaybook } from "@/components/okr-playbook";
import { DocumentUploadOKR } from "@/components/document-upload-okr";
import { Target, Plus, TrendingUp, AlertTriangle, CheckCircle2, Edit, Trash2, Sparkles, BookOpen, Upload, Wand2 } from "lucide-react";
import { STRATEGIC_CATEGORIES } from "@/lib/constants/strategic-categories";
import type { ObjectiveSuggestion } from "@/lib/api";

export default function OKRsPage() {
  const { objectives } = useStore();
  const [showNewDialog, setShowNewDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showAIGenerator, setShowAIGenerator] = useState(false);
  const [showPlaybook, setShowPlaybook] = useState(false);
  const [showDocumentUpload, setShowDocumentUpload] = useState(false);
  const [selectedOKR, setSelectedOKR] = useState<typeof objectives[0] | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    quarter: "Q1",
    year: 2025,
    category: "",
  });

  const onTrack = objectives.filter((o) => o.status === "on-track").length;
  const atRisk = objectives.filter((o) => o.status === "at-risk").length;
  const behind = objectives.filter((o) => o.status === "behind").length;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "on-track":
        return "text-green-600 bg-green-100";
      case "at-risk":
        return "text-yellow-600 bg-yellow-100";
      case "behind":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "on-track":
        return <CheckCircle2 className="h-4 w-4" />;
      case "at-risk":
        return <AlertTriangle className="h-4 w-4" />;
      case "behind":
        return <AlertTriangle className="h-4 w-4" />;
      default:
        return <Target className="h-4 w-4" />;
    }
  };

  const getCategoryIcon = (categoryId: string) => {
    const category = STRATEGIC_CATEGORIES.find(c => c.id === categoryId || c.name === categoryId);
    return category?.icon || '🎯';
  };

  const handleCreateOKR = () => {
    console.log("Creating OKR:", formData);
    alert(`OKR "${formData.title}" created successfully!`);
    setShowNewDialog(false);
    setFormData({ title: "", description: "", quarter: "Q1", year: 2025, category: "" });
  };

  const handleAcceptAIObjectives = (suggestions: ObjectiveSuggestion[]) => {
    console.log("Accepting AI-generated objectives:", suggestions);
    // Here you would normally save these to your backend
    alert(`Created ${suggestions.length} objectives with AI!\n\nThese will be saved to your database in the next update.`);
  };

  const handleEditOKR = (okr: typeof objectives[0]) => {
    setSelectedOKR(okr);
    setFormData({
      title: okr.title,
      description: okr.description,
      quarter: okr.quarter,
      year: okr.year,
      category: okr.category,
    });
    setShowEditDialog(true);
  };

  const handleUpdateOKR = () => {
    console.log("Updating OKR:", selectedOKR?.id, formData);
    alert(`OKR updated successfully!`);
    setShowEditDialog(false);
    setSelectedOKR(null);
  };

  const handleDeleteOKR = (okr: typeof objectives[0]) => {
    if (confirm(`Are you sure you want to delete "${okr.title}"?`)) {
      console.log("Deleting OKR:", okr.id);
      alert("OKR deleted successfully!");
    }
  };

  return (
    <div className="space-y-8">
      {/* Header with AI Actions */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">OKRs & Goals</h1>
          <p className="text-gray-500 mt-2">
            Create strategic objectives with AI-powered assistance
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setShowPlaybook(true)}
            className="gap-2"
          >
            <BookOpen className="h-4 w-4" />
            Playbook
          </Button>
          <Button
            variant="outline"
            onClick={() => setShowDocumentUpload(true)}
            className="gap-2"
          >
            <Upload className="h-4 w-4" />
            Upload Document
          </Button>
          <Button
            onClick={() => setShowAIGenerator(true)}
            className="gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            <Wand2 className="h-4 w-4" />
            AI Generate
          </Button>
          <Button
            variant="secondary"
            onClick={() => setShowNewDialog(true)}
            className="gap-2"
          >
            <Plus className="h-4 w-4" />
            Manual Create
          </Button>
        </div>
      </div>

      {/* AI Feature Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card
          className="border-blue-200 bg-gradient-to-br from-blue-50 to-purple-50 cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => setShowAIGenerator(true)}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">AI Strategy Guru</CardTitle>
            <Sparkles className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-sm text-gray-700">
              Transform your vision into structured OKRs with measurable value drivers
            </div>
            <Button variant="ghost" className="mt-2 p-0 h-auto text-blue-600 hover:text-blue-700">
              Try it now →
            </Button>
          </CardContent>
        </Card>

        <Card
          className="border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50 cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => setShowDocumentUpload(true)}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Document Upload</CardTitle>
            <Upload className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-sm text-gray-700">
              Upload strategy documents and extract OKRs automatically
            </div>
            <Button variant="ghost" className="mt-2 p-0 h-auto text-purple-600 hover:text-purple-700">
              Upload document →
            </Button>
          </CardContent>
        </Card>

        <Card
          className="border-green-200 bg-gradient-to-br from-green-50 to-teal-50 cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => setShowPlaybook(true)}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">OKR Playbook</CardTitle>
            <BookOpen className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-sm text-gray-700">
              Learn best practices, see examples, and master OKR creation
            </div>
            <Button variant="ghost" className="mt-2 p-0 h-auto text-green-600 hover:text-green-700">
              Learn more →
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Summary Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total OKRs</CardTitle>
            <Target className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{objectives.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">On Track</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{onTrack}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">At Risk</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{atRisk}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Behind</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{behind}</div>
          </CardContent>
        </Card>
      </div>

      {/* OKRs List */}
      <div className="space-y-6">
        {objectives.map((objective) => (
          <Card key={objective.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{getCategoryIcon(objective.category)}</span>
                    <CardTitle>{objective.title}</CardTitle>
                    <Badge
                      className={getStatusColor(objective.status)}
                      variant="secondary"
                    >
                      <span className="flex items-center gap-1">
                        {getStatusIcon(objective.status)}
                        {objective.status}
                      </span>
                    </Badge>
                  </div>
                  <CardDescription className="mt-2">
                    {objective.description}
                  </CardDescription>
                  <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                    <span>
                      <strong>Owner:</strong> {objective.owner}
                    </span>
                    <span>•</span>
                    <span>
                      {objective.quarter} {objective.year}
                    </span>
                    <span>•</span>
                    <Badge variant="outline">{objective.category}</Badge>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-right mr-4">
                    <div className="text-3xl font-bold text-gray-900">
                      {objective.progress}%
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Overall Progress</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditOKR(objective)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteOKR(objective)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <Progress value={objective.progress} />
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-sm text-gray-900">
                  Value Drivers
                </h4>
                {objective.keyResults.map((kr) => (
                  <div key={kr.id} className="border-l-2 border-gray-200 pl-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">
                          {kr.description}
                        </p>
                        <div className="mt-2">
                          <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                            <span>
                              {kr.currentValue.toFixed(0)} / {kr.targetValue}{" "}
                              {kr.unit}
                            </span>
                            <span>{kr.progress}%</span>
                          </div>
                          <Progress value={kr.progress} />
                        </div>
                      </div>
                      <Badge
                        variant={
                          kr.status === "on-track"
                            ? "success"
                            : kr.status === "at-risk"
                            ? "warning"
                            : "destructive"
                        }
                      >
                        {kr.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Enhanced AI Assistant */}
      <EnhancedAIAssistant
        context="OKR Planning & Strategy"
        onGenerateOKR={() => setShowAIGenerator(true)}
        onOpenPlaybook={() => setShowPlaybook(true)}
      />

      {/* AI OKR Generator */}
      <AIObjectiveGenerator
        open={showAIGenerator}
        onOpenChange={setShowAIGenerator}
        onAccept={handleAcceptAIObjectives}
      />

      {/* OKR Playbook */}
      <OKRPlaybook
        open={showPlaybook}
        onOpenChange={setShowPlaybook}
      />

      {/* Document Upload */}
      <DocumentUploadOKR
        open={showDocumentUpload}
        onOpenChange={setShowDocumentUpload}
        onAccept={handleAcceptAIObjectives}
      />

      {/* Manual Create Dialog */}
      <Dialog open={showNewDialog} onOpenChange={setShowNewDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New OKR</DialogTitle>
            <DialogDescription>
              Define a new objective and value drivers for your team
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Objective Title</label>
              <Input
                placeholder="e.g., Accelerate Product Growth"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="mt-1"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Description</label>
              <Input
                placeholder="Describe the objective"
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

            <div>
              <label className="text-sm font-medium text-gray-700">Strategic Category</label>
              <select
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                <option value="">Select category</option>
                {STRATEGIC_CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.name}>
                    {cat.icon} {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateOKR} disabled={!formData.title || !formData.category}>
              Create OKR
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit OKR Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit OKR</DialogTitle>
            <DialogDescription>
              Update objective details
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Objective Title</label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="mt-1"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Description</label>
              <Input
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="mt-1"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Strategic Category</label>
              <select
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                {STRATEGIC_CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.name}>
                    {cat.icon} {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateOKR}>
              Update OKR
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
