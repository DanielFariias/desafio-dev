import { Prisma } from '@prisma/client';

export function isPrismaDuplicateError(
  error: unknown,
): error is { code: string } {
  return (
    (error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2002') ||
    (typeof error === 'object' &&
      error !== null &&
      'code' in error &&
      error.code === 'P2002')
  );
}
