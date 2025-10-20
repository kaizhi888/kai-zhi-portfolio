import mongoose, { Schema, models, Model } from 'mongoose';

export interface IExperience {
  _id: string;
  title: string;
  company: string;
  companyLogo?: string;
  companyLogoPublicId?: string;
  location?: string;
  startDate: Date;
  endDate?: Date;
  current: boolean;
  description: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const ExperienceSchema = new Schema<IExperience>(
  {
    title: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    companyLogo: {
      type: String,
    },
    companyLogoPublicId: {
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
    description: {
      type: String,
      required: true,
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

const Experience: Model<IExperience> = models.Experience || mongoose.model<IExperience>('Experience', ExperienceSchema);

export default Experience;

