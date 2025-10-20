import mongoose, { Schema, models, Model } from 'mongoose';

export interface IEvent {
  _id: string;
  name: string;
  type: 'hackathon' | 'conference' | 'summit' | 'workshop' | 'other';
  role: string; // e.g., "Speaker", "Participant", "Organizer"
  date: Date;
  location?: string;
  description?: string;
  logo?: string;
  logoPublicId?: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const EventSchema = new Schema<IEvent>(
  {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ['hackathon', 'conference', 'summit', 'workshop', 'other'],
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    location: {
      type: String,
    },
    description: {
      type: String,
    },
    logo: {
      type: String,
    },
    logoPublicId: {
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

const Event: Model<IEvent> = models.Event || mongoose.model<IEvent>('Event', EventSchema);

export default Event;

