import response from "../../shared/utils/response.js";
import {
	createCategoryService,
	deleteCategoryService,
	getCategoriesService,
	getCategoryByIdService,
	updateCategoryService,
} from "./category.services.js";

export const getCategoriesController = async (_req, res) => {
	const categories = await getCategoriesService();
	response(res, 200, "Categories retrieved successfully", { categories });
};

export const getCategoryByIdController = async (req, res) => {
	const { id } = req.validated.params;

	const category = await getCategoryByIdService(id);
	response(res, 200, "Category detail retrieved successfully", category);
};

export const createCategoryController = async (req, res) => {
	const { name, description } = req.validated.body;

	const category = await createCategoryService({
		name,
		description,
	});

	response(res, 201, "Category created successfully", category);
};

export const updateCategoryController = async (req, res) => {
	const { id } = req.validated.params;
	const { name, description } = req.validated.body;

	const category = await updateCategoryService({
		id,
		name,
		description,
	});

	response(res, 200, "Category updated successfully", category);
};

export const deleteCategoryController = async (req, res) => {
	const { id } = req.validated.params;

	await deleteCategoryService(id);
	response(res, 200, "Category deleted successfully");
};
