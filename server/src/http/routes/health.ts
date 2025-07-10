import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod';

export const checkHealth: FastifyPluginCallbackZod = (app) => {
  app.get('/health', () => {
    return 'Ok';
  });
};
