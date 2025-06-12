import userController from "../Controllers/userController.js";
import { Router } from "express";
import passport from "passport";

const router = Router();

router.post("/signup", userController.Signup);
router.post("/login", passport.authenticate("local"), userController.Login);
router.get("/logout", userController.Logout);

export default router;