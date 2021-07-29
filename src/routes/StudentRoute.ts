import { Router } from "express";
const router: Router = Router();
import * as StudentController from "../controllers/StudentController";

//create student
router.post("/", StudentController.CreateStudent);

//get all student`
router.get("/", StudentController.getAllStudent);

//get one student
router.get("/:studentId", StudentController.getStudent);

//update student
router.patch("/", StudentController.updateStudent);

//delete student
router.delete("/:studentId", StudentController.deteleStudent);

export default router;
