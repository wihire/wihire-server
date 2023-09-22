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
const seedSavedjob = require('./savedJob');
const seedUserEducation = require('./userEducation');
const seedUserSkill = require('./userSkill');
const seedUserProject = require('./userProject');
const seedUserWorkExperience = require('./userWorkExperience');
const seedUserCertificate = require('./userCertificate');

async function main() {
  await seedCompanyTotalEmployee();
  await seedCompanyIndustryScope();
  await seedSkill();
  await seedSalary();
  await seedCompany();
  await seedUser();
  await seedJob();
  await seedJobSkill();
  await seedCategories();
  await seedJobCategories();
  await seedSavedJob();
  await seedApplicationList();
  await seedSavedjob();
  await seedUserEducation();
  await seedUserSkill();
  await seedUserProject();
  await seedUserWorkExperience();
  await seedUserCertificate();
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
