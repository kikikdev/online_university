import { Router } from "express";
const router: Router = Router();
import * as ReviewController from "../controllers/ReviewController";

//create review
router.post("/", ReviewController.CreateReview);

//get all review
router.get("/", ReviewController.getAllReview);

//get all review by studentId
router.get("/:studentId", ReviewController.getReview);

//update review
router.patch("/", ReviewController.updateReview);

//delete review
router.delete("/:challengeId", ReviewController.deteleReview);

export default router;
