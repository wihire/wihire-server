const prisma = require('../../src/lib/prisma');

const SKILLS = [
  {
    id: '544e908a-54cb-11ee-8c99-0242ac120002',
    title: 'Leadership',
  },
  {
    id: '544e908a-54cb-11ee-8c99-0242ac120003',
    title: 'Communication',
  },
  {
    id: '544e908a-54cb-11ee-8c99-0242ac120004',
    title: 'Collaboration',
  },
  {
    id: '544e908a-54cb-11ee-8c99-0242ac120005',
    title: 'Problem Solving',
  },
  {
    id: '544e908a-54cb-11ee-8c99-0242ac120006',
    title: 'Time Management',
  },
  {
    id: '544e908a-54cb-11ee-8c99-0242ac120007',
    title: 'Creativity',
  },
  {
    id: '544e908a-54cb-11ee-8c99-0242ac120008',
    title: 'Interpersonal',
  },
  {
    id: '544e908a-54cb-11ee-8c99-0242ac120009',
    title: 'Adaptability',
  },
  {
    id: '544e908a-54cb-11ee-8c99-0242ac120010',
    title: 'Work Ethic',
  },
  {
    id: '544e908a-54cb-11ee-8c99-0242ac120011',
    title: 'Persuasion',
  },
  {
    id: '544e908a-54cb-11ee-8c99-0242ac120012',
    title: 'Attitude',
  },
  {
    id: '544e908a-54cb-11ee-8c99-0242ac120013',
    title: 'Teamwork',
  },
  {
    id: '544e908a-54cb-11ee-8c99-0242ac120014',
    title: 'Active Listening',
  },
  {
    id: '544e908a-54cb-11ee-8c99-0242ac120015',
    title: 'Empathy',
  },
  {
    id: '544e908a-54cb-11ee-8c99-0242ac120016',
    title: 'Positive Attitude',
  },
  {
    id: '544e908a-54cb-11ee-8c99-0242ac120017',
    title: 'IT Development',
  },
  {
    id: '544e908a-54cb-11ee-8c99-0242ac120018',
    title: 'HTML',
  },
  {
    id: '544e908a-54cb-11ee-8c99-0242ac120019',
    title: 'CSS',
  },
  {
    id: '544e908a-54cb-11ee-8c99-0242ac120020',
    title: 'JavaScript',
  },
  {
    id: '544e908a-54cb-11ee-8c99-0242ac120021',
    title: 'React',
  },
  {
    id: '544e908a-54cb-11ee-8c99-0242ac120022',
    title: 'Node.js',
  },
  {
    id: '544e908a-54cb-11ee-8c99-0242ac120023',
    title: 'Angular',
  },
  {
    id: '544e908a-54cb-11ee-8c99-0242ac120024',
    title: 'Vue.js',
  },
  {
    id: '544e908a-54cb-11ee-8c99-0242ac120025',
    title: 'Python',
  },
  {
    id: '544e908a-54cb-11ee-8c99-0242ac120026',
    title: 'Java',
  },
  {
    id: '544e908a-54cb-11ee-8c99-0242ac120027',
    title: 'C#',
  },
  {
    id: '544e908a-54cb-11ee-8c99-0242ac120031',
    title: 'Swift',
  },
  {
    id: '544e908a-54cb-11ee-8c99-0242ac120032',
    title: 'Kotlin',
  },
  {
    id: '544e908a-54cb-11ee-8c99-0242ac120033',
    title: 'Android Development',
  },
  {
    id: '544e908a-54cb-11ee-8c99-0242ac120034',
    title: 'iOS Development',
  },
  {
    id: '544e908a-54cb-11ee-8c99-0242ac120035',
    title: 'Flutter',
  },
  {
    id: '544e908a-54cb-11ee-8c99-0242ac120039',
    title: 'SQL',
  },
  {
    id: '544e908a-54cb-11ee-8c99-0242ac120040',
    title: 'MySQL',
  },
  {
    id: '544e908a-54cb-11ee-8c99-0242ac120041',
    title: 'MongoDB',
  },
  {
    id: '544e908a-54cb-11ee-8c99-0242ac120042',
    title: 'PostgreSQL',
  },
  {
    id: '544e908a-54cb-11ee-8c99-0242ac120043',
    title: 'Firebase',
  },
  {
    id: '544e908a-54cb-11ee-8c99-0242ac120044',
    title: 'Git',
  },
  {
    id: '544e908a-54cb-11ee-8c99-0242ac120045',
    title: 'GitHub',
  },
  {
    id: '544e908a-54cb-11ee-8c99-0242ac120046',
    title: 'GitLab',
  },
  {
    id: '544e908a-54cb-11ee-8c99-0242ac120047',
    title: 'Cloud Computing',
  },
  {
    id: '544e908a-54cb-11ee-8c99-0242ac120048',
    title: 'Web Development',
  },
  {
    id: '544e908a-54cb-11ee-8c99-0242ac120049',
    title: 'Responsiblity',
  },
];

const seedSkill = async () => {
  await Promise.all(
    SKILLS.map(async (skill) => {
      await prisma.skill.upsert({
        where: { id: skill.id },
        update: {},
        create: skill
      });
    })
  );
};

module.exports = seedSkill;
