"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Target, TrendingUp, AlertCircle, CheckCircle2, ArrowRight, Lightbulb } from "lucide-react";
import { STRATEGIC_CATEGORIES } from "@/lib/constants/strategic-categories";

interface OKRPlaybookProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function OKRPlaybook({ open, onOpenChange }: OKRPlaybookProps) {
  const [activeSection, setActiveSection] = useState<'intro' | 'categories' | 'objectives' | 'drivers' | 'examples' | 'mistakes'>('intro');

  const sections = [
    { id: 'intro' as const, title: 'Introduction', icon: BookOpen },
    { id: 'categories' as const, title: 'Strategic Categories', icon: Target },
    { id: 'objectives' as const, title: 'Writing Objectives', icon: TrendingUp },
    { id: 'drivers' as const, title: 'Value Drivers', icon: CheckCircle2 },
    { id: 'examples' as const, title: 'Examples', icon: Lightbulb },
    { id: 'mistakes' as const, title: 'Common Mistakes', icon: AlertCircle },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-blue-600" />
            OKR Playbook & Strategy Guide
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-4 gap-6 py-4">
          {/* Sidebar Navigation */}
          <div className="col-span-1 space-y-2">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeSection === section.id
                      ? 'bg-blue-100 text-blue-900'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4" />
                    {section.title}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Content */}
          <div className="col-span-3 space-y-6">
            {/* Introduction */}
            {activeSection === 'intro' && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-gray-900">Welcome to the OKR Strategy Guide</h2>

                <Card className="border-blue-200 bg-blue-50">
                  <CardHeader>
                    <CardTitle className="text-base">What are OKRs?</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm">
                    <p>
                      <strong>OKRs</strong> (Objectives and Key Results) are a goal-setting framework used by leading organizations to define and track objectives and their measurable outcomes.
                    </p>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div className="bg-white rounded-md p-4 border border-blue-200">
                        <h4 className="font-semibold text-blue-900 mb-2">Objectives</h4>
                        <p className="text-gray-700">Qualitative, inspirational goals that define WHAT you want to achieve</p>
                      </div>
                      <div className="bg-white rounded-md p-4 border border-blue-200">
                        <h4 className="font-semibold text-blue-900 mb-2">Value Drivers</h4>
                        <p className="text-gray-700">Quantitative, measurable metrics that show HOW you'll achieve it</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-gray-900">Why Use OKRs?</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { title: 'Focus', desc: 'Align entire organization on top priorities' },
                      { title: 'Measurability', desc: 'Track progress with concrete metrics' },
                      { title: 'Transparency', desc: 'Everyone knows what others are working on' },
                      { title: 'Agility', desc: 'Quarterly cycles enable rapid adaptation' },
                    ].map((benefit, index) => (
                      <Card key={index}>
                        <CardContent className="pt-4">
                          <div className="flex items-start gap-2">
                            <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                            <div>
                              <h4 className="font-semibold text-sm">{benefit.title}</h4>
                              <p className="text-xs text-gray-600 mt-1">{benefit.desc}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                <Card className="bg-yellow-50 border-yellow-200">
                  <CardHeader>
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Lightbulb className="h-4 w-4 text-yellow-600" />
                      Pro Tip
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-gray-700">
                    Use our AI Strategy Guru to automatically generate well-structured OKRs from your strategic vision. It understands your industry context and creates objectives aligned with enterprise strategic categories.
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Strategic Categories */}
            {activeSection === 'categories' && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-gray-900">Enterprise Strategic Categories</h2>
                <p className="text-sm text-gray-600">
                  Objectives should align with one of these nine strategic categories to ensure enterprise-level impact.
                </p>

                <div className="space-y-3">
                  {STRATEGIC_CATEGORIES.map((category, index) => (
                    <Card key={index} className="border-l-4" style={{ borderLeftColor: `var(--${category.color}-500, #6b7280)` }}>
                      <CardHeader className="pb-3">
                        <div className="flex items-start gap-3">
                          <span className="text-2xl">{category.icon}</span>
                          <div className="flex-1">
                            <CardTitle className="text-base">{category.name}</CardTitle>
                            <p className="text-sm text-gray-600 mt-1">{category.description}</p>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <h4 className="text-xs font-semibold text-gray-700 mb-2">Example Objectives:</h4>
                        <ul className="space-y-1">
                          {category.examples.map((example, exIndex) => (
                            <li key={exIndex} className="text-sm text-gray-600 flex items-start gap-2">
                              <ArrowRight className="h-3 w-3 mt-0.5 text-gray-400 flex-shrink-0" />
                              {example}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Writing Objectives */}
            {activeSection === 'objectives' && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-gray-900">How to Write Great Objectives</h2>

                <Card className="border-blue-200 bg-blue-50">
                  <CardHeader>
                    <CardTitle className="text-base">Objective Formula</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm">
                    <p className="font-mono bg-white p-3 rounded border border-blue-200">
                      [Action Verb] + [What] + [Why/Impact]
                    </p>
                    <p className="text-gray-700">
                      Example: <strong>"Accelerate revenue growth to establish market leadership"</strong>
                    </p>
                  </CardContent>
                </Card>

                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-gray-900">Best Practices</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { do: true, title: 'Ambitious & Inspiring', desc: 'Push the team beyond comfort zone' },
                      { do: true, title: 'Qualitative', desc: 'Focus on the outcome, not the metric' },
                      { do: true, title: 'Time-bound', desc: 'Typically quarterly (3 months)' },
                      { do: true, title: 'Strategic Impact', desc: 'Align with enterprise categories' },
                      { do: false, title: 'Avoid Vague Language', desc: '"Improve things" is not specific enough' },
                      { do: false, title: 'Not a Task List', desc: '"Launch feature X" is a task, not an objective' },
                      { do: false, title: 'Don\'t Include Numbers', desc: 'Numbers belong in value drivers' },
                      { do: false, title: 'Avoid BAU Work', desc: 'Focus on transformational goals' },
                    ].map((item, index) => (
                      <Card key={index} className={item.do ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}>
                        <CardContent className="pt-4">
                          <div className="flex items-start gap-2">
                            {item.do ? (
                              <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                            ) : (
                              <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
                            )}
                            <div>
                              <h4 className="font-semibold text-sm">{item.do ? '✓' : '✗'} {item.title}</h4>
                              <p className="text-xs text-gray-600 mt-1">{item.desc}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Value Drivers */}
            {activeSection === 'drivers' && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-gray-900">Defining Value Drivers</h2>
                <p className="text-sm text-gray-600">
                  Value Drivers (Key Results) are the specific, measurable metrics that indicate success. They answer "How do we know we're making progress?"
                </p>

                <Card className="border-blue-200 bg-blue-50">
                  <CardHeader>
                    <CardTitle className="text-base">SMART Criteria</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <div className="grid grid-cols-5 gap-2">
                      {[
                        { letter: 'S', word: 'Specific', desc: 'Clear and unambiguous' },
                        { letter: 'M', word: 'Measurable', desc: 'Quantifiable with a number' },
                        { letter: 'A', word: 'Achievable', desc: 'Ambitious but realistic' },
                        { letter: 'R', word: 'Relevant', desc: 'Directly impacts objective' },
                        { letter: 'T', word: 'Time-bound', desc: 'Has a deadline (quarter)' },
                      ].map((item, index) => (
                        <div key={index} className="bg-white rounded p-2 border border-blue-200 text-center">
                          <div className="font-bold text-blue-900 text-lg">{item.letter}</div>
                          <div className="font-semibold text-xs">{item.word}</div>
                          <div className="text-xs text-gray-600 mt-1">{item.desc}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-gray-900">Good vs Bad Value Drivers</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <Card className="border-red-200">
                      <CardHeader className="bg-red-50">
                        <CardTitle className="text-sm text-red-900">❌ Bad Examples</CardTitle>
                      </CardHeader>
                      <CardContent className="pt-4 space-y-2 text-sm">
                        <div className="p-2 bg-white border border-red-100 rounded">
                          <p className="text-red-900 font-medium">"Improve customer satisfaction"</p>
                          <p className="text-xs text-gray-600 mt-1">❌ Not measurable, no target</p>
                        </div>
                        <div className="p-2 bg-white border border-red-100 rounded">
                          <p className="text-red-900 font-medium">"Launch new features"</p>
                          <p className="text-xs text-gray-600 mt-1">❌ Activity, not outcome</p>
                        </div>
                        <div className="p-2 bg-white border border-red-100 rounded">
                          <p className="text-red-900 font-medium">"Increase revenue a lot"</p>
                          <p className="text-xs text-gray-600 mt-1">❌ Vague, no specific target</p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-green-200">
                      <CardHeader className="bg-green-50">
                        <CardTitle className="text-sm text-green-900">✓ Good Examples</CardTitle>
                      </CardHeader>
                      <CardContent className="pt-4 space-y-2 text-sm">
                        <div className="p-2 bg-white border border-green-100 rounded">
                          <p className="text-green-900 font-medium">"Increase NPS from 42 to 60"</p>
                          <p className="text-xs text-gray-600 mt-1">✓ Specific metric with clear target</p>
                        </div>
                        <div className="p-2 bg-white border border-green-100 rounded">
                          <p className="text-green-900 font-medium">"Achieve 15K DAU by March 31"</p>
                          <p className="text-xs text-gray-600 mt-1">✓ Measurable outcome with deadline</p>
                        </div>
                        <div className="p-2 bg-white border border-green-100 rounded">
                          <p className="text-green-900 font-medium">"Grow MRR from $2.4M to $3M"</p>
                          <p className="text-xs text-gray-600 mt-1">✓ Quantifiable business impact</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <Card className="bg-yellow-50 border-yellow-200">
                  <CardHeader>
                    <CardTitle className="text-sm">💡 Pro Tip: 2-4 Value Drivers per Objective</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-gray-700">
                    Each objective should have 2-4 value drivers. Too few means you're not measuring comprehensively; too many creates confusion and dilutes focus.
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Examples */}
            {activeSection === 'examples' && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-gray-900">Real-World Examples</h2>

                <div className="space-y-4">
                  {[
                    {
                      category: 'Revenue Generation',
                      icon: '💰',
                      objective: 'Accelerate Enterprise Revenue Growth',
                      description: 'Expand our enterprise customer base to establish market leadership',
                      valueDrivers: [
                        { metric: 'Grow enterprise ARR from $5M to $8M', current: 5, target: 8, unit: 'M ARR' },
                        { metric: 'Increase enterprise pipeline from 30 to 50 qualified leads', current: 30, target: 50, unit: 'leads' },
                        { metric: 'Achieve 80% win rate on enterprise deals', current: 65, target: 80, unit: '%' },
                      ],
                    },
                    {
                      category: 'Customer Experience',
                      icon: '❤️',
                      objective: 'Deliver Exceptional Customer Experience',
                      description: 'Transform customer satisfaction to drive loyalty and retention',
                      valueDrivers: [
                        { metric: 'Increase NPS from 42 to 65', current: 42, target: 65, unit: 'NPS' },
                        { metric: 'Reduce churn rate from 3.2% to 2.0%', current: 3.2, target: 2.0, unit: '%' },
                        { metric: 'Improve support CSAT from 4.2 to 4.7/5.0', current: 4.2, target: 4.7, unit: '/5.0' },
                      ],
                    },
                    {
                      category: 'Innovation & R&D',
                      icon: '🚀',
                      objective: 'Lead Market with AI-Powered Innovation',
                      description: 'Differentiate through cutting-edge AI capabilities',
                      valueDrivers: [
                        { metric: 'Launch 3 AI-powered features by Q2', current: 0, target: 3, unit: 'features' },
                        { metric: 'Achieve 50% adoption rate for AI features', current: 0, target: 50, unit: '%' },
                        { metric: 'Reduce task completion time by 40% with AI', current: 0, target: 40, unit: '% reduction' },
                      ],
                    },
                  ].map((example, index) => (
                    <Card key={index} className="border-l-4 border-l-blue-500">
                      <CardHeader className="bg-gray-50">
                        <div className="flex items-start gap-3">
                          <span className="text-2xl">{example.icon}</span>
                          <div className="flex-1">
                            <Badge variant="outline" className="mb-2">{example.category}</Badge>
                            <CardTitle className="text-lg">{example.objective}</CardTitle>
                            <p className="text-sm text-gray-600 mt-1">{example.description}</p>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-4">
                        <h4 className="text-sm font-semibold text-gray-900 mb-3">Value Drivers:</h4>
                        <div className="space-y-2">
                          {example.valueDrivers.map((vd, vdIndex) => (
                            <div key={vdIndex} className="bg-white rounded border border-gray-200 p-3">
                              <div className="flex items-center justify-between">
                                <p className="text-sm font-medium text-gray-900 flex-1">{vd.metric}</p>
                                <div className="flex items-center gap-2">
                                  <Badge variant="secondary" className="text-xs">
                                    {vd.current} → {vd.target} {vd.unit}
                                  </Badge>
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
            )}

            {/* Common Mistakes */}
            {activeSection === 'mistakes' && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-gray-900">Common Mistakes to Avoid</h2>

                <div className="space-y-3">
                  {[
                    {
                      mistake: 'Setting Too Many OKRs',
                      impact: 'Team loses focus and nothing gets done well',
                      solution: 'Limit to 3-5 objectives per quarter. Focus is key.',
                    },
                    {
                      mistake: 'Making OKRs Too Easy',
                      impact: 'Team doesn\'t stretch, misses opportunity for growth',
                      solution: 'Aim for 70-80% achievement. If you always hit 100%, you\'re not ambitious enough.',
                    },
                    {
                      mistake: 'Confusing Tasks with Objectives',
                      impact: 'Focus on activities instead of outcomes',
                      solution: 'Ask "Why does this matter?" If the answer is the real goal, that\'s your objective.',
                    },
                    {
                      mistake: 'Not Tracking Progress',
                      impact: 'OKRs become "set and forget", lose value',
                      solution: 'Review weekly, update monthly. Make OKRs a living part of your workflow.',
                    },
                    {
                      mistake: 'Sandbagging Numbers',
                      impact: 'Team sets easy targets to guarantee bonuses',
                      solution: 'Decouple OKRs from compensation. OKRs are for stretch goals, not performance reviews.',
                    },
                    {
                      mistake: 'No Clear Owner',
                      impact: 'Nobody takes responsibility, objectives drift',
                      solution: 'Every objective needs a single owner who drives it forward.',
                    },
                  ].map((item, index) => (
                    <Card key={index} className="border-red-200">
                      <CardHeader className="pb-3">
                        <div className="flex items-start gap-2">
                          <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                          <div className="flex-1">
                            <CardTitle className="text-base text-red-900">{item.mistake}</CardTitle>
                            <p className="text-sm text-gray-600 mt-1">
                              <strong>Impact:</strong> {item.impact}
                            </p>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="bg-green-50 border border-green-200 rounded-md p-3">
                          <div className="flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                            <div>
                              <p className="text-sm font-semibold text-green-900">Solution:</p>
                              <p className="text-sm text-gray-700 mt-1">{item.solution}</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
