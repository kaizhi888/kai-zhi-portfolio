import mongoose, { Schema, models, Model } from 'mongoose';

export interface ISkill {
  _id: string;
  name: string;
  category: 'programming' | 'tools' | 'languages' | 'other';
  proficiency?: number; // 1-5 scale
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const SkillSchema = new Schema<ISkill>(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ['programming', 'tools', 'languages', 'other'],
      required: true,
    },
    proficiency: {
      type: Number,
      min: 1,
      max: 5,
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

const Skill: Model<ISkill> = models.Skill || mongoose.model<ISkill>('Skill', SkillSchema);

export default Skill;

