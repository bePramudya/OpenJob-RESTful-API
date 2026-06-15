import fs from "node:fs";
import path from "node:path";
import {
	ForbiddenError,
	NotFoundError,
	ValidationError,
} from "../../shared/errors/index.js";
import { isUuid } from "../../shared/utils/isUuid.js";
import DocumentRepositories from "./document.repositories.js";

export const getDocumentsService = async () => {
	const documents = await DocumentRepositories.getDocuments();
	return documents;
};

export const getDocumentByIdService = async (id) => {
	if (!id || !isUuid(id)) throw new NotFoundError("Document ID is required");

	const document = await DocumentRepositories.getDocumentById(id);
	if (!document) throw new NotFoundError("Document");

	return document;
};

export const createDocumentService = async ({ userId, file }) => {
	if (!userId) throw new ValidationError("User ID is required");
	if (!file) throw new ValidationError("File is required");

	const fileUrl = `/uploads/documents/${file.filename}`;

	console.log(file);

	const document = await DocumentRepositories.insertDocument({
		userId,
		filename: file.filename,
		originalName: file.originalname,
		fileUrl,
		fileType: file.mimetype,
		fileSize: file.size,
	});

	return {
		documentId: document.id,
		filename: document.filename,
		originalName: document.original_name,
		size: document.file_size,
	};
};

export const deleteDocumentService = async ({ id, userId }) => {
	if (!id) throw new ValidationError("Document ID is required");
	if (!userId) throw new ValidationError("User ID is required");

	const document = await DocumentRepositories.getDocumentById(id);
	if (!document) throw new NotFoundError("Document");

	if (document.user_id !== userId) {
		throw new ForbiddenError("You are not allowed to delete this document");
	}

	const deletedDocument = await DocumentRepositories.deleteDocument(id);

	if (deletedDocument?.file_url) {
		const filePath = path.join(
			process.cwd(),
			"public",
			deletedDocument.file_url,
		);

		if (fs.existsSync(filePath)) {
			fs.unlinkSync(filePath);
		}
	}
};
