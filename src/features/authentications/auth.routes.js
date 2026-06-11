import express from "express";
import authenticate from "../../shared/middlewares/auth.js";
import validateRequest from "../../shared/middlewares/validateRequest.js";
import {
	loginController,
	logoutController,
	refreshTokenController,
} from "./auth.controllers.js";
import { loginSchema, tokenPayloadSchema } from "./auth.schemas.js";

const router = express.Router();

router
	.route("/authentications")
	.post(validateRequest(loginSchema, "body"), loginController)
	.put(validateRequest(tokenPayloadSchema, "body"), refreshTokenController)
	.delete(
		authenticate,
		validateRequest(tokenPayloadSchema, "body"),
		logoutController,
	);

export default router;
