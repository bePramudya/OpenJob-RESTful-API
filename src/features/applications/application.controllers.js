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

export const getApplicationsController = async (_req, res, next) => {
	try {
		const applications = await getApplicationsService();
		response(res, 200, "Applications retrieved successfully", { applications });
	} catch (error) {
		next(error);
	}
};

export const getApplicationByIdController = async (req, res, next) => {
	const { id } = req.validated.params;

	try {
		const application = await getApplicationByIdService(id);
		response(
			res,
			200,
			"Application detail retrieved successfully",
			application,
		);
	} catch (error) {
		next(error);
	}
};

export const getApplicationsByUserController = async (req, res, next) => {
	const { userId } = req.validated.params;

	try {
		const applications = await getApplicationsByUserService(userId);
		response(res, 200, "User applications retrieved successfully", {
			applications,
		});
	} catch (error) {
		next(error);
	}
};

export const getApplicationsByJobController = async (req, res, next) => {
	const { jobId } = req.validated.params;

	try {
		const applications = await getApplicationsByJobService(jobId);
		response(res, 200, "Job applications retrieved successfully", {
			applications,
		});
	} catch (error) {
		next(error);
	}
};

export const createApplicationController = async (req, res, next) => {
	const { job_id, cover_letter } = req.validated.body;
	const userId = req.user.id;

	try {
		const application = await createApplicationService({
			userId,
			jobId: job_id,
			coverLetter: cover_letter,
		});

		response(res, 201, "Application created successfully", application);
	} catch (error) {
		next(error);
	}
};

export const updateApplicationController = async (req, res, next) => {
	const { id } = req.validated.params;
	const { status } = req.validated.body;
	const userId = req.user.id;

	try {
		const application = await updateApplicationService({
			id,
			userId,
			status,
		});

		response(res, 200, "Application updated successfully", application);
	} catch (error) {
		next(error);
	}
};

export const deleteApplicationController = async (req, res, next) => {
	const { id } = req.validated.params;
	const userId = req.user.id;

	try {
		await deleteApplicationService({ id, userId });
		response(res, 200, "Application deleted successfully");
	} catch (error) {
		next(error);
	}
};
