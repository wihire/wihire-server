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
const seedSavedjob = require('./savedJob');

async function main() {
  await seedCompanyTotalEmployee();
  await seedCompanyIndustryScope();
  await seedSkill();
  await seedCategories();
  await seedSalary();
  await seedCompany();
  await seedUser();
  await seedJob();
  await seedApplicationList();
  await seedSavedjob();
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
