import Student from '../models/Student.js';
import Application from '../models/Application.js';
import Job from '../models/Job.js';
import { uploadToS3, deleteFromS3 } from '../utils/s3.js';
import User from '../models/User.js';

export const getAllStudents = async (req, res) => {
  try {
    const students = await User.find()
    const filterdata=students.filter((student) => student.role === 'student');
    res.status(200).json(filterdata);
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching students',
      error: error.message,
    });
  }
};

export const getStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id)
      .populate('user', 'name email')
      .populate('applications');
    
    if (!student) {
      return res.status(404).json({
        message: 'Student not found',
      });
    }
    
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching student',
      error: error.message,
    });
  }
};

export const createStudent = async (req, res) => {
  try {
    const student = await Student.create({
      user: req.body.userId,
      ...req.body,
    });
    
    res.status(201).json(student);
  } catch (error) {
    res.status(400).json({
      message: 'Error creating student',
      error: error.message,
    });
  }
};

export const updateStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!student) {
      return res.status(404).json({
        message: 'Student not found',
      });
    }
    
    res.status(200).json(student);
  } catch (error) {
    res.status(400).json({
      message: 'Error updating student',
      error: error.message,
    });
  }
};

export const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    
    if (!student) {
      return res.status(404).json({
        message: 'Student not found',
      });
    }
    
    // Delete associated files from S3
    if (student.resume) {
      await deleteFromS3(student.resume);
    }
    
    if (student.certifications) {
      for (const cert of student.certifications) {
        if (cert.file) {
          await deleteFromS3(cert.file);
        }
      }
    }
    
    res.status(204).json(null);
  } catch (error) {
    res.status(500).json({
      message: 'Error deleting student',
      error: error.message,
    });
  }
};

export const getMyProfile = async (req, res) => {
  try {
    const student = await Student.findOne({ user: req.user.id })
      .populate('user', 'name email')
      .populate('applications');
    
    if (!student) {
      return res.status(404).json({
        message: 'Student profile not found',
      });
    }
    
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching profile',
      error: error.message,
    });
  }
};

export const updateMyProfile = async (req, res) => {
  try {
    const student = await Student.findOneAndUpdate(
      { user: req.user.id },
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!student) {
      return res.status(404).json({
        message: 'Student profile not found',
      });
    }
    
    res.status(200).json(student);
  } catch (error) {
    res.status(400).json({
      message: 'Error updating profile',
      error: error.message,
    });
  }
};

export const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: 'No file uploaded',
      });
    }

    const student = await Student.findOne({ user: req.user.id });
    if (!student) {
      return res.status(404).json({
        message: 'Student profile not found',
      });
    }

    // Delete old resume if exists
    if (student.resume) {
      await deleteFromS3(student.resume);
    }

    // Upload new resume
    const fileKey = `resumes/${req.user.id}-${Date.now()}-${req.file.originalname}`;
    const fileUrl = await uploadToS3(req.file.buffer, fileKey);

    student.resume = fileUrl;
    await student.save();

    res.status(200).json({
      message: 'Resume uploaded successfully',
      resume: fileUrl,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error uploading resume',
      error: error.message,
    });
  }
};

export const addCertification = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: 'No file uploaded',
      });
    }

    const student = await Student.findOne({ user: req.user.id });
    if (!student) {
      return res.status(404).json({
        message: 'Student profile not found',
      });
    }

    // Upload certification
    const fileKey = `certifications/${req.user.id}-${Date.now()}-${req.file.originalname}`;
    const fileUrl = await uploadToS3(req.file.buffer, fileKey);

    const certification = {
      name: req.body.name,
      issuer: req.body.issuer,
      date: req.body.date,
      file: fileUrl,
    };

    student.certifications.push(certification);
    await student.save();

    res.status(200).json({
      message: 'Certification added successfully',
      certification,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error adding certification',
      error: error.message,
    });
  }
};

export const deleteCertification = async (req, res) => {
  try {
    const student = await Student.findOne({ user: req.user.id });
    if (!student) {
      return res.status(404).json({
        message: 'Student profile not found',
      });
    }

    const certification = student.certifications.id(req.params.certId);
    if (!certification) {
      return res.status(404).json({
        message: 'Certification not found',
      });
    }

    // Delete file from S3
    if (certification.file) {
      await deleteFromS3(certification.file);
    }

    certification.remove();
    await student.save();

    res.status(200).json({
      message: 'Certification deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error deleting certification',
      error: error.message,
    });
  }
};

export const applyForJob = async (req, res) => {

  try {
    const student = await User.findById( req.params.id );
    if (!student) {
      return res.status(404).json({
        message: 'Student profile not found',
      });
    }

    const job = await Job.findById(req.params.jobId);
    if (!job) {
      return res.status(404).json({
        message: 'Job not found',
      });
    }

    // Check if already applied
    const existingApplication = await Application.findOne({
      student: student._id,
      job: job._id,
    });

    if (existingApplication) {
      return res.status(400).json({
        message: 'Already applied for this job',
      });
    }

    const application = await Application.create({
      student: student._id,
      job: job._id,
      company: job.company,
      coverLetter: req.body.coverLetter,
      resume: student.resume, // Assuming student has a resume uploaded
      jobdetails:job
    });

    res.status(201).json(application);
  } catch (error) {
    console.log(error);
    
    res.status(500).json({
      message: 'Error applying for job',
      error: error.message,
    });
  }
};

export const getMyApplications = async (req, res) => {
  try {
    const student = await User.findById( req.params.id );
    if (!student) {
      return res.status(404).json({
        message: 'Student profile not found',
      });
    }

    const applications = await Application.find({ student: student._id })
     
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching applications',
      error: error.message,
    });
  }
};

export const getAllApplications = async (req, res) => {
  try {
   
    const applications = await Application.find()
     
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching applications',
      error: error.message,
    });
  }
};

export const getStudentStats = async (req, res) => {
  try {
    const student = await Student.findOne({ user: req.user.id });
    if (!student) {
      return res.status(404).json({
        message: 'Student profile not found',
      });
    }

    const applications = await Application.find({ student: student._id });
    
    const stats = {
      totalApplications: applications.length,
      applicationsByStatus: {
        pending: applications.filter(app => app.status === 'pending').length,
        accepted: applications.filter(app => app.status === 'accepted').length,
        rejected: applications.filter(app => app.status === 'rejected').length,
      },
    };

    res.status(200).json(stats);
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching student stats',
      error: error.message,
    });
  }
};

export const getApplicationDetails = async (req, res) => {
  try {
    const student = await Student.findOne({ user: req.user.id });
    if (!student) {
      return res.status(404).json({
        message: 'Student profile not found',
      });
    }

    const application = await Application.findById(req.params.applicationId)
      .populate('job')
      .populate('company');

    if (!application || application.student.toString() !== student._id.toString()) {
      return res.status(404).json({
        message: 'Application not found',
      });
    }

    res.status(200).json(application);
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching application details',
      error: error.message,
    });
  }
};


export const updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;

    // Validate status
    const validStatuses = ['pending', 'shortlisted', 'rejected', 'interview_scheduled', 'selected', 'offer_sent', 'offer_accepted', 'offer_declined'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    // Find and update application
    const application = await Application.findById(id);
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    application.status = status;
    await application.save();

    res.status(200).json({
      message: 'Application status updated successfully',
      application,
    });
  } catch (error) {
    console.log('Error updating status:', error);
    res.status(500).json({
      message: 'Internal server error',
      error: error.message,
    });
  }
};
