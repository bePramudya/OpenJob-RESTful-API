import response from "../../shared/utils/response.js";
import {
	createCategoryService,
	deleteCategoryService,
	getCategoriesService,
	getCategoryByIdService,
	updateCategoryService,
} from "./category.services.js";

export const getCategoriesController = async (_req, res, next) => {
	try {
		const categories = await getCategoriesService();
		response(res, 200, "Categories retrieved successfully", { categories });
	} catch (error) {
		next(error);
	}
};

export const getCategoryByIdController = async (req, res, next) => {
	const { id } = req.validated.params;

	try {
		const category = await getCategoryByIdService(id);
		response(res, 200, "Category detail retrieved successfully", category);
	} catch (error) {
		next(error);
	}
};

export const createCategoryController = async (req, res, next) => {
	const { name, description } = req.validated.body;

	try {
		const category = await createCategoryService({
			name,
			description,
		});

		response(res, 201, "Category created successfully", category);
	} catch (error) {
		next(error);
	}
};

export const updateCategoryController = async (req, res, next) => {
	const { id } = req.validated.params;
	const { name, description } = req.validated.body;

	try {
		const category = await updateCategoryService({
			id,
			name,
			description,
		});

		response(res, 200, "Category updated successfully", category);
	} catch (error) {
		next(error);
	}
};

export const deleteCategoryController = async (req, res, next) => {
	const { id } = req.validated.params;

	try {
		await deleteCategoryService(id);
		response(res, 200, "Category deleted successfully");
	} catch (error) {
		next(error);
	}
};
