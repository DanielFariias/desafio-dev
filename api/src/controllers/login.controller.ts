import { FastifyRequest, FastifyReply } from 'fastify';

import { UsersRepository } from '../repositories/users.repository';

import { comparePassword } from '../helpers/password';

import { LoginBodyRequestParams } from '../types/login';

export function loginController(usersRepository: UsersRepository) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const { email, password } = request.body as LoginBodyRequestParams;

    const user = await usersRepository.findByEmail(email);

    if (!user) {
      return reply.status(401).send({ error: 'Invalid credentials' });
    }

    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      return reply.status(401).send({ error: 'Invalid credentials' });
    }

    const token = request.server.jwt.sign({ sub: user.id });

    return reply.send({ access_token: token });
  };
}
