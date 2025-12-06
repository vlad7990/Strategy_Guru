/**
 * Memory Continuity Agent
 * Updates character memories and world state for persistent universes
 */

import { BaseAgent } from './BaseAgent';
import { PolishedStory, MemoryUpdate, AgentContext } from '../types';

export class MemoryAgent extends BaseAgent {
  async execute(
    story: PolishedStory,
    context: AgentContext
  ): Promise<MemoryUpdate> {
    // Only generate memories if this story involves saved characters/worlds
    if (!context.existingCharacters?.length && !context.existingWorld) {
      return {
        characterMemories: [],
        worldUpdates: [],
        relationshipChanges: [],
      };
    }

    const systemPrompt = `You are a narrative continuity specialist for persistent story universes.

Your role:
- Extract significant events that characters should remember
- Identify emotional impacts that shape character growth
- Track relationship developments
- Update world state and history
- Ensure continuity across multiple stories

MEMORY TYPES:
- event: What happened
- emotion: How it made them feel
- relationship: Connection to others
- victory: Accomplishment
- fear: Something they're afraid of

OUTPUT MUST BE VALID JSON:
{
  "characterMemories": [
    {
      "characterId": "id or name",
      "characterName": "name",
      "memoryType": "event|emotion|relationship|victory|fear",
      "content": "what they remember",
      "emotionalImpact": "how it affected them",
      "significance": 8
    }
  ],
  "worldUpdates": [
    {
      "worldId": "id if exists",
      "updateType": "location|rule|culture|history",
      "content": "what changed or was discovered",
      "significance": 7
    }
  ],
  "relationshipChanges": [
    {
      "character1": "name",
      "character2": "name",
      "changeType": "formed|strengthened|tested|resolved",
      "description": "what happened in relationship"
    }
  ]
}`;

    const userPrompt = `Extract memories and continuity updates from this story:

STORY CONTENT:
${story.scenes.map(s => `${s.title}: ${s.content}`).join('\n\n')}

EXISTING CHARACTERS:
${context.existingCharacters?.map(c => `- ${c.name}: ${c.description}`).join('\n') || 'None'}

WORLD:
${context.existingWorld ? `${context.existingWorld.name}: ${context.existingWorld.description}` : 'None'}

Extract significant memories that will persist for future stories.`;

    return await this.callAI<MemoryUpdate>(
      systemPrompt,
      userPrompt,
      {
        temperature: 0.6,
        maxTokens: 2000,
        responseFormat: 'json_object',
      }
    );
  }
}
