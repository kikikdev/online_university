import { Request, Response, NextFunction } from "express";
import Student from "../models/Student";
import { Istudent } from "../types/Istudent";
import { StudentValidation } from "../validations/StudentValidation";

import {
  StudentIdValidation,
  UpdateStudentValidation,
} from "../validations/StudentValidation";
import { IUpadateStudent } from "../types/IUpadateStudent";

/**
 * add new student
 * @param studentModelValidation
 */
const addStudent = async (studentModelValidation: Istudent) => {
  try {
    const student = new Student({
      studentId: studentModelValidation.studentId,
      studentName: studentModelValidation.studentName,
    });
    const savedStudent = await student.save();

    return savedStudent;
  } catch (error) {
    console.log(error);
  }
};

/**
 * Create a new student
 * @param req
 * @param res
 * @param next
 */
export const CreateStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const studentModelValidation: Istudent = await StudentValidation.validateAsync(
      req.body
    );

    if (!studentModelValidation) {
      return next(
        res.status(400).json({
          message: "Invalid details provided.",
        })
      );
    } else {
      const newStudent = await addStudent(studentModelValidation);
      if (newStudent) {
        res.status(201).json({
          newStudent,
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
 * Get all student
 * @param req
 * @param res
 * @param next
 */
export const getAllStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const getStudents = await Student.find()
      .select("_id studentId studentName createdAt updatedAt");

    if (getStudents) {
      res.status(200).json(getStudents);
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
 * get one student
 * @param req
 * @param res
 * @param next
 */
export const getStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const studentIdValidation = await StudentIdValidation.validateAsync(
      req.params.studentId
    );

    if (!studentIdValidation) {
      return next(
        res.status(400).json({
          message: "Operation failed, invalid details provided.",
        })
      );
    } else {
      const getStudents = await Student.findOne({ studentId: studentIdValidation })
        .select("_id studentId studentName createdAt updatedAt");

      if (getStudents) {
        res.status(200).json(getStudents);
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
 * delete student
 * @param req
 * @param res
 * @param next
 */
export const deteleStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const studentIdValidation = await StudentIdValidation.validateAsync(
      req.params.studentId
    );

    if (!studentIdValidation) {
      return next(
        res.status(400).json({
          message: "Operation failed, invalid details provided.",
        })
      );
    } else {
      const deleteStudents = await Student.findOneAndDelete({ studentId: studentIdValidation });
      if (deleteStudents) {
        res.status(200).json(deleteStudents);
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
 * Update student
 * @param req
 * @param res
 * @param next
 */
export const updateStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const resUpdateStudentValidation: IUpadateStudent = await UpdateStudentValidation.validateAsync(
      req.body
    );

    if (!UpdateStudentValidation) {
      return next(
        res.status(400).json({
          message: "Operation failed, invalid details provided.",
        })
      );
    } else {
      const updatedStudents = await Student.findOneAndUpdate(
        {
          // _id: resUpdateStudentValidation.studentId,
          studentId: resUpdateStudentValidation.studentId,
        },
        {
          $set: {
            studentId: resUpdateStudentValidation.studentId,
            studentName: resUpdateStudentValidation.studentName,
          },
        }
      );

      if (updatedStudents) {
        res.status(200).json(updatedStudents);
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
