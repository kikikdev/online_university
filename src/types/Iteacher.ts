import { Document } from "mongoose";

export interface Iteacher extends Document {
    reviewerId: number;
    teacherName: string;
}
