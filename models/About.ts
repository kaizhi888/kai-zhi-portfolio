import mongoose, { Schema, models, Model } from 'mongoose';

export interface IAbout {
  _id: string;
  name: string;
  tagline: string;
  description: string;
  profileImage: string;
  profileImagePublicId?: string;
  resumeUrl?: string;
  resumePublicId?: string;
  createdAt: Date;
  updatedAt: Date;
}

const AboutSchema = new Schema<IAbout>(
  {
    name: {
      type: String,
      required: true,
    },
    tagline: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
      required: true,
    },
    profileImagePublicId: {
      type: String,
    },
    resumeUrl: {
      type: String,
    },
    resumePublicId: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const About: Model<IAbout> = models.About || mongoose.model<IAbout>('About', AboutSchema);

export default About;

