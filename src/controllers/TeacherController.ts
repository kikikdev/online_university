import { Request, Response, NextFunction } from "express";
import Teacher from "../models/Teacher";
import { Iteacher } from "../types/Iteacher";
import { TeacherValidation } from "../validations/TeacherValidation";

import {
  TeacherIdValidation,
  UpdateTeacherValidation,
} from "../validations/TeacherValidation";
import { IUpadateTeacher } from "../types/IUpadateTeacher";

/**
 * add new teacher
 * @param teacherModelValidation
 */
const addTeacher = async (teacherModelValidation: Iteacher) => {
  try {
    const teacher = new Teacher({
      reviewerId: teacherModelValidation.reviewerId,
      teacherName: teacherModelValidation.teacherName,
    });
    const savedTeacher = await teacher.save();

    return savedTeacher;
  } catch (error) {
    console.log(error);
  }
};

/**
 * Create a new teacher
 * @param req
 * @param res
 * @param next
 */
export const CreateTeacher = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const teacherModelValidation: Iteacher = await TeacherValidation.validateAsync(
      req.body
    );

    if (!teacherModelValidation) {
      return next(
        res.status(400).json({
          message: "Invalid details provided.",
        })
      );
    } else {
      const newTeacher = await addTeacher(teacherModelValidation);
      if (newTeacher) {
        res.status(201).json({
          newTeacher,
        });
      } else {
        return next(
          res.status(400).json({
            message: "Invalid details provided.",
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
 * Get all teacher
 * @param req
 * @param res
 * @param next
 */
export const getAllTeacher = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const getTeachers = await Teacher.find()
      .select("_id reviewerId teacherName createdAt updatedAt");

    if (getTeachers) {
      res.status(200).json(getTeachers);
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
 * get one teacher
 * @param req
 * @param res
 * @param next
 */
export const getTeacher = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const reviewerIdValidation = await TeacherIdValidation.validateAsync(
      req.params.reviewerId
    );

    if (!reviewerIdValidation) {
      return next(
        res.status(400).json({
          message: "Operation failed, invalid details provided.",
        })
      );
    } else {
      const getTeachers = await Teacher.findOne({ reviewerId: reviewerIdValidation })
        .select("_id reviewerId teacherName createdAt updatedAt");

      if (getTeachers) {
        res.status(200).json(getTeachers);
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
 * delete teacher
 * @param req
 * @param res
 * @param next
 */
export const deteleTeacher = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const reviewerIdValidation = await TeacherIdValidation.validateAsync(
      req.params.reviewerId
    );

    if (!reviewerIdValidation) {
      return next(
        res.status(400).json({
          message: "Operation failed, invalid details provided.",
        })
      );
    } else {
      const deleteTeachers = await Teacher.findOneAndDelete({ reviewerId: reviewerIdValidation });
      if (deleteTeachers) {
        res.status(200).json(deleteTeachers);
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
 * Update teacher
 * @param req
 * @param res
 * @param next
 */
export const updateTeacher = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const resUpdateTeacherValidation: IUpadateTeacher = await UpdateTeacherValidation.validateAsync(
      req.body
    );

    if (!UpdateTeacherValidation) {
      return next(
        res.status(400).json({
          message: "Operation failed, invalid details provided.",
        })
      );
    } else {
      const updatedTeachers = await Teacher.findOneAndUpdate(
        {
          // _id: resUpdateTeacherValidation.reviewerId,
          reviewerId: resUpdateTeacherValidation.reviewerId,
        },
        {
          $set: {
            reviewerId: resUpdateTeacherValidation.reviewerId,
            teacherName: resUpdateTeacherValidation.teacherName,
          },
        }
      );

      if (updatedTeachers) {
        res.status(200).json(updatedTeachers);
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
