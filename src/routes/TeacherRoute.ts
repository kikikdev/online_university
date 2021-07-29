import { Router } from "express";
const router: Router = Router();
import * as TeacherController from "../controllers/TeacherController";

//create teacher
router.post("/", TeacherController.CreateTeacher);

//get all teacher
router.get("/", TeacherController.getAllTeacher);

//get one teacher
router.get("/:reviewerId", TeacherController.getTeacher);

//update teacher
router.patch("/", TeacherController.updateTeacher);

//delete teacher
router.delete("/:reviewerId", TeacherController.deteleTeacher);

export default router;
