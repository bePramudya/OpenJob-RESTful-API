import Joi from "joi";

export const createBookmarkSchema = Joi.object({
	jobId: Joi.string().required(),
});

export const getBookmarkSchema = Joi.object({
	jobId: Joi.string().required(),
	id: Joi.string().required(),
});

export const deleteBookmarkSchema = Joi.object({
	jobId: Joi.string().required(),
});
