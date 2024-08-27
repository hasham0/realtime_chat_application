import { Router } from "express";
import { signUp } from "../controllers/auth.controller";

const router: Router = Router();

router.route("/signup").post(signUp);

export default router;
