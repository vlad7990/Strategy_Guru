/**
 * Writer Agent
 * Generates the initial story outline and full draft
 */

import { BaseAgent } from './BaseAgent';
import {
  StoryRequest,
  StoryOutline,
  StoryDraft,
  AgentContext,
} from '../types';

export class WriterAgent extends BaseAgent {
  async execute(
    request: StoryRequest,
    context: AgentContext
  ): Promise<StoryDraft> {
    // Step 1: Generate Outline
    const outline = await this.generateOutline(request, context);

    // Step 2: Generate Full Draft
    const draft = await this.generateDraft(outline, request, context);

    return draft;
  }

  /**
   * Generate story outline
   */
  private async generateOutline(
    request: StoryRequest,
    context: AgentContext
  ): Promise<StoryOutline> {
    const systemPrompt = `You are an award-winning children's book author specializing in emotionally resonant, educational stories.

Your role:
- Create engaging story outlines for children aged ${request.ageRange}
- Ensure age-appropriate language, themes, and emotional content
- Build strong character development and moral lessons
- Design emotionally safe narratives with comfort resolution

CRITICAL RULES:
- All stories MUST have a comforting resolution
- Fear/tension allowed ONLY if resolved with safety by the end
- No copyrighted characters (Disney, Marvel, etc.)
- Child-appropriate vocabulary and concepts
- Emotionally safe for sensitive children

OUTPUT MUST BE VALID JSON matching this structure:
{
  "title": "story title",
  "description": "one paragraph summary",
  "setting": "where and when the story takes place",
  "characters": [
    {
      "name": "character name",
      "role": "protagonist|sidekick|antagonist|mentor|supporting",
      "description": "brief description",
      "personality": ["trait1", "trait2"],
      "appearance": "physical description"
    }
  ],
  "plotPoints": [
    {
      "sceneNumber": 1,
      "title": "scene title",
      "description": "what happens",
      "emotionalTone": "gentle|exciting|calm|adventurous|mysterious",
      "emotionalIntensity": 5,
      "purpose": "what this accomplishes"
    }
  ],
  "moralLesson": "the main lesson or value taught",
  "emotionalArc": "description of emotional journey",
  "estimatedPages": 8,
  "estimatedReadTime": 10
}`;

    const userPrompt = `Create a children's story outline:

User Request: "${request.prompt}"

Age Range: ${request.ageRange}
${request.genre ? `Genres: ${request.genre.join(', ')}` : ''}
${request.themes ? `Themes: ${request.themes.join(', ')}` : ''}
${request.length ? `Length: ${request.length}` : 'Length: medium'}

${context.parentSettings ? `
Parent Settings:
- Anxiety Level: ${context.parentSettings.anxietyLevel}/10 (${context.parentSettings.anxietyLevel <= 3 ? 'very gentle' : context.parentSettings.anxietyLevel <= 7 ? 'moderate' : 'can handle more intensity'})
- Content Filter: ${context.parentSettings.contentFilterLevel}
` : ''}

${context.existingCharacters && context.existingCharacters.length > 0 ? `
EXISTING CHARACTERS TO INCLUDE:
${context.existingCharacters.map(c => `- ${c.name}: ${c.description}`).join('\n')}
` : ''}

${context.existingWorld ? `
WORLD/UNIVERSE:
Name: ${context.existingWorld.name}
Setting: ${context.existingWorld.setting}
Description: ${context.existingWorld.description}
` : ''}

Create an engaging, emotionally safe story outline that teaches valuable lessons and provides a comforting resolution.`;

    const outline = await this.callAI<StoryOutline>(
      systemPrompt,
      userPrompt,
      {
        temperature: 0.8,
        maxTokens: 2000,
        responseFormat: 'json_object',
      }
    );

    return outline;
  }

  /**
   * Generate full story draft from outline
   */
  private async generateDraft(
    outline: StoryOutline,
    request: StoryRequest,
    context: AgentContext
  ): Promise<StoryDraft> {
    const scenes: any[] = [];
    let totalWordCount = 0;

    // Generate each scene
    for (const plotPoint of outline.plotPoints) {
      const scene = await this.generateScene(
        plotPoint,
        outline,
        request,
        context
      );
      scenes.push(scene);
      totalWordCount += scene.content.split(' ').length;
    }

    return {
      outline,
      scenes,
      wordCount: totalWordCount,
      pageCount: outline.estimatedPages,
    };
  }

  /**
   * Generate individual scene content
   */
  private async generateScene(
    plotPoint: any,
    outline: StoryOutline,
    request: StoryRequest,
    context: AgentContext
  ): Promise<any> {
    const systemPrompt = `You are writing Scene ${plotPoint.sceneNumber} of a children's story titled "${outline.title}".

Age Range: ${request.ageRange}
Emotional Tone: ${plotPoint.emotionalTone}
Emotional Intensity: ${plotPoint.emotionalIntensity}/10

WRITING GUIDELINES:
- Use age-appropriate vocabulary and sentence structure
- Create vivid, sensory descriptions children can imagine
- Show emotions through actions and dialogue
- Build engagement with pacing and surprise
- Maintain the emotional tone specified
- End scenes with forward momentum (except final scene)

SCENE GOALS:
- ${plotPoint.purpose}

OUTPUT MUST BE VALID JSON:
{
  "sceneNumber": ${plotPoint.sceneNumber},
  "title": "${plotPoint.title}",
  "content": "full narrative text of the scene (200-400 words)",
  "narrativeTone": "${plotPoint.emotionalTone}",
  "emotionalLevel": ${plotPoint.emotionalIntensity},
  "pageNumber": ${plotPoint.sceneNumber},
  "imagePrompt": "detailed description for AI image generation showing this scene",
  "characterActions": {
    "characterName": "what they do in this scene"
  }
}`;

    const userPrompt = `Write this scene:

Scene: ${plotPoint.title}
Description: ${plotPoint.description}

Characters in this story:
${outline.characters.map(c => `- ${c.name} (${c.role}): ${c.description}`).join('\n')}

Previous context:
${plotPoint.sceneNumber > 1 ? `This follows the previous scenes. Build on the story momentum.` : 'This is the opening scene. Hook the reader immediately.'}

${plotPoint.sceneNumber === outline.plotPoints.length ? 'This is the FINAL scene. Provide a comforting, satisfying resolution that reassures the child reader.' : ''}

Write the complete scene with rich, engaging prose appropriate for ${request.ageRange} year olds.`;

    const scene = await this.callAI<any>(
      systemPrompt,
      userPrompt,
      {
        temperature: 0.9,
        maxTokens: 1500,
        responseFormat: 'json_object',
      }
    );

    return scene;
  }
}
