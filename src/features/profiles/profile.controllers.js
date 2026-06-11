import response from "../../shared/utils/response.js";
import {
	getMyApplicationsService,
	getMyBookmarksService,
	getProfileService,
} from "./profile.services.js";

export const getProfileController = async (req, res, next) => {
	const userId = req.user.id;

	try {
		const profile = await getProfileService(userId);
		response(res, 200, "Profile retrieved successfully", profile);
	} catch (error) {
		next(error);
	}
};

export const getMyApplicationsController = async (req, res, next) => {
	const userId = req.user.id;

	try {
		const applications = await getMyApplicationsService(userId);
		response(res, 200, "Profile applications retrieved successfully", {
			applications,
		});
	} catch (error) {
		next(error);
	}
};

export const getMyBookmarksController = async (req, res, next) => {
	const userId = req.user.id;

	try {
		const bookmarks = await getMyBookmarksService(userId);
		response(res, 200, "Profile bookmarks retrieved successfully", {
			bookmarks,
		});
	} catch (error) {
		next(error);
	}
};
