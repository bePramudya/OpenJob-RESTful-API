import Joi from "joi";

export const registerSchema = Joi.object({
	name: Joi.string().max(50).required(),
	email: Joi.string().email().required(),
	password: Joi.string().min(8).required(),
	role: Joi.string().valid("user", "jobseeker", "employer", "admin").optional(),
});

export const getUserSchema = Joi.object({
	id: Joi.string().required(),
});
