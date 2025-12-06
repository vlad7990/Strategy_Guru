/**
 * Editor / Polisher Agent
 * Final refinement of story for publication quality
 */

import { BaseAgent } from './BaseAgent';
import { StoryDraft, PolishedStory, AgeAdaptation } from '../types';

export class EditorAgent extends BaseAgent {
  async execute(adaptation: AgeAdaptation): Promise<PolishedStory> {
    const systemPrompt = `You are an award-winning children's book editor.

Your role:
- Polish prose to publication quality
- Enhance imagery and sensory language
- Perfect dialogue and character voice
- Optimize pacing and flow
- Fix grammar, punctuation, style
- Add literary polish while keeping age-appropriateness

EDITING PRINCIPLES:
- Show, don't tell (use actions, not exposition)
- Engage all senses (sight, sound, touch, smell, taste)
- Strong verbs, vivid adjectives
- Rhythm and cadence in language
- Consistency in voice and tone
- Natural, authentic dialogue

DO NOT:
- Change the plot or structure
- Alter the moral lesson
- Modify character personalities
- Increase complexity beyond age level

OUTPUT MUST BE VALID JSON with polished content and refinement notes.`;

    const polishedScenes: any[] = [];
    const allRefinements: any[] = [];
    let totalWords = 0;

    // Polish each scene
    for (const scene of adaptation.adaptedContent) {
      const scenePrompt = `Polish this scene to publication quality:

Scene ${scene.sceneNumber}: ${scene.title}
Current Content:
${scene.content}

Return JSON:
{
  "sceneNumber": ${scene.sceneNumber},
  "title": "${scene.title}",
  "content": "polished, publication-ready content",
  "narrativeTone": "${scene.narrativeTone}",
  "emotionalLevel": ${scene.emotionalLevel},
  "pageNumber": ${scene.pageNumber},
  "imagePrompt": "${scene.imagePrompt}",
  "characterActions": ${JSON.stringify(scene.characterActions)},
  "refinements": [
    {
      "type": "grammar|flow|imagery|dialogue|pacing",
      "before": "original text snippet",
      "after": "refined text snippet"
    }
  ]
}`;

      const polished = await this.callAI<any>(
        systemPrompt,
        scenePrompt,
        {
          temperature: 0.7,
          maxTokens: 1500,
          responseFormat: 'json_object',
        }
      );

      const wordCount = polished.content.split(' ').length;
      totalWords += wordCount;

      allRefinements.push(...(polished.refinements || []));

      const { refinements, ...sceneData } = polished;
      polishedScenes.push(sceneData);
    }

    // Calculate readability score (Flesch-Kincaid Grade Level approximation)
    const readabilityScore = this.calculateReadability(polishedScenes);

    return {
      scenes: polishedScenes,
      refinements: allRefinements,
      finalWordCount: totalWords,
      readabilityScore,
    };
  }

  private calculateReadability(scenes: any[]): number {
    // Simplified readability calculation
    // In production, use actual Flesch-Kincaid algorithm
    const totalWords = scenes.reduce((sum, s) => sum + s.content.split(' ').length, 0);
    const totalSentences = scenes.reduce((sum, s) => sum + s.content.split(/[.!?]+/).length, 0);
    const avgWordsPerSentence = totalWords / totalSentences;

    // Approximate grade level
    return Math.round(avgWordsPerSentence / 2);
  }
}
