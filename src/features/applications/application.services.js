import {
	ForbiddenError,
	NotFoundError,
	ValidationError,
} from "../../shared/errors/index.js";
import { isUuid } from "../../shared/utils/isUuid.js";
import ApplicationRepositories from "./application.repositories.js";

export const getApplicationsService = async () => {
	const applications = await ApplicationRepositories.getApplications();
	return applications;
};

export const getApplicationByIdService = async (id) => {
	if (!id) throw new ValidationError("Application ID is required");

	const application = await ApplicationRepositories.getApplicationById(id);
	if (!application) throw new NotFoundError("Application");

	return application;
};

export const getApplicationsByUserService = async (userId) => {
	if (!userId || !isUuid(userId)) return [];

	const applications =
		await ApplicationRepositories.getApplicationsByUser(userId);
	return applications;
};

export const getApplicationsByJobService = async (jobId) => {
	if (!jobId || !isUuid(jobId)) return [];

	const applications =
		await ApplicationRepositories.getApplicationsByJob(jobId);
	return applications;
};

export const createApplicationService = async ({
	userId,
	jobId,
	coverLetter,
}) => {
	if (!userId) throw new ValidationError("User ID is required");
	if (!jobId) throw new ValidationError("Job ID is required");

	const job = await ApplicationRepositories.getJobById(jobId);
	if (!job) throw new NotFoundError("Job");

	// if (job.company_owner_id === userId) {
	// 	throw new ForbiddenError("You cannot apply to your own job");
	// }

	const application = await ApplicationRepositories.insertApplication({
		userId,
		jobId,
		coverLetter,
	});

	return application;
};

export const updateApplicationService = async ({ id, userId, status }) => {
	if (!id) throw new ValidationError("Application ID is required");
	if (!userId) throw new ValidationError("User ID is required");
	if (!status) throw new ValidationError("Application status is required");

	const application = await ApplicationRepositories.getApplicationById(id);
	if (!application) throw new NotFoundError("Application");

	if (application.company_owner_id !== userId) {
		throw new ForbiddenError("You are not allowed to update this application");
	}

	const updatedApplication = await ApplicationRepositories.updateApplication({
		id,
		status,
	});

	return updatedApplication;
};

export const deleteApplicationService = async ({ id, userId }) => {
	if (!id) throw new ValidationError("Application ID is required");
	if (!userId) throw new ValidationError("User ID is required");

	const application = await ApplicationRepositories.getApplicationById(id);
	if (!application) throw new NotFoundError("Application");

	if (
		application.user_id !== userId &&
		application.company_owner_id !== userId
	) {
		throw new ForbiddenError("You are not allowed to delete this application");
	}

	await ApplicationRepositories.deleteApplication(id);
};
