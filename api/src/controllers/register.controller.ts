import { FastifyRequest, FastifyReply } from 'fastify';

import { UsersRepository } from '../repositories/users.repository';
import { RegisterBodyRequestParams } from '../types/register';

export function registerController(usersRepository: UsersRepository) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const { email, password } = request.body as RegisterBodyRequestParams;

    const userExists = await usersRepository.findByEmail(email);

    if (userExists) {
      return reply.status(409).send({ error: 'User already exists' });
    }

    await usersRepository.create({ email, password });

    return reply.status(201).send({ message: 'User registered successfully' });
  };
}
