const prisma = require('../../src/lib/prisma');

const COMPANY_SCOPES = [
  {
    id: '7ad19cbd-4c48-4636-8fa2-6d1f61d3e7a0',
    name: 'Accounting'
  },
  {
    id: '7ad19cbd-4c48-4636-8fa2-6d1f61d3e7a1',
    name: 'Airlines/Aviation'
  },
  {
    id: '7ad19cbd-4c48-4636-8fa2-6d1f61d3e7a2',
    name: 'Alternative Dispute Resolution'
  },
  {
    id: '7ad19cbd-4c48-4636-8fa2-6d1f61d3e7a3',
    name: 'Alternative Medicine'
  },
  {
    id: '7ad19cbd-4c48-4636-8fa2-6d1f61d3e7a4',
    name: 'Animation'
  },
  {
    id: '7ad19cbd-4c48-4636-8fa2-6d1f61d3e7a5',
    name: 'Apparel & Fashion'
  },
  {
    id: '7ad19cbd-4c48-4636-8fa2-6d1f61d3e7a6',
    name: 'Architecture & Planning'
  },
  {
    id: '7ad19cbd-4c48-4636-8fa2-6d1f61d3e7a7',
    name: 'Arts and Crafts'
  },
  {
    id: '7ad19cbd-4c48-4636-8fa2-6d1f61d3e7a8',
    name: 'Automotive'
  },
  {
    id: '7ad19cbd-4c48-4636-8fa2-6d1f61d3e7aa',
    name: 'Banking'
  },
  {
    id: '7ad19cbd-4c48-4636-8fa2-6d1f61d3e7ab',
    name: 'Biotechnology'
  },
  {
    id: '7ad19cbd-4c48-4636-8fa2-6d1f61d3e7b1',
    name: 'Broadcast Media'
  },
  {
    id: '7ad19cbd-4c48-4636-8fa2-6d1f61d3e7b2',
    name: 'Building Materials'
  },
  {
    id: '7ad19cbd-4c48-4636-8fa2-6d1f61d3e7b3',
    name: 'Business Supplies and Equipment'
  },
  {
    id: '7ad19cbd-4c48-4636-8fa2-6d1f61d3e7b4',
    name: 'Property'
  },
  {
    id: '7ad19cbd-4c48-4636-8fa2-6d1f61d3e7b5',
    name: 'Capital Markets'
  },
  {
    id: '7ad19cbd-4c48-4636-8fa2-6d1f61d3e7b6',
    name: 'Chemicals'
  },
  {
    id: '7ad19cbd-4c48-4636-8fa2-6d1f61d3e7b7',
    name: 'Financial Services'
  },
  {
    id: '7ad19cbd-4c48-4636-8fa2-6d1f61d3e7b8',
    name: 'Civil Engineering'
  },
  {
    id: '7ad19cbd-4c48-4636-8fa2-6d1f61d3e7b9',
    name: 'Commercial Real Estate'
  },
  {
    id: '7ad19cbd-4c48-4636-8fa2-6d1f61d3e7ba',
    name: 'Computer & Network Security'
  },
  {
    id: '7ad19cbd-4c48-4636-8fa2-6d1f61d3e7c1',
    name: 'IT & Services'
  },
  {
    id: '7ad19cbd-4c48-4636-8fa2-6d1f61d3e8a2',
    name: 'Computer Games'
  },
  {
    id: '7ad19cbd-4c48-4636-8fa2-6d1f61d4e7a3',
    name: 'Computer Hardware'
  },
  {
    id: '7ad19cbd-4c48-4636-8fa2-6d1f61d4e7a4',
    name: 'Computer Networking'
  },
  {
    id: '7ad19cbd-4c48-4636-8fa2-6d1f61d4e7a5',
    name: 'Computer Software'
  },
  {
    id: '7ad19cbd-4c48-4636-8fa2-6d1f61d4e7a6',
    name: 'Construction'
  },
  {
    id: '7ad19cbd-4c48-4636-8fa2-6d1f61d4e7a7',
    name: 'Consumer Electronics'
  },
  {
    id: '7ad19cbd-4c48-4636-8fa2-6d1f61d4e7a8',
    name: 'Consumer Goods'
  },
  {
    id: '7ad19cbd-4c48-4636-8fa2-6d1f61d4e7aa',
    name: 'Cosmetics'
  },
  {
    id: '7ad19cbd-4c48-4636-8fa2-6d1f61d4e7ab',
    name: 'Dairy'
  },
  {
    id: '7ad19cbd-4c48-4636-8fa2-6d1f61d4e7ad',
    name: 'Design'
  },
  {
    id: '7ad19cbd-4c48-4636-8fa2-6d1f61d4e8a1',
    name: 'Education'
  },
  {
    id: '7ad19cbd-4c48-4636-8fa2-6d1f62d3e7a3',
    name: 'Electrical/Electronic Manufacturing'
  },
  {
    id: '7ad19cbd-4c48-4636-8fa2-6d1f62d3e7a4',
    name: 'Entertainment'
  },
  {
    id: '7ad19cbd-4c48-4636-8fa2-6d1f62d3e7a5',
    name: 'Environmental Services'
  },
  {
    id: '7ad19cbd-4c48-4636-8fa2-6d1f62d3e7a6',
    name: 'Events Services'
  },
  {
    id: '7ad19cbd-4c48-4636-8fa2-6d1f62d3e7a7',
    name: 'Executive Office'
  },
  {
    id: '7ad19cbd-4c48-4636-8fa2-6d1f62d3e7a8',
    name: 'Facilities Services'
  },
  {
    id: '7ad19cbd-4c48-4636-8fa2-6d1f62d3e7a9',
    name: 'Farming'
  },
  {
    id: '7ad19cbd-4c48-4636-8fa2-6d1f62d3e8a1',
    name: 'Fine Art'
  },
  {
    id: '7ad19cbd-4c48-4636-8fa2-6d1f62d3e8a2',
    name: 'Fishery'
  },
  {
    id: '7ad19cbd-4c48-4636-8fa2-6d1f62d4e7a3',
    name: 'Food & Beverages'
  },
  {
    id: '7ad19cbd-4c48-4636-8fa2-6d1f62d4e7a4',
    name: 'Food Production'
  },
  {
    id: '7ad19cbd-4c48-4636-8fa2-6d1f62d4e7a6',
    name: 'Furniture'
  },
  {
    id: '7ad19cbd-4c48-4636-8fa2-6d1f62d4e7a8',
    name: 'Refinery Oil & Gas'
  },
  {
    id: '7ad19cbd-4c48-4636-8fa2-6d1f62d4e7a9',
    name: 'Cryptocurrency'
  },
  {
    id: '7ad19cbd-4c48-4636-8fa2-6d1f63d3e7a4',
    name: 'Transportation & Travel'
  },
  {
    id: '7ad19cbd-4c48-4636-8fa2-6d1f63d3e7a6',
    name: 'E-Commerce'
  }
];

const seedCompanyIndustryScope = async () => {
  await Promise.all(
    COMPANY_SCOPES.map(async (companyScope) => {
      await prisma.companyScope.upsert({
        where: { id: companyScope.id },
        update: {},
        create: companyScope
      });
    })
  );
};

module.exports = seedCompanyIndustryScope;
