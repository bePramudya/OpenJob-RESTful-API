import {
	ForbiddenError,
	NotFoundError,
	ValidationError,
} from "../../shared/errors/index.js";
import { isUuid } from "../../shared/utils/isUuid.js";
import JobRepositories from "./job.repositories.js";

export const getJobsService = async ({ title, companyName }) => {
	const jobs = await JobRepositories.getJobs({ title, companyName });
	return jobs;
};

export const getJobByIdService = async (id) => {
	if (!id || !isUuid(id)) throw new NotFoundError("Job ID not found");

	const job = await JobRepositories.getJobById(id);
	if (!job) throw new NotFoundError("Job");

	return job;
};

export const getJobsByCompanyService = async (companyId) => {
	if (!companyId || !isUuid(companyId)) return [];

	const jobs = await JobRepositories.getJobsByCompany(companyId);
	return jobs;
};

export const getJobsByCategoryService = async (categoryId) => {
	if (!categoryId || !isUuid(categoryId)) return [];

	const jobs = await JobRepositories.getJobsByCategory(categoryId);
	return jobs;
};

export const createJobService = async ({
	userId,
	companyId,
	categoryId,
	title,
	description,
	location,
	type,
	salaryMin,
	salaryMax,
}) => {
	if (!userId) throw new ValidationError("User ID is required");
	if (!companyId) throw new ValidationError("Company ID is required");
	if (!categoryId) throw new ValidationError("Category ID is required");
	if (!title) throw new ValidationError("Job title is required");
	if (!description) throw new ValidationError("Job description is required");
	if (!type) throw new ValidationError("Job type is required");

	if (salaryMin && salaryMax && salaryMin > salaryMax) {
		throw new ValidationError(
			"Salary minimum cannot be greater than salary maximum",
		);
	}

	const company = await JobRepositories.getCompanyById(companyId);
	if (!company) throw new NotFoundError("Company");

	if (company.user_id !== userId) {
		throw new ForbiddenError(
			"You are not allowed to create job for this company",
		);
	}

	const category = await JobRepositories.getCategoryById(categoryId);
	if (!category) throw new NotFoundError("Category");

	const job = await JobRepositories.insertJob({
		companyId,
		categoryId,
		title,
		description,
		location,
		type,
		salaryMin,
		salaryMax,
	});

	return job;
};

export const updateJobService = async ({
	id,
	userId,
	companyId,
	categoryId,
	title,
	description,
	location,
	type,
	salaryMin,
	salaryMax,
}) => {
	if (!id) throw new ValidationError("Job ID is required");
	if (!userId) throw new ValidationError("User ID is required");

	if (salaryMin && salaryMax && salaryMin > salaryMax) {
		throw new ValidationError(
			"Salary minimum cannot be greater than salary maximum",
		);
	}

	const job = await JobRepositories.getJobById(id);
	if (!job) throw new NotFoundError("Job");

	if (job.company_owner_id !== userId) {
		throw new ForbiddenError("You are not allowed to update this job");
	}

	if (companyId) {
		const company = await JobRepositories.getCompanyById(companyId);
		if (!company) throw new NotFoundError("Company");

		if (company.user_id !== userId) {
			throw new ForbiddenError(
				"You are not allowed to move job to this company",
			);
		}
	}

	if (categoryId) {
		const category = await JobRepositories.getCategoryById(categoryId);
		if (!category) throw new NotFoundError("Category");
	}

	const updatedJob = await JobRepositories.updateJob({
		id,
		companyId,
		categoryId,
		title,
		description,
		location,
		type,
		salaryMin,
		salaryMax,
	});

	return updatedJob;
};

export const deleteJobService = async ({ id, userId }) => {
	if (!id) throw new ValidationError("Job ID is required");
	if (!userId) throw new ValidationError("User ID is required");

	const job = await JobRepositories.getJobById(id);
	if (!job) throw new NotFoundError("Job");

	if (job.company_owner_id !== userId) {
		throw new ForbiddenError("You are not allowed to delete this job");
	}

	await JobRepositories.deleteJob(id);
};
