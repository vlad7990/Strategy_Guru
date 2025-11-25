/**
 * Strategic Objective Categories
 * Enterprise-level strategic functions for OKR planning
 */

export const STRATEGIC_CATEGORIES = [
  {
    id: 'revenue-generation',
    name: 'Revenue Generation',
    description: 'Drive growth, sales, and market expansion',
    icon: '💰',
    color: 'green',
    examples: [
      'Increase annual recurring revenue (ARR)',
      'Expand into new market segments',
      'Improve sales conversion rates',
    ],
  },
  {
    id: 'cost-savings',
    name: 'Cost Savings',
    description: 'Optimize spending and improve efficiency',
    icon: '💵',
    color: 'blue',
    examples: [
      'Reduce operational costs',
      'Optimize infrastructure spending',
      'Improve resource utilization',
    ],
  },
  {
    id: 'risk-reduction',
    name: 'Risk Reduction',
    description: 'Minimize business risks and improve stability',
    icon: '🛡️',
    color: 'red',
    examples: [
      'Reduce security vulnerabilities',
      'Improve system reliability',
      'Minimize compliance risks',
    ],
  },
  {
    id: 'regulatory-compliance',
    name: 'Regulatory Compliance',
    description: 'Meet legal and regulatory requirements',
    icon: '⚖️',
    color: 'purple',
    examples: [
      'Achieve SOC 2 certification',
      'GDPR/CCPA compliance',
      'Industry-specific regulations',
    ],
  },
  {
    id: 'customer-experience',
    name: 'Customer Experience',
    description: 'Improve satisfaction, retention, and loyalty',
    icon: '❤️',
    color: 'pink',
    examples: [
      'Increase Net Promoter Score (NPS)',
      'Reduce customer churn',
      'Improve support response times',
    ],
  },
  {
    id: 'operational-excellence',
    name: 'Operational Excellence',
    description: 'Enhance processes, quality, and efficiency',
    icon: '⚙️',
    color: 'gray',
    examples: [
      'Reduce bug escape rate',
      'Improve deployment frequency',
      'Optimize workflow efficiency',
    ],
  },
  {
    id: 'innovation-rd',
    name: 'Innovation & R&D',
    description: 'Develop new products and technologies',
    icon: '🚀',
    color: 'indigo',
    examples: [
      'Launch new product features',
      'Develop AI capabilities',
      'Patent new technology',
    ],
  },
  {
    id: 'market-position',
    name: 'Market Position',
    description: 'Strengthen brand and competitive advantage',
    icon: '🎯',
    color: 'yellow',
    examples: [
      'Increase market share',
      'Improve brand recognition',
      'Outpace competitor growth',
    ],
  },
  {
    id: 'talent-culture',
    name: 'Talent & Culture',
    description: 'Develop team capabilities and engagement',
    icon: '👥',
    color: 'teal',
    examples: [
      'Improve employee satisfaction',
      'Reduce turnover rate',
      'Enhance team skills',
    ],
  },
] as const;

export type StrategicCategory = typeof STRATEGIC_CATEGORIES[number];
