import Joi from "joi";

export const CompletionValidation = Joi.object({
    challengeId: Joi.number().required(),
    studentId: Joi.number().required(),
    solution: Joi.string().min(4).required(),
});

export const CompletionIdValidation = Joi.number().required();

export const UpdateCompletionValidation = Joi.object({
    challengeId: Joi.number().required(),
    studentId: Joi.number().required(),
    solution: Joi.string().min(4).required(),
});
