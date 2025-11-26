/**
 * Strategic Objective Categories with Hierarchical OKR Levels
 * Enterprise-level strategic functions for OKR planning
 */

/**
 * Organizational OKR Levels
 * Defines the three levels of OKR hierarchy for strategic alignment
 */
export const OKR_LEVELS = [
  {
    id: 'business-strategy',
    name: 'Business Strategy Level',
    description: 'CEO and Executive Leadership - Company-wide transformation, market position, and long-term value creation',
    timeframe: '3-year vision with annual milestones',
    focus: ['Market position', 'Stakeholder value', 'Competitive advantage', 'Organizational transformation'],
    reviewCycle: 'Annual with quarterly checkpoints',
    exampleRoles: ['CEO', 'Board of Directors', 'Executive Leadership Team'],
  },
  {
    id: 'enterprise',
    name: 'Enterprise Level',
    description: 'Cross-functional initiatives, operational excellence, and organizational capabilities',
    timeframe: 'Annual objectives with quarterly milestones',
    focus: ['Cross-functional initiatives', 'Operational excellence', 'Organizational capabilities', 'Strategic programs'],
    reviewCycle: 'Quarterly with monthly reviews',
    exampleRoles: ['VP of Operations', 'Chief Product Officer', 'Chief Revenue Officer'],
  },
  {
    id: 'department',
    name: 'Department Level',
    description: 'Functional teams - Direct contribution to enterprise and business strategy objectives',
    timeframe: 'Quarterly objectives',
    focus: ['Team performance', 'Functional excellence', 'Direct deliverables', 'Process improvements'],
    reviewCycle: 'Monthly with bi-weekly check-ins',
    exampleRoles: ['Engineering Manager', 'Sales Director', 'Marketing Manager'],
  },
] as const;

/**
 * Strategic Categories with hierarchical examples
 * Each category includes examples at Business Strategy, Enterprise, and Department levels
 */
export const STRATEGIC_CATEGORIES = [
  {
    id: 'revenue-generation',
    name: 'Revenue Generation',
    description: 'Drive growth, sales, and market expansion',
    icon: '💰',
    color: 'green',
    levels: ['business-strategy', 'enterprise', 'department'],
    examples: [
      {
        level: 'business-strategy',
        objective: 'Establish market leadership in European SaaS market',
        valueDrivers: [
          'Achieve €10M ARR in European markets by Q4 2025',
          'Acquire 500 enterprise customers across 5 countries',
          'Establish local presence with offices in London, Berlin, and Paris',
          'Achieve 95% customer satisfaction score in European markets',
          'Generate 40% of total company revenue from Europe',
        ],
      },
      {
        level: 'enterprise',
        objective: 'Launch and scale new product line to drive revenue diversification',
        valueDrivers: [
          'Generate $2M ARR from new product line by Q4',
          'Achieve 500 paid customers on new product',
          'Maintain 85% gross margin on new product sales',
          'Reach 60% customer adoption rate among existing base',
        ],
      },
      {
        level: 'department',
        objective: 'Accelerate enterprise sales pipeline growth',
        valueDrivers: [
          'Generate $5M in qualified pipeline by end of Q2',
          'Increase average deal size to $50K',
          'Achieve 25% win rate on enterprise deals',
          'Close 15 new enterprise customers',
          'Reduce sales cycle length to 60 days',
        ],
      },
    ],
  },
  {
    id: 'cost-savings',
    name: 'Cost Savings',
    description: 'Optimize spending and improve efficiency',
    icon: '💵',
    color: 'blue',
    levels: ['business-strategy', 'enterprise', 'department'],
    examples: [
      {
        level: 'business-strategy',
        objective: 'Transform cost structure to achieve sustainable profitability',
        valueDrivers: [
          'Reduce overall operating expenses by 20% ($4M annual savings)',
          'Achieve EBITDA positive status by Q3 2025',
          'Improve gross margin from 60% to 75%',
          'Reduce customer acquisition cost (CAC) by 30%',
        ],
      },
      {
        level: 'enterprise',
        objective: 'Optimize cloud infrastructure costs across all products',
        valueDrivers: [
          'Reduce cloud infrastructure spend by $500K annually',
          'Improve compute efficiency by 40%',
          'Achieve 90% resource utilization rate',
          'Migrate 80% of workloads to cost-optimized architecture',
        ],
      },
      {
        level: 'department',
        objective: 'Reduce engineering operational overhead',
        valueDrivers: [
          'Decrease infrastructure costs by $50K per quarter',
          'Automate 75% of manual deployment processes',
          'Reduce on-call incidents by 40%',
          'Improve developer productivity by 25% (measured by deployment frequency)',
        ],
      },
    ],
  },
  {
    id: 'risk-reduction',
    name: 'Risk Reduction',
    description: 'Minimize business risks and improve stability',
    icon: '🛡️',
    color: 'red',
    levels: ['business-strategy', 'enterprise', 'department'],
    examples: [
      {
        level: 'business-strategy',
        objective: 'Build enterprise-grade security and trust framework',
        valueDrivers: [
          'Achieve zero critical security incidents in 2025',
          'Obtain SOC 2 Type II and ISO 27001 certifications',
          'Reach 99.99% uptime SLA across all products',
          'Pass 100% of enterprise security audits',
          'Reduce security-related customer churn to <1%',
        ],
      },
      {
        level: 'enterprise',
        objective: 'Strengthen cybersecurity posture across organization',
        valueDrivers: [
          'Reduce mean time to detect (MTTD) security threats to <15 minutes',
          'Achieve 100% employee security training completion',
          'Remediate 95% of critical vulnerabilities within 24 hours',
          'Pass quarterly penetration tests with zero critical findings',
        ],
      },
      {
        level: 'department',
        objective: 'Eliminate critical production incidents in Q2',
        valueDrivers: [
          'Reduce P0/P1 incidents by 80%',
          'Achieve <10 minute mean time to recovery (MTTR)',
          'Implement automated rollback for 100% of deployments',
          'Maintain 99.95% service uptime',
        ],
      },
    ],
  },
  {
    id: 'regulatory-compliance',
    name: 'Regulatory Compliance',
    description: 'Meet legal and regulatory requirements',
    icon: '⚖️',
    color: 'purple',
    levels: ['business-strategy', 'enterprise', 'department'],
    examples: [
      {
        level: 'business-strategy',
        objective: 'Become the most trusted and compliant platform in the industry',
        valueDrivers: [
          'Achieve compliance with all major frameworks (SOC 2, ISO 27001, GDPR, HIPAA)',
          'Pass 100% of customer compliance audits',
          'Reduce compliance-related deal delays by 90%',
          'Zero regulatory fines or violations in 2025',
        ],
      },
      {
        level: 'enterprise',
        objective: 'Implement comprehensive data privacy compliance program',
        valueDrivers: [
          'Achieve GDPR and CCPA compliance across all products',
          'Process 100% of data subject requests within 30 days',
          'Implement privacy-by-design in 100% of new features',
          'Complete data mapping for all customer data by Q2',
        ],
      },
      {
        level: 'department',
        objective: 'Complete SOC 2 Type II readiness for engineering systems',
        valueDrivers: [
          'Implement required controls for 100% of in-scope systems',
          'Achieve 95% control effectiveness in internal testing',
          'Document all engineering processes per SOC 2 requirements',
          'Complete remediation of all identified gaps by end of Q2',
        ],
      },
    ],
  },
  {
    id: 'customer-experience',
    name: 'Customer Experience',
    description: 'Improve satisfaction, retention, and loyalty',
    icon: '❤️',
    color: 'pink',
    levels: ['business-strategy', 'enterprise', 'department'],
    examples: [
      {
        level: 'business-strategy',
        objective: 'Become the #1 rated platform for customer satisfaction in our category',
        valueDrivers: [
          'Achieve Net Promoter Score (NPS) of 70+',
          'Reduce customer churn to <5% annually',
          'Increase customer lifetime value (LTV) by 50%',
          'Win 3 industry awards for customer experience',
          'Achieve 4.8+ rating on major review platforms',
        ],
      },
      {
        level: 'enterprise',
        objective: 'Transform customer onboarding into competitive advantage',
        valueDrivers: [
          'Reduce time-to-value from 30 to 7 days',
          'Achieve 90% customer activation rate within 14 days',
          'Reach 95% customer satisfaction score for onboarding',
          'Reduce onboarding support tickets by 60%',
        ],
      },
      {
        level: 'department',
        objective: 'Deliver world-class customer support experience',
        valueDrivers: [
          'Achieve <2 hour first response time for all tickets',
          'Maintain 95% customer satisfaction (CSAT) score',
          'Resolve 80% of issues on first contact',
          'Reduce average resolution time to <4 hours',
          'Achieve 100% SLA compliance for enterprise customers',
        ],
      },
    ],
  },
  {
    id: 'operational-excellence',
    name: 'Operational Excellence',
    description: 'Enhance processes, quality, and efficiency',
    icon: '⚙️',
    color: 'gray',
    levels: ['business-strategy', 'enterprise', 'department'],
    examples: [
      {
        level: 'business-strategy',
        objective: 'Build operational foundation for 10x scale',
        valueDrivers: [
          'Support 10x customer growth without proportional cost increase',
          'Achieve 99.99% platform reliability',
          'Reduce operational overhead from 40% to 20% of revenue',
          'Implement automation for 80% of repetitive processes',
        ],
      },
      {
        level: 'enterprise',
        objective: 'Achieve engineering excellence and velocity',
        valueDrivers: [
          'Increase deployment frequency to 20+ per day',
          'Reduce bug escape rate to <2%',
          'Achieve 90% automated test coverage',
          'Reduce technical debt by 40% (measured by SonarQube metrics)',
        ],
      },
      {
        level: 'department',
        objective: 'Optimize development workflow efficiency',
        valueDrivers: [
          'Reduce average cycle time from 5 days to 2 days',
          'Achieve 85% first-time fix rate for bugs',
          'Increase code review turnaround to <2 hours',
          'Reduce build and test time by 50%',
        ],
      },
    ],
  },
  {
    id: 'innovation-rd',
    name: 'Innovation & R&D',
    description: 'Develop new products and technologies',
    icon: '🚀',
    color: 'indigo',
    levels: ['business-strategy', 'enterprise', 'department'],
    examples: [
      {
        level: 'business-strategy',
        objective: 'Establish AI-powered platform as industry standard',
        valueDrivers: [
          'Launch 3 groundbreaking AI features by end of 2025',
          'Generate 30% of revenue from AI-powered features',
          'File 5 patents for proprietary AI technology',
          'Achieve 80% customer adoption of AI features',
          'Win "Most Innovative Product" award in our category',
        ],
      },
      {
        level: 'enterprise',
        objective: 'Accelerate product innovation velocity',
        valueDrivers: [
          'Launch 8 major features in 2025',
          'Achieve 70% feature adoption rate within 90 days',
          'Reduce feature development cycle from 6 months to 3 months',
          'Reach 85% customer satisfaction with new features',
        ],
      },
      {
        level: 'department',
        objective: 'Build next-generation analytics engine',
        valueDrivers: [
          'Launch beta with 100 customers by end of Q2',
          'Achieve 10x performance improvement over current system',
          'Reach 90% feature completeness vs. product requirements',
          'Maintain <5% bug rate in production',
        ],
      },
    ],
  },
  {
    id: 'market-position',
    name: 'Market Position',
    description: 'Strengthen brand and competitive advantage',
    icon: '🎯',
    color: 'yellow',
    levels: ['business-strategy', 'enterprise', 'department'],
    examples: [
      {
        level: 'business-strategy',
        objective: 'Become the recognized leader in our market category',
        valueDrivers: [
          'Grow market share from 15% to 25%',
          'Achieve #1 ranking in Gartner Magic Quadrant',
          'Increase brand awareness to 60% in target market',
          'Outpace nearest competitor growth by 3x',
          'Secure partnerships with 5 major industry leaders',
        ],
      },
      {
        level: 'enterprise',
        objective: 'Dominate enterprise segment in North America',
        valueDrivers: [
          'Win 50% of competitive deals in enterprise segment',
          'Achieve 40% market share in Fortune 500 companies',
          'Generate 10,000 qualified inbound leads',
          'Secure 100 customer case studies and testimonials',
        ],
      },
      {
        level: 'department',
        objective: 'Establish thought leadership in product category',
        valueDrivers: [
          'Publish 24 high-quality blog posts reaching 100K+ readers',
          'Generate 5,000 marketing qualified leads (MQLs)',
          'Achieve 50% increase in organic search traffic',
          'Secure 10 speaking engagements at major industry conferences',
        ],
      },
    ],
  },
  {
    id: 'talent-culture',
    name: 'Talent & Culture',
    description: 'Develop team capabilities and engagement',
    icon: '👥',
    color: 'teal',
    levels: ['business-strategy', 'enterprise', 'department'],
    examples: [
      {
        level: 'business-strategy',
        objective: 'Build world-class team and culture that attracts top talent',
        valueDrivers: [
          'Achieve 90+ employee Net Promoter Score (eNPS)',
          'Reduce voluntary turnover to <8% annually',
          'Rank in top 10 "Best Places to Work" in our industry',
          'Hire 100 exceptional employees across all functions',
          'Achieve 95% diversity hiring goals',
        ],
      },
      {
        level: 'enterprise',
        objective: 'Build high-performing engineering organization',
        valueDrivers: [
          'Hire 30 senior engineers by end of Q4',
          'Achieve 85% employee engagement score',
          'Reduce time-to-hire from 60 to 30 days',
          'Reach 90% offer acceptance rate',
        ],
      },
      {
        level: 'department',
        objective: 'Develop engineering team capabilities and satisfaction',
        valueDrivers: [
          'Achieve 90% team satisfaction score',
          'Complete leadership training for 100% of team leads',
          'Reduce team turnover to <5%',
          'Promote 20% of team members to next level',
        ],
      },
    ],
  },
] as const;

export type OKRLevel = typeof OKR_LEVELS[number];
export type StrategicCategory = typeof STRATEGIC_CATEGORIES[number];

/**
 * Core OKR Principles
 * Fundamental guidelines for effective OKR implementation
 */
export const OKR_PRINCIPLES = [
  {
    principle: 'Transparency',
    description: 'All OKRs should be visible across the organization to enable alignment and collaboration',
  },
  {
    principle: 'Ambitious Goals',
    description: 'Aim for 70% achievement - OKRs should stretch the team beyond comfort zones',
  },
  {
    principle: 'Frequent Check-ins',
    description: 'Regular reviews (weekly/bi-weekly) to track progress and adjust course',
  },
  {
    principle: 'Bottom-up & Top-down',
    description: 'Combine strategic direction from leadership with tactical insights from teams',
  },
  {
    principle: '3-5 Value Drivers',
    description: 'Each objective should have 3-5 measurable value drivers (key results)',
  },
  {
    principle: 'Outcome-focused',
    description: 'Focus on outcomes and business impact, not activities or outputs',
  },
] as const;
