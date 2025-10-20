import mongoose, { Schema, models, Model } from 'mongoose';

export interface IEducation {
  _id: string;
  degree: string;
  school: string;
  schoolLogo?: string;
  schoolLogoPublicId?: string;
  location?: string;
  startDate: Date;
  endDate?: Date;
  current: boolean;
  cgpa?: string;
  coursework?: string[];
  description?: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const EducationSchema = new Schema<IEducation>(
  {
    degree: {
      type: String,
      required: true,
    },
    school: {
      type: String,
      required: true,
    },
    schoolLogo: {
      type: String,
    },
    schoolLogoPublicId: {
      type: String,
    },
    location: {
      type: String,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
    },
    current: {
      type: Boolean,
      default: false,
    },
    cgpa: {
      type: String,
    },
    coursework: {
      type: [String],
      default: [],
    },
    description: {
      type: String,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Education: Model<IEducation> = models.Education || mongoose.model<IEducation>('Education', EducationSchema);

export default Education;

