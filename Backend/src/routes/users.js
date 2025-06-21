import express from 'express';
import {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  getProfile,
  updateProfile,
  changePassword,
  updateStudentProfile,
} from '../controllers/userController.js';
import { protect, restrictTo } from '../middleware/auth.js';
import upload from '../middleware/upload.js';

const router = express.Router();

// Protect all routes after this middleware
// router.use(protect);

// Routes for all authenticated users
router.get('/profile', getProfile);
router.patch('/profile', updateProfile);
router.patch('/change-password', changePassword);
router.put(
  '/update-profile/:id',
  // protect, // uncomment if you have auth
  upload.fields([
    { name: 'profileImage', maxCount: 1 },
    { name: 'resume', maxCount: 1 },
  ]),
  updateStudentProfile
);

// router.use(restrictTo('super_admin', 'admin',"student", "placement_staff", "company"));
// Admin only routes
router.get('/:id', getUser);
router.get('/', getAllUsers);
router.patch('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;
