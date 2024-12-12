import { PrismaClient } from '@prisma/client'
import { mockDeep, mockReset } from 'jest-mock-extended'


beforeEach(() => {
    mockReset(prismaMock)
})

export const prismaMock = mockDeep<PrismaClient>();
export default prismaMock;