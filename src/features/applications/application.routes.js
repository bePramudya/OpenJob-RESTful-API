import express from "express";
import authenticate from "../../shared/middlewares/auth.js";
import validateRequest from "../../shared/middlewares/validateRequest.js";
import {
	createApplicationController,
	deleteApplicationController,
	getApplicationByIdController,
	getApplicationsByJobController,
	getApplicationsByUserController,
	getApplicationsController,
	updateApplicationController,
} from "./application.controllers.js";
import {
	createApplicationSchema,
	getApplicationSchema,
	getApplicationsByJobSchema,
	getApplicationsByUserSchema,
	updateApplicationSchema,
} from "./application.schemas.js";

const router = express.Router();

router
	.route("/applications")
	.post(
		authenticate,
		validateRequest(createApplicationSchema, "body"),
		createApplicationController,
	)
	.get(authenticate, getApplicationsController);

router.get(
	"/applications/user/:userId",
	authenticate,
	validateRequest(getApplicationsByUserSchema, "params"),
	getApplicationsByUserController,
);

router.get(
	"/applications/job/:jobId",
	authenticate,
	validateRequest(getApplicationsByJobSchema, "params"),
	getApplicationsByJobController,
);

router
	.route("/applications/:id")
	.get(
		authenticate,
		validateRequest(getApplicationSchema, "params"),
		getApplicationByIdController,
	)
	.put(
		authenticate,
		validateRequest(getApplicationSchema, "params"),
		validateRequest(updateApplicationSchema, "body"),
		updateApplicationController,
	)
	.delete(
		authenticate,
		validateRequest(getApplicationSchema, "params"),
		deleteApplicationController,
	);

export default router;
