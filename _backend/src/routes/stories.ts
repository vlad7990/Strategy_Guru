/**
 * Stories API Routes
 * Endpoints for AI story generation
 */

import { FastifyInstance } from 'fastify';
import { StoryEngine, StoryRequest, AgentContext } from '../services/story-engine';

export default async function storiesRoutes(fastify: FastifyInstance) {
  const storyEngine = new StoryEngine();

  /**
   * POST /api/stories/generate
   * Generate a new AI children's story
   */
  fastify.post<{
    Body: {
      request: StoryRequest;
      context?: Partial<AgentContext>;
    };
  }>('/generate', async (request, reply) => {
    try {
      const { request: storyRequest, context: partialContext } = request.body;

      // Validate request
      if (!storyRequest.prompt || !storyRequest.ageRange) {
        return reply.status(400).send({
          success: false,
          error: 'Missing required fields: prompt and ageRange',
        });
      }

      // Build context
      const context: AgentContext = {
        userId: partialContext?.userId || 'demo-user',
        childId: partialContext?.childId,
        existingCharacters: partialContext?.existingCharacters || [],
        existingWorld: partialContext?.existingWorld,
        characterMemories: partialContext?.characterMemories || [],
        parentSettings: partialContext?.parentSettings || {
          anxietyLevel: 5,
          contentFilterLevel: 'moderate',
          educationalFocus: [],
        },
      };

      // Generate story
      const result = await storyEngine.generateStory(storyRequest, context);

      // TODO: Save to database
      // const savedStory = await saveStoryToDatabase(result);

      return reply.send({
        success: true,
        data: result,
      });
    } catch (error: any) {
      console.error('Story generation error:', error);
      return reply.status(500).send({
        success: false,
        error: error.message || 'Story generation failed',
      });
    }
  });

  /**
   * POST /api/stories/generate/quick
   * Quick story generation (streamlined pipeline)
   */
  fastify.post<{
    Body: {
      request: StoryRequest;
      context?: Partial<AgentContext>;
    };
  }>('/generate/quick', async (request, reply) => {
    try {
      const { request: storyRequest, context: partialContext } = request.body;

      if (!storyRequest.prompt || !storyRequest.ageRange) {
        return reply.status(400).send({
          success: false,
          error: 'Missing required fields: prompt and ageRange',
        });
      }

      const context: AgentContext = {
        userId: partialContext?.userId || 'demo-user',
        childId: partialContext?.childId,
        existingCharacters: partialContext?.existingCharacters || [],
        existingWorld: partialContext?.existingWorld,
        characterMemories: partialContext?.characterMemories || [],
        parentSettings: partialContext?.parentSettings || {
          anxietyLevel: 5,
          contentFilterLevel: 'moderate',
          educationalFocus: [],
        },
      };

      const result = await storyEngine.generateQuickStory(storyRequest, context);

      return reply.send({
        success: true,
        data: result,
      });
    } catch (error: any) {
      console.error('Quick story generation error:', error);
      return reply.status(500).send({
        success: false,
        error: error.message || 'Story generation failed',
      });
    }
  });

  /**
   * GET /api/stories/test
   * Test endpoint to verify API is working
   */
  fastify.get('/test', async (request, reply) => {
    return reply.send({
      success: true,
      message: 'Story API is operational',
      features: [
        'Multi-Agent Story Engine (10 AI agents)',
        'Safety Certification System',
        'Moral Architecture Engine',
        'Emotion Graph Generation',
        'Educational Standards Mapping',
        'Voice Narration SSML',
        'Character Memory System',
      ],
    });
  });
}
