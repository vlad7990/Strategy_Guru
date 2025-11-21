// User and Role Types
export type UserRole = "executive" | "strategist" | "product_owner" | "business_owner";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  department?: string;
}

// Metric Types
export interface Metric {
  id: string;
  name: string;
  value: number;
  previousValue?: number;
  change?: number;
  changeType?: "increase" | "decrease";
  trend?: "up" | "down" | "neutral";
  target?: number;
  unit?: string;
}

// OKR Types
export interface KeyResult {
  id: string;
  description: string;
  currentValue: number;
  targetValue: number;
  unit: string;
  progress: number;
  status: "on-track" | "at-risk" | "behind";
}

export interface Objective {
  id: string;
  title: string;
  description: string;
  owner: string;
  quarter: string;
  year: number;
  progress: number;
  status: "on-track" | "at-risk" | "behind" | "completed";
  keyResults: KeyResult[];
  category: string;
}

// Product Analytics Types
export interface FeatureAnalytics {
  id: string;
  featureName: string;
  adoptionRate: number;
  activeUsers: number;
  engagementScore: number;
  retentionRate: number;
  satisfactionScore: number;
}

export interface ABTest {
  id: string;
  name: string;
  status: "draft" | "running" | "completed" | "paused";
  startDate: string;
  endDate?: string;
  variants: {
    name: string;
    traffic: number;
    conversions: number;
    conversionRate: number;
  }[];
  metric: string;
  winner?: string;
}

// Customer Insights Types
export interface CustomerSegment {
  id: string;
  name: string;
  size: number;
  percentage: number;
  revenue: number;
  growthRate: number;
  characteristics: string[];
}

export interface CustomerFeedback {
  id: string;
  customer: string;
  feedback: string;
  sentiment: "positive" | "neutral" | "negative";
  category: string;
  date: string;
  priority: "high" | "medium" | "low";
  status: "new" | "reviewed" | "actioned" | "closed";
}

// Business Metrics Types
export interface RevenueData {
  period: string;
  revenue: number;
  growth: number;
  forecast?: number;
}

export interface UnitEconomics {
  metric: string;
  value: number;
  previousValue?: number;
  change?: number;
  target?: number;
}

// Project Management Types
export interface Project {
  id: string;
  name: string;
  description: string;
  status: "planning" | "in-progress" | "on-hold" | "completed" | "cancelled";
  priority: "critical" | "high" | "medium" | "low";
  startDate: string;
  endDate: string;
  progress: number;
  owner: string;
  team: string[];
  budget?: number;
  spent?: number;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: "todo" | "in-progress" | "review" | "done";
  priority: "critical" | "high" | "medium" | "low";
  assignee: string;
  dueDate: string;
  project: string;
  tags: string[];
}

// Roadmap Types
export interface RoadmapItem {
  id: string;
  title: string;
  description: string;
  category: string;
  status: "planned" | "in-progress" | "launched" | "cancelled";
  priority: "must-have" | "should-have" | "nice-to-have";
  quarter: string;
  year: number;
  owner: string;
  dependencies?: string[];
  impact: "high" | "medium" | "low";
}

// Competitive Intelligence Types
export interface Competitor {
  id: string;
  name: string;
  marketShare: number;
  strengths: string[];
  weaknesses: string[];
  recentMoves: string[];
  threat: "high" | "medium" | "low";
}

// Alert Types
export interface Alert {
  id: string;
  title: string;
  description: string;
  severity: "critical" | "warning" | "info";
  category: string;
  timestamp: string;
  read: boolean;
  actionRequired: boolean;
}

// Report Types
export interface Report {
  id: string;
  name: string;
  description: string;
  type: "executive" | "product" | "financial" | "operational";
  frequency: "daily" | "weekly" | "monthly" | "quarterly";
  lastGenerated: string;
  recipients: string[];
}

// Team Performance Types
export interface TeamMember {
  id: string;
  name: string;
  role: string;
  performance: number;
  tasksCompleted: number;
  tasksInProgress: number;
  efficiency: number;
  avatar?: string;
}

// Data Source Types
export interface DataSource {
  id: string;
  name: string;
  type: string;
  status: "connected" | "disconnected" | "error";
  lastSync: string;
  recordsCount: number;
}

// Integration Types
export interface Integration {
  id: string;
  name: string;
  description: string;
  category: string;
  status: "active" | "inactive" | "error";
  icon: string;
  connectedAt?: string;
}

// Chart Data Types
export interface ChartDataPoint {
  name: string;
  value: number;
  [key: string]: any;
}

export interface TimeSeriesData {
  date: string;
  value: number;
  [key: string]: any;
}
