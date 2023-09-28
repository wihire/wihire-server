const prisma = require('../../src/lib/prisma');

const CATEGORIES = [
  {
    id: '5c99b520-54cc-11ee-8c99-0242ac120002',
    title: 'Accounting & Finance',
  },
  {
    id: '5c99b520-54cc-11ee-8c99-0242ac120003',
    title: 'Administrative & Office',
  },
  {
    id: '5c99b520-54cc-11ee-8c99-0242ac120004',
    title: 'Architecture & Engineering',
  },
  {
    id: '5c99b520-54cc-11ee-8c99-0242ac120005',
    title: 'Art & Design',
  },
  {
    id: '5c99b520-54cc-11ee-8c99-0242ac120006',
    title: 'Business Operations',
  },
  {
    id: '5c99b520-54cc-11ee-8c99-0242ac120007',
    title: 'Cleaning & Facilities',
  },
  {
    id: '5c99b520-54cc-11ee-8c99-0242ac120008',
    title: 'Community & Social Services',
  },
  {
    id: '5c99b520-54cc-11ee-8c99-0242ac120009',
    title: 'Computer & IT',
  },
  {
    id: '5c99b520-54cc-11ee-8c99-0242ac120010',
    title: 'Construction & Extraction',
  },
  {
    id: '5c99b520-54cc-11ee-8c99-0242ac120011',
    title: 'Customer Service',
  },
  {
    id: '5c99b520-54cc-11ee-8c99-0242ac120012',
    title: 'Education & Training',
  },
  {
    id: '5c99b520-54cc-11ee-8c99-0242ac120013',
    title: 'Farming, Fishing & Forestry',
  },
  {
    id: '5c99b520-54cc-11ee-8c99-0242ac120014',
    title: 'Food & Restaurant',
  },
  {
    id: '5c99b520-54cc-11ee-8c99-0242ac120015',
    title: 'Healthcare',
  },
  {
    id: '5c99b520-54cc-11ee-8c99-0242ac120017',
    title: 'Human Resources',
  },
  {
    id: '5c99b520-54cc-11ee-8c99-0242ac120018',
    title: 'Installation, Maintenance & Repair',
  },
  {
    id: '5c99b520-54cc-11ee-8c99-0242ac120019',
    title: 'Legal',
  },
  {
    id: '5c99b520-54cc-11ee-8c99-0242ac120020',
    title: 'Management',
  },
  {
    id: '5c99b520-54cc-11ee-8c99-0242ac120021',
    title: 'Manufacturing & Warehouse',
  },
  {
    id: '5c99b520-54cc-11ee-8c99-0242ac120022',
    title: 'Marketing, Advertising & PR',
  },
  {
    id: '5c99b520-54cc-11ee-8c99-0242ac120023',
    title: 'Media & Communications',
  },
  {
    id: '5c99b520-54cc-11ee-8c99-0242ac120024',
    title: 'Personal Care & Services',
  },
  {
    id: '5c99b520-54cc-11ee-8c99-0242ac120027',
    title: 'Retail & Wholesale',
  },
  {
    id: '5c99b520-54cc-11ee-8c99-0242ac120028',
    title: 'Sales',
  },
  {
    id: '5c99b520-54cc-11ee-8c99-0242ac120029',
    title: 'Science & Research',
  },
];

const seedCategories = async () => {
  await Promise.all(
    CATEGORIES.map(async (category) => {
      await prisma.category.upsert({
        where: { id: category.id },
        update: {},
        create: category
      });
    })
  );
};

module.exports = seedCategories;
