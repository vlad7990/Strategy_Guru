-- Strategy Guru Database Schema (SQLite)
-- This script creates all tables for the application

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    password TEXT NOT NULL,
    role TEXT DEFAULT 'USER' CHECK (role IN ('ADMIN', 'PRODUCT_OWNER', 'USER', 'VIEWER')),
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Objectives table
CREATE TABLE IF NOT EXISTS objectives (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    quarter TEXT NOT NULL,
    year INTEGER NOT NULL,
    category TEXT NOT NULL,
    status TEXT DEFAULT 'active',
    progress REAL DEFAULT 0,
    ownerId TEXT NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (ownerId) REFERENCES users(id)
);

-- Key Results table
CREATE TABLE IF NOT EXISTS key_results (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    target REAL NOT NULL,
    current REAL DEFAULT 0,
    unit TEXT NOT NULL,
    objectiveId TEXT NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (objectiveId) REFERENCES objectives(id) ON DELETE CASCADE
);

-- Metrics table
CREATE TABLE IF NOT EXISTS metrics (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    value REAL NOT NULL,
    change REAL NOT NULL,
    trend TEXT NOT NULL,
    period TEXT NOT NULL,
    category TEXT NOT NULL,
    ownerId TEXT NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (ownerId) REFERENCES users(id)
);

-- Feature Analytics table
CREATE TABLE IF NOT EXISTS feature_analytics (
    id TEXT PRIMARY KEY,
    featureName TEXT NOT NULL,
    adoption REAL NOT NULL,
    engagement REAL NOT NULL,
    retention REAL NOT NULL,
    satisfaction REAL NOT NULL,
    category TEXT NOT NULL,
    launchedDate DATETIME NOT NULL,
    activeUsers INTEGER NOT NULL,
    totalUsers INTEGER NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- AB Tests table
CREATE TABLE IF NOT EXISTS ab_tests (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    status TEXT NOT NULL,
    startDate DATETIME NOT NULL,
    endDate DATETIME,
    controlVariant TEXT NOT NULL,
    testVariant TEXT NOT NULL,
    winner TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Customers table
CREATE TABLE IF NOT EXISTS customers (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    company TEXT,
    segment TEXT,
    revenue REAL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Customer Feedback table
CREATE TABLE IF NOT EXISTS customer_feedback (
    id TEXT PRIMARY KEY,
    customer TEXT NOT NULL,
    feedback TEXT NOT NULL,
    sentiment TEXT NOT NULL,
    category TEXT NOT NULL,
    priority TEXT NOT NULL,
    status TEXT DEFAULT 'open',
    date DATETIME DEFAULT CURRENT_TIMESTAMP,
    customerId TEXT,
    ownerId TEXT NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (ownerId) REFERENCES users(id)
);

-- Customer Segments table
CREATE TABLE IF NOT EXISTS customer_segments (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    customerCount INTEGER NOT NULL,
    revenue REAL NOT NULL,
    growth REAL NOT NULL,
    characteristics TEXT NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Competitors table
CREATE TABLE IF NOT EXISTS competitors (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    marketShare REAL NOT NULL,
    threat TEXT NOT NULL,
    strengths TEXT NOT NULL,
    weaknesses TEXT NOT NULL,
    recentMoves TEXT NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Roadmap Items table
CREATE TABLE IF NOT EXISTS roadmap_items (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    quarter TEXT NOT NULL,
    year INTEGER NOT NULL,
    status TEXT NOT NULL,
    priority TEXT NOT NULL,
    impact TEXT NOT NULL,
    category TEXT NOT NULL,
    owner TEXT NOT NULL,
    dependencies TEXT NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    status TEXT NOT NULL,
    progress REAL DEFAULT 0,
    budget REAL NOT NULL,
    spent REAL DEFAULT 0,
    startDate DATETIME NOT NULL,
    endDate DATETIME NOT NULL,
    ownerId TEXT NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (ownerId) REFERENCES users(id)
);

-- Tasks table
CREATE TABLE IF NOT EXISTS tasks (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    status TEXT DEFAULT 'todo',
    priority TEXT DEFAULT 'medium',
    assignee TEXT,
    dueDate DATETIME,
    projectId TEXT NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (projectId) REFERENCES projects(id) ON DELETE CASCADE
);

-- Team Members table
CREATE TABLE IF NOT EXISTS team_members (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    efficiency REAL NOT NULL,
    tasksCompleted INTEGER NOT NULL,
    currentLoad INTEGER NOT NULL,
    availability TEXT NOT NULL,
    skills TEXT NOT NULL,
    userId TEXT NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users(id)
);

-- Reports table
CREATE TABLE IF NOT EXISTS reports (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    type TEXT NOT NULL,
    description TEXT,
    frequency TEXT NOT NULL,
    status TEXT DEFAULT 'active',
    lastRun DATETIME,
    config TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Alerts table
CREATE TABLE IF NOT EXISTS alerts (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    severity TEXT NOT NULL,
    category TEXT NOT NULL,
    status TEXT DEFAULT 'active',
    actionUrl TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Data Sources table
CREATE TABLE IF NOT EXISTS data_sources (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    type TEXT NOT NULL,
    status TEXT NOT NULL,
    lastSync DATETIME,
    config TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Integrations table
CREATE TABLE IF NOT EXISTS integrations (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    type TEXT NOT NULL,
    status TEXT NOT NULL,
    config TEXT,
    lastUsed DATETIME,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for foreign keys
CREATE INDEX IF NOT EXISTS idx_objectives_ownerId ON objectives(ownerId);
CREATE INDEX IF NOT EXISTS idx_key_results_objectiveId ON key_results(objectiveId);
CREATE INDEX IF NOT EXISTS idx_metrics_ownerId ON metrics(ownerId);
CREATE INDEX IF NOT EXISTS idx_customer_feedback_ownerId ON customer_feedback(ownerId);
CREATE INDEX IF NOT EXISTS idx_projects_ownerId ON projects(ownerId);
CREATE INDEX IF NOT EXISTS idx_tasks_projectId ON tasks(projectId);
CREATE INDEX IF NOT EXISTS idx_team_members_userId ON team_members(userId);
