const prisma = require('../../src/lib/prisma');

const seedCompanyIndustryScope = require('./companyIndustryScope');
const seedCompanyTotalEmployee = require('./companyTotalEmployee');
const seedSkill = require('./skill');
const seedJobSkill = require('./jobSkill');
const seedCategories = require('./categories');
const seedJobCategories = require('./jobCategory');
const seedCompany = require('./company');
const seedUser = require('./user');
const seedSalary = require('./salary');
const seedJob = require('./job');
const seedSavedJob = require('./savedJob');
const seedApplicationList = require('./applicationList');

async function main() {
  await seedCompanyTotalEmployee();
  await seedCompanyIndustryScope();
  await seedSkill();
  await seedJobSkill();
  await seedCategories();
  await seedJobCategories();
  await seedSalary();
  await seedCompany();
  await seedUser();
  await seedJob();
  await seedSavedJob();
  await seedApplicationList();
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
