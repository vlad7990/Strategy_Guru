/**
 * Moral Architecture Engine
 * Creates comprehensive moral maps and emotional graphs
 */

import { BaseAgent } from './BaseAgent';
import {
  PolishedStory,
  MoralArchitectureGenerated,
  EmotionGraphGenerated,
  StoryRequest,
  AgentContext,
} from '../types';

export class MoralArchitectureAgent extends BaseAgent {
  async execute(
    story: PolishedStory,
    request: StoryRequest,
    context: AgentContext
  ): Promise<{ moralArchitecture: MoralArchitectureGenerated; emotionGraph: EmotionGraphGenerated }> {
    // Generate Moral Map
    const moralArchitecture = await this.generateMoralMap(story, request);

    // Generate Emotion Graph
    const emotionGraph = await this.generateEmotionGraph(story, request, context);

    return { moralArchitecture, emotionGraph };
  }

  private async generateMoralMap(
    story: PolishedStory,
    request: StoryRequest
  ): Promise<MoralArchitectureGenerated> {
    const systemPrompt = `You are an expert in child development, moral education, and social-emotional learning.

Your role:
- Identify the core moral lessons and values taught
- Map character growth and thematic development
- Design parent activities for discussion and reflection
- Ensure values align with positive child development

OUTPUT MUST BE VALID JSON:
{
  "primaryLesson": "main moral lesson",
  "secondaryLessons": ["additional lessons"],
  "thematicGrowth": "how characters grow",
  "resolutionType": "comfort|triumph|understanding",
  "parentActivities": [
    {
      "title": "activity name",
      "description": "what to do",
      "ageAppropriate": "3-5|6-8|9-12",
      "materials": ["item1"],
      "discussionPrompts": ["prompt1", "prompt2"]
    }
  ],
  "valueTags": ["empathy", "courage", "honesty"],
  "culturalValues": ["values represented"],
  "conflictType": "internal|interpersonal|environmental|societal",
  "resolutionMethod": "how conflict is resolved"
}`;

    const userPrompt = `Analyze the moral architecture of this story:

${story.scenes.map(s => `${s.title}: ${s.content}`).join('\n\n')}

Age Range: ${request.ageRange}

Create comprehensive moral map with parent activities.`;

    return await this.callAI<MoralArchitectureGenerated>(
      systemPrompt,
      userPrompt,
      {
        temperature: 0.6,
        maxTokens: 2000,
        responseFormat: 'json_object',
      }
    );
  }

  private async generateEmotionGraph(
    story: PolishedStory,
    request: StoryRequest,
    context: AgentContext
  ): Promise<EmotionGraphGenerated> {
    const systemPrompt = `You are a child psychologist specializing in emotional safety and regulation.

Your role:
- Map the emotional intensity throughout the story
- Ensure emotional safety with comfort bands
- Identify calming and excitement points
- Design age-appropriate emotional experiences

AGE-SPECIFIC COMFORT BANDS:
Ages 3-5: Max intensity 6/10, comfort floor 3/10
Ages 6-8: Max intensity 7/10, comfort floor 2/10
Ages 9-12: Max intensity 8/10, comfort floor 2/10

Parent Anxiety Setting: ${context.parentSettings?.anxietyLevel || 5}/10

OUTPUT MUST BE VALID JSON:
{
  "overallIntensity": 5,
  "peakIntensity": 7,
  "comfortFloor": 3,
  "emotionalArc": "rising|falling|wave|steady",
  "primaryEmotion": "main emotion",
  "secondaryEmotions": ["emotion1", "emotion2"],
  "comfortBands": [
    {
      "ageRange": "3-5",
      "minIntensity": 3,
      "maxIntensity": 6,
      "description": "emotional safety zone"
    }
  ],
  "calmingPoints": [
    {
      "sceneNumber": 5,
      "technique": "deep breathing|gentle resolution|reassurance",
      "description": "how this calms the child"
    }
  ],
  "excitementPoints": [
    {
      "sceneNumber": 3,
      "type": "adventure|discovery|achievement",
      "intensity": 7
    }
  ],
  "nodes": [
    {
      "sceneNumber": 1,
      "intensity": 5,
      "emotionType": "joy|fear|sadness|excitement|calm|wonder|courage",
      "comfortLevel": 7,
      "purpose": "why this emotion is included"
    }
  ]
}`;

    const userPrompt = `Create emotional graph for this story:

Age Range: ${request.ageRange}
Parent Anxiety Level: ${context.parentSettings?.anxietyLevel || 5}/10

SCENES WITH EMOTIONAL LEVELS:
${story.scenes.map(s => `
Scene ${s.sceneNumber}: ${s.title}
Emotional Level: ${s.emotionalLevel}/10
Content: ${s.content.substring(0, 200)}...
`).join('\n')}

Map the complete emotional journey with safety considerations.`;

    return await this.callAI<EmotionGraphGenerated>(
      systemPrompt,
      userPrompt,
      {
        temperature: 0.5,
        maxTokens: 2000,
        responseFormat: 'json_object',
      }
    );
  }
}
