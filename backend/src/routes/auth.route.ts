import { Router } from "express";
import { login, signUp } from "../controllers/auth.controller.js";
import { isUserAuthenticated } from "../middlewares/auht.middleware.js";
import { UpdateUserInfo, UserInfo } from "../controllers/user.controller.js";

const router: Router = Router();

router.route("/signup").post(signUp);
router.route("/login").post(login);
router.route("/logout").post([isUserAuthenticated], login);
router.route("/user-info").get([isUserAuthenticated], UserInfo);
router.route("/update-user-info").patch([isUserAuthenticated], UpdateUserInfo);

export default router;
