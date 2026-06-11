import Joi from "joi";

export const createApplicationSchema = Joi.object({
	user_id: Joi.string().optional(),
	job_id: Joi.string().required(),
	status: Joi.string()
		.valid("pending", "reviewed", "accepted", "rejected")
		.optional(),
	cover_letter: Joi.string().allow(null, "").optional(),
});

export const updateApplicationSchema = Joi.object({
	status: Joi.string()
		.valid("pending", "reviewed", "accepted", "rejected")
		.required(),
});

export const getApplicationSchema = Joi.object({
	id: Joi.string().required(),
});

export const getApplicationsByUserSchema = Joi.object({
	userId: Joi.string().required(),
});

export const getApplicationsByJobSchema = Joi.object({
	jobId: Joi.string().required(),
});
