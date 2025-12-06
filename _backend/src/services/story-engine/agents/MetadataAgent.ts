/**
 * Metadata & Publishing Agent
 * Generates all metadata for publication and discovery
 */

import { BaseAgent } from './BaseAgent';
import { PolishedStory, StoryMetadataGenerated, StoryRequest } from '../types';

export class MetadataAgent extends BaseAgent {
  async execute(
    story: PolishedStory,
    request: StoryRequest
  ): Promise<StoryMetadataGenerated> {
    const systemPrompt = `You are a publishing metadata specialist for children's literature.

Your role:
- Extract themes, lessons, and educational value
- Identify cultural elements and representation
- Determine language complexity and reading level
- Suggest illustration style and music
- Write parent notes and teacher guides
- Identify any trigger warnings (if applicable)

OUTPUT MUST BE VALID JSON:
{
  "themes": ["theme1", "theme2"],
  "lessonsTaught": ["lesson1", "lesson2"],
  "emotionalJourney": "description of emotional arc",
  "culturalElements": ["element1", "element2"],
  "languageLevel": "readability measure",
  "illustrationStyle": "suggested visual style",
  "musicSuggestions": ["calm piano", "gentle strings"],
  "parentNotes": "guidance for parents on discussing this story",
  "teacherGuide": "how teachers can use this story",
  "triggerWarnings": []
}`;

    const userPrompt = `Generate metadata for this children's story:

Age Range: ${request.ageRange}
Story Length: ${story.finalWordCount} words
Readability: Grade ${story.readabilityScore}

STORY CONTENT:
${story.scenes.map(s => `Scene ${s.sceneNumber}: ${s.title}\n${s.content}`).join('\n\n')}

Illustration Style Preference: ${request.illustrationStyle || 'soft_storybook'}

Generate complete publication metadata.`;

    const metadata = await this.callAI<StoryMetadataGenerated>(
      systemPrompt,
      userPrompt,
      {
        temperature: 0.6,
        maxTokens: 1500,
        responseFormat: 'json_object',
      }
    );

    return metadata;
  }
}
