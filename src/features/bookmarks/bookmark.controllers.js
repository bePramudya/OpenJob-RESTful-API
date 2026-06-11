import response from "../../shared/utils/response.js";
import {
	createBookmarkService,
	deleteBookmarkService,
	getBookmarkByIdService,
	getMyBookmarksService,
} from "./bookmark.services.js";

export const getMyBookmarksController = async (req, res, next) => {
	const userId = req.user.id;

	try {
		const bookmarks = await getMyBookmarksService(userId);
		response(res, 200, "Bookmarks retrieved successfully", { bookmarks });
	} catch (error) {
		next(error);
	}
};

export const getBookmarkByIdController = async (req, res, next) => {
	const { id, jobId } = req.validated.params;
	const userId = req.user.id;

	try {
		const bookmark = await getBookmarkByIdService({
			id,
			jobId,
			userId,
		});

		response(res, 200, "Bookmark detail retrieved successfully", bookmark);
	} catch (error) {
		next(error);
	}
};

export const createBookmarkController = async (req, res, next) => {
	const { jobId } = req.validated.params;
	const userId = req.user.id;

	try {
		const bookmark = await createBookmarkService({
			userId,
			jobId,
		});

		response(res, 201, "Bookmark created successfully", bookmark);
	} catch (error) {
		next(error);
	}
};

export const deleteBookmarkController = async (req, res, next) => {
	const { jobId } = req.validated.params;
	const userId = req.user.id;

	try {
		await deleteBookmarkService({
			userId,
			jobId,
		});

		response(res, 200, "Bookmark deleted successfully");
	} catch (error) {
		next(error);
	}
};
