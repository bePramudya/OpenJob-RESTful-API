import express from "express";
import validateRequest from "../../shared/middlewares/validateRequest.js";
import {
	getUserByIdController,
	registerController,
} from "./user.controllers.js";
import { getUserSchema, registerSchema } from "./user.schemas.js";

const router = express.Router();

router.get(
	"/users/:id",
	validateRequest(getUserSchema, "params"),
	getUserByIdController,
);

router.post(
	"/users",
	validateRequest(registerSchema, "body"),
	registerController,
);

export default router;
