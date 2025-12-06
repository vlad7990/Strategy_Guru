/**
 * Safety & Emotional Comfort Agent
 * Ensures all content is child-safe and emotionally appropriate
 */

import { BaseAgent } from './BaseAgent';
import { StoryDraft, SafetyReview, StoryRequest, AgentContext } from '../types';

export class SafetyAgent extends BaseAgent {
  async execute(
    draft: StoryDraft,
    request: StoryRequest,
    context: AgentContext
  ): Promise<SafetyReview> {
    const systemPrompt = `You are a child safety expert and clinical child psychologist.

Your role:
- Ensure 100% child-safe content
- Identify any triggers, fears, or inappropriate content
- Verify emotional safety and comfort resolution
- Certify age-appropriateness
- Provide safety scoring and certification level

SAFETY CHECKS:
1. ❌ NO violence, gore, or harm to characters
2. ❌ NO scary content without comfort resolution
3. ❌ NO inappropriate themes (death, divorce without care)
4. ❌ NO bullying, meanness without consequences
5. ❌ NO copyrighted characters
6. ❌ NO commercial references
7. ✅ MUST have comforting resolution
8. ✅ MUST be emotionally safe
9. ✅ MUST teach positive values

CERTIFICATION LEVELS:
- CCS-A: Universal (all children)
- CCS-B: Sensitive children (extra gentle)
- CCS-C: Therapeutic (addresses specific fears safely)
- CCS-Therapy: Clinical use (therapist-guided)
- REJECTED: Unsafe, must be rewritten

ANXIETY LEVEL CONSIDERATION:
Parent Anxiety Setting: ${context.parentSettings?.anxietyLevel || 5}/10
- 1-3: Very gentle, minimal tension
- 4-7: Moderate challenges, safe resolution
- 8-10: More intensity allowed, still safe

OUTPUT MUST BE VALID JSON:
{
  "approved": true|false,
  "safetyScore": 95,
  "issues": [
    {
      "severity": "critical|moderate|minor",
      "sceneNumber": 2,
      "issue": "what's wrong",
      "description": "detailed explanation",
      "resolution": "how to fix it"
    }
  ],
  "triggerWarnings": [],
  "recommendations": [],
  "certificationLevel": "CCS-A|CCS-B|CCS-C|CCS-Therapy|REJECTED"
}`;

    const userPrompt = `Review this story for child safety:

Title: ${draft.outline.title}
Age Range: ${request.ageRange}
Parent Anxiety Level: ${context.parentSettings?.anxietyLevel || 5}/10
Content Filter: ${context.parentSettings?.contentFilterLevel || 'moderate'}

FULL STORY:
${draft.scenes.map(s => `
Scene ${s.sceneNumber}: ${s.title}
Emotional Level: ${s.emotionalLevel}/10
Content: ${s.content}
`).join('\n---\n')}

STORY OUTLINE:
Moral Lesson: ${draft.outline.moralLesson}
Emotional Arc: ${draft.outline.emotionalArc}

Perform comprehensive safety review. Be thorough and protective of children.`;

    const review = await this.callAI<SafetyReview>(
      systemPrompt,
      userPrompt,
      {
        temperature: 0.3, // Low temperature for consistent safety checks
        maxTokens: 2000,
        responseFormat: 'json_object',
      }
    );

    return review;
  }
}
