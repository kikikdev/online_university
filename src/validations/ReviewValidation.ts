import Joi from "joi";

export const ReviewValidation = Joi.object({
    challengeId: Joi.number().required(),
    studentId: Joi.number().required(),
    grade: Joi.number().required(),
    comment: Joi.string().min(4).required(),
});

export const ReviewIdValidation = Joi.number().required();

export const UpdateReviewValidation = Joi.object({
    challengeId: Joi.number().required(),
    studentId: Joi.number().required(),
    grade: Joi.number().required(),
    comment: Joi.string().min(4).required(),
});
