/* eslint-disable max-len */
const prisma = require('../../src/lib/prisma');

const COMPANIES = [
  {
    profile: {
      id: '8b1a1e98-ccf3-42cd-acfb-3109cf7dee6c',
      slug: 'rakamin-5de7659c',
      name: 'Rakamin',
      email: 'rakamin@gmail.com',
      password: '$2a$12$TNAvSKsc7/G0eu7P2/21re39EbJC4mcaop/mtP8Wutk.wIwdfjrs6',
      isVerifiedEmail: true,
      avatar: 'https://res.cloudinary.com/dwp0iuas9/image/upload/v1694966771/images/avatar/smmdbekztsmr4sblv1ub.jpg',
      role: 'COMPANY',
      province: 'DKI JAKARTA',
      address: 'KOTA JAKARTA SELATAN'
    },
    company: {
      id: 'e3524100-68ab-403f-8a06-332ee21c41bd',
      profileId: '8b1a1e98-ccf3-42cd-acfb-3109cf7dee6c',
      companyScopeid: '7ad19cbd-4c48-4636-8fa2-6d1f61d4e8a1',
      companyTotalEmployeeId: 'a0583c90-c558-4838-8e59-ee239c20a593',
      headline: 'Temukan potensi, tingkatkan kompetensi. Bersama Rakamin, raih karier impian!',
      about:
        'Rakamin adalah platform yang menghubungkan talenta dan perusahaan untuk menciptakan kesempatan kerja yang lebih baik. Kami percaya bahwa setiap orang memiliki potensi untuk berkembang dan mencapai karier impian mereka. Kami ingin membantu talenta untuk menemukan potensi mereka dan membantu perusahaan untuk menemukan talenta terbaik.',
      websiteLink: 'https://www.rakamin.com/',
    },
  },
  {
    profile: {
      id: '8b1a1e98-ccf3-42cd-acfb-3109cf7dee6d',
      slug: 'gojek-5de7659d',
      name: 'Gojek',
      email: 'gojek@gojek.com',
      password: '$2a$12$TNAvSKsc7/G0eu7P2/21re39EbJC4mcaop/mtP8Wutk.wIwdfjrs6',
      isVerifiedEmail: true,
      avatar: 'https://res.cloudinary.com/dwp0iuas9/image/upload/v1694966771/images/avatar/r1lz5xtu4bjxx1rtvfa6.jpg',
      role: 'COMPANY',
      province: 'DKI JAKARTA',
      address: 'KOTA JAKARTA SELATAN',
    },
    company: {
      id: 'e3524100-68ab-403f-8a06-332ee21c41be',
      profileId: '8b1a1e98-ccf3-42cd-acfb-3109cf7dee6d',
      companyScopeid: '7ad19cbd-4c48-4636-8fa2-6d1f63d3e7a4',
      companyTotalEmployeeId: 'a0583c90-c558-4838-8e59-ee239c20a596',
      headline:
        'Gojek is beyond an app for online transportation, food delivery, logistics, payment, and daily services.',
      about:
        'Gojek is a Super App. It’s one app for ordering food, commuting, digital payments, shopping, hyper-local delivery, and dozen other products. It is Indonesia’s first and fastest growing unicorn building an on-demand empire.',
      websiteLink: 'https://www.gojek.com/',
    },
  },
  {
    profile: {
      id: '8b1a1e98-ccf3-42cd-acfb-3109cf7dee6e',
      slug: 'tokopedia-5de7659e',
      name: 'Tokopedia',
      email: 'tokopedia@tokopedia.com',
      password: '$2a$12$TNAvSKsc7/G0eu7P2/21re39EbJC4mcaop/mtP8Wutk.wIwdfjrs6',
      isVerifiedEmail: true,
      avatar: 'https://res.cloudinary.com/dwp0iuas9/image/upload/v1694966771/images/avatar/idbszcjekuhg6idsghgc.png',
      role: 'COMPANY',
      province: 'DKI JAKARTA',
      address: 'KOTA JAKARTA SELATAN',
    },
    company: {
      id: 'e3524100-68ab-403f-8a06-332ee21c41bf',
      profileId: '8b1a1e98-ccf3-42cd-acfb-3109cf7dee6e',
      companyScopeid: '7ad19cbd-4c48-4636-8fa2-6d1f63d3e7a6',
      companyTotalEmployeeId: 'a0583c90-c558-4838-8e59-ee239c20a596',
      headline:
        'As the largest eCommerce platform in Indonesia, Tokopedia provides a platform that allows millions of merchants and consumers to connect and collaborate.',
      about:
        'Tokopedia is an Indonesian technology company with a mission to democratize commerce through technology. We are the leading marketplace in Indonesia; we encourage millions of merchants and consumers to participate in the future of commerce. Our vision is to build an ecosystem where everyone can start and discover anything with ease.',
      websiteLink: 'https://www.tokopedia.com/',
    },
  },
  {
    profile: {
      id: '8b1a1e98-ccf3-42cd-acfb-3109cf7dee6f',
      slug: 'pertamina-5de7659f',
      name: 'Pertamina',
      email: 'pertamina@pertamina.com',
      password: '$2a$12$TNAvSKsc7/G0eu7P2/21re39EbJC4mcaop/mtP8Wutk.wIwdfjrs6',
      isVerifiedEmail: true,
      avatar: 'https://res.cloudinary.com/dwp0iuas9/image/upload/v1694966771/images/avatar/moqyjaahf8hrgcrdpumg.png',
      role: 'COMPANY',
      province: 'DKI JAKARTA',
      address: 'KOTA JAKARTA PUSAT',
    },
    company: {
      id: 'e3524100-68ab-403f-8a06-332ee21c41bg',
      profileId: '8b1a1e98-ccf3-42cd-acfb-3109cf7dee6f',
      companyScopeid: '7ad19cbd-4c48-4636-8fa2-6d1f62d4e7a8',
      companyTotalEmployeeId: 'a0583c90-c558-4838-8e59-ee239c20a598',
      about:
        'Pertamina is an Indonesian state-owned oil and natural gas corporation based in Jakarta. It was created in August 1968 by the merger of Pertamin and Permina. The firm is currently (2013) the second-largest crude oil producer in Indonesia behind the US-based Chevron Pacific Indonesia.',
      websiteLink: 'https://www.pertamina.com/',
    },
  },
  {
    profile: {
      id: '8b1a1e98-ccf3-42cd-acfb-3109cf7dee6g',
      slug: 'pintu-5de7659g',
      name: 'Pintu',
      email: 'pintu@pintu.com',
      password: '$2a$12$TNAvSKsc7/G0eu7P2/21re39EbJC4mcaop/mtP8Wutk.wIwdfjrs6',
      isVerifiedEmail: true,
      avatar: 'https://res.cloudinary.com/dwp0iuas9/image/upload/v1694966771/images/avatar/kalv68ydk2pogxalg77g.png',
      role: 'COMPANY',
      province: 'JAWA BARAT',
      address: 'KOTA BANDUNG',
    },
    company: {
      id: 'e3524100-68ab-403f-8a06-332ee21c41bh',
      profileId: '8b1a1e98-ccf3-42cd-acfb-3109cf7dee6g',
      companyScopeid: '7ad19cbd-4c48-4636-8fa2-6d1f62d4e7a9',
      companyTotalEmployeeId: 'a0583c90-c558-4838-8e59-ee239c20a595',
      headline:
        'Pintu is a cryptocurrency exchange platform that allows users to buy, sell, and store cryptocurrencies easily and securely.',
      about:
        'Pintu is a cryptocurrency exchange platform that allows users to buy, sell, and store cryptocurrencies easily and securely. Pintu is the first crypto exchange platform in Indonesia that is registered with the Commodity Futures Trading Regulatory Agency (BAPPEBTI).',
      websiteLink: 'https://www.pintu.co.id/',
    },
  },
  {
    profile: {
      id: '8b1a1e98-ccf3-42cd-acfb-3109cf7dee6h',
      slug: 'pinhome-5de7659h',
      name: 'Pinhome',
      email: 'pinhome@pinhome',
      password: '$2a$12$TNAvSKsc7/G0eu7P2/21re39EbJC4mcaop/mtP8Wutk.wIwdfjrs6',
      isVerifiedEmail: true,
      avatar: 'https://res.cloudinary.com/dwp0iuas9/image/upload/v1694966772/images/avatar/bxcddh9ein6tuxeondal.jpg',
      role: 'COMPANY',
      province: 'DKI JAKARTA',
      address: 'KOTA JAKARTA SELATAN',
    },
    company: {
      id: 'e3524100-68ab-403f-8a06-332ee21c41bi',
      profileId: '8b1a1e98-ccf3-42cd-acfb-3109cf7dee6h',
      companyScopeid: '7ad19cbd-4c48-4636-8fa2-6d1f61d3e7b4',
      companyTotalEmployeeId: 'a0583c90-c558-4838-8e59-ee239c20a595',
      headline:
        'Pinhome is a technology company that provides a platform to help people buy and sell property easily and safely.',
      about:
        'Pinhome is a technology company that provides a platform to help people buy and sell property easily and safely. We are committed to providing the best experience for our users by providing the best service and technology.',
      websiteLink: 'https://www.pinhome.id/',
    },
  },
];

const seedCompany = async () => {
  await Promise.all(
    COMPANIES.map(async ({ profile, company }) => {
      await prisma.profile.upsert({
        where: { id: profile.id },
        update: {},
        create: profile,
      });

      await prisma.company.upsert({
        where: { id: company.id },
        update: {},
        create: company,
      });
    }),
  );
};

module.exports = seedCompany;
