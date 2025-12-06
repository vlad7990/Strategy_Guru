/**
 * Critic Agent
 * Reviews story draft and provides constructive feedback
 */

import { BaseAgent } from './BaseAgent';
import { StoryDraft, CriticFeedback, StoryRequest, AgentContext } from '../types';

export class CriticAgent extends BaseAgent {
  async execute(
    draft: StoryDraft,
    request: StoryRequest,
    context: AgentContext
  ): Promise<CriticFeedback> {
    const systemPrompt = `You are an expert children's literature critic and developmental psychologist.

Your role:
- Evaluate story quality for children aged ${request.ageRange}
- Assess pacing, character development, emotional impact, and age-appropriateness
- Provide constructive, actionable feedback
- Score each dimension objectively

EVALUATION CRITERIA:
1. Pacing: Does the story flow well? Right balance of action/calm?
2. Character Development: Are characters engaging and well-developed?
3. Emotional Impact: Does it resonate emotionally while staying safe?
4. Language Quality: Appropriate vocabulary, sentence structure, imagery?
5. Age Appropriateness: Concepts, themes, and complexity match age group?

OUTPUT MUST BE VALID JSON:
{
  "overallScore": 85,
  "strengths": ["strength 1", "strength 2"],
  "weaknesses": ["weakness 1", "weakness 2"],
  "suggestions": [
    {
      "sceneNumber": 2,
      "issue": "what needs improvement",
      "suggestion": "how to improve it",
      "priority": "high|medium|low"
    }
  ],
  "pacing": { "score": 80, "feedback": "detailed feedback" },
  "characterDevelopment": { "score": 85, "feedback": "detailed feedback" },
  "emotionalImpact": { "score": 90, "feedback": "detailed feedback" },
  "languageQuality": { "score": 85, "feedback": "detailed feedback" },
  "ageAppropriateness": { "score": 95, "feedback": "detailed feedback" }
}`;

    const userPrompt = `Review this children's story:

Title: ${draft.outline.title}
Age Range: ${request.ageRange}
Page Count: ${draft.pageCount}
Word Count: ${draft.wordCount}

STORY CONTENT:
${draft.scenes.map(s => `
Scene ${s.sceneNumber}: ${s.title}
${s.content}
`).join('\n---\n')}

Provide comprehensive critique with specific, actionable feedback.`;

    const feedback = await this.callAI<CriticFeedback>(
      systemPrompt,
      userPrompt,
      {
        temperature: 0.6,
        maxTokens: 2000,
        responseFormat: 'json_object',
      }
    );

    return feedback;
  }
}
