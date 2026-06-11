import { NotFoundError, ValidationError } from "../../shared/errors/index.js";
import { isUuid } from "../../shared/utils/isUuid.js";
import CategoryRepositories from "./category.repositories.js";

export const getCategoriesService = async () => {
	const categories = await CategoryRepositories.getCategories();
	return categories;
};

export const getCategoryByIdService = async (id) => {
	if (!id || !isUuid(id)) throw new NotFoundError("Category ID not found");

	const category = await CategoryRepositories.getCategoryById(id);
	if (!category) throw new NotFoundError("Category");

	return category;
};

export const createCategoryService = async ({ name, description }) => {
	if (!name) throw new ValidationError("Category name is required");

	const category = await CategoryRepositories.insertCategory({
		name,
		description,
	});

	return category;
};

export const updateCategoryService = async ({ id, name, description }) => {
	if (!id || !isUuid(id)) throw new NotFoundError("Category ID not found");

	const category = await CategoryRepositories.getCategoryById(id);
	if (!category) throw new NotFoundError("Category");

	const updatedCategory = await CategoryRepositories.updateCategory({
		id,
		name,
		description,
	});

	return updatedCategory;
};

export const deleteCategoryService = async (id) => {
	if (!id || !isUuid(id)) throw new NotFoundError("Category ID not found");

	const category = await CategoryRepositories.getCategoryById(id);
	if (!category) throw new NotFoundError("Category");

	await CategoryRepositories.deleteCategory(id);
};
