import express from "express";
import authenticate from "../../shared/middlewares/auth.js";
import validateRequest from "../../shared/middlewares/validateRequest.js";
import {
	createJobController,
	deleteJobController,
	getJobByIdController,
	getJobsByCategoryController,
	getJobsByCompanyController,
	getJobsController,
	updateJobController,
} from "./job.controllers.js";
import {
	createJobSchema,
	getJobSchema,
	getJobsByCategorySchema,
	getJobsByCompanySchema,
	getJobsQuerySchema,
	updateJobSchema,
} from "./job.schemas.js";

const router = express.Router();

router
	.route("/jobs")
	.get(validateRequest(getJobsQuerySchema, "query"), getJobsController)
	.post(
		authenticate,
		validateRequest(createJobSchema, "body"),
		createJobController,
	);

router.get(
	"/jobs/company/:companyId",
	validateRequest(getJobsByCompanySchema, "params"),
	getJobsByCompanyController,
);

router.get(
	"/jobs/category/:categoryId",
	validateRequest(getJobsByCategorySchema, "params"),
	getJobsByCategoryController,
);

router
	.route("/jobs/:id")
	.get(validateRequest(getJobSchema, "params"), getJobByIdController)
	.put(
		authenticate,
		validateRequest(getJobSchema, "params"),
		validateRequest(updateJobSchema, "body"),
		updateJobController,
	)
	.delete(
		authenticate,
		validateRequest(getJobSchema, "params"),
		deleteJobController,
	);

export default router;
