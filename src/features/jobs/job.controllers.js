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

export const getJobsController = async (req, res) => {
	const { title } = req.validated.query;
	const companyName = req.validated.query["company-name"];

	const jobs = await getJobsService({ title, companyName });
	response(res, 200, "Jobs retrieved successfully", { jobs });
};

export const getJobByIdController = async (req, res) => {
	const { id } = req.validated.params;

	const job = await getJobByIdService(id);
	response(res, 200, "Job detail retrieved successfully", job);
};

export const getJobsByCompanyController = async (req, res) => {
	const { companyId } = req.validated.params;

	const jobs = await getJobsByCompanyService(companyId);
	response(res, 200, "Company jobs retrieved successfully", { jobs });
};

export const getJobsByCategoryController = async (req, res) => {
	const { categoryId } = req.validated.params;

	const jobs = await getJobsByCategoryService(categoryId);
	response(res, 200, "Category jobs retrieved successfully", { jobs });
};

export const createJobController = async (req, res) => {
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
};

export const updateJobController = async (req, res) => {
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
};

export const deleteJobController = async (req, res) => {
	const { id } = req.validated.params;
	const userId = req.user.id;

	await deleteJobService({ id, userId });
	response(res, 200, "Job deleted successfully");
};
