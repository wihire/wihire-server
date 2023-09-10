import { PrismaClient } from '@prisma/client';

let prisma;

const isProduction = process.env.NODE_ENV === 'production';

if (isProduction) {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }

  prisma = global.prisma;
}

export default prisma;
