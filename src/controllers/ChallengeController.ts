import { Request, Response, NextFunction } from "express";
import Challenge from "../models/Challenge";
import { Ichallenge } from "../types/Ichallenge";
import { ChallengeValidation } from "../validations/ChallengeValidation";

import {
  ChallengeIdValidation,
  UpdateChallengeValidation,
} from "../validations/ChallengeValidation";
import { IUpadateChallenge } from "../types/IUpadateChallenge";

/**
 * add new challenge
 * @param challengeModelValidation
 */
const addChallenge = async (challengeModelValidation: Ichallenge) => {
  try {
    const challenge = new Challenge({
      challengeId: challengeModelValidation.challengeId,
      studentId: challengeModelValidation.studentId,
      reviewerId: challengeModelValidation.reviewerId,
      description: challengeModelValidation.description,
    });
    const savedChallenge = await challenge.save();
    return savedChallenge;
  } catch (error) {
    console.log(error);
  }
};

/**
 * Create a new challenge
 * @param req
 * @param res
 * @param next
 */
export const CreateChallenge = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const challengeModelValidation: Ichallenge = await ChallengeValidation.validateAsync(
      req.body
    );

    if (!challengeModelValidation) {
      return next(
        res.status(400).json({
          message: "Invalid details provided.",
        })
      );
    } else {
      const newChallenge = await addChallenge(challengeModelValidation);
      if (newChallenge) {
        res.status(201).json({
          newChallenge,
        });
      } else {
        return next(
          res.status(400).json({
            message: newChallenge,
            // message: "Invalid details provided.",
          })
        );
      }
    }
  } catch (error) {
    if (error === true) {
      return next(
        res.status(400).json({
          message: "Invalid details provided.",
        })
      );
    }
    next(error);
  }
};

/**
 * Get all challenge
 * @param req
 * @param res
 * @param next
 */
export const getAllChallenge = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const getChallenges = await Challenge.find()
      .select("_id challengeId studentId reviewerId description createdAt updatedAt");

    if (getChallenges) {
      res.status(200).json(getChallenges);
    } else {
      return next(
        res.status(404).json({
          message: "Not found.",
        })
      );
    }
  } catch (error) {
    if (error === true) {
      return next(
        res.status(400).json({
          message: "Invalid details provided.",
        })
      );
    }
    next(error);
  }
};

/**
 * get one challenge
 * @param req
 * @param res
 * @param next
 */
export const getChallenge = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const challengeIdValidation = await ChallengeIdValidation.validateAsync(
      req.params.studentId
    );

    if (!challengeIdValidation) {
      return next(
        res.status(400).json({
          message: "Operation failed, invalid details provided.",
        })
      );
    } else {
      const getChallenges = await Challenge.find({ studentId: challengeIdValidation })
        .select("_id challengeId studentId reviewerId description createdAt updatedAt");

      if (getChallenges) {
        res.status(200).json(getChallenges);
      } else {
        return next(
          res.status(404).json({
            message: "Not found.",
          })
        );
      }
    }
  } catch (error) {
    if (error === true) {
      return next(
        res.status(400).json({
          message: "Invalid details provided.",
        })
      );
    }
    next(error);
  }
};

/**
 * delete challenge
 * @param req
 * @param res
 * @param next
 */
export const deteleChallenge = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const challengeIdValidation = await ChallengeIdValidation.validateAsync(
      req.params.challengeId
    );

    if (!challengeIdValidation) {
      return next(
        res.status(400).json({
          message: "Operation failed, invalid details provided.",
        })
      );
    } else {
      const deleteChallenges = await Challenge.findOneAndDelete({ challengeId: challengeIdValidation });
      if (deleteChallenges) {
        res.status(200).json(deleteChallenges);
      } else {
        return next(
          res.status(404).json({
            message: "Not found.",
          })
        );
      }
    }
  } catch (error) {
    if (error === true) {
      return next(
        res.status(400).json({
          message: "Invalid details provided.",
        })
      );
    }
    next(error);
  }
};

/**
 * Update challenge
 * @param req
 * @param res
 * @param next
 */
export const updateChallenge = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const resUpdateChallengeValidation: IUpadateChallenge = await UpdateChallengeValidation.validateAsync(
      req.body
    );

    if (!UpdateChallengeValidation) {
      return next(
        res.status(400).json({
          message: "Operation failed, invalid details provided.",
        })
      );
    } else {
      const updatedChallenges = await Challenge.findOneAndUpdate(
        {
          // _id: resUpdateChallengeValidation.reviewerId,
          challengeId: resUpdateChallengeValidation.challengeId,
        },
        {
          $set: {
            challengeId: resUpdateChallengeValidation.challengeId,
            studentId: resUpdateChallengeValidation.studentId,
            reviewerId: resUpdateChallengeValidation.reviewerId,
            description: resUpdateChallengeValidation.description,
          },
        }
      );

      if (updatedChallenges) {
        res.status(200).json(updatedChallenges);
      } else {
        return next(
          res.status(404).json({
            message: "Not found.",
          })
        );
      }
    }
  } catch (error) {
    if (error === true) {
      return next(
        res.status(400).json({
          message: "Invalid details provided.",
        })
      );
    }
    next(error);
  }
};
