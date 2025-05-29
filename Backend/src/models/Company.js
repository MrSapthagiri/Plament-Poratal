import mongoose from 'mongoose';

const companySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      // required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    industry: {
      type: String,
      required: true,
    },
    website: {
      type: String,
      // required: true,
    },
    location: {
      type: String,
      required: true,
    },
    companySize: {
      type: String,
      enum: ['1-50', '51-200', '201-500', '501-1000', '1000+'],
      // required: true,
    },
    logo: {
      type: String,
      default: '',
    },
    jobs: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Job',
    }],
    verificationStatus: {
      type: String,
      enum: ['pending', 'verified', 'rejected'],
      default: 'pending',
    },
    verifiedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    verificationDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Company = mongoose.model('Company', companySchema);

export default Company;
