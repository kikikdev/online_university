import mongoose, { Schema } from "mongoose";
import { Icompletion } from "../types/Icompletion";
const CompletionSchema: Schema = new Schema(
  {
    challengeId: {
      type: Number,
      required: true,
    },
    studentId: {
      type: Number,
      required: true,
    },
    solution: {
      type: String,
      required: true,
    },
  },

  { timestamps: true }
);
const Completion = mongoose.model<Icompletion>("Completion", CompletionSchema);
export default Completion;
