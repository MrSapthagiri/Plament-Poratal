import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema(
  {
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Company',
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    requirements: [{
      type: String,
      required: true,
    }],
    type: {
      type: String,
      enum: ['full_time', 'part_time', 'internship'],
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    salary: {
      min: {
        type: Number,
        required: true,
      },
      max: {
        type: Number,
        required: true,
      },
    },
    skills: [{
      type: String,
      required: true,
    }],
    experience: {
      min: {
        type: Number,
        default: 0,
      },
      max: {
        type: Number,
        required: true,
      },
    },
    deadline: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ['draft', 'open', 'closed', 'cancelled'],
      default: 'draft',
    },
    minCGPA: {
      type: Number,
      required: true,
      min: 0,
      max: 10,
    },
    eligibleBatches: [{
      type: String,
      required: true,
    }],
    eligibleDepartments: [{
      type: String,
      required: true,
    }],
    applications: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Application',
    }],
  },
  {
    timestamps: true,
  }
);

const Job = mongoose.model('Job', jobSchema);

export default Job;
