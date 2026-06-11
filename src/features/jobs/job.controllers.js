import response from "../../shared/utils/response.js";
import {
	createJobService,
	deleteJobService,
	getJobByIdService,
	getJobsByCategoryService,
	getJobsByCompanyService,
	getJobsService,
	updateJobService,
} from "./job.services.js";

export const getJobsController = async (req, res, next) => {
	const { title } = req.validated.query;
	const companyName = req.validated.query["company-name"];

	try {
		const jobs = await getJobsService({ title, companyName });
		response(res, 200, "Jobs retrieved successfully", { jobs });
	} catch (error) {
		next(error);
	}
};

export const getJobByIdController = async (req, res, next) => {
	const { id } = req.validated.params;

	try {
		const job = await getJobByIdService(id);
		response(res, 200, "Job detail retrieved successfully", job);
	} catch (error) {
		next(error);
	}
};

export const getJobsByCompanyController = async (req, res, next) => {
	const { companyId } = req.validated.params;

	try {
		const jobs = await getJobsByCompanyService(companyId);
		response(res, 200, "Company jobs retrieved successfully", { jobs });
	} catch (error) {
		next(error);
	}
};

export const getJobsByCategoryController = async (req, res, next) => {
	const { categoryId } = req.validated.params;

	try {
		const jobs = await getJobsByCategoryService(categoryId);
		response(res, 200, "Category jobs retrieved successfully", { jobs });
	} catch (error) {
		next(error);
	}
};

export const createJobController = async (req, res, next) => {
	const {
		company_id,
		category_id,
		title,
		description,
		job_type,
		location_city,
		salary_min,
		salary_max,
	} = req.validated.body;
	const userId = req.user.id;

	try {
		const job = await createJobService({
			userId,
			companyId: company_id,
			categoryId: category_id,
			title,
			description,
			location: location_city,
			type: job_type,
			salaryMin: salary_min,
			salaryMax: salary_max,
		});

		response(res, 201, "Job created successfully", job);
	} catch (error) {
		next(error);
	}
};

export const updateJobController = async (req, res, next) => {
	const { id } = req.validated.params;
	const {
		company_id,
		category_id,
		title,
		description,
		job_type,
		location_city,
		salary_min,
		salary_max,
	} = req.validated.body;
	const userId = req.user.id;

	try {
		const job = await updateJobService({
			id,
			userId,
			companyId: company_id,
			categoryId: category_id,
			title,
			description,
			location: location_city,
			type: job_type,
			salaryMin: salary_min,
			salaryMax: salary_max,
		});

		response(res, 200, "Job updated successfully", job);
	} catch (error) {
		next(error);
	}
};

export const deleteJobController = async (req, res, next) => {
	const { id } = req.validated.params;
	const userId = req.user.id;

	try {
		await deleteJobService({ id, userId });
		response(res, 200, "Job deleted successfully");
	} catch (error) {
		next(error);
	}
};
