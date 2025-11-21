"use client";

import { useStore } from "@/store/useStore";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Plus, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { formatDate } from "@/lib/utils";
import * as LucideIcons from "lucide-react";

export default function IntegrationsPage() {
  const { integrations } = useStore();

  const activeIntegrations = integrations.filter((i) => i.status === "active");
  const inactiveIntegrations = integrations.filter((i) => i.status === "inactive");

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case "inactive":
        return <XCircle className="h-5 w-5 text-gray-400" />;
      case "error":
        return <AlertCircle className="h-5 w-5 text-red-600" />;
      default:
        return null;
    }
  };

  const IntegrationCard = ({ integration }: { integration: typeof integrations[0] }) => {
    // Dynamically get the icon component
    const IconComponent = (LucideIcons as any)[integration.icon] || LucideIcons.Package;

    return (
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
              <IconComponent className="h-6 w-6 text-blue-600" />
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{integration.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {integration.description}
                  </p>
                  <div className="flex items-center gap-3 mt-3">
                    <Badge variant="secondary">{integration.category}</Badge>
                    {integration.connectedAt && (
                      <span className="text-xs text-gray-500">
                        Connected {formatDate(integration.connectedAt)}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusIcon(integration.status)}
                  <Badge
                    variant={
                      integration.status === "active"
                        ? "success"
                        : integration.status === "error"
                        ? "destructive"
                        : "secondary"
                    }
                  >
                    {integration.status}
                  </Badge>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-4">
                {integration.status === "active" ? (
                  <>
                    <Button size="sm" variant="outline">
                      Configure
                    </Button>
                    <Button size="sm" variant="outline">
                      Disconnect
                    </Button>
                  </>
                ) : (
                  <Button size="sm">Connect</Button>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Integrations</h1>
          <p className="text-gray-500 mt-2">
            Connect your favorite tools and services
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Browse All
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Integrations
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{integrations.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {activeIntegrations.length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available</CardTitle>
            <XCircle className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-600">
              {inactiveIntegrations.length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search integrations..."
              className="pl-9"
            />
          </div>
        </CardContent>
      </Card>

      {/* Integrations List */}
      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All ({integrations.length})</TabsTrigger>
          <TabsTrigger value="active">
            Active ({activeIntegrations.length})
          </TabsTrigger>
          <TabsTrigger value="available">
            Available ({inactiveIntegrations.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {integrations.map((integration) => (
            <IntegrationCard key={integration.id} integration={integration} />
          ))}
        </TabsContent>

        <TabsContent value="active" className="space-y-4">
          {activeIntegrations.map((integration) => (
            <IntegrationCard key={integration.id} integration={integration} />
          ))}
        </TabsContent>

        <TabsContent value="available" className="space-y-4">
          {inactiveIntegrations.map((integration) => (
            <IntegrationCard key={integration.id} integration={integration} />
          ))}
        </TabsContent>
      </Tabs>

      {/* Popular Categories */}
      <Card>
        <CardHeader>
          <CardTitle>Browse by Category</CardTitle>
          <CardDescription>
            Explore integrations by category
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-3">
            <Button variant="outline" className="justify-start">
              Communication
            </Button>
            <Button variant="outline" className="justify-start">
              Project Management
            </Button>
            <Button variant="outline" className="justify-start">
              CRM
            </Button>
            <Button variant="outline" className="justify-start">
              Analytics
            </Button>
            <Button variant="outline" className="justify-start">
              Marketing
            </Button>
            <Button variant="outline" className="justify-start">
              Developer Tools
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
