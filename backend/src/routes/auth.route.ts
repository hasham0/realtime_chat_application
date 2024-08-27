import { Router } from "express";
import { login, signUp } from "../controllers/auth.controller";
import { isUserAuthenticated } from "../middlewares/auht.middleware";

const router: Router = Router();

router.route("/signup").post(signUp);
router.route("/login").post(login);
router.route("/logout").post(isUserAuthenticated, login);

export default router;
