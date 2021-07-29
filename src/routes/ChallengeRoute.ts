import { Router } from "express";
const router: Router = Router();
import * as ChallengeController from "../controllers/ChallengeController";

//create challenge
router.post("/", ChallengeController.CreateChallenge);

//get all challenge
router.get("/", ChallengeController.getAllChallenge);

//get all challenge by studentId
router.get("/:studentId", ChallengeController.getChallenge);

//update challenge
router.patch("/", ChallengeController.updateChallenge);

//delete challenge
router.delete("/:challengeId", ChallengeController.deteleChallenge);

export default router;
