import Company from '../models/Company.js';
import Job from '../models/Job.js';

export const getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.find()
      .populate('user', 'name email')
      .populate('jobs');
    
    res.status(200).json(companies);
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching companies',
      error: error.message,
    });
  }
};

export const getCompany = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id)
      .populate('user', 'name email')
      .populate('jobs');
    
    if (!company) {
      return res.status(404).json({
        message: 'Company not found',
      });
    }
    
    res.status(200).json(company);
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching company',
      error: error.message,
    });
  }
};

export const createCompany = async (req, res) => {
  try {
    const company = await Company.create({
      ...req.body,
      user: req.body.userId,
    });
    
    res.status(201).json(company);
  } catch (error) {
    res.status(400).json({
      message: 'Error creating company',
      error: error.message,
    });
  }
};

export const updateCompany = async (req, res) => {
  try {
    const company = await Company.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!company) {
      return res.status(404).json({
        message: 'Company not found',
      });
    }
    
    res.status(200).json(company);
  } catch (error) {
    res.status(400).json({
      message: 'Error updating company',
      error: error.message,
    });
  }
};

export const deleteCompany = async (req, res) => {
  try {
    const company = await Company.findByIdAndDelete(req.params.id);
    
    if (!company) {
      return res.status(404).json({
        message: 'Company not found',
      });
    }
    
    // Delete all associated jobs
    await Job.deleteMany({ company: req.params.id });
    
    res.status(204).json(null);
  } catch (error) {
    res.status(500).json({
      message: 'Error deleting company',
      error: error.message,
    });
  }
};

export const getCompanyProfile = async (req, res) => {
  try {
    const company = await Company.findOne({ user: req.user.id })
      .populate('jobs');
    
    if (!company) {
      return res.status(404).json({
        message: 'Company profile not found',
      });
    }
    
    res.status(200).json(company);
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching profile',
      error: error.message,
    });
  }
};

export const updateCompanyProfile = async (req, res) => {
  try {
    const company = await Company.findOneAndUpdate(
      { user: req.user.id },
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!company) {
      return res.status(404).json({
        message: 'Company profile not found',
      });
    }
    
    res.status(200).json(company);
  } catch (error) {
    res.status(400).json({
      message: 'Error updating profile',
      error: error.message,
    });
  }
};

export const verifyCompany = async (req, res) => {
  try {
    const company = await Company.findByIdAndUpdate(
      req.params.id,
      {
        verificationStatus: 'verified',
        verifiedBy: req.user.id,
        verificationDate: Date.now(),
      },
      { new: true }
    );
    
    if (!company) {
      return res.status(404).json({
        message: 'Company not found',
      });
    }
    
    res.status(200).json(company);
  } catch (error) {
    res.status(400).json({
      message: 'Error verifying company',
      error: error.message,
    });
  }
};

export const rejectCompany = async (req, res) => {
  try {
    const company = await Company.findByIdAndUpdate(
      req.params.id,
      {
        verificationStatus: 'rejected',
        verifiedBy: req.user.id,
        verificationDate: Date.now(),
      },
      { new: true }
    );
    
    if (!company) {
      return res.status(404).json({
        message: 'Company not found',
      });
    }
    
    res.status(200).json(company);
  } catch (error) {
    res.status(400).json({
      message: 'Error rejecting company',
      error: error.message,
    });
  }
};

export const getCompanyStats = async (req, res) => {
  try {
    const stats = await Company.aggregate([
      {
        $group: {
          _id: '$verificationStatus',
          count: { $sum: 1 },
        },
      },
    ]);
    
    res.status(200).json(stats);
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching stats',
      error: error.message,
    });
  }
};
