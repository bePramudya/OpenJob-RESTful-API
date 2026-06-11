import { NotFoundError, ValidationError } from "../../shared/errors/index.js";
import ProfileRepositories from "./profile.repositories.js";

export const getProfileService = async (userId) => {
	if (!userId) throw new ValidationError("User ID is required");

	const profile = await ProfileRepositories.getProfile(userId);
	if (!profile) throw new NotFoundError("Profile");

	return profile;
};

export const getMyApplicationsService = async (userId) => {
	if (!userId) throw new ValidationError("User ID is required");

	const applications = await ProfileRepositories.getMyApplications(userId);
	return applications;
};

export const getMyBookmarksService = async (userId) => {
	if (!userId) throw new ValidationError("User ID is required");

	const bookmarks = await ProfileRepositories.getMyBookmarks(userId);
	return bookmarks;
};
