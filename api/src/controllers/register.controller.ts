import { FastifyRequest, FastifyReply } from 'fastify';
import { UsersRepository } from '../repositories/users.repository';

export function registerController(usersRepository: UsersRepository) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const { email, password } = request.body as {
      email: string;
      password: string;
    };

    const userExists = await usersRepository.findByEmail(email);

    if (userExists) {
      return reply.status(409).send({ error: 'User already exists' });
    }

    await usersRepository.create({ email, password });

    return reply.status(201).send({ message: 'User registered successfully' });
  };
}
