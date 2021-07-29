import mongoose, { Schema } from "mongoose";
import { Istudent } from "../types/Istudent";
const StudentSchema: Schema = new Schema(
  {
    studentId: {
      type: Number,
      required: true,
    },
    studentName: {
      type: String,
      required: true,
    },
  },

  { timestamps: true }
);
const Student = mongoose.model<Istudent>("Student", StudentSchema);
export default Student;
