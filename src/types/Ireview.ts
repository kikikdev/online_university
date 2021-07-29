import { Document } from "mongoose";

export interface Ireview extends Document {
    challengeId: number;
    studentId: number;
    grade: number;
    comment: any;
}
