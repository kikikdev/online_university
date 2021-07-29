import { Router } from "express";
const router: Router = Router();
import * as CompletionController from "../controllers/CompletionController";

//create completion
router.post("/", CompletionController.CreateCompletion);

//get all completion
router.get("/", CompletionController.getAllCompletion);

//get all completion by studentId
router.get("/:studentId", CompletionController.getCompletion);

//update completion
router.patch("/", CompletionController.updateCompletion);

//delete completion
router.delete("/:challengeId", CompletionController.deteleCompletion);

export default router;
