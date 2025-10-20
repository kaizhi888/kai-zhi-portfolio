import mongoose, { Schema, models, Model } from 'mongoose';

export interface IContact {
  _id: string;
  email: string;
  linkedin?: string;
  github?: string;
  twitter?: string;
  website?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ContactSchema = new Schema<IContact>(
  {
    email: {
      type: String,
      required: true,
    },
    linkedin: {
      type: String,
    },
    github: {
      type: String,
    },
    twitter: {
      type: String,
    },
    website: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Contact: Model<IContact> = models.Contact || mongoose.model<IContact>('Contact', ContactSchema);

export default Contact;

