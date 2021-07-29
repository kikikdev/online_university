import { Document } from "mongoose";

export interface Icompletion extends Document {
    challengeId: number;
    studentId: number;
    solution: any;
}
