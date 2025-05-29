import express from 'express';
import { protect, restrictTo } from '../middleware/auth.js';
import {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
  getCompanyJobs,
  approveJob,
  rejectJob,
  getJobStats,
  getJobApplications,
  updateApplicationStatus,
  scheduleInterview,
} from '../controllers/jobController.js';

const router = express.Router();

// Protect all routes after this middleware
router.use(protect);

// Public routes (accessible by all authenticated users)
router.get('/', getAllJobs);
router.get('/:id', getJob);

// Company routes
router.post('/', restrictTo('company'), createJob);
router.patch('/:id', restrictTo('company'), updateJob);
router.delete('/:id', restrictTo('company'), deleteJob);
router.get('/company/dashboard', restrictTo('company'), getCompanyJobs);

// Admin and placement staff routes
router.patch('/:id/approve', restrictTo('super_admin', 'admin', 'placement_staff'), approveJob);
router.patch('/:id/reject', restrictTo('super_admin', 'admin', 'placement_staff'), rejectJob);
router.get('/stats/overview', restrictTo('super_admin', 'admin', 'placement_staff'), getJobStats);

// Application management routes
router.get('/:id/applications', restrictTo('company', 'super_admin', 'admin', 'placement_staff'), getJobApplications);
router.patch('/:id/applications/:applicationId', restrictTo('company'), updateApplicationStatus);
router.post('/:id/applications/:applicationId/schedule-interview', restrictTo('company'), scheduleInterview);

export default router;
