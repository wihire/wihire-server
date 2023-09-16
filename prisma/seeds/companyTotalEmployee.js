const prisma = require('../../src/lib/prisma');

const COMPANY_TOTAL_EMPLOYEES = [
  {
    id: 'a0583c90-c558-4838-8e59-ee239c20a591',
    total: '1-10 Employees',
  },
  {
    id: 'a0583c90-c558-4838-8e59-ee239c20a592',
    total: '11-50 Employees',
  },
  {
    id: 'a0583c90-c558-4838-8e59-ee239c20a593',
    total: '51-200 Employees',
  },
  {
    id: 'a0583c90-c558-4838-8e59-ee239c20a594',
    total: '201-500 Employees',
  },
  {
    id: 'a0583c90-c558-4838-8e59-ee239c20a595',
    total: '501-1.000 Employees',
  },
  {
    id: 'a0583c90-c558-4838-8e59-ee239c20a596',
    total: '1001-5.000 Employees',
  },
  {
    id: 'a0583c90-c558-4838-8e59-ee239c20a597',
    total: '5001-10.000 Employees',
  },
  {
    id: 'a0583c90-c558-4838-8e59-ee239c20a598',
    total: '10.001+ Employees',
  },
];

const seedCompanyTotalEmployee = async () => {
  await Promise.all(
    COMPANY_TOTAL_EMPLOYEES.map(async (companyTotalEmployee) => {
      await prisma.companyTotalEmployee.upsert({
        where: { id: companyTotalEmployee.id },
        update: {},
        create: companyTotalEmployee
      });
    })
  );
};

module.exports = seedCompanyTotalEmployee;
