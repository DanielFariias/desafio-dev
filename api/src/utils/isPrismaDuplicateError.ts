import { Prisma } from '@prisma/client';

export function isPrismaDuplicateError(
  error: unknown,
): error is { code: string } {
  return (
    error instanceof Prisma.PrismaClientKnownRequestError &&
    error.code === 'P2002'
  );
}
