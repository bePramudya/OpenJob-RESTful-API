import express from "express";
import authenticate from "../../shared/middlewares/auth.js";
import {
	getMyApplicationsController,
	getMyBookmarksController,
	getProfileController,
} from "./profile.controllers.js";

const router = express.Router();

router.get("/profile", authenticate, getProfileController);

router.get("/profile/applications", authenticate, getMyApplicationsController);

router.get("/profile/bookmarks", authenticate, getMyBookmarksController);

export default router;
