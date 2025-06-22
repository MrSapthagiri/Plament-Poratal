import Job from '../models/Job.js';
import Company from '../models/Company.js';
import Application from '../models/Application.js';
import User from '../models/User.js';

export const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find()
      .populate('company', 'name location logo')
      .select('-applications');
    
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching jobs',
      error: error.message,
    });
  }
};

export const getJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)
      .populate('company', 'name description location logo website')
      .populate('applications');
    
    if (!job) {
      return res.status(404).json({
        message: 'Job not found',
      });
    }
    
    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching job',
      error: error.message,
    });
  }
};

export const createJob = async (req, res) => {
  try {
    const company = await User.findById(req.params.id)
    
    if (!company) {
      return res.status(404).json({
        message: 'Company not found',
      });
    }
    
    const job = await Job.create({
      ...req.body,
      company: company._id,
    });
    
    company.jobs.push(job._id);
    await company.save();
    
    res.status(201).json(job);
  } catch (error) {
    console.log(error);
    
    res.status(400).json({
      message: 'Error creating job',
      error: error.message,
    });
  }
};

export const updateJob = async (req, res) => {
  try {
    const company = await Company.findOne({ user: req.user.id });
    const job = await Job.findOne({
      _id: req.params.id,
      company: company._id,
    });
    
    if (!job) {
      return res.status(404).json({
        message: 'Job not found or unauthorized',
      });
    }
    
    Object.assign(job, req.body);
    await job.save();
    
    res.status(200).json(job);
  } catch (error) {
    res.status(400).json({
      message: 'Error updating job',
      error: error.message,
    });
  }
};

export const deleteJob = async (req, res) => {
  try {
    const company = await Company.findOne({ user: req.user.id });
    const job = await Job.findOne({
      _id: req.params.id,
      company: company._id,
    });
    
    if (!job) {
      return res.status(404).json({
        message: 'Job not found or unauthorized',
      });
    }
    
    await job.remove();
    
    // Remove job from company's jobs array
    company.jobs.pull(job._id);
    await company.save();
    
    res.status(204).json(null);
  } catch (error) {
    res.status(500).json({
      message: 'Error deleting job',
      error: error.message,
    });
  }
};

export const getCompanyJobs = async (req, res) => {
  try {
    const company = await Company.findOne({ user: req.user.id });
    
    if (!company) {
      return res.status(404).json({
        message: 'Company not found',
      });
    }
    
    const jobs = await Job.find({ company: company._id })
      .populate('applications');
    
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching company jobs',
      error: error.message,
    });
  }
};

export const approveJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(
      req.params.id,
      { status: 'open' },
      { new: true }
    );
    
    if (!job) {
      return res.status(404).json({
        message: 'Job not found',
      });
    }
    
    res.status(200).json(job);
  } catch (error) {
    res.status(400).json({
      message: 'Error approving job',
      error: error.message,
    });
  }
};

export const rejectJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(
      req.params.id,
      {
        status: 'cancelled',
        rejectionReason: req.body.reason,
      },
      { new: true }
    );
    
    if (!job) {
      return res.status(404).json({
        message: 'Job not found',
      });
    }
    
    res.status(200).json(job);
  } catch (error) {
    res.status(400).json({
      message: 'Error rejecting job',
      error: error.message,
    });
  }
};

export const getJobApplications = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    
    if (!job) {
      return res.status(404).json({
        message: 'Job not found',
      });
    }
    
    const applications = await Application.find({ job: job._id })
      .populate('student', 'name rollNumber cgpa')
      .populate('interviews');
    
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching applications',
      error: error.message,
    });
  }
};

export const updateApplicationStatus = async (req, res) => {
  try {
    const application = await Application.findByIdAndUpdate(
      req.params.applicationId,
      { status: req.body.status },
      { new: true }
    );
    
    if (!application) {
      return res.status(404).json({
        message: 'Application not found',
      });
    }
    
    res.status(200).json(application);
  } catch (error) {
    res.status(400).json({
      message: 'Error updating application status',
      error: error.message,
    });
  }
};

export const scheduleInterview = async (req, res) => {
  try {
    const application = await Application.findById(req.params.applicationId);
    
    if (!application) {
      return res.status(404).json({
        message: 'Application not found',
      });
    }
    
    application.interviews.push(req.body);
    application.status = 'interview_scheduled';
    await application.save();
    
    res.status(200).json(application);
  } catch (error) {
    res.status(400).json({
      message: 'Error scheduling interview',
      error: error.message,
    });
  }
};

export const getJobStats = async (req, res) => {
  try {
    const stats = await Job.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
          avgSalary: { $avg: '$salary.max' },
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
