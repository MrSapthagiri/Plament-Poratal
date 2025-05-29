import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      required: true,
    },
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Job',
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'shortlisted', 'rejected', 'interview_scheduled', 'selected', 'offer_sent', 'offer_accepted', 'offer_declined'],
      default: 'pending',
    },
    resume: {
      type: String,
      required: true,
    },
    coverLetter: {
      type: String,
    },
    interviews: [{
      round: {
        type: Number,
        required: true,
      },
      dateTime: {
        type: Date,
        required: true,
      },
      type: {
        type: String,
        enum: ['online', 'offline', 'telephonic'],
        required: true,
      },
      location: String,
      meetingLink: String,
      status: {
        type: String,
        enum: ['scheduled', 'completed', 'cancelled'],
        default: 'scheduled',
      },
      feedback: {
        rating: Number,
        comments: String,
        interviewer: String,
      },
    }],
    offer: {
      salary: Number,
      position: String,
      joiningDate: Date,
      documents: [{
        name: String,
        url: String,
      }],
    },
  },
  {
    timestamps: true,
  }
);

// Ensure unique application per student per job
applicationSchema.index({ student: 1, job: 1 }, { unique: true });

const Application = mongoose.model('Application', applicationSchema);

export default Application;
