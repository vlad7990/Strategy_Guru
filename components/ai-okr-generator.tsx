"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Sparkles, Wand2, CheckCircle2, ArrowRight, Upload, MessageSquare, Loader2, Building2 } from "lucide-react";
import { aiApi, type ObjectiveSuggestion } from "@/lib/api";
import { STRATEGIC_CATEGORIES, OKR_LEVELS } from "@/lib/constants/strategic-categories";

interface AIObjectiveSuggestion extends ObjectiveSuggestion {
  selected?: boolean;
}

interface AIGeneratorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAccept: (objectives: ObjectiveSuggestion[]) => void;
}

export function AIObjectiveGenerator({ open, onOpenChange, onAccept }: AIGeneratorProps) {
  const [step, setStep] = useState<'input' | 'results' | 'refine'>('input');
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const [context, setContext] = useState({
    industry: "",
    companySize: "",
    currentQuarter: "Q1 2025",
    organizationalLevel: "" as '' | 'business-strategy' | 'enterprise' | 'department',
  });
  const [suggestions, setSuggestions] = useState<AIObjectiveSuggestion[]>([]);
  const [analysis, setAnalysis] = useState("");
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    if (!input.trim()) {
      setError("Please enter your strategic goals or ideas");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await aiApi.generateOKRs(input, {
        industry: context.industry || undefined,
        companySize: context.companySize || undefined,
        currentQuarter: context.currentQuarter || undefined,
        organizationalLevel: context.organizationalLevel || undefined,
      });

      if (response.success && response.data) {
        setSuggestions(response.data.objectives.map(obj => ({ ...obj, selected: true })));
        setAnalysis(response.data.analysis);
        setStep('results');
      } else {
        setError(response.error?.message || "Failed to generate OKRs");
      }
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const toggleObjectiveSelection = (index: number) => {
    setSuggestions(prev => prev.map((obj, i) =>
      i === index ? { ...obj, selected: !obj.selected } : obj
    ));
  };

  const handleAccept = () => {
    const selectedObjectives = suggestions.filter(obj => obj.selected);
    if (selectedObjectives.length === 0) {
      setError("Please select at least one objective");
      return;
    }
    onAccept(selectedObjectives);
    handleClose();
  };

  const handleClose = () => {
    setStep('input');
    setInput("");
    setContext({ industry: "", companySize: "", currentQuarter: "Q1 2025", organizationalLevel: "" });
    setSuggestions([]);
    setAnalysis("");
    setError("");
    onOpenChange(false);
  };

  const getCategoryColor = (categoryId: string) => {
    const category = STRATEGIC_CATEGORIES.find(c => c.id === categoryId);
    return category?.color || 'gray';
  };

  const getCategoryIcon = (categoryId: string) => {
    const category = STRATEGIC_CATEGORIES.find(c => c.id === categoryId);
    return category?.icon || '🎯';
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <div>
              <div>AI Strategy Guru</div>
              <DialogDescription className="text-xs mt-1">
                Transform your strategic vision into measurable objectives and value drivers
              </DialogDescription>
            </div>
          </DialogTitle>
        </DialogHeader>

        {/* Step 1: Input */}
        {step === 'input' && (
          <div className="space-y-6 py-4">
            <div>
              <label className="text-sm font-medium text-gray-900 mb-2 block">
                📝 Describe Your Strategic Goals
              </label>
              <Textarea
                placeholder="Example: We want to increase revenue by expanding into new markets, improve customer retention, and launch innovative AI-powered features that differentiate us from competitors..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="min-h-[150px] text-sm"
              />
              <p className="text-xs text-gray-500 mt-2">
                Share your vision, business goals, or strategic priorities. The AI will transform them into structured OKRs with measurable value drivers.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  Industry (Optional)
                </label>
                <Input
                  placeholder="e.g., SaaS, E-commerce"
                  value={context.industry}
                  onChange={(e) => setContext({ ...context, industry: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  Company Size (Optional)
                </label>
                <select
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                  value={context.companySize}
                  onChange={(e) => setContext({ ...context, companySize: e.target.value })}
                >
                  <option value="">Select size</option>
                  <option value="startup">Startup (1-50)</option>
                  <option value="small">Small (51-200)</option>
                  <option value="medium">Medium (201-1000)</option>
                  <option value="large">Large (1000+)</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                  <Building2 className="h-3.5 w-3.5" />
                  Organizational Level (Recommended)
                </label>
                <select
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                  value={context.organizationalLevel}
                  onChange={(e) => setContext({ ...context, organizationalLevel: e.target.value as any })}
                >
                  <option value="">Select level</option>
                  {OKR_LEVELS.map((level) => (
                    <option key={level.id} value={level.id}>
                      {level.name}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  {context.organizationalLevel && OKR_LEVELS.find(l => l.id === context.organizationalLevel)?.timeframe}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  Target Quarter
                </label>
                <select
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                  value={context.currentQuarter}
                  onChange={(e) => setContext({ ...context, currentQuarter: e.target.value })}
                >
                  <option value="Q1 2025">Q1 2025</option>
                  <option value="Q2 2025">Q2 2025</option>
                  <option value="Q3 2025">Q3 2025</option>
                  <option value="Q4 2025">Q4 2025</option>
                </select>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-md p-3 text-sm text-red-800">
                {error}
              </div>
            )}

            <div className="flex items-center justify-between pt-4 border-t">
              <p className="text-xs text-gray-500">
                💡 Tip: Be specific about your goals and the AI will create better OKRs
              </p>
              <Button
                onClick={handleGenerate}
                disabled={loading || !input.trim()}
                size="lg"
                className="gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Wand2 className="h-4 w-4" />
                    Generate OKRs
                  </>
                )}
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Results */}
        {step === 'results' && (
          <div className="space-y-6 py-4">
            {/* Analysis */}
            {analysis && (
              <Card className="bg-blue-50 border-blue-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-blue-600" />
                    AI Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-700">{analysis}</p>
                </CardContent>
              </Card>
            )}

            {/* Generated Objectives */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3">
                Generated Strategic Objectives ({suggestions.filter(s => s.selected).length} selected)
              </h3>
              <div className="space-y-4">
                {suggestions.map((objective, index) => (
                  <Card
                    key={index}
                    className={`cursor-pointer transition-all ${
                      objective.selected
                        ? 'border-blue-500 bg-blue-50/50'
                        : 'border-gray-200 opacity-60 hover:opacity-100'
                    }`}
                    onClick={() => toggleObjectiveSelection(index)}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-xl">{getCategoryIcon(objective.category)}</span>
                            <CardTitle className="text-base">{objective.title}</CardTitle>
                            {objective.selected && (
                              <CheckCircle2 className="h-5 w-5 text-blue-600 ml-auto" />
                            )}
                          </div>
                          <CardDescription className="text-xs">
                            {objective.description}
                          </CardDescription>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant="outline" className="text-xs">
                              {objective.category}
                            </Badge>
                            <Badge variant="secondary" className="text-xs">
                              {objective.quarter} {objective.year}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <h4 className="text-xs font-semibold text-gray-700 mb-2">
                        Value Drivers:
                      </h4>
                      <div className="space-y-2">
                        {objective.valueDrivers.map((vd, vdIndex) => (
                          <div key={vdIndex} className="bg-white rounded-md p-3 border border-gray-200">
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex-1">
                                <p className="text-sm font-medium text-gray-900">
                                  {vd.description}
                                </p>
                                <div className="flex items-center gap-2 mt-1">
                                  <Badge variant="secondary" className="text-xs">
                                    Target: {vd.targetValue} {vd.unit}
                                  </Badge>
                                </div>
                                <p className="text-xs text-gray-600 mt-1">
                                  💡 {vd.rationale}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-md p-3 text-sm text-red-800">
                {error}
              </div>
            )}

            <div className="flex items-center justify-between pt-4 border-t">
              <Button
                variant="outline"
                onClick={() => setStep('input')}
              >
                Back to Edit
              </Button>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={handleClose}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleAccept}
                  disabled={suggestions.filter(s => s.selected).length === 0}
                  className="gap-2"
                >
                  <CheckCircle2 className="h-4 w-4" />
                  Accept & Create ({suggestions.filter(s => s.selected).length})
                </Button>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
