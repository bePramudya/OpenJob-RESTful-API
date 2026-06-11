import Joi from "joi";

export const createCompanySchema = Joi.object({
	name: Joi.string().max(100).required(),
	location: Joi.string().max(150).required(),
	description: Joi.string().allow(null, "").optional(),
	website: Joi.string().uri().max(255).allow(null, "").optional(),
});

export const updateCompanySchema = Joi.object({
	name: Joi.string().max(100).optional(),
	description: Joi.string().allow(null, "").optional(),
	location: Joi.string().max(150).allow(null, "").optional(),
	website: Joi.string().uri().max(255).allow(null, "").optional(),
}).min(1);

export const getCompanySchema = Joi.object({
	id: Joi.string().required(),
});
