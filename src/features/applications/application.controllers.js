import response from "../../shared/utils/response.js";
import {
	createApplicationService,
	deleteApplicationService,
	getApplicationByIdService,
	getApplicationsByJobService,
	getApplicationsByUserService,
	getApplicationsService,
	updateApplicationService,
} from "./application.services.js";

export const getApplicationsController = async (_req, res) => {
	const applications = await getApplicationsService();
	response(res, 200, "Applications retrieved successfully", { applications });
};

export const getApplicationByIdController = async (req, res) => {
	const { id } = req.validated.params;

	const { application, source } = await getApplicationByIdService(id);
	response(
		res,
		200,
		"Application detail retrieved successfully",
		application,
		source,
	);
};

export const getApplicationsByUserController = async (req, res) => {
	const { userId } = req.validated.params;

	const applications = await getApplicationsByUserService(userId);
	response(res, 200, "User applications retrieved successfully", {
		applications,
	});
};

export const getApplicationsByJobController = async (req, res) => {
	const { jobId } = req.validated.params;

	const applications = await getApplicationsByJobService(jobId);
	response(res, 200, "Job applications retrieved successfully", {
		applications,
	});
};

export const createApplicationController = async (req, res) => {
	const { job_id, cover_letter } = req.validated.body;
	const userId = req.user.id;

	const application = await createApplicationService({
		userId,
		jobId: job_id,
		coverLetter: cover_letter,
	});

	response(res, 201, "Application created successfully", application);
};

export const updateApplicationController = async (req, res) => {
	const { id } = req.validated.params;
	const { status } = req.validated.body;
	const userId = req.user.id;

	const application = await updateApplicationService({
		id,
		userId,
		status,
	});

	response(res, 200, "Application updated successfully", application);
};

export const deleteApplicationController = async (req, res) => {
	const { id } = req.validated.params;
	const userId = req.user.id;

	await deleteApplicationService({ id, userId });
	response(res, 200, "Application deleted successfully");
};
