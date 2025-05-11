import { Prisma } from '@prisma/client';

export function buildNameFilter(name?: string) {
  if (!name) {
    return Prisma.sql``;
  }

  return Prisma.sql`WHERE s.name ILIKE ${'%' + name + '%'}`;
}
