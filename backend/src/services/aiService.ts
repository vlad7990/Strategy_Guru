import OpenAI from 'openai';

// Initialize OpenAI client (will use OPENAI_API_KEY from environment)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

// System prompt for OKR generation
const OKR_SYSTEM_PROMPT = `You are an expert Strategy Guru and OKR consultant with deep expertise in creating strategic objectives and key results. You specialize in:

1. **Strategic Objective Categories**: Revenue Generation, Cost Savings, Risk Reduction, Regulatory Compliance, Customer Experience, Operational Excellence, Innovation & R&D, Market Position, and Talent & Culture

2. **OKR Best Practices**:
   - Objectives should be ambitious, qualitative, and inspirational
   - Key Results must be specific, measurable, achievable, relevant, and time-bound (SMART)
   - Each objective should have 2-4 key results
   - Focus on outcomes, not activities
   - Align with business strategy and industry context

3. **Response Format**: Always respond with valid JSON in this exact structure:
{
  "objectives": [
    {
      "title": "Clear, ambitious objective",
      "description": "Why this matters and its strategic impact",
      "category": "One of the 9 strategic categories",
      "quarter": "Q1/Q2/Q3/Q4",
      "year": 2025,
      "keyResults": [
        {
          "description": "Specific, measurable key result",
          "targetValue": 100,
          "unit": "unit of measurement",
          "rationale": "Why this metric matters"
        }
      ]
    }
  ],
  "analysis": "Brief analysis of the input and strategic recommendations"
}

Always generate 2-3 well-thought-out objectives, each with 2-3 key results.`;

export interface KeyResultSuggestion {
  description: string;
  targetValue: number;
  unit: string;
  rationale: string;
}

export interface ObjectiveSuggestion {
  title: string;
  description: string;
  category: string;
  quarter: string;
  year: number;
  keyResults: KeyResultSuggestion[];
}

export interface OKRGenerationResponse {
  objectives: ObjectiveSuggestion[];
  analysis: string;
}

/**
 * Generate OKR suggestions from text input
 */
export async function generateOKRsFromText(
  userInput: string,
  context?: {
    industry?: string;
    companySize?: string;
    currentQuarter?: string;
    existingObjectives?: string[];
  }
): Promise<OKRGenerationResponse> {
  const contextInfo = context
    ? `\n\nContext:\n- Industry: ${context.industry || 'Not specified'}\n- Company Size: ${context.companySize || 'Not specified'}\n- Current Quarter: ${context.currentQuarter || 'Q1 2025'}\n- Existing Objectives: ${context.existingObjectives?.join(', ') || 'None'}`
    : '';

  const userPrompt = `Based on the following input, create 2-3 strategic OKRs that follow best practices and align with enterprise strategic categories:

"${userInput}"${contextInfo}

Generate ambitious yet achievable OKRs with specific, measurable key results. Return only valid JSON following the specified format.`;

  try {
    const completion = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || 'gpt-4o',
      messages: [
        { role: 'system', content: OKR_SYSTEM_PROMPT },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.7,
      max_tokens: 2000,
      response_format: { type: 'json_object' },
    });

    const responseText = completion.choices[0].message.content || '{}';
    const response: OKRGenerationResponse = JSON.parse(responseText);

    return response;
  } catch (error: any) {
    console.error('OpenAI API error:', error);
    throw new Error(`Failed to generate OKRs: ${error.message}`);
  }
}

/**
 * Generate OKRs from a strategy document
 */
export async function generateOKRsFromDocument(
  documentText: string,
  context?: {
    industry?: string;
    companySize?: string;
  }
): Promise<OKRGenerationResponse> {
  const contextInfo = context
    ? `\n\nContext:\n- Industry: ${context.industry || 'Not specified'}\n- Company Size: ${context.companySize || 'Not specified'}`
    : '';

  const userPrompt = `Analyze the following strategy document and extract 2-3 key strategic OKRs that capture the essence of the strategy:

${documentText}${contextInfo}

Transform the strategic goals into concrete, measurable OKRs following best practices. Return only valid JSON following the specified format.`;

  try {
    const completion = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || 'gpt-4o',
      messages: [
        { role: 'system', content: OKR_SYSTEM_PROMPT },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.7,
      max_tokens: 2500,
      response_format: { type: 'json_object' },
    });

    const responseText = completion.choices[0].message.content || '{}';
    const response: OKRGenerationResponse = JSON.parse(responseText);

    return response;
  } catch (error: any) {
    console.error('OpenAI API error:', error);
    throw new Error(`Failed to analyze document: ${error.message}`);
  }
}

/**
 * Chat with AI Assistant about OKRs
 */
export async function chatWithAI(
  messages: { role: 'user' | 'assistant'; content: string }[],
  context?: string
): Promise<string> {
  const systemPrompt = `${OKR_SYSTEM_PROMPT}

${context ? `\n\nCurrent Context:\n${context}` : ''}

You are having a conversation with a user to help them refine their OKRs. Be helpful, ask clarifying questions, and provide specific suggestions. Keep responses concise and actionable.`;

  try {
    const completion = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || 'gpt-4o',
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages.map((msg) => ({
          role: msg.role,
          content: msg.content,
        })),
      ],
      temperature: 0.8,
      max_tokens: 1000,
    });

    return completion.choices[0].message.content || 'I apologize, but I encountered an error. Please try again.';
  } catch (error: any) {
    console.error('OpenAI API error:', error);
    throw new Error(`Chat failed: ${error.message}`);
  }
}

/**
 * Refine existing OKRs based on feedback
 */
export async function refineOKRs(
  existingOKRs: ObjectiveSuggestion[],
  feedback: string
): Promise<OKRGenerationResponse> {
  const userPrompt = `Here are the current OKRs:

${JSON.stringify(existingOKRs, null, 2)}

User feedback: "${feedback}"

Based on this feedback, refine and improve the OKRs. Return only valid JSON following the specified format.`;

  try {
    const completion = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || 'gpt-4o',
      messages: [
        { role: 'system', content: OKR_SYSTEM_PROMPT },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.7,
      max_tokens: 2000,
      response_format: { type: 'json_object' },
    });

    const responseText = completion.choices[0].message.content || '{}';
    const response: OKRGenerationResponse = JSON.parse(responseText);

    return response;
  } catch (error: any) {
    console.error('OpenAI API error:', error);
    throw new Error(`Failed to refine OKRs: ${error.message}`);
  }
}
