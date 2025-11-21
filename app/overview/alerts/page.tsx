"use client";

import { useStore } from "@/store/useStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, AlertTriangle, Info, CheckCircle } from "lucide-react";
import { formatDate } from "@/lib/utils";

export default function AlertsPage() {
  const { alerts } = useStore();

  const unreadAlerts = alerts.filter((a) => !a.read);
  const readAlerts = alerts.filter((a) => a.read);
  const criticalAlerts = alerts.filter((a) => a.severity === "critical");

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "critical":
        return <AlertCircle className="h-5 w-5 text-red-600" />;
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-yellow-600" />;
      default:
        return <Info className="h-5 w-5 text-blue-600" />;
    }
  };

  const AlertCard = ({ alert }: { alert: typeof alerts[0] }) => (
    <Card className={!alert.read ? "border-l-4 border-l-blue-600" : ""}>
      <CardContent className="pt-6">
        <div className="flex items-start gap-4">
          <div className="mt-1">{getSeverityIcon(alert.severity)}</div>
          <div className="flex-1">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{alert.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{alert.description}</p>
                <div className="flex items-center gap-4 mt-3">
                  <Badge variant="secondary">{alert.category}</Badge>
                  <span className="text-xs text-gray-500">
                    {formatDate(alert.timestamp)}
                  </span>
                  {alert.actionRequired && (
                    <Badge variant="warning">Action Required</Badge>
                  )}
                </div>
              </div>
              <Badge
                variant={
                  alert.severity === "critical"
                    ? "destructive"
                    : alert.severity === "warning"
                    ? "warning"
                    : "default"
                }
              >
                {alert.severity}
              </Badge>
            </div>
            {!alert.read && (
              <Button size="sm" className="mt-4">
                Mark as Read
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Alerts & Notifications</h1>
        <p className="text-gray-500 mt-2">
          Stay informed about critical events and important updates
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unread Alerts</CardTitle>
            <AlertCircle className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{unreadAlerts.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{criticalAlerts.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Alerts</CardTitle>
            <CheckCircle className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{alerts.length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Alerts List */}
      <Tabs defaultValue="unread">
        <TabsList>
          <TabsTrigger value="unread">
            Unread ({unreadAlerts.length})
          </TabsTrigger>
          <TabsTrigger value="all">All ({alerts.length})</TabsTrigger>
          <TabsTrigger value="critical">
            Critical ({criticalAlerts.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="unread" className="space-y-4">
          {unreadAlerts.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <CheckCircle className="h-12 w-12 text-green-600 mb-4" />
                <p className="text-lg font-medium text-gray-900">All caught up!</p>
                <p className="text-sm text-gray-500 mt-1">
                  You have no unread alerts
                </p>
              </CardContent>
            </Card>
          ) : (
            unreadAlerts.map((alert) => <AlertCard key={alert.id} alert={alert} />)
          )}
        </TabsContent>

        <TabsContent value="all" className="space-y-4">
          {alerts.map((alert) => (
            <AlertCard key={alert.id} alert={alert} />
          ))}
        </TabsContent>

        <TabsContent value="critical" className="space-y-4">
          {criticalAlerts.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <CheckCircle className="h-12 w-12 text-green-600 mb-4" />
                <p className="text-lg font-medium text-gray-900">
                  No critical alerts
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  All systems operating normally
                </p>
              </CardContent>
            </Card>
          ) : (
            criticalAlerts.map((alert) => <AlertCard key={alert.id} alert={alert} />)
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
