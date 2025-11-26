const Database = require('better-sqlite3');
const path = require('path');
const { randomUUID } = require('crypto');

const db = new Database(path.join(__dirname, '../dev.db'));

try {
  console.log('🌱 Seeding database...\n');

  // Create a test user
  const userId = randomUUID();
  db.prepare(`
    INSERT INTO users (id, email, name, password, role)
    VALUES (?, ?, ?, ?, ?)
  `).run(userId, 'admin@strategyguru.com', 'Admin User', 'hashed_password_here', 'ADMIN');
  console.log('✅ Created test user');

  // Create objectives with key results
  const objective1Id = randomUUID();
  db.prepare(`
    INSERT INTO objectives (id, title, description, quarter, year, category, status, progress, ownerId)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    objective1Id,
    'Increase Customer Retention',
    'Reduce churn rate and improve customer lifetime value',
    'Q1',
    2025,
    'Customer Success',
    'in_progress',
    65,
    userId
  );

  db.prepare(`
    INSERT INTO key_results (id, title, target, current, unit, objectiveId)
    VALUES (?, ?, ?, ?, ?, ?)
  `).run(randomUUID(), 'Reduce churn rate', 15, 18, '%', objective1Id);

  db.prepare(`
    INSERT INTO key_results (id, title, target, current, unit, objectiveId)
    VALUES (?, ?, ?, ?, ?, ?)
  `).run(randomUUID(), 'Increase NPS score', 50, 42, 'points', objective1Id);

  const objective2Id = randomUUID();
  db.prepare(`
    INSERT INTO objectives (id, title, description, quarter, year, category, status, progress, ownerId)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    objective2Id,
    'Launch Mobile App',
    'Deliver iOS and Android apps to expand market reach',
    'Q2',
    2025,
    'Product Development',
    'planning',
    25,
    userId
  );

  db.prepare(`
    INSERT INTO key_results (id, title, target, current, unit, objectiveId)
    VALUES (?, ?, ?, ?, ?, ?)
  `).run(randomUUID(), 'Complete app development', 100, 25, '%', objective2Id);

  console.log('✅ Created 2 objectives with key results');

  // Create metrics
  const metrics = [
    { name: 'Monthly Recurring Revenue', value: 125000, change: 15.3, trend: 'up', period: 'monthly', category: 'Revenue' },
    { name: 'Customer Acquisition Cost', value: 450, change: -8.2, trend: 'down', period: 'monthly', category: 'Growth' },
    { name: 'Net Promoter Score', value: 42, change: 5.0, trend: 'up', period: 'monthly', category: 'Satisfaction' },
    { name: 'Daily Active Users', value: 12500, change: 12.1, trend: 'up', period: 'monthly', category: 'Engagement' },
    { name: 'Churn Rate', value: 3.2, change: -1.1, trend: 'down', period: 'monthly', category: 'Retention' },
  ];

  metrics.forEach(metric => {
    db.prepare(`
      INSERT INTO metrics (id, name, value, change, trend, period, category, ownerId)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run(randomUUID(), metric.name, metric.value, metric.change, metric.trend, metric.period, metric.category, userId);
  });
  console.log('✅ Created 5 metrics');

  // Create customer feedback
  const feedbacks = [
    { customer: 'Alice Johnson', feedback: 'Love the new dashboard! Very intuitive.', sentiment: 'positive', category: 'Product', priority: 'medium', status: 'resolved' },
    { customer: 'Bob Smith', feedback: 'Export feature is broken on mobile.', sentiment: 'negative', category: 'Bug', priority: 'high', status: 'in_progress' },
    { customer: 'Carol White', feedback: 'Would love to see dark mode support.', sentiment: 'neutral', category: 'Feature Request', priority: 'low', status: 'open' },
  ];

  feedbacks.forEach(feedback => {
    db.prepare(`
      INSERT INTO customer_feedback (id, customer, feedback, sentiment, category, priority, status, ownerId)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run(randomUUID(), feedback.customer, feedback.feedback, feedback.sentiment, feedback.category, feedback.priority, feedback.status, userId);
  });
  console.log('✅ Created 3 customer feedback items');

  // Create competitors
  const competitors = [
    { name: 'ProductPro', marketShare: 35.5, threat: 'high', strengths: JSON.stringify(['Strong brand', 'Large user base']), weaknesses: JSON.stringify(['Expensive', 'Complex UI']), recentMoves: JSON.stringify(['Launched AI features']) },
    { name: 'StrategyHub', marketShare: 22.3, threat: 'medium', strengths: JSON.stringify(['Good integrations']), weaknesses: JSON.stringify(['Limited reporting']), recentMoves: JSON.stringify(['New pricing tier']) },
    { name: 'MetricsMax', marketShare: 15.7, threat: 'low', strengths: JSON.stringify(['Analytics focused']), weaknesses: JSON.stringify(['No mobile app']), recentMoves: JSON.stringify(['Partnership with Salesforce']) },
  ];

  competitors.forEach(comp => {
    db.prepare(`
      INSERT INTO competitors (id, name, marketShare, threat, strengths, weaknesses, recentMoves)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(randomUUID(), comp.name, comp.marketShare, comp.threat, comp.strengths, comp.weaknesses, comp.recentMoves);
  });
  console.log('✅ Created 3 competitors');

  // Create roadmap items
  const roadmapItems = [
    { title: 'AI-Powered Insights', description: 'Integrate GPT-4o for automated insights', quarter: 'Q1', year: 2025, status: 'in-progress', priority: 'must-have', impact: 'high', category: 'AI', owner: 'Product Team', dependencies: JSON.stringify([]) },
    { title: 'Mobile App v1.0', description: 'Launch iOS and Android apps', quarter: 'Q2', year: 2025, status: 'planned', priority: 'must-have', impact: 'high', category: 'Platform', owner: 'Mobile Team', dependencies: JSON.stringify(['API v2']) },
    { title: 'Advanced Reporting', description: 'Custom report builder with exports', quarter: 'Q3', year: 2025, status: 'planned', priority: 'should-have', impact: 'medium', category: 'Reporting', owner: 'Analytics Team', dependencies: JSON.stringify([]) },
  ];

  roadmapItems.forEach(item => {
    db.prepare(`
      INSERT INTO roadmap_items (id, title, description, quarter, year, status, priority, impact, category, owner, dependencies)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(randomUUID(), item.title, item.description, item.quarter, item.year, item.status, item.priority, item.impact, item.category, item.owner, item.dependencies);
  });
  console.log('✅ Created 3 roadmap items');

  // Create projects
  const project1Id = randomUUID();
  db.prepare(`
    INSERT INTO projects (id, name, description, status, progress, budget, spent, startDate, endDate, ownerId)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    project1Id,
    'Q1 Platform Improvements',
    'Performance optimization and bug fixes',
    'in-progress',
    60,
    50000,
    32000,
    '2025-01-01',
    '2025-03-31',
    userId
  );

  // Create tasks for the project
  db.prepare(`
    INSERT INTO tasks (id, title, description, status, priority, assignee, dueDate, projectId)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `).run(randomUUID(), 'Optimize database queries', 'Improve query performance', 'done', 'high', 'John Doe', '2025-02-15', project1Id);

  db.prepare(`
    INSERT INTO tasks (id, title, description, status, priority, assignee, dueDate, projectId)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `).run(randomUUID(), 'Fix login bug', 'Resolve OAuth issue', 'in-progress', 'high', 'Jane Smith', '2025-02-20', project1Id);

  console.log('✅ Created 1 project with 2 tasks');

  // Create reports
  const reports = [
    { name: 'Weekly Executive Summary', type: 'executive', description: 'High-level KPIs and trends', frequency: 'weekly', status: 'active', lastRun: '2025-01-20T10:00:00Z' },
    { name: 'Monthly Product Metrics', type: 'product', description: 'Product usage and adoption', frequency: 'monthly', status: 'active', lastRun: '2025-01-01T09:00:00Z' },
    { name: 'Quarterly Business Review', type: 'financial', description: 'Revenue and financial metrics', frequency: 'quarterly', status: 'active', lastRun: null },
  ];

  reports.forEach(report => {
    db.prepare(`
      INSERT INTO reports (id, name, type, description, frequency, status, lastRun)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(randomUUID(), report.name, report.type, report.description, report.frequency, report.status, report.lastRun);
  });
  console.log('✅ Created 3 reports');

  // Create alerts
  const alerts = [
    { title: 'High Churn Alert', message: 'Churn rate increased by 15% this week', severity: 'critical', category: 'Retention', status: 'active', actionUrl: '/customers/retention' },
    { title: 'MRR Milestone', message: 'Congratulations! MRR exceeded $125K', severity: 'info', category: 'Revenue', status: 'active', actionUrl: '/metrics/revenue' },
    { title: 'API Rate Limit Warning', message: 'API usage at 85% of limit', severity: 'warning', category: 'Technical', status: 'active', actionUrl: '/settings/api' },
  ];

  alerts.forEach(alert => {
    db.prepare(`
      INSERT INTO alerts (id, title, message, severity, category, status, actionUrl)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(randomUUID(), alert.title, alert.message, alert.severity, alert.category, alert.status, alert.actionUrl);
  });
  console.log('✅ Created 3 alerts');

  console.log('\n✨ Database seeded successfully!');
  console.log('📊 Summary:');
  console.log('  - 1 user');
  console.log('  - 2 objectives');
  console.log('  - 3 key results');
  console.log('  - 5 metrics');
  console.log('  - 3 customer feedback items');
  console.log('  - 3 competitors');
  console.log('  - 3 roadmap items');
  console.log('  - 1 project with 2 tasks');
  console.log('  - 3 reports');
  console.log('  - 3 alerts');

} catch (error) {
  console.error('❌ Error seeding database:', error.message);
  console.error(error);
  process.exit(1);
} finally {
  db.close();
}
