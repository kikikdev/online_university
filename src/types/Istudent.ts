import { Document } from "mongoose";

export interface Istudent extends Document {
    studentId: number;
    studentName: string;
}
