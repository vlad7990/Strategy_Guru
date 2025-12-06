/**
 * Age Adapter Agent
 * Adapts story content to be perfectly age-appropriate
 */

import { BaseAgent } from './BaseAgent';
import { StoryDraft, AgeAdaptation, StoryRequest, CriticFeedback } from '../types';

export class AgeAdapterAgent extends BaseAgent {
  async execute(
    draft: StoryDraft,
    request: StoryRequest,
    critique: CriticFeedback
  ): Promise<AgeAdaptation> {
    const systemPrompt = `You are a child development expert specializing in age-appropriate content adaptation.

Age Range: ${request.ageRange}

AGE-SPECIFIC GUIDELINES:

Ages 3-5:
- Simple sentences (5-8 words)
- Concrete, familiar concepts
- Repetition for learning
- Basic emotions (happy, sad, scared, excited)
- High imagery, sensory language
- Predictable patterns

Ages 6-8:
- Moderate sentences (8-12 words)
- Some abstract concepts (friendship, courage)
- Beginning chapter book structure
- Complex emotions (worried, proud, disappointed)
- Cause and effect
- Problem-solving narratives

Ages 9-12:
- Complex sentences (12-20 words)
- Abstract themes (justice, identity, belonging)
- Sophisticated plot structures
- Nuanced emotions
- Multiple perspectives
- Character growth arcs

YOUR TASK:
- Adapt vocabulary to age-appropriate level
- Adjust sentence complexity
- Simplify or elaborate concepts as needed
- Ensure emotional content is age-appropriate
- Maintain story engagement and quality

OUTPUT MUST BE VALID JSON with adapted content and change tracking.`;

    const adaptations: any[] = [];

    // Adapt each scene
    for (const scene of draft.scenes) {
      const scenePrompt = `Adapt this scene for ${request.ageRange} year olds:

Scene ${scene.sceneNumber}: ${scene.title}
Original Content:
${scene.content}

Issues from critique:
${critique.suggestions
  .filter(s => s.sceneNumber === scene.sceneNumber)
  .map(s => `- ${s.issue}: ${s.suggestion}`)
  .join('\n')}

Return JSON:
{
  "sceneNumber": ${scene.sceneNumber},
  "title": "${scene.title}",
  "content": "age-adapted content",
  "narrativeTone": "${scene.narrativeTone}",
  "emotionalLevel": ${scene.emotionalLevel},
  "pageNumber": ${scene.pageNumber},
  "imagePrompt": "${scene.imagePrompt}",
  "characterActions": ${JSON.stringify(scene.characterActions)},
  "modifications": [
    {
      "type": "vocabulary|sentence_structure|concept|length",
      "original": "original text snippet",
      "adapted": "adapted text snippet",
      "reason": "why this change was made"
    }
  ]
}`;

      const adapted = await this.callAI<any>(
        systemPrompt,
        scenePrompt,
        {
          temperature: 0.7,
          maxTokens: 1500,
          responseFormat: 'json_object',
        }
      );

      adaptations.push(adapted);
    }

    // Compile all adaptations
    const allModifications = adaptations.flatMap(a => a.modifications || []);
    const adaptedScenes = adaptations.map(a => {
      const { modifications, ...sceneData } = a;
      return sceneData;
    });

    return {
      adaptedContent: adaptedScenes,
      vocabularyLevel: this.getVocabularyLevel(request.ageRange),
      sentenceComplexity: this.getSentenceComplexity(request.ageRange),
      conceptLevel: this.getConceptLevel(request.ageRange),
      modifications: allModifications,
    };
  }

  private getVocabularyLevel(ageRange: string): string {
    switch (ageRange) {
      case '3-5':
        return 'Simple, concrete words (Tier 1)';
      case '6-8':
        return 'Common academic words (Tier 1-2)';
      case '9-12':
        return 'Sophisticated vocabulary (Tier 2-3)';
      default:
        return 'Age-appropriate';
    }
  }

  private getSentenceComplexity(ageRange: string): string {
    switch (ageRange) {
      case '3-5':
        return 'Simple sentences, 5-8 words';
      case '6-8':
        return 'Compound sentences, 8-12 words';
      case '9-12':
        return 'Complex sentences, 12-20 words';
      default:
        return 'Age-appropriate';
    }
  }

  private getConceptLevel(ageRange: string): string {
    switch (ageRange) {
      case '3-5':
        return 'Concrete, familiar concepts';
      case '6-8':
        return 'Beginning abstract concepts';
      case '9-12':
        return 'Complex abstract themes';
      default:
        return 'Age-appropriate';
    }
  }
}
