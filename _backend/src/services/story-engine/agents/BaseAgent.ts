/**
 * Base Agent Class
 * All story generation agents extend this class
 */

import OpenAI from 'openai';

export abstract class BaseAgent {
  protected openai: OpenAI;
  protected modelName: string = 'gpt-4o'; // GPT-4 Optimized (closest to GPT-5 capabilities)

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  /**
   * Make an AI call with structured output
   */
  protected async callAI<T>(
    systemPrompt: string,
    userPrompt: string,
    options?: {
      temperature?: number;
      maxTokens?: number;
      responseFormat?: 'text' | 'json_object';
    }
  ): Promise<T> {
    const temperature = options?.temperature ?? 0.7;
    const maxTokens = options?.maxTokens ?? 4000;
    const responseFormat = options?.responseFormat ?? 'text';

    const response = await this.openai.chat.completions.create({
      model: this.modelName,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      temperature,
      max_tokens: maxTokens,
      response_format: responseFormat === 'json_object' ? { type: 'json_object' } : undefined,
    });

    const content = response.choices[0].message.content;

    if (!content) {
      throw new Error('No response from AI');
    }

    // Parse JSON if requested
    if (responseFormat === 'json_object') {
      return JSON.parse(content) as T;
    }

    return content as T;
  }

  /**
   * Log agent usage for analytics and cost tracking
   */
  protected async logUsage(
    agentType: string,
    operation: string,
    tokensUsed: number,
    cost: number,
    metadata?: any
  ): Promise<void> {
    // TODO: Implement database logging
    console.log(`[${agentType}] ${operation} - Tokens: ${tokensUsed}, Cost: $${cost.toFixed(4)}`);
  }

  /**
   * Abstract method that each agent must implement
   */
  abstract execute(input: any, context?: any): Promise<any>;
}
