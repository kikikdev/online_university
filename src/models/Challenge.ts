import mongoose, { Schema } from "mongoose";
import { Ichallenge } from "../types/Ichallenge";
const ChallengeSchema: Schema = new Schema(
  {
    challengeId: {
      type: Number,
      required: true,
    },
    studentId: {
      type: Number,
      required: true,
    },
    reviewerId: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },

  { timestamps: true }
);
const Challenge = mongoose.model<Ichallenge>("Challenge", ChallengeSchema);
export default Challenge;
