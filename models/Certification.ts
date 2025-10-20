import mongoose, { Schema, models, Model } from 'mongoose';

export interface ICertification {
  _id: string;
  name: string;
  issuer: string;
  issueDate: Date;
  credentialUrl?: string;
  badgeImage?: string;
  badgeImagePublicId?: string;
  description?: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const CertificationSchema = new Schema<ICertification>(
  {
    name: {
      type: String,
      required: true,
    },
    issuer: {
      type: String,
      required: true,
    },
    issueDate: {
      type: Date,
      required: true,
    },
    credentialUrl: {
      type: String,
    },
    badgeImage: {
      type: String,
    },
    badgeImagePublicId: {
      type: String,
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

const Certification: Model<ICertification> = models.Certification || mongoose.model<ICertification>('Certification', CertificationSchema);

export default Certification;

