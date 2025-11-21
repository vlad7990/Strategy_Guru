"use client";

import { useStore } from "@/store/useStore";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search, Plus, ThumbsUp, ThumbsDown, MessageSquare } from "lucide-react";
import { formatDate } from "@/lib/utils";

export default function CustomerFeedbackPage() {
  const { customerFeedback } = useStore();

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return <ThumbsUp className="h-5 w-5 text-green-600" />;
      case "negative":
        return <ThumbsDown className="h-5 w-5 text-red-600" />;
      default:
        return <MessageSquare className="h-5 w-5 text-gray-500" />;
    }
  };

  const getSentimentBadge = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return <Badge variant="success">Positive</Badge>;
      case "negative":
        return <Badge variant="destructive">Negative</Badge>;
      default:
        return <Badge variant="secondary">Neutral</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "new":
        return <Badge variant="default">New</Badge>;
      case "reviewed":
        return <Badge variant="warning">Reviewed</Badge>;
      case "actioned":
        return <Badge variant="success">Actioned</Badge>;
      case "closed":
        return <Badge variant="outline">Closed</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const positive = customerFeedback.filter((f) => f.sentiment === "positive");
  const negative = customerFeedback.filter((f) => f.sentiment === "negative");
  const neutral = customerFeedback.filter((f) => f.sentiment === "neutral");

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Customer Feedback</h1>
          <p className="text-gray-500 mt-2">
            Manage and respond to customer feedback
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Feedback
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Feedback</CardTitle>
            <MessageSquare className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{customerFeedback.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Positive</CardTitle>
            <ThumbsUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{positive.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Negative</CardTitle>
            <ThumbsDown className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{negative.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Neutral</CardTitle>
            <MessageSquare className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-600">{neutral.length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input placeholder="Search feedback..." className="pl-9" />
          </div>
        </CardContent>
      </Card>

      {/* Feedback List */}
      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All ({customerFeedback.length})</TabsTrigger>
          <TabsTrigger value="positive">Positive ({positive.length})</TabsTrigger>
          <TabsTrigger value="negative">Negative ({negative.length})</TabsTrigger>
          <TabsTrigger value="neutral">Neutral ({neutral.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {customerFeedback.map((item) => (
            <Card key={item.id}>
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="mt-1">{getSentimentIcon(item.sentiment)}</div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{item.customer}</h3>
                        <p className="text-sm text-gray-600 mt-1">{item.feedback}</p>
                      </div>
                      <div className="flex gap-2">
                        {getSentimentBadge(item.sentiment)}
                        {getStatusBadge(item.status)}
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <Badge variant="outline">{item.category}</Badge>
                      <Badge variant={item.priority === "high" ? "destructive" : item.priority === "medium" ? "warning" : "secondary"}>
                        {item.priority} priority
                      </Badge>
                      <span>{formatDate(item.date)}</span>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button size="sm" variant="outline">Reply</Button>
                      <Button size="sm" variant="outline">Mark as Actioned</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="positive" className="space-y-4">
          {positive.map((item) => (
            <Card key={item.id}>
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="mt-1">{getSentimentIcon(item.sentiment)}</div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{item.customer}</h3>
                        <p className="text-sm text-gray-600 mt-1">{item.feedback}</p>
                      </div>
                      {getStatusBadge(item.status)}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <Badge variant="outline">{item.category}</Badge>
                      <span>{formatDate(item.date)}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="negative" className="space-y-4">
          {negative.map((item) => (
            <Card key={item.id}>
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="mt-1">{getSentimentIcon(item.sentiment)}</div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{item.customer}</h3>
                        <p className="text-sm text-gray-600 mt-1">{item.feedback}</p>
                      </div>
                      {getStatusBadge(item.status)}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <Badge variant="outline">{item.category}</Badge>
                      <Badge variant="destructive">{item.priority} priority</Badge>
                      <span>{formatDate(item.date)}</span>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button size="sm" variant="outline">Reply</Button>
                      <Button size="sm" variant="outline">Escalate</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="neutral" className="space-y-4">
          {neutral.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <MessageSquare className="h-12 w-12 text-gray-400 mb-4" />
                <p className="text-lg font-medium text-gray-900">No neutral feedback</p>
              </CardContent>
            </Card>
          ) : (
            neutral.map((item) => (
              <Card key={item.id}>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="mt-1">{getSentimentIcon(item.sentiment)}</div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{item.customer}</h3>
                          <p className="text-sm text-gray-600 mt-1">{item.feedback}</p>
                        </div>
                        {getStatusBadge(item.status)}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <Badge variant="outline">{item.category}</Badge>
                        <span>{formatDate(item.date)}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
