import express from 'express';
import { protect, restrictTo } from '../middleware/auth.js';
import {
  getDashboardStats,
  getPlacementStats,
  getCompanyStats,
  getJobStats,
  getRecentJobs,
  getRecentApplications,
  getUpcomingInterviews,
  getDepartmentAnalytics,
  getSkillsAnalytics,
  getSalaryAnalytics,
} from '../controllers/dashboardController.js';

const router = express.Router();

// Protect all routes after this middleware
router.use(protect);

// Dashboard stats routes
router.get('/stats', getDashboardStats);
router.get('/placement-stats', getPlacementStats);
router.get('/company-stats', getCompanyStats);
router.get('/job-stats', getJobStats);

// Recent activity routes
router.get('/recent-jobs', getRecentJobs);
router.get('/recent-applications', getRecentApplications);
router.get('/upcoming-interviews', getUpcomingInterviews);

// Analytics routes
router.get('/analytics/departments', getDepartmentAnalytics);
router.get('/analytics/skills', getSkillsAnalytics);
router.get('/analytics/salaries', getSalaryAnalytics);

export default router;
