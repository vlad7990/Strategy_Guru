import { FastifyRequest, FastifyReply } from 'fastify';
import {
  generateOKRsFromText,
  generateOKRsFromDocument,
  chatWithAI,
  refineOKRs,
} from '../services/aiService';
import { z } from 'zod';

// Validation schemas
const generateOKRSchema = z.object({
  input: z.string().min(10, 'Input must be at least 10 characters'),
  context: z
    .object({
      industry: z.string().optional(),
      companySize: z.string().optional(),
      currentQuarter: z.string().optional(),
      existingObjectives: z.array(z.string()).optional(),
    })
    .optional(),
});

const generateFromDocumentSchema = z.object({
  documentText: z.string().min(50, 'Document must be at least 50 characters'),
  context: z
    .object({
      industry: z.string().optional(),
      companySize: z.string().optional(),
    })
    .optional(),
});

const chatSchema = z.object({
  messages: z.array(
    z.object({
      role: z.enum(['user', 'assistant']),
      content: z.string(),
    })
  ),
  context: z.string().optional(),
});

const refineSchema = z.object({
  existingOKRs: z.array(z.any()),
  feedback: z.string().min(5, 'Feedback must be at least 5 characters'),
});

/**
 * Generate OKRs from text input
 * POST /api/ai/generate-okrs
 */
export const generateOKRs = async (
  request: FastifyRequest<{ Body: unknown }>,
  reply: FastifyReply
) => {
  try {
    const validatedData = generateOKRSchema.parse(request.body);

    const result = await generateOKRsFromText(
      validatedData.input,
      validatedData.context
    );

    return reply.send({
      success: true,
      data: result,
    });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return reply.status(400).send({
        success: false,
        error: {
          message: 'Validation error',
          code: 'VALIDATION_ERROR',
          details: error.errors,
        },
      });
    }

    request.log.error(error);
    return reply.status(500).send({
      success: false,
      error: {
        message: error.message || 'Failed to generate OKRs',
        code: 'GENERATION_ERROR',
      },
    });
  }
};

/**
 * Generate OKRs from document
 * POST /api/ai/generate-from-document
 */
export const generateFromDocument = async (
  request: FastifyRequest<{ Body: unknown }>,
  reply: FastifyReply
) => {
  try {
    const validatedData = generateFromDocumentSchema.parse(request.body);

    const result = await generateOKRsFromDocument(
      validatedData.documentText,
      validatedData.context
    );

    return reply.send({
      success: true,
      data: result,
    });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return reply.status(400).send({
        success: false,
        error: {
          message: 'Validation error',
          code: 'VALIDATION_ERROR',
          details: error.errors,
        },
      });
    }

    request.log.error(error);
    return reply.status(500).send({
      success: false,
      error: {
        message: error.message || 'Failed to analyze document',
        code: 'DOCUMENT_ANALYSIS_ERROR',
      },
    });
  }
};

/**
 * Chat with AI Assistant
 * POST /api/ai/chat
 */
export const chat = async (
  request: FastifyRequest<{ Body: unknown }>,
  reply: FastifyReply
) => {
  try {
    const validatedData = chatSchema.parse(request.body);

    const response = await chatWithAI(
      validatedData.messages,
      validatedData.context
    );

    return reply.send({
      success: true,
      data: {
        message: response,
      },
    });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return reply.status(400).send({
        success: false,
        error: {
          message: 'Validation error',
          code: 'VALIDATION_ERROR',
          details: error.errors,
        },
      });
    }

    request.log.error(error);
    return reply.status(500).send({
      success: false,
      error: {
        message: error.message || 'Chat failed',
        code: 'CHAT_ERROR',
      },
    });
  }
};

/**
 * Refine existing OKRs
 * POST /api/ai/refine-okrs
 */
export const refine = async (
  request: FastifyRequest<{ Body: unknown }>,
  reply: FastifyReply
) => {
  try {
    const validatedData = refineSchema.parse(request.body);

    const result = await refineOKRs(
      validatedData.existingOKRs,
      validatedData.feedback
    );

    return reply.send({
      success: true,
      data: result,
    });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return reply.status(400).send({
        success: false,
        error: {
          message: 'Validation error',
          code: 'VALIDATION_ERROR',
          details: error.errors,
        },
      });
    }

    request.log.error(error);
    return reply.status(500).send({
      success: false,
      error: {
        message: error.message || 'Failed to refine OKRs',
        code: 'REFINE_ERROR',
      },
    });
  }
};

/**
 * Health check for AI service
 * GET /api/ai/health
 */
export const healthCheck = async (
  _request: FastifyRequest,
  reply: FastifyReply
) => {
  const hasApiKey = !!process.env.OPENAI_API_KEY;

  return reply.send({
    success: true,
    data: {
      status: hasApiKey ? 'ready' : 'not_configured',
      model: process.env.OPENAI_MODEL || 'gpt-4o',
      message: hasApiKey
        ? 'AI service is ready'
        : 'OPENAI_API_KEY not configured',
    },
  });
};
