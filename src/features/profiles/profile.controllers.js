import response from "../../shared/utils/response.js";
import {
	getMyApplicationsService,
	getMyBookmarksService,
	getProfileService,
} from "./profile.services.js";

export const getProfileController = async (req, res) => {
	const userId = req.user.id;

	const profile = await getProfileService(userId);
	response(res, 200, "Profile retrieved successfully", profile);
};

export const getMyApplicationsController = async (req, res) => {
	const userId = req.user.id;

	const applications = await getMyApplicationsService(userId);
	response(res, 200, "Profile applications retrieved successfully", {
		applications,
	});
};

export const getMyBookmarksController = async (req, res) => {
	const userId = req.user.id;

	const bookmarks = await getMyBookmarksService(userId);
	response(res, 200, "Profile bookmarks retrieved successfully", {
		bookmarks,
	});
};
