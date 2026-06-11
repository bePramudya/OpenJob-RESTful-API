import express from "express";
import authenticate from "../../shared/middlewares/auth.js";
import validateRequest from "../../shared/middlewares/validateRequest.js";
import {
	createDocumentController,
	deleteDocumentController,
	getDocumentByIdController,
	getDocumentsController,
} from "./document.controllers.js";
import { getDocumentSchema } from "./document.schemas.js";
import uploadDocument from "./document.uploads.js";

const router = express.Router();

router
	.route("/documents")
	.get(getDocumentsController)
	.post(
		authenticate,
		uploadDocument.single("document"),
		createDocumentController,
	);

router
	.route("/documents/:id")
	.get(validateRequest(getDocumentSchema, "params"), getDocumentByIdController)
	.delete(
		authenticate,
		validateRequest(getDocumentSchema, "params"),
		deleteDocumentController,
	);

export default router;
