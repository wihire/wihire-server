const prisma = require('../../src/lib/prisma');

const seedCompanyIndustryScope = require('./companyIndustryScope');
const seedCompanyTotalEmployee = require('./companyTotalEmployee');
const seedSkill = require('./skill');
const seedCategories = require('./categories');
const seedCompany = require('./company');
const seedUser = require('./user');
const seedSalary = require('./salary');
const seedJob = require('./job');
const seedApplicationList = require('./applicationList');

async function main() {
  seedCompanyTotalEmployee();
  seedCompanyIndustryScope();
  seedSkill();
  seedCategories();
  seedSalary();
  seedCompany();
  seedUser();
  seedJob();
  seedApplicationList();
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
