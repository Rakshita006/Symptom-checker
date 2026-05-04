import { Router } from "express";
import { postTriage } from "../controllers/triageController.js";

const router=Router()

router.post('/', postTriage)

export default router