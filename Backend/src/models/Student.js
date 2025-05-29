import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      // required: true,
    },
    rollNumber: {
      type: String,
      required: true,
      unique: true,
    },
    course: {
      type: String,
      // required: true,
    },
    batch: {
      type: String,
      required: true,
    },
    skills: [{
      type: String,
    }],
    department:{
      type:String,
    },
    cgpa: {
      type: Number,
      required: true,
      min: 0,
      max: 10,
    },
    resume: {
      type: String,
      default: '',
    },
    certifications: [{
      name: String,
      issuer: String,
      date: Date,
      credential: String,
    }],
    experience: [{
      title: String,
      company: String,
      startDate: Date,
      endDate: Date,
      description: String,
    }],
    applications: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Application',
    }],
    placementStatus: {
      type: String,
      enum: ['not_placed', 'placed', 'offer_received'],
      default: 'not_placed',
    },
  },
  {
    timestamps: true,
  }
);

const Student = mongoose.model('Student', studentSchema);

export default Student;
