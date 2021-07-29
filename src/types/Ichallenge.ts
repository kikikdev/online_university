import { Document } from "mongoose";

export interface Ichallenge extends Document {
    challengeId: number;
    studentId: number;
    reviewerId: number;
    description: any;
}
