import express from 'express';
import { protect, restrictTo } from '../middleware/auth.js';
import { addCertification, applyForJob, createStudent, deleteCertification, deleteStudent, getAllStudents, getApplicationDetails, getMyApplications, getMyProfile, getStudent, getStudentStats, updateMyProfile, updateStudent, uploadResume } from '../controllers/studentController.js';

const router = express.Router();

// Protect all routes after this middleware
router.use(protect);

// Routes accessible by placement staff and admins
router.use(restrictTo('super_admin', 'admin', 'placement_staff'));
router.get('/', getAllStudents);
router.get('/stats', getStudentStats);
router.post('/', createStudent);

// Routes accessible by specific roles
router.get('/:id', getStudent);
router.patch('/:id', updateStudent);
router.delete('/:id', restrictTo('super_admin', 'admin'), deleteStudent);

// Student profile routes
router.get('/profile', restrictTo('student'), getMyProfile);
router.patch('/profile', restrictTo('student'), updateMyProfile);
router.post('/profile/resume', restrictTo('student'), uploadResume);
router.post('/profile/certifications', restrictTo('student'), addCertification);
router.delete('/profile/certifications/:id', restrictTo('student'), deleteCertification);

// Student applications
router.get('/applications', restrictTo('student'), getMyApplications);
router.post('/applications/:jobId', restrictTo('student'), applyForJob);
router.get('/applications/:applicationId', protect, getApplicationDetails);

export default router;
