import { mockDeep, MockProxy } from 'jest-mock-extended';
import { PrismaClient } from '@prisma/client';

const mockPrisma: MockProxy<PrismaClient> = mockDeep<PrismaClient>();

export const prisma = mockPrisma;

export default prisma;
