import Fastify from 'fastify';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import { config } from 'dotenv';
import { PrismaClient } from '@prisma/client';

// Import routes
import objectivesRoutes from './routes/objectives';
import metricsRoutes from './routes/metrics';
import feedbackRoutes from './routes/feedback';
import competitorsRoutes from './routes/competitors';
import roadmapRoutes from './routes/roadmap';
import reportsRoutes from './routes/reports';
import projectsRoutes from './routes/projects';
import alertsRoutes from './routes/alerts';

// Load environment variables
config();

// Initialize Prisma Client
export const prisma = new PrismaClient();

// Create Fastify instance
const fastify = Fastify({
  logger: {
    level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  },
});

// Register plugins
fastify.register(cors, {
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
});

fastify.register(helmet, {
  contentSecurityPolicy: false,
});

// Health check
fastify.get('/health', async () => {
  return { status: 'ok', timestamp: new Date().toISOString() };
});

// API routes
fastify.register(objectivesRoutes, { prefix: '/api/objectives' });
fastify.register(metricsRoutes, { prefix: '/api/metrics' });
fastify.register(feedbackRoutes, { prefix: '/api/feedback' });
fastify.register(competitorsRoutes, { prefix: '/api/competitors' });
fastify.register(roadmapRoutes, { prefix: '/api/roadmap' });
fastify.register(reportsRoutes, { prefix: '/api/reports' });
fastify.register(projectsRoutes, { prefix: '/api/projects' });
fastify.register(alertsRoutes, { prefix: '/api/alerts' });

// Error handler
fastify.setErrorHandler((error, request, reply) => {
  fastify.log.error(error);

  reply.status(error.statusCode || 500).send({
    success: false,
    error: {
      message: error.message || 'Internal Server Error',
      code: error.code || 'INTERNAL_ERROR',
    },
  });
});

// Start server
const start = async () => {
  try {
    // Connect to database
    await prisma.$connect();
    fastify.log.info('✅ Database connected');

    // Start listening
    const port = parseInt(process.env.PORT || '4000', 10);
    await fastify.listen({ port, host: '0.0.0.0' });

    console.log(`\n🚀 Server running at http://localhost:${port}`);
    console.log(`📊 Health check: http://localhost:${port}/health\n`);
  } catch (err) {
    fastify.log.error(err);
    await prisma.$disconnect();
    process.exit(1);
  }
};

// Graceful shutdown
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await prisma.$disconnect();
  process.exit(0);
});

start();
