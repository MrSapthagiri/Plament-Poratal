import express from 'express';
import { protect, restrictTo } from '../middleware/auth.js';
import {
  getAllCompanies,
  getCompany,
  createCompany,
  updateCompany,
  deleteCompany,
  getCompanyProfile,
  
  verifyCompany,
  rejectCompany,
  getCompanyStats,
} from '../controllers/companyController.js';
import { getCompanyProfilebyuser, updateCompanyProfile } from '../controllers/userController.js';
import companyupload from '../middleware/companyuplods.js';

const router = express.Router();

// Protect all routes after this middleware
// router.use(protect);

router.put('/:id', companyupload.single('logo'), updateCompanyProfile);
router.get("/getcompany/:id",getCompanyProfilebyuser)

// Routes accessible by placement staff and admins
router.use(restrictTo('super_admin', 'admin', 'placement_staff', 'company'));
router.get('/', getAllCompanies);
router.get('/stats', getCompanyStats);

// Company specific routes
router.get('/profile', restrictTo('company'), getCompanyProfile);
router.patch('/profile', restrictTo('company'), updateCompanyProfile);

// Admin and placement staff routes
router.post('/', restrictTo('super_admin', 'admin', 'placement_staff'), createCompany);
router.get('/:id', getCompany);
router.patch('/:id', restrictTo('super_admin', 'admin'), updateCompany);
router.delete('/:id', restrictTo('super_admin', 'admin'), deleteCompany);

// Company verification routes
router.patch('/:id/verify', restrictTo('super_admin', 'admin', 'placement_staff'), verifyCompany);
router.patch('/:id/reject', restrictTo('super_admin', 'admin', 'placement_staff'), rejectCompany);

export default router;
