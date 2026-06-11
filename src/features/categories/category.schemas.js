import Joi from "joi";

export const createCategorySchema = Joi.object({
	name: Joi.string().max(50).required(),
	description: Joi.string().allow(null, "").optional(),
});

export const updateCategorySchema = Joi.object({
	name: Joi.string().max(50).optional(),
	description: Joi.string().allow(null, "").optional(),
}).min(1);

export const getCategorySchema = Joi.object({
	id: Joi.string().required(),
});
