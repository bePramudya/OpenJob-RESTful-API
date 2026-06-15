import Joi from "joi";

export const getDocumentSchema = Joi.object({
	id: Joi.string().required(),
});
