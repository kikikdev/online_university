import Joi from "joi";

export const StudentValidation = Joi.object({
    studentId: Joi.number().required(),
    studentName: Joi.string().min(3).required(),
});

export const StudentIdValidation = Joi.number().required();

export const UpdateStudentValidation = Joi.object({
    studentId: Joi.number().required(),
    studentName: Joi.string().min(3).required(),
});
