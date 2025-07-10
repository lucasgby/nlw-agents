import { fastifyCors } from '@fastify/cors';
import { fastify } from 'fastify';
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod';

import { env } from './env.ts';
import { getRoomsRoute } from './http/routes/get-rooms.ts';
import { checkHealth } from './http/routes/health.ts';

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.register(fastifyCors, {
  origin: 'http://localhost:5173',
});

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

app.register(
  (apiRoutes) => {
    apiRoutes.register(checkHealth);
    apiRoutes.register(getRoomsRoute);
  },
  { prefix: '/api' }
);

app.listen({ port: env.PORT });
