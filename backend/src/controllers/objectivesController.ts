import { FastifyRequest, FastifyReply } from 'fastify';
import { dbHelpers } from '../db';
import { z } from 'zod';
import { randomUUID } from 'crypto';

// Validation schemas
const createObjectiveSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  quarter: z.string(),
  year: z.number(),
  category: z.string().min(1, 'Category is required'),
  ownerId: z.string().uuid(),
});

const updateObjectiveSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  quarter: z.string().optional(),
  year: z.number().optional(),
  category: z.string().optional(),
  status: z.string().optional(),
  progress: z.number().min(0).max(100).optional(),
});

// Get all objectives
export const getAllObjectives = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const objectives = dbHelpers.findMany('objectives', 'createdAt DESC');

    return reply.send({
      success: true,
      data: objectives,
    });
  } catch (error: any) {
    request.log.error(error);
    return reply.status(500).send({
      success: false,
      error: {
        message: 'Failed to fetch objectives',
        code: 'FETCH_ERROR',
      },
    });
  }
};

// Get single objective
export const getObjective = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  try {
    const { id } = request.params;

    const objective = dbHelpers.findById('objectives', id);

    if (!objective) {
      return reply.status(404).send({
        success: false,
        error: {
          message: 'Objective not found',
          code: 'NOT_FOUND',
        },
      });
    }

    return reply.send({
      success: true,
      data: objective,
    });
  } catch (error: any) {
    request.log.error(error);
    return reply.status(500).send({
      success: false,
      error: {
        message: 'Failed to fetch objective',
        code: 'FETCH_ERROR',
      },
    });
  }
};

// Create objective
export const createObjective = async (
  request: FastifyRequest<{ Body: unknown }>,
  reply: FastifyReply
) => {
  try {
    const validatedData = createObjectiveSchema.parse(request.body);

    const objective = dbHelpers.create('objectives', {
      id: randomUUID(),
      ...validatedData,
    });

    return reply.status(201).send({
      success: true,
      data: objective,
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
        message: 'Failed to create objective',
        code: 'CREATE_ERROR',
      },
    });
  }
};

// Update objective
export const updateObjective = async (
  request: FastifyRequest<{ Params: { id: string }; Body: unknown }>,
  reply: FastifyReply
) => {
  try {
    const { id } = request.params;
    const validatedData = updateObjectiveSchema.parse(request.body);

    const objective = dbHelpers.update('objectives', id, validatedData);

    if (!objective) {
      return reply.status(404).send({
        success: false,
        error: {
          message: 'Objective not found',
          code: 'NOT_FOUND',
        },
      });
    }

    return reply.send({
      success: true,
      data: objective,
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
        message: 'Failed to update objective',
        code: 'UPDATE_ERROR',
      },
    });
  }
};

// Delete objective
export const deleteObjective = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  try {
    const { id } = request.params;

    dbHelpers.delete('objectives', id);

    return reply.send({
      success: true,
      message: 'Objective deleted successfully',
    });
  } catch (error: any) {
    request.log.error(error);
    return reply.status(500).send({
      success: false,
      error: {
        message: 'Failed to delete objective',
        code: 'DELETE_ERROR',
      },
    });
  }
};
