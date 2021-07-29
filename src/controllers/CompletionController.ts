import { Request, Response, NextFunction } from "express";
import Completion from "../models/Completion";
import { Icompletion } from "../types/Icompletion";
import { CompletionValidation } from "../validations/CompletionValidation";

import {
  CompletionIdValidation,
  UpdateCompletionValidation,
} from "../validations/CompletionValidation";
import { IUpadateCompletion } from "../types/IUpadateCompletion";

/**
 * add new completion
 * @param completionModelValidation
 */
const addCompletion = async (completionModelValidation: Icompletion) => {
  try {
    const completion = new Completion({
      challengeId: completionModelValidation.challengeId,
      studentId: completionModelValidation.studentId,
      solution: completionModelValidation.solution,
    });
    const savedCompletion = await completion.save();
    return savedCompletion;
  } catch (error) {
    console.log(error);
  }
};

/**
 * Create a new completion
 * @param req
 * @param res
 * @param next
 */
export const CreateCompletion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const completionModelValidation: Icompletion = await CompletionValidation.validateAsync(
      req.body
    );

    if (!completionModelValidation) {
      return next(
        res.status(400).json({
          message: "Invalid details provided.",
        })
      );
    } else {
      const newCompletion = await addCompletion(completionModelValidation);
      if (newCompletion) {
        res.status(201).json({
          newCompletion,
        });
      } else {
        return next(
          res.status(400).json({
            message: newCompletion,
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
 * Get all completion
 * @param req
 * @param res
 * @param next
 */
export const getAllCompletion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const getCompletions = await Completion.find()
      .select("_id challengeId studentId solution createdAt updatedAt");

    if (getCompletions) {
      res.status(200).json(getCompletions);
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
 * get one completion
 * @param req
 * @param res
 * @param next
 */
export const getCompletion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const challengeIdValidation = await CompletionIdValidation.validateAsync(
      req.params.studentId
    );

    if (!challengeIdValidation) {
      return next(
        res.status(400).json({
          message: "Operation failed, invalid details provided.",
        })
      );
    } else {
      const getCompletions = await Completion.find({ studentId: challengeIdValidation })
        .select("_id challengeId studentId solution createdAt updatedAt");

      if (getCompletions) {
        res.status(200).json(getCompletions);
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
 * delete completion
 * @param req
 * @param res
 * @param next
 */
export const deteleCompletion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const challengeIdValidation = await CompletionIdValidation.validateAsync(
      req.params.challengeId
    );

    if (!challengeIdValidation) {
      return next(
        res.status(400).json({
          message: "Operation failed, invalid details provided.",
        })
      );
    } else {
      const deleteCompletions = await Completion.findOneAndDelete({ challengeId: challengeIdValidation });
      if (deleteCompletions) {
        res.status(200).json(deleteCompletions);
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
 * Update completion
 * @param req
 * @param res
 * @param next
 */
export const updateCompletion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const resUpdateCompletionValidation: IUpadateCompletion = await UpdateCompletionValidation.validateAsync(
      req.body
    );

    if (!UpdateCompletionValidation) {
      return next(
        res.status(400).json({
          message: "Operation failed, invalid details provided.",
        })
      );
    } else {
      const updatedCompletions = await Completion.findOneAndUpdate(
        {
          challengeId: resUpdateCompletionValidation.challengeId,
        },
        {
          $set: {
            challengeId: resUpdateCompletionValidation.challengeId,
            studentId: resUpdateCompletionValidation.studentId,
            solution: resUpdateCompletionValidation.solution,
          },
        }
      );

      if (updatedCompletions) {
        res.status(200).json(updatedCompletions);
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
