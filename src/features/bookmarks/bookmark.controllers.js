import response from "../../shared/utils/response.js";
import {
	createBookmarkService,
	deleteBookmarkService,
	getBookmarkByIdService,
	getMyBookmarksService,
} from "./bookmark.services.js";

export const getMyBookmarksController = async (req, res) => {
	const userId = req.user.id;

	const bookmarks = await getMyBookmarksService(userId);
	response(res, 200, "Bookmarks retrieved successfully", { bookmarks });
};

export const getBookmarkByIdController = async (req, res) => {
	const { id, jobId } = req.validated.params;
	const userId = req.user.id;

	const bookmark = await getBookmarkByIdService({
		id,
		jobId,
		userId,
	});

	response(res, 200, "Bookmark detail retrieved successfully", bookmark);
};

export const createBookmarkController = async (req, res) => {
	const { jobId } = req.validated.params;
	const userId = req.user.id;

	const bookmark = await createBookmarkService({
		userId,
		jobId,
	});

	response(res, 201, "Bookmark created successfully", bookmark);
};

export const deleteBookmarkController = async (req, res) => {
	const { jobId } = req.validated.params;
	const userId = req.user.id;

	await deleteBookmarkService({
		userId,
		jobId,
	});

	response(res, 200, "Bookmark deleted successfully");
};
