const prisma = require('../../src/lib/prisma');

const seedCompanyIndustryScope = require('./companyIndustryScope');
const seedCompanyTotalEmployee = require('./companyTotalEmployee');
const seedSkill = require('./skill');
const seedCategories = require('./categories');

async function main() {
  seedCompanyTotalEmployee();
  seedCompanyIndustryScope();
  seedSkill();
  seedCategories();
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
