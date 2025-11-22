"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Bot, Send, Sparkles, X, Minimize2, Maximize2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface AIAssistantProps {
  context: "okr" | "analytics" | "feedback" | "reports" | "competitive" | "roadmap" | "general";
  onSuggestion?: (suggestion: any) => void;
}

const contextPrompts = {
  okr: [
    "Help me create a new OKR",
    "Suggest key results for revenue growth",
    "What's a good OKR for product adoption?",
  ],
  analytics: [
    "Analyze this performance trend",
    "What insights can you find?",
    "Suggest optimization areas",
  ],
  feedback: [
    "Analyze sentiment patterns",
    "Prioritize these feedback items",
    "Suggest action items",
  ],
  reports: [
    "Generate executive summary",
    "Create insights from data",
    "Suggest report improvements",
  ],
  competitive: [
    "Analyze competitive positioning",
    "Suggest strategic moves",
    "Identify market opportunities",
  ],
  roadmap: [
    "Suggest features for Q2",
    "Prioritize roadmap items",
    "Identify dependencies",
  ],
  general: [
    "Help me analyze this data",
    "What should I focus on?",
    "Give me insights",
  ],
};

const getContextResponses = (context: string, prompt: string): string => {
  const responses: Record<string, Record<string, string>> = {
    okr: {
      "help me create": "I'll help you create an impactful OKR! Based on your current metrics, I suggest:\n\n**Objective:** Accelerate Product Growth & Engagement\n\n**Key Results:**\n1. Increase DAU from 45K to 60K (+33%)\n2. Improve feature adoption rate from 65% to 80%\n3. Reduce churn rate from 3.2% to 2.5%\n\nThese align with your revenue goals and current user trends. Would you like me to refine any of these?",
      "suggest key results": "For revenue growth, consider these SMART key results:\n\n1. Increase MRR from $2.45M to $3M (+22%)\n2. Improve LTV:CAC ratio from 9.3 to 11.0\n3. Launch 2 new pricing tiers targeting enterprise\n4. Achieve 95% revenue retention rate\n\nThese are measurable, achievable, and directly impact your bottom line.",
      default: "I can help you create powerful OKRs! Share your strategic goal, and I'll suggest specific, measurable key results based on your current performance data.",
    },
    analytics: {
      "analyze this": "Based on your performance data:\n\n📊 **Key Insights:**\n- Response time increased 18% during peak hours (12-4pm)\n- Error rate spiked to 0.8% on Thursday\n- /api/analytics endpoint is slowest (580ms avg)\n\n💡 **Recommendations:**\n1. Add caching layer for analytics endpoint\n2. Scale infrastructure for peak hours\n3. Investigate Thursday deployment issues\n\nImplementing these could improve response time by 30%.",
      "optimization": "**Top 3 Optimization Opportunities:**\n\n1. **Database Query Optimization** - 45ms potential improvement\n2. **CDN for Static Assets** - Reduce load by 40%\n3. **API Request Batching** - Decrease calls by 60%\n\nPriority: Start with #1 for immediate impact.",
      default: "I'm analyzing your performance data... I can identify bottlenecks, suggest optimizations, and predict trends. What specific metric would you like me to focus on?",
    },
    feedback: {
      "sentiment": "**Sentiment Analysis Complete:**\n\n✅ Positive: 33% (trending up)\n⚠️ Neutral: 34%\n❌ Negative: 33%\n\n**Key Themes:**\n- Positive: Feature requests for automation\n- Negative: Mobile app performance\n- Neutral: Pricing inquiries\n\n**Priority Actions:**\n1. Address mobile performance (High impact)\n2. Explore automation features (High value)\n3. Clarify pricing page (Quick win)",
      "prioritize": "I've prioritized feedback by impact × urgency:\n\n🔴 **High Priority:**\n- Mobile app lag (3 mentions, critical)\n\n🟡 **Medium Priority:**\n- Automation requests (high value)\n\n🟢 **Low Priority:**\n- UI polish items",
      default: "I can analyze sentiment, identify patterns, and suggest priorities. Share feedback items and I'll provide insights!",
    },
    reports: {
      "executive summary": "**Executive Summary - Week of Jan 20:**\n\n📈 **Highlights:**\n- Revenue: $2.45M (+11.4% MoM)\n- Active Users: 45.2K (+4.9%)\n- NPS Score: 72 (+5.9%)\n\n⚠️ **Attention Needed:**\n- Churn spike detected (need intervention)\n- 2 OKRs at risk\n\n🎯 **Recommendations:**\n1. Launch customer retention campaign\n2. Prioritize at-risk OKR resources\n3. Capitalize on positive NPS momentum",
      "insights": "**Key Insights from Your Data:**\n\n1. **Revenue Growth Accelerating** - Trend suggests $3M by Q2\n2. **Enterprise Segment Opportunity** - 23.5% growth potential\n3. **Feature Adoption Gap** - 35% of users not using key features\n\nRecommended deep-dive: User onboarding flow analysis",
      default: "I can generate summaries, extract insights, and create visualizations. What data would you like me to analyze?",
    },
    competitive: {
      "positioning": "**Competitive Position Analysis:**\n\n🎯 **Your Strengths:**\n- Superior UX (90 vs competitor avg 78)\n- Better pricing (score: 80)\n- Innovation edge in AI features\n\n⚠️ **Gaps:**\n- Brand recognition (70 vs leader 95)\n- Enterprise features (catching up)\n\n📊 **Strategic Recommendations:**\n1. Double down on UX differentiation\n2. PR campaign to build brand\n3. Accelerate enterprise roadmap",
      "strategic": "**Recommended Strategic Moves:**\n\n1. **Offensive:** Launch AI features before competitors\n2. **Defensive:** Match Competitor A on enterprise security\n3. **Opportunity:** Expand to APAC (Competitor B weak there)\n\nPriority: Move #1 creates 6-month lead",
      default: "I can analyze competitive positioning, suggest strategic moves, and identify market gaps. What would you like to explore?",
    },
  };

  const contextKey = context as keyof typeof responses;
  const contextResponses = responses[contextKey] || responses.general;

  // Find matching response
  for (const [key, response] of Object.entries(contextResponses)) {
    if (prompt.toLowerCase().includes(key)) {
      return response;
    }
  }

  return contextResponses.default || "I'm here to help! Ask me anything about your data.";
};

export function AIAssistant({ context, onSuggestion }: AIAssistantProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: `Hi! I'm your AI assistant for ${context}. I can help you analyze data, generate insights, and make recommendations. How can I help?`,
    },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        role: "assistant",
        content: getContextResponses(context, input),
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 500);

    setInput("");
  };

  const handleQuickPrompt = (prompt: string) => {
    setInput(prompt);
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 h-14 w-14 rounded-full shadow-lg"
        size="icon"
      >
        <Bot className="h-6 w-6" />
      </Button>
    );
  }

  return (
    <div
      className={cn(
        "fixed bottom-6 right-6 z-40 w-96 shadow-2xl",
        isMinimized ? "h-14" : "h-[600px]"
      )}
    >
      <Card className="h-full flex flex-col">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 border-b">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <div>
              <CardTitle className="text-sm">AI Assistant</CardTitle>
              <Badge variant="secondary" className="text-xs">
                {context}
              </Badge>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setIsMinimized(!isMinimized)}
            >
              {isMinimized ? (
                <Maximize2 className="h-4 w-4" />
              ) : (
                <Minimize2 className="h-4 w-4" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        {!isMinimized && (
          <>
            <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={cn(
                    "flex",
                    message.role === "user" ? "justify-end" : "justify-start"
                  )}
                >
                  <div
                    className={cn(
                      "rounded-lg px-4 py-2 max-w-[80%]",
                      message.role === "user"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-900"
                    )}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  </div>
                </div>
              ))}
            </CardContent>

            <div className="p-4 border-t space-y-2">
              {/* Quick Prompts */}
              {messages.length === 1 && (
                <div className="flex flex-wrap gap-2 mb-2">
                  {contextPrompts[context].map((prompt, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="text-xs"
                      onClick={() => handleQuickPrompt(prompt)}
                    >
                      {prompt}
                    </Button>
                  ))}
                </div>
              )}

              {/* Input */}
              <div className="flex gap-2">
                <Input
                  placeholder="Ask me anything..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  className="flex-1"
                />
                <Button onClick={handleSend} size="icon">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        )}
      </Card>
    </div>
  );
}
