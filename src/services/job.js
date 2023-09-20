const prisma = require('../lib/prisma');

const prepareFilters = (params) => {
  let filterContainer = [];
  params.map((param) => {
    const filter = {
      title: {
        contains: param,
        mode: 'insensitive',
      },
    };
    filterContainer.push(filter);
  });
  return filterContainer;
};

class JobService {
  static countJobs = async ({ ...filters }, reqUserId) => {
    let filterCategories;
    let filterJobSkills;
    let filterJobTypes;
    let filterPlaceMethods;
    let filterIsSaved;

    if (Array.isArray(filters.categories)) {
      filterCategories = prepareFilters(filters.categories);
    }

    if (Array.isArray(filters.skills)) {
      filterJobSkills = prepareFilters(filters.skills);
    }

    if (Array.isArray(filters['job-types'])) {
      filterJobTypes = [];
      filters['job-types'].map((jobType) => {
        const filter = {
          jobType: jobType.toUpperCase(),
        };
        filterJobTypes.push(filter);
      });
    }

    if (Array.isArray(filters['place-methods'])) {
      filterPlaceMethods = [];
      filters['place-methods'].map((placeMethod) => {
        const filter = {
          placeMethod: placeMethod.toUpperCase(),
        };
        filterPlaceMethods.push(filter);
      });
    }

    if (filters['is-saved'] === 'true') {
      filterIsSaved = true;
    } else if (filters['is-saved'] === 'false' || filters['is-saved'] === undefined) {
      filterIsSaved = false;
    } else {
      throw new Error('Bad request');
    }

    try {
      const totalJobs = await prisma.job.count({
        where: {
          title: {
            contains: filters?.title,
            mode: 'insensitive',
          },
          company: {
            profile: {
              name: {
                contains: filters?.company,
                mode: 'insensitive',
              },
            },
          },
          jobCategories: {
            some: {
              categories: {
                ...(filterCategories
                  ? {
                      OR: filterCategories,
                    }
                  : {
                      title: {
                        contains: filters?.categories,
                        mode: 'insensitive',
                      },
                    }),
              },
            },
          },
          jobSkills: {
            some: {
              skill: {
                ...(filterJobSkills
                  ? {
                      OR: filterJobSkills,
                    }
                  : {
                      title: {
                        contains: filters?.skills,
                        mode: 'insensitive',
                      },
                    }),
              },
            },
          },
          ...(filters['min-salary']
            ? {
                salary: {
                  min: {
                    gte: +filters['min-salary'],
                  },
                },
              }
            : {}),
          ...(filterJobTypes
            ? {
                OR: filterJobTypes,
              }
            : {
                jobType: filters['job-types']?.toUpperCase(),
              }),
          ...(filterPlaceMethods
            ? {
                OR: filterPlaceMethods,
              }
            : {
                placeMethod: filters['place-methods']?.toUpperCase(),
              }),
          ...(filterIsSaved
            ? {
                savedJobs: {
                  some: {
                    userId: reqUserId,
                  },
                },
              }
            : {}),
          status: {
            equals: filters?.status?.toUpperCase(),
          },
        },
      });
      return totalJobs;
    } catch (error) {
      console.log(error);
    }
  };

  static getAllJobs = async ({ ...filters }, reqUserId) => {
    let filterCategories;
    let filterJobSkills;
    let filterJobTypes;
    let filterPlaceMethods;
    let filterIsSaved;

    if (Array.isArray(filters.categories)) {
      filterCategories = prepareFilters(filters.categories);
    }

    if (Array.isArray(filters.skills)) {
      filterJobSkills = prepareFilters(filters.skills);
    }

    if (Array.isArray(filters['job-types'])) {
      filterJobTypes = [];
      filters['job-types'].map((jobType) => {
        const filter = {
          jobType: jobType.toUpperCase(),
        };
        filterJobTypes.push(filter);
      });
    }

    if (Array.isArray(filters['place-methods'])) {
      filterPlaceMethods = [];
      filters['place-methods'].map((placeMethod) => {
        const filter = {
          placeMethod: placeMethod.toUpperCase(),
        };
        filterPlaceMethods.push(filter);
      });
    }

    if (filters['is-saved'] === 'true') {
      filterIsSaved = true;
    } else if (filters['is-saved'] === 'false' || filters['is-saved'] === undefined) {
      filterIsSaved = false;
    } else {
      throw new Error('Bad request');
    }

    try {
      const jobs = await prisma.job.findMany({
        where: {
          title: {
            contains: filters?.title,
            mode: 'insensitive',
          },
          company: {
            profile: {
              name: {
                contains: filters?.company,
                mode: 'insensitive',
              },
            },
          },
          jobCategories: {
            some: {
              categories: {
                ...(filterCategories
                  ? {
                      OR: filterCategories,
                    }
                  : {
                      title: {
                        contains: filters?.categories,
                        mode: 'insensitive',
                      },
                    }),
              },
            },
          },
          jobSkills: {
            some: {
              skill: {
                ...(filterJobSkills
                  ? {
                      OR: filterJobSkills,
                    }
                  : {
                      title: {
                        contains: filters?.skills,
                        mode: 'insensitive',
                      },
                    }),
              },
            },
          },
          ...(filters['min-salary']
            ? {
                salary: {
                  min: {
                    gte: +filters['min-salary'],
                  },
                },
              }
            : {}),
          ...(filterJobTypes
            ? {
                OR: filterJobTypes,
              }
            : {
                jobType: filters['job-types']?.toUpperCase(),
              }),
          ...(filterPlaceMethods
            ? {
                OR: filterPlaceMethods,
              }
            : {
                placeMethod: filters['place-methods']?.toUpperCase(),
              }),
          ...(filterIsSaved
            ? {
                savedJobs: {
                  some: {
                    userId: reqUserId,
                  },
                },
              }
            : {}),
          status: {
            equals: filters?.status?.toUpperCase(),
          },
        },
        skip: (filters.page - 1) * filters.limit || undefined,
        take: +filters.limit || undefined,
        include: {
          company: {
            include: {
              profile: {
                select: {
                  slug: true,
                  name: true,
                  email: true,
                  avatar: true,
                },
              },
            },
          },
          salary: true,
          savedJobs: {
            where: {
              userId: {
                equals: reqUserId,
              },
            },
          },
        },
      });
      return jobs;
    } catch (error) {
      console.log(error);
    }
  };
}

module.exports = JobService;
