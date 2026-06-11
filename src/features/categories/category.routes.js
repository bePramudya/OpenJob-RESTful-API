import express from "express";
import authenticate from "../../shared/middlewares/auth.js";
import validateRequest from "../../shared/middlewares/validateRequest.js";
import {
	createCategoryController,
	deleteCategoryController,
	getCategoriesController,
	getCategoryByIdController,
	updateCategoryController,
} from "./category.controllers.js";
import {
	createCategorySchema,
	getCategorySchema,
	updateCategorySchema,
} from "./category.schemas.js";

const router = express.Router();

router
	.route("/categories")
	.get(getCategoriesController)
	.post(
		authenticate,
		validateRequest(createCategorySchema, "body"),
		createCategoryController,
	);

router
	.route("/categories/:id")
	.get(validateRequest(getCategorySchema, "params"), getCategoryByIdController)
	.put(
		authenticate,
		validateRequest(getCategorySchema, "params"),
		validateRequest(updateCategorySchema, "body"),
		updateCategoryController,
	)
	.delete(
		authenticate,
		validateRequest(getCategorySchema, "params"),
		deleteCategoryController,
	);

export default router;
