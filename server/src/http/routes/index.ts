import type { FastifyInstance } from 'fastify';
import { createQuestionRoute } from './create-question.ts';
import { createRoomsRoute } from './create-room.ts';
import { getRoomQuestionsRoute } from './get-room-questions.ts';
import { getRoomsRoute } from './get-rooms.ts';
import { checkHealth } from './health.ts';

export function registerRoutes(app: FastifyInstance) {
  app.register(
    (apiRoutes) => {
      apiRoutes.register(checkHealth);
      apiRoutes.register(getRoomsRoute);
      apiRoutes.register(createRoomsRoute);
      apiRoutes.register(getRoomQuestionsRoute);
      apiRoutes.register(createQuestionRoute);
    },
    { prefix: '/api' }
  );
}
