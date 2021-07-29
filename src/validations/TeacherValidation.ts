import Joi from "joi";

export const TeacherValidation = Joi.object({
    reviewerId: Joi.number().required(),
    teacherName: Joi.string().min(3).required(),
});

export const TeacherIdValidation = Joi.number().required();

export const UpdateTeacherValidation = Joi.object({
    reviewerId: Joi.number().required(),
    teacherName: Joi.string().min(3).required(),
});
