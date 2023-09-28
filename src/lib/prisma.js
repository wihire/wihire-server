const { PrismaClient } = require('@prisma/client');

let prisma;

const isProduction = process.env.NODE_ENV === 'production';

if (isProduction) {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient({
      log: ['query', 'info', 'warn', 'error'],
    });
  }

  prisma = global.prisma;
}

module.exports = prisma;
