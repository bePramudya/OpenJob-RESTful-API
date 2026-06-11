import express from "express";
import authenticate from "../../shared/middlewares/auth.js";
import validateRequest from "../../shared/middlewares/validateRequest.js";
import {
	createCompanyController,
	deleteCompanyController,
	getCompaniesController,
	getCompanyByIdController,
	updateCompanyController,
} from "./company.controllers.js";
import {
	createCompanySchema,
	getCompanySchema,
	updateCompanySchema,
} from "./company.schemas.js";

const router = express.Router();

router
	.route("/companies")
	.get(getCompaniesController)
	.post(
		authenticate,
		validateRequest(createCompanySchema, "body"),
		createCompanyController,
	);

router
	.route("/companies/:id")
	.get(validateRequest(getCompanySchema, "params"), getCompanyByIdController)
	.put(
		authenticate,
		validateRequest(getCompanySchema, "params"),
		validateRequest(updateCompanySchema, "body"),
		updateCompanyController,
	)
	.delete(
		authenticate,
		validateRequest(getCompanySchema, "params"),
		deleteCompanyController,
	);

export default router;
