import { Request, Response, NextFunction } from "express";
import Review from "../models/Review";
import { Ireview } from "../types/Ireview";
import { ReviewValidation } from "../validations/ReviewValidation";

import {
  ReviewIdValidation,
  UpdateReviewValidation,
} from "../validations/ReviewValidation";
import { IUpadateReview } from "../types/IUpadateReview";

/**
 * add new review
 * @param reviewModelValidation
 */
const addReview = async (reviewModelValidation: Ireview) => {
  try {
    const review = new Review({
      challengeId: reviewModelValidation.challengeId,
      studentId: reviewModelValidation.studentId,
      grade: reviewModelValidation.grade,
      comment: reviewModelValidation.comment,
    });
    const savedReview = await review.save();
    return savedReview;
  } catch (error) {
    console.log(error);
  }
};

/**
 * Create a new review
 * @param req
 * @param res
 * @param next
 */
export const CreateReview = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const reviewModelValidation: Ireview = await ReviewValidation.validateAsync(
      req.body
    );

    if (!reviewModelValidation) {
      return next(
        res.status(400).json({
          message: "Invalid details provided.",
        })
      );
    } else {
      const newReview = await addReview(reviewModelValidation);
      if (newReview) {
        res.status(201).json({
          newReview,
        });
      } else {
        return next(
          res.status(400).json({
            message: newReview,
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
 * Get all review
 * @param req
 * @param res
 * @param next
 */
export const getAllReview = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const getReviews = await Review.find()
      .select("_id challengeId studentId grade comment createdAt updatedAt");

    if (getReviews) {
      res.status(200).json(getReviews);
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
 * get one review
 * @param req
 * @param res
 * @param next
 */
export const getReview = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const challengeIdValidation = await ReviewIdValidation.validateAsync(
      req.params.studentId
    );

    if (!challengeIdValidation) {
      return next(
        res.status(400).json({
          message: "Operation failed, invalid details provided.",
        })
      );
    } else {
      const getReviews = await Review.find({ studentId: challengeIdValidation })
        .select("_id challengeId studentId grade comment createdAt updatedAt");

      if (getReviews) {
        res.status(200).json(getReviews);
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
 * delete review
 * @param req
 * @param res
 * @param next
 */
export const deteleReview = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const challengeIdValidation = await ReviewIdValidation.validateAsync(
      req.params.challengeId
    );

    if (!challengeIdValidation) {
      return next(
        res.status(400).json({
          message: "Operation failed, invalid details provided.",
        })
      );
    } else {
      const deleteReviews = await Review.findOneAndDelete({ challengeId: challengeIdValidation });
      if (deleteReviews) {
        res.status(200).json(deleteReviews);
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
 * Update review
 * @param req
 * @param res
 * @param next
 */
export const updateReview = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const resUpdateReviewValidation: IUpadateReview = await UpdateReviewValidation.validateAsync(
      req.body
    );

    if (!UpdateReviewValidation) {
      return next(
        res.status(400).json({
          message: "Operation failed, invalid details provided.",
        })
      );
    } else {
      const updatedReviews = await Review.findOneAndUpdate(
        {
          challengeId: resUpdateReviewValidation.challengeId,
        },
        {
          $set: {
            challengeId: resUpdateReviewValidation.challengeId,
            studentId: resUpdateReviewValidation.studentId,
            grade: resUpdateReviewValidation.grade,
            comment: resUpdateReviewValidation.comment,
          },
        }
      );

      if (updatedReviews) {
        res.status(200).json(updatedReviews);
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
