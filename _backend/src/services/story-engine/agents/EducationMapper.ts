/**
 * Education & Standards Mapper
 * Maps stories to educational standards (SEL, CCSS)
 */

import { BaseAgent } from './BaseAgent';
import { PolishedStory, EducationalStandardsMapping, StoryRequest, MoralArchitectureGenerated } from '../types';

export class EducationMapper extends BaseAgent {
  async execute(
    story: PolishedStory,
    moralArchitecture: MoralArchitectureGenerated,
    request: StoryRequest
  ): Promise<EducationalStandardsMapping> {
    const systemPrompt = `You are an educational standards specialist and curriculum designer.

Your role:
- Map stories to SEL (Social-Emotional Learning) standards
- Align with CCSS (Common Core State Standards) for literacy
- Determine appropriate grade levels
- Assess reading complexity and comprehension level
- Identify literary devices and learning opportunities
- Create discussion topics and assessment ideas

SEL COMPETENCIES (CASEL Framework):
1. Self-Awareness
2. Self-Management
3. Social Awareness
4. Relationship Skills
5. Responsible Decision-Making

CCSS LITERACY STRANDS:
- RL (Reading Literature): Key ideas, craft, integration
- SL (Speaking & Listening): Comprehension, collaboration
- L (Language): Conventions, vocabulary

VOCABULARY TIERS:
- Tier 1: Basic, everyday words
- Tier 2: Academic, cross-curricular words
- Tier 3: Domain-specific words

OUTPUT MUST BE VALID JSON:
{
  "selStandards": [
    {
      "code": "SEL.SA.1",
      "description": "Identify and describe emotions",
      "sceneReferences": [1, 3, 5]
    }
  ],
  "ccssLiteracy": [
    {
      "code": "CCSS.ELA-LITERACY.RL.2.3",
      "description": "Describe how characters respond to events",
      "application": "how this story addresses this standard"
    }
  ],
  "gradeLevel": ["K", "1", "2"],
  "readingLevel": "Lexile: 400L",
  "comprehensionLevel": "literal|inferential|evaluative",
  "vocabularyTier": 2,
  "literaryDevices": ["metaphor", "repetition", "dialogue"],
  "discussionTopics": [
    "How did [character] feel when...?",
    "What would you do if...?"
  ],
  "assessmentIdeas": [
    {
      "type": "comprehension|vocabulary|critical_thinking|creative",
      "question": "assessment question",
      "expectedResponse": "what good answer includes",
      "difficulty": "easy|medium|hard"
    }
  ]
}`;

    const userPrompt = `Map this story to educational standards:

Age Range: ${request.ageRange}
Reading Level: Grade ${story.readabilityScore}
Word Count: ${story.finalWordCount}

STORY CONTENT:
${story.scenes.map(s => `Scene ${s.sceneNumber}: ${s.title}\n${s.content}`).join('\n\n')}

MORAL LESSONS:
Primary: ${moralArchitecture.primaryLesson}
Secondary: ${moralArchitecture.secondaryLessons.join(', ')}
Values: ${moralArchitecture.valueTags.join(', ')}

Create comprehensive educational mapping for teachers and parents.`;

    return await this.callAI<EducationalStandardsMapping>(
      systemPrompt,
      userPrompt,
      {
        temperature: 0.5,
        maxTokens: 2500,
        responseFormat: 'json_object',
      }
    );
  }
}
