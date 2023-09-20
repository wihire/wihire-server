const { uniqueSlug } = require('../lib/common');
const prisma = require('../lib/prisma');

class JobService {
  static create = async (companyId, payload) => {
    const newJob = await prisma.job.create({
      data: {
        company: {
          connect: {
            id: companyId
          }
          },
        slug: uniqueSlug(payload.title),
        placeMethod: payload.placeMethod,
        jobType: payload.jobType,
        title: payload.title,
        province: payload.province,
        address: payload.address,
        description: payload.description,
        minimumQualification: payload.minimumQualification,
        benefit: payload.benefit,
        status: payload.status,
        salary: {
          create: {
            min: payload.minimalSalary,
            max: payload.maximalSalary,
          },
        },
        jobCategories: {
          create: payload.categoryAttributes
        }
      },
      
    });

    return newJob;
  };
}

module.exports = JobService;
