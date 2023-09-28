/* eslint-disable max-len */
const prisma = require('../../src/lib/prisma');

const JOBS = [
  {
    id: '6a58a4c1-5aaf-4307-be09-82f3879c8817',
    slug: 'frontend-developer-2c6e31f3',
    title: 'Frontend Developer',
    companyId: 'e3524100-68ab-403f-8a06-332ee21c41bd',
    salaryId: 'b0c078fa-5576-11ee-8c99-0242ac120004',
    placeMethod: 'REMOTE',
    jobType: 'FULLTIME',
    province: 'DKI JAKARTA',
    address: 'KOTA JAKARTA SELATAN',
    description:
      '<p>We are looking for a Front-End Web Developer who is motivated to combine the art of design with the art of programming. Responsibilities will include translation of the UI/UX design wireframes to actual code that will produce visual elements of the application. You will work with the UI/UX designer and bridge the gap between graphical design and technical implementation, taking an active role on both sides and defining how the application looks as well as how it works.</p>',
    minimumQualification:
      '<ul><li>Minimum 1 year of experience in Front-End Development</li><li>Proficient understanding of web markup, including HTML5, CSS3</li><li>Proficient understanding of client-side scripting and JavaScript frameworks, including jQuery</li><li>Proficient understanding of cross-browser compatibility issues and ways to work around them.</li><li>Proficient understanding of code versioning tools, such as Git</li><li>Good understanding of SEO principles and ensuring that application will adhere to them.</li><li>Good understanding of asynchronous request handling, partial page updates, and AJAX.</li></ul>',
    benefits:
      '<ul><li>BPJS</li><li>THR</li><li>Health Insurance</li><li>Flexible Working Hours</li><li>Remote Working</li></ul>',
    status: 'POSTED',
  },
  {
    id: '6a58a4c1-5aaf-4307-be09-82f3879c8818',
    slug: 'mentor-ui-ux-2c6e31f4',
    title: 'Mentor UI/UX',
    companyId: 'e3524100-68ab-403f-8a06-332ee21c41bd',
    salaryId: 'b0c078fa-5576-11ee-8c99-0242ac120005',
    placeMethod: 'REMOTE',
    jobType: 'CONTRACT',
    province: 'DKI JAKARTA',
    address: 'KOTA JAKARTA SELATAN',
    description:
      '<p>We are looking for a UI/UX mentor who can help our students to learn about UI/UX. You will work with the students and bridge the gap between graphical design and technical implementation, taking an active role on both sides and defining how the application looks as well as how it works.</p>',
    minimumQualification:
      '<ul><li>Minimum 1 year of experience in UI/UX</li><li>Proficient understanding of UI/UX</li><li>Proficient understanding of UI/UX tools, such as Figma, Adobe XD, etc.</li><li>Good understanding of UI/UX principles and ensuring that application will adhere to them.</li><li>Good communication</li></ul>',
    benefits:
      '<ul><li>BPJS</li><li>THR</li><li>Health Insurance</li><li>Flexible Working Hours</li><li>Remote Working</li></ul>',
    status: 'POSTED',
  },
  {
    id: '6a58a4c1-5aaf-4307-be09-82f3879c8819',
    slug: 'accounting-staff-2c6e31f5',
    title: 'Accounting Staff',
    companyId: 'e3524100-68ab-403f-8a06-332ee21c41be',
    salaryId: 'b0c078fa-5576-11ee-8c99-0242ac120006',
    placeMethod: 'ONSITE',
    jobType: 'FULLTIME',
    province: 'DKI JAKARTA',
    address: 'KOTA JAKARTA SELATAN',
    description:
      '<p>We are looking for an Accounting Staff who can help our company to manage our financial report. You will work with the finance team and bridge the gap between financial report and technical implementation, taking an active role on both sides and defining how the financial report looks as well as how it works.</p>',
    minimumQualification:
      '<ul><li>Minimum 2+ year of experience in Accounting</li><li>Proficient understanding of Accounting</li><li>Proficient understanding of Accounting tools, such as Zahir, Accurate, etc.</li><li>Good understanding of Accounting principles and ensuring that application will adhere to them.</li><li>Good communication</li></ul>',
    benefits:
      '<ul><li>BPJS</li><li>THR</li><li>Health Insurance</li><li>Flexible Working Hours</li></ul>',
    status: 'POSTED',
  },
  {
    id: '6a58a4c1-5aaf-4307-be09-82f3879c8820',
    slug: 'sales-manager-2c6e31f6',
    title: 'Sales Manager',
    companyId: 'e3524100-68ab-403f-8a06-332ee21c41bi',
    placeMethod: 'HYBRID',
    jobType: 'FULLTIME',
    province: 'DKI JAKARTA',
    address: 'KOTA JAKARTA SELATAN',
    description:
      '<ul><li>Developing a business plan and sales strategy for the market that ensures attainment of company sales goals and profitability.</li><li>Preparing action plans for individuals as well as for the team for effective search of sales leads and prospects.</li><li>Initiating and coordinating development of action plans to penetrate new markets.</li><li>Assisting in the development and implementation of marketing plans as needed.</li><li>Providing timely feedback to senior management regarding performance.</li></ul>',
    minimumQualification:
      '<ul><li>Minimum 2+ year of experience in Sales</li><li>Proficient understanding of Sales</li><li>Proficient understanding of Sales tools, such as CRM, etc.</li><li>Good understanding of Sales principles and ensuring that application will adhere to them.</li><li>Good communication</li></ul>',
    status: 'POSTED',
  },
  {
    id: '6a58a4c1-5aaf-4307-be09-82f3879c8821',
    slug: 'admin-2c6e31f7',
    title: 'Admin',
    companyId: 'e3524100-68ab-403f-8a06-332ee21c41bg',
    salaryId: 'b0c078fa-5576-11ee-8c99-0242ac120008',
    placeMethod: 'ONSITE',
    jobType: 'FULLTIME',
    province: 'DKI JAKARTA',
    address: 'KOTA JAKARTA SELATAN',
    description:
      '<ul><li>Prepare regular reports on expenses and office budgets.</li><li>Maintain and update company databases.</li><li>Organize a filing system for important and confidential company documents.</li><li>Answer queries by employees and clients.</li><li>Update office policies as needed.</li></ul>',
    minimumQualification:
      '<ul><li>Minimum 1+ year of experience in Admin</li><li>Proficient understanding of Admin</li><li>Proficient understanding of Admin tools, such as Microsoft Office, etc.</li><li>Good understanding of Admin principles and ensuring that application will adhere to them.</li><li>Good communication</li></ul>',
    status: 'DRAFT',
  },
  {
    id: '6a58a4c1-5aaf-4307-be09-82f3879c8822',
    slug: 'senior-ui-ux-2c6e31f8',
    title: 'Senior UI/UX',
    companyId: 'e3524100-68ab-403f-8a06-332ee21c41bf',
    salaryId: 'b0c078fa-5576-11ee-8c99-0242ac120009',
    placeMethod: 'HYBRID',
    jobType: 'FULLTIME',
    province: 'DKI JAKARTA',
    address: 'KOTA JAKARTA SELATAN',
    description:
      '<ul><li>Developing a business plan and sales strategy for the market that ensures attainment of company sales goals and profitability.</li><li>Preparing action plans for individuals as well as for the team for effective search of sales leads and prospects.</li><li>Initiating and coordinating development of action plans to penetrate new markets.</li><li>Assisting in the development and implementation of marketing plans as needed.</li><li>Providing timely feedback to senior management regarding performance.</li></ul>',
    minimumQualification:
      '<ul><li>Minimum 5+ year of experience in UI/UX</li><li>Proficient understanding of UI/UX</li><li>Proficient understanding of UI/UX tools, such as Figma, Adobe XD, etc.</li><li>Good understanding of UI/UX principles and ensuring that application will adhere to them.</li><li>Good communication</li></ul>',
    status: 'CLOSED',
  },
];

const seedJob = async () => {
  await Promise.all(
    JOBS.map(async (job) => {
      await prisma.job.upsert({
        where: { id: job.id },
        update: {},
        create: job,
      });
    }),
  );
};

module.exports = seedJob;
