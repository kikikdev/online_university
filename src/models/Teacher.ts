import mongoose, { Schema } from "mongoose";
import { Iteacher } from "../types/Iteacher";
const TeacherSchema: Schema = new Schema(
  {
    reviewerId: {
      type: Number,
      required: true,
    },
    teacherName: {
      type: String,
      required: true,
    },
  },

  { timestamps: true }
);
const Teacher = mongoose.model<Iteacher>("Teacher", TeacherSchema);
export default Teacher;
