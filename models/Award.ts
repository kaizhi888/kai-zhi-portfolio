import mongoose, { Schema, models, Model } from 'mongoose';

export interface IAward {
  _id: string;
  title: string;
  issuer: string;
  date: Date;
  description?: string;
  icon?: string;
  iconPublicId?: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const AwardSchema = new Schema<IAward>(
  {
    title: {
      type: String,
      required: true,
    },
    issuer: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    description: {
      type: String,
    },
    icon: {
      type: String,
    },
    iconPublicId: {
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

const Award: Model<IAward> = models.Award || mongoose.model<IAward>('Award', AwardSchema);

export default Award;

