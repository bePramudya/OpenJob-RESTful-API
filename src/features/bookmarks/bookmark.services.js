import {
	ForbiddenError,
	NotFoundError,
	ValidationError,
} from "../../shared/errors/index.js";
import { handleConflictError } from "../../shared/utils/handleConflictError.js";
import { isUuid } from "../../shared/utils/isUuid.js";
import BookmarkRepositories from "./bookmark.repositories.js";

export const getMyBookmarksService = async (userId) => {
	console.log(userId);
	if (!userId) throw new ValidationError("User ID is required");
	console.log("lol");

	const { data: bookmarks, source } =
		await BookmarkRepositories.getBookmarksByUser(userId);
	return { bookmarks, source };
};

export const getBookmarkByIdService = async ({ id, jobId, userId }) => {
	if (!id || !isUuid(id)) throw new NotFoundError("Bookmark Id not found");
	if (!jobId) throw new ValidationError("Job ID is required");
	if (!userId) throw new ValidationError("User ID is required");

	const bookmark = await BookmarkRepositories.getBookmarkById({ id, jobId });
	if (!bookmark) throw new NotFoundError("Bookmark");

	if (bookmark.user_id !== userId) {
		throw new ForbiddenError("You are not allowed to access this bookmark");
	}

	return bookmark;
};

export const createBookmarkService = async ({ userId, jobId }) => {
	if (!userId) throw new ValidationError("User ID is required");
	if (!jobId) throw new ValidationError("Job ID is required");

	const job = await BookmarkRepositories.getJobById(jobId);
	if (!job) throw new NotFoundError("Job");

	const bookmark = await Promise.try(() =>
		BookmarkRepositories.insertBookmark({
			userId,
			jobId,
		}),
	).catch(handleConflictError("Job already bookmarked"));

	return bookmark;
};

export const deleteBookmarkService = async ({ userId, jobId }) => {
	if (!userId) throw new ValidationError("User ID is required");
	if (!jobId) throw new ValidationError("Job ID is required");

	const bookmark = await BookmarkRepositories.getBookmarkByUserAndJob({
		userId,
		jobId,
	});

	if (!bookmark) throw new NotFoundError("Bookmark");

	await BookmarkRepositories.deleteBookmarkByUserAndJob({
		userId,
		jobId,
	});
};
