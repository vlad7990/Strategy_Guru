"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Settings as SettingsIcon, Bell, Lock, Globe } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-500 mt-2">Manage your account and application preferences</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <SettingsIcon className="h-5 w-5" />
            General Settings
          </CardTitle>
          <CardDescription>Update your organization information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Organization Name</label>
            <Input className="mt-1" defaultValue="Strategy Guru Inc." />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Industry</label>
            <Select className="mt-1">
              <option>Technology</option>
              <option>Finance</option>
              <option>Healthcare</option>
              <option>E-commerce</option>
            </Select>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Company Size</label>
            <Select className="mt-1">
              <option>1-10 employees</option>
              <option>11-50 employees</option>
              <option>51-200 employees</option>
              <option>201+ employees</option>
            </Select>
          </div>
          <Button>Save Changes</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notifications
          </CardTitle>
          <CardDescription>Configure notification preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            { name: "Email notifications", enabled: true },
            { name: "Critical alerts", enabled: true },
            { name: "Weekly reports", enabled: true },
            { name: "Marketing updates", enabled: false },
          ].map((setting, index) => (
            <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
              <span className="text-sm font-medium text-gray-900">{setting.name}</span>
              <Badge variant={setting.enabled ? "success" : "secondary"}>
                {setting.enabled ? "Enabled" : "Disabled"}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5" />
            Security
          </CardTitle>
          <CardDescription>Manage security settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div>
              <p className="font-medium text-gray-900">Two-Factor Authentication</p>
              <p className="text-sm text-gray-500">Add an extra layer of security</p>
            </div>
            <Button variant="outline">Enable</Button>
          </div>
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div>
              <p className="font-medium text-gray-900">Session Timeout</p>
              <p className="text-sm text-gray-500">Auto-logout after inactivity</p>
            </div>
            <Select className="w-32">
              <option>30 minutes</option>
              <option>1 hour</option>
              <option>4 hours</option>
              <option>Never</option>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Localization
          </CardTitle>
          <CardDescription>Set your language and timezone</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Language</label>
            <Select className="mt-1">
              <option>English (US)</option>
              <option>English (UK)</option>
              <option>Spanish</option>
              <option>French</option>
            </Select>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Timezone</label>
            <Select className="mt-1">
              <option>UTC-8 (Pacific)</option>
              <option>UTC-5 (Eastern)</option>
              <option>UTC+0 (London)</option>
              <option>UTC+1 (Paris)</option>
            </Select>
          </div>
          <Button>Save Preferences</Button>
        </CardContent>
      </Card>
    </div>
  );
}
