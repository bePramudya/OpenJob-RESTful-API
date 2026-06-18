import {
	ForbiddenError,
	NotFoundError,
	ValidationError,
} from "../../shared/errors/index.js";
import { isUuid } from "../../shared/utils/isUuid.js";
import { publishNewApplication } from "./application.queue.js";
import ApplicationRepositories from "./application.repositories.js";

export const getApplicationsService = async () => {
	const applications = await ApplicationRepositories.getApplications();
	return applications;
};

export const getApplicationByIdService = async (id) => {
	if (!id) throw new ValidationError("Application ID is required");

	const { data: application, source } =
		await ApplicationRepositories.getApplicationById(id);

	if (!application) throw new NotFoundError("Application not found");

	return { application, source };
};

export const getApplicationsByUserService = async (userId) => {
	if (!userId || !isUuid(userId)) return { applications: [], source: null };

	const { data: applications, source } =
		await ApplicationRepositories.getApplicationsByUser(userId);
	return { applications, source };
};

export const getApplicationsByJobService = async (jobId) => {
	if (!jobId || !isUuid(jobId)) return { applications: [], source: null };

	const { data: applications, source } =
		await ApplicationRepositories.getApplicationsByJob(jobId);
	return { applications, source };
};

export const createApplicationService = async ({
	userId,
	jobId,
	coverLetter,
}) => {
	if (!userId) throw new ValidationError("User ID is required");
	if (!jobId) throw new ValidationError("Job ID is required");
	if (!isUuid(userId) || !isUuid(jobId)) throw new ValidationError("not UUID");

	const job = await ApplicationRepositories.getJobById(jobId);
	if (!job) throw new NotFoundError("Job");

	// if (job.company_owner_id === userId) {
	// 	throw new ForbiddenError("You cannot apply to your own job");
	// }

	// const application = await Promise.try(() =>
	// 	ApplicationRepositories.insertApplication({ userId, jobId, coverLetter }),
	// ).catch((_err) => {
	// 	throw new ValidationError("Duplicate Application");
	// });

	// await Promise.try(() => publishNewApplication(application.id)).catch((err) =>
	// 	console.error("Failed to publish new application event:", err.message),
	// );

	let application;
	try {
		application = await ApplicationRepositories.insertApplication({
			userId,
			jobId,
			coverLetter,
		});
	} catch (_err) {
		throw new ValidationError("Duplicate Application");
	}

	try {
		await publishNewApplication(application.id);
	} catch (err) {
		console.error("Failed to publish new application event:", err.message);
	}

	return application;
};

export const updateApplicationService = async ({ id, userId, status }) => {
	if (!id) throw new ValidationError("Application ID is required");
	if (!userId) throw new ValidationError("User ID is required");
	if (!status) throw new ValidationError("Application status is required");

	const { data: application } =
		await ApplicationRepositories.getApplicationById(id);
	if (!application) throw new NotFoundError("Application");

	if (application.company_owner_id !== userId) {
		throw new ForbiddenError("You are not allowed to update this application");
	}

	const updatedApplication = await ApplicationRepositories.updateApplication({
		id,
		userId,
		status,
	});

	return updatedApplication;
};

export const deleteApplicationService = async ({ id, userId }) => {
	if (!id) throw new ValidationError("Application ID is required");
	if (!userId) throw new ValidationError("User ID is required");

	const { data: application } =
		await ApplicationRepositories.getApplicationById(id);
	if (!application) throw new NotFoundError("Application");

	if (
		application.user_id !== userId &&
		application.company_owner_id !== userId
	) {
		throw new ForbiddenError("You are not allowed to delete this application");
	}

	await ApplicationRepositories.deleteApplication(id);
};
