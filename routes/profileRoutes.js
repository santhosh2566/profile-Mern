import express from "express";
import { getProfile, updateProfile, addSkill, endorseSkill, deleteSkill} from "../controllers/profileController.js";
 
const router = express.Router();

router.get("/", getProfile);
router.put("/", updateProfile);
router.post("/skill", addSkill);
router.put("/skill/:id/endorse", endorseSkill);
router.delete("/skill/:skillId", deleteSkill);

export default router;