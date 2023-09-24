const ProfileController = require('../controllers/profile.controller');
const router = require('express').Router();
const { upload } = require('../middlewares/uploadFile');
const authentication = require('../middlewares/authentication');
const { authorization } = require('../middlewares/authorization');
const ROLE = require('../../constants/role');
const UserController = require('../controllers/user.controller');
const EducationController = require('../controllers/education.controller');
const WorkExperienceController = require('../controllers/workExperience.controller');
const ProjectController = require('../controllers/project.controller');
const CertificateController = require('../controllers/certificate.controller');
const SkillController = require('../controllers/skill.controller');

router.get('/:userSlug', authentication, ProfileController.getBySlug);
router.put(
  '/user/basic',
  authentication,
  authorization([ROLE.USER]),
  upload('image')('single', ['avatar']),
  UserController.editBasic,
);
router.put(
  '/user/salary-expectation',
  authentication,
  authorization([ROLE.USER]),
  UserController.editSalaryExpecation,
);
router.put(
  '/user/resume',
  authentication,
  authorization([ROLE.USER]),
  upload('pdf')('single', ['resume']),
  UserController.editResume,
);

/**
 * User education route
 */
router.post(
  '/user/educations/',
  authentication,
  authorization([ROLE.USER]),
  EducationController.createEducation,
);
router.get(
  '/user/educations/:educationId',
  authentication,
  authorization([ROLE.USER]),
  EducationController.getDetailEducation,
);
router.put(
  '/user/educations/:educationId',
  authentication,
  authorization([ROLE.USER]),
  EducationController.updateEducation,
);
router.delete(
  '/user/educations/:educationId',
  authentication,
  authorization([ROLE.USER]),
  EducationController.deleteEducation,
);

/**
 * User work experience route
 */
router.post(
  '/user/work-experiences/',
  authentication,
  authorization([ROLE.USER]),
  WorkExperienceController.createWorkExperience,
);
router.get(
  '/user/work-experiences/:workExperienceId',
  authentication,
  authorization([ROLE.USER]),
  WorkExperienceController.getDetailWorkExperience,
);
router.put(
  '/user/work-experiences/:workExperienceId',
  authentication,
  authorization([ROLE.USER]),
  WorkExperienceController.updateWorkExperience,
);
router.delete(
  '/user/work-experiences/:workExperienceId',
  authentication,
  authorization([ROLE.USER]),
  WorkExperienceController.deleteWorkExperience,
);

/**
 * User projects route
 */
router.post(
  '/user/projects/',
  authentication,
  authorization([ROLE.USER]),
  ProjectController.createProject,
);
router.get(
  '/user/projects/:projectId',
  authentication,
  authorization([ROLE.USER]),
  ProjectController.getDetailProject,
);
router.put(
  '/user/projects/:projectId',
  authentication,
  authorization([ROLE.USER]),
  ProjectController.updateProject,
);
router.delete(
  '/user/projects/:projectId',
  authentication,
  authorization([ROLE.USER]),
  ProjectController.deleteProject,
);

/**
 * User certificate route
 */
router.post(
  '/user/certificates/',
  authentication,
  authorization([ROLE.USER]),
  CertificateController.createCertificate,
);
router.get(
  '/user/certificates/:certificateId',
  authentication,
  authorization([ROLE.USER]),
  CertificateController.getDetailCertificate,
);
router.put(
  '/user/certificates/:certificateId',
  authentication,
  authorization([ROLE.USER]),
  CertificateController.updateCertificate,
);
router.delete(
  '/user/certificates/:certificateId',
  authentication,
  authorization([ROLE.USER]),
  CertificateController.deleteCertificate,
);

/**
 * User skill route
 */
router.post(
  '/user/skills/',
  authentication,
  authorization([ROLE.USER]),
  SkillController.createSkill,
);
router.get(
  '/user/skills/:skillId',
  authentication,
  authorization([ROLE.USER]),
  SkillController.getDetailSkill,
);
router.put(
  '/user/skills/:skillId',
  authentication,
  authorization([ROLE.USER]),
  SkillController.updateSkill,
);
router.delete(
  '/user/skills/:skillId',
  authentication,
  authorization([ROLE.USER]),
  SkillController.deleteSkill,
);

module.exports = router;
