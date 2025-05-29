import Student from '../models/Student.js';
import Company from '../models/Company.js';
import Job from '../models/Job.js';
import Application from '../models/Application.js';

export const getDashboardStats = async (req, res) => {
  try {
    const stats = {
      students: await Student.countDocuments(),
      companies: await Company.countDocuments({ verificationStatus: 'verified' }),
      activeJobs: await Job.countDocuments({ status: 'open' }),
      totalApplications: await Application.countDocuments(),
      placedStudents: await Student.countDocuments({ placementStatus: 'placed' }),
    };
    
    res.status(200).json(stats);
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching dashboard stats',
      error: error.message,
    });
  }
};

export const getPlacementStats = async (req, res) => {
  try {
    const stats = await Student.aggregate([
      {
        $group: {
          _id: '$placementStatus',
          count: { $sum: 1 },
          avgCGPA: { $avg: '$cgpa' },
        },
      },
    ]);
    
    res.status(200).json(stats);
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching placement stats',
      error: error.message,
    });
  }
};

export const getCompanyStats = async (req, res) => {
  try {
    const stats = await Company.aggregate([
      {
        $group: {
          _id: '$industry',
          count: { $sum: 1 },
          avgJobs: { $avg: { $size: '$jobs' } },
        },
      },
    ]);
    
    res.status(200).json(stats);
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching company stats',
      error: error.message,
    });
  }
};

export const getJobStats = async (req, res) => {
  try {
    const stats = await Job.aggregate([
      {
        $group: {
          _id: '$type',
          count: { $sum: 1 },
          avgSalary: { $avg: '$salary.max' },
          totalApplications: { $sum: { $size: '$applications' } },
        },
      },
    ]);
    
    res.status(200).json(stats);
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching job stats',
      error: error.message,
    });
  }
};

export const getRecentJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ status: 'open' })
      .sort('-createdAt')
      .limit(5)
      .populate('company', 'name logo');
    
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching recent jobs',
      error: error.message,
    });
  }
};

export const getRecentApplications = async (req, res) => {
  try {
    const applications = await Application.find()
      .sort('-createdAt')
      .limit(5)
      .populate('student', 'name rollNumber')
      .populate('job', 'title');
    
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching recent applications',
      error: error.message,
    });
  }
};

export const getUpcomingInterviews = async (req, res) => {
  try {
    const currentDate = new Date();
    const applications = await Application.find({
      'interviews.dateTime': { $gte: currentDate },
      'interviews.status': 'scheduled',
    })
      .sort({ 'interviews.dateTime': 1 })
      .limit(5)
      .populate('student', 'name rollNumber')
      .populate('job', 'title company');
    
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching upcoming interviews',
      error: error.message,
    });
  }
};

export const getDepartmentAnalytics = async (req, res) => {
  try {
    const stats = await Student.aggregate([
      {
        $group: {
          _id: '$department',
          totalStudents: { $sum: 1 },
          placedStudents: {
            $sum: {
              $cond: [{ $eq: ['$placementStatus', 'placed'] }, 1, 0],
            },
          },
          avgCGPA: { $avg: '$cgpa' },
        },
      },
    ]);
    
    res.status(200).json(stats);
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching department analytics',
      error: error.message,
    });
  }
};

export const getSkillsAnalytics = async (req, res) => {
  try {
    const studentSkills = await Student.aggregate([
      { $unwind: '$skills' },
      {
        $group: {
          _id: '$skills',
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
      { $limit: 10 },
    ]);
    
    const jobSkills = await Job.aggregate([
      { $unwind: '$skills' },
      {
        $group: {
          _id: '$skills',
          count: { $sum: 1 },
          avgSalary: { $avg: '$salary.max' },
        },
      },
      { $sort: { count: -1 } },
      { $limit: 10 },
    ]);
    
    res.status(200).json({
      studentSkills,
      jobSkills,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching skills analytics',
      error: error.message,
    });
  }
};

export const getSalaryAnalytics = async (req, res) => {
  try {
    const stats = await Job.aggregate([
      {
        $group: {
          _id: {
            type: '$type',
            department: '$eligibleDepartments',
          },
          avgSalary: { $avg: '$salary.max' },
          minSalary: { $min: '$salary.min' },
          maxSalary: { $max: '$salary.max' },
          jobCount: { $sum: 1 },
        },
      },
    ]);
    
    res.status(200).json(stats);
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching salary analytics',
      error: error.message,
    });
  }
};
