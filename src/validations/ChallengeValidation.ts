import Joi from "joi";

export const ChallengeValidation = Joi.object({
    challengeId: Joi.number().required(),
    studentId: Joi.number().required(),
    reviewerId: Joi.number().required(),
    description: Joi.string().min(4).required(),
});

export const ChallengeIdValidation = Joi.number().required();

export const UpdateChallengeValidation = Joi.object({
    challengeId: Joi.number().required(),
    studentId: Joi.number().required(),
    reviewerId: Joi.number().required(),
    description: Joi.string().min(4).required(),
});
