import mongoose, { Schema } from "mongoose";
import { Ireview } from "../types/Ireview";
const ReviewSchema: Schema = new Schema(
  {
    challengeId: {
      type: Number,
      required: true,
    },
    studentId: {
      type: Number,
      required: true,
    },
    grade: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
  },

  { timestamps: true }
);
const Review = mongoose.model<Ireview>("Review", ReviewSchema);
export default Review;
