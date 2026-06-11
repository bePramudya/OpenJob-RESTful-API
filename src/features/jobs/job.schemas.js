import Joi from "joi";

export const createJobSchema = Joi.object({
	company_id: Joi.string().required(),
	category_id: Joi.string().required(),
	title: Joi.string().max(100).required(),
	description: Joi.string().required(),
	job_type: Joi.string()
		.valid("full-time", "part-time", "contract", "internship")
		.required(),
	experience_level: Joi.string().optional(),
	location_type: Joi.string().optional(),
	location_city: Joi.string().allow(null, "").optional(),
	salary_min: Joi.number().integer().min(0).allow(null).optional(),
	salary_max: Joi.number().integer().min(0).allow(null).optional(),
	is_salary_visible: Joi.boolean().optional(),
	status: Joi.string().valid("open", "close", "closed").optional(),
});

export const updateJobSchema = Joi.object({
	company_id: Joi.string().optional(),
	category_id: Joi.string().optional(),
	title: Joi.string().max(100).optional(),
	description: Joi.string().optional(),
	job_type: Joi.string()
		.valid("full-time", "part-time", "contract", "internship")
		.optional(),
	experience_level: Joi.string().optional(),
	location_type: Joi.string().optional(),
	location_city: Joi.string().allow(null, "").optional(),
	salary_min: Joi.number().integer().min(0).allow(null).optional(),
	salary_max: Joi.number().integer().min(0).allow(null).optional(),
	is_salary_visible: Joi.boolean().optional(),
	status: Joi.string().valid("open", "close", "closed").optional(),
}).min(1);

export const getJobSchema = Joi.object({
	id: Joi.string().required(),
});

export const getJobsByCompanySchema = Joi.object({
	companyId: Joi.string().required(),
});

export const getJobsByCategorySchema = Joi.object({
	categoryId: Joi.string().required(),
});

export const getJobsQuerySchema = Joi.object({
	title: Joi.string().allow("").optional(),
	"company-name": Joi.string().allow("").optional(),
});
