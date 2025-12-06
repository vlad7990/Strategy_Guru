/**
 * Voice Immersion Engine
 * Generates SSML markup and voice narration mapping
 */

import { BaseAgent } from './BaseAgent';
import { PolishedStory, VoiceMapping, StoryRequest } from '../types';

export class VoiceEngine extends BaseAgent {
  async execute(
    story: PolishedStory,
    request: StoryRequest
  ): Promise<VoiceMapping> {
    const mode = request.voiceMode || 'standard';

    const systemPrompt = `You are a voice direction specialist for children's audiobook narration.

Your role:
- Create SSML (Speech Synthesis Markup Language) for emotional pacing
- Design voice modulation (pitch, pace, volume)
- Add strategic pauses for comprehension and emotion
- Suggest ambient sounds for immersion
- Adapt for different narration modes

NARRATION MODES:
- bedtime: Slow, calm, soothing, gentle volume, longer pauses
- excitement: Faster pace, dynamic pitch, energetic
- standard: Moderate pace, clear enunciation, natural flow
- autism-friendly: Consistent pace, clear pauses, predictable patterns

SSML ELEMENTS:
- <break time="500ms"/> for pauses
- <prosody rate="slow|medium|fast"> for pace
- <prosody pitch="low|medium|high"> for pitch
- <emphasis level="strong|moderate"> for important words
- <amazon:effect name="whispered"> for special effects

OUTPUT MUST BE VALID JSON:
{
  "narrationMode": "${mode}",
  "language": "en-US",
  "segments": [
    {
      "sceneNumber": 1,
      "text": "narrative text",
      "ssml": "SSML markup",
      "pitch": "high|medium|low",
      "pace": "slow|moderate|fast",
      "emotionalTone": "calm|excited|suspenseful|gentle|mysterious",
      "pauseBefore": 1000,
      "pauseAfter": 1500,
      "ambientSound": "birds chirping|soft music|wind|none"
    }
  ],
  "totalDuration": 300
}`;

    const userPrompt = `Create voice narration mapping:

Mode: ${mode}
Age Range: ${request.ageRange}

STORY SCENES:
${story.scenes.map(s => `
Scene ${s.sceneNumber}: ${s.title}
Tone: ${s.narrativeTone}
Emotional Level: ${s.emotionalLevel}/10
Content: ${s.content}
`).join('\n---\n')}

Generate complete SSML markup for professional narration.`;

    const mapping = await this.callAI<VoiceMapping>(
      systemPrompt,
      userPrompt,
      {
        temperature: 0.6,
        maxTokens: 3000,
        responseFormat: 'json_object',
      }
    );

    return mapping;
  }
}
