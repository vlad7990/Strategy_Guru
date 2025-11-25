"use client";

import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Bot, Send, Sparkles, X, Minimize2, Maximize2, Loader2, Wand2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { aiApi, type ChatMessage } from "@/lib/api";

interface EnhancedAIAssistantProps {
  context?: string;
  onGenerateOKR?: () => void;
  onOpenPlaybook?: () => void;
}

export function EnhancedAIAssistant({
  context,
  onGenerateOKR,
  onOpenPlaybook,
}: EnhancedAIAssistantProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content: "👋 Hi! I'm your AI Strategy Guru. I can help you create powerful OKRs, refine your strategy, and answer questions about objectives and value drivers. How can I assist you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    "Help me create an OKR for revenue growth",
    "What makes a good value driver?",
    "How do I align OKRs across teams?",
    "Show me examples of strategic objectives",
  ];

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage: ChatMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await aiApi.chat([...messages, userMessage], context);

      if (response.success && response.data) {
        const aiMessage: ChatMessage = {
          role: "assistant",
          content: response.data.message,
        };
        setMessages((prev) => [...prev, aiMessage]);
      } else {
        // Fallback to local response if API fails
        const fallbackMessage: ChatMessage = {
          role: "assistant",
          content: "I apologize, but I'm having trouble connecting to the AI service. Please make sure your OpenAI API key is configured in the backend .env file. You can still use the quick actions below to generate OKRs!",
        };
        setMessages((prev) => [...prev, fallbackMessage]);
      }
    } catch (error) {
      const errorMessage: ChatMessage = {
        role: "assistant",
        content: "I encountered an error. Please try again or use the OKR Generator button below for AI-powered OKR creation.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickPrompt = (prompt: string) => {
    setInput(prompt);
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 h-14 w-14 rounded-full shadow-lg bg-gradient-to-br from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
        size="icon"
      >
        <Bot className="h-6 w-6" />
      </Button>
    );
  }

  return (
    <div
      className={cn(
        "fixed bottom-6 right-6 z-40 w-[420px] shadow-2xl",
        isMinimized ? "h-14" : "h-[650px]"
      )}
    >
      <Card className="h-full flex flex-col">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 border-b bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-md">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-base font-bold">AI Strategy Guru</CardTitle>
              <Badge variant="secondary" className="text-xs mt-1">
                GPT-4o Powered
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
                      "rounded-lg px-4 py-3 max-w-[85%] shadow-sm",
                      message.role === "user"
                        ? "bg-gradient-to-br from-blue-600 to-purple-600 text-white"
                        : "bg-gray-100 text-gray-900 border border-gray-200"
                    )}
                  >
                    <p className="text-sm whitespace-pre-wrap leading-relaxed">
                      {message.content}
                    </p>
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div className="rounded-lg px-4 py-3 bg-gray-100 border border-gray-200">
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
                      <span className="text-sm text-gray-600">Thinking...</span>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </CardContent>

            <div className="p-4 border-t space-y-3 bg-gray-50">
              {/* Quick Actions */}
              {messages.length <= 2 && (
                <div className="space-y-2">
                  <p className="text-xs font-medium text-gray-700">Quick Actions:</p>
                  <div className="grid grid-cols-2 gap-2">
                    {onGenerateOKR && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-xs justify-start gap-2"
                        onClick={onGenerateOKR}
                      >
                        <Wand2 className="h-3 w-3" />
                        Generate OKRs
                      </Button>
                    )}
                    {onOpenPlaybook && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-xs justify-start gap-2"
                        onClick={onOpenPlaybook}
                      >
                        <Bot className="h-3 w-3" />
                        OKR Playbook
                      </Button>
                    )}
                  </div>
                </div>
              )}

              {/* Quick Prompts */}
              {messages.length <= 2 && (
                <div className="space-y-2">
                  <p className="text-xs font-medium text-gray-700">Try asking:</p>
                  <div className="flex flex-wrap gap-2">
                    {quickPrompts.map((prompt, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        className="text-xs h-auto py-1.5 px-3"
                        onClick={() => handleQuickPrompt(prompt)}
                      >
                        {prompt}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input */}
              <div className="flex gap-2">
                <Input
                  placeholder="Ask me anything about OKRs..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
                  disabled={loading}
                  className="flex-1 bg-white"
                />
                <Button
                  onClick={handleSend}
                  size="icon"
                  disabled={loading || !input.trim()}
                  className="bg-gradient-to-br from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          </>
        )}
      </Card>
    </div>
  );
}
