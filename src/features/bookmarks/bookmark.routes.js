import express from "express";
import authenticate from "../../shared/middlewares/auth.js";
import validateRequest from "../../shared/middlewares/validateRequest.js";
import {
	createBookmarkController,
	deleteBookmarkController,
	getBookmarkByIdController,
	getMyBookmarksController,
} from "./bookmark.controllers.js";
import {
	createBookmarkSchema,
	deleteBookmarkSchema,
	getBookmarkSchema,
} from "./bookmark.schemas.js";

const router = express.Router();

router.get("/bookmarks", authenticate, getMyBookmarksController);

router
	.route("/jobs/:jobId/bookmark")
	.post(
		authenticate,
		validateRequest(createBookmarkSchema, "params"),
		createBookmarkController,
	)
	.delete(
		authenticate,
		validateRequest(deleteBookmarkSchema, "params"),
		deleteBookmarkController,
	);

router.get(
	"/jobs/:jobId/bookmark/:id",
	authenticate,
	validateRequest(getBookmarkSchema, "params"),
	getBookmarkByIdController,
);

export default router;
