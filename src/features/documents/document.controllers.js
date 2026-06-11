import response from "../../shared/utils/response.js";
import {
	createDocumentService,
	deleteDocumentService,
	getDocumentByIdService,
	getDocumentsService,
} from "./document.services.js";

export const getDocumentsController = async (_req, res, next) => {
	try {
		const documents = await getDocumentsService();
		response(res, 200, "Documents retrieved successfully", documents);
	} catch (error) {
		next(error);
	}
};

export const getDocumentByIdController = async (req, res, next) => {
	const { id } = req.validated.params;

	try {
		const document = await getDocumentByIdService(id);
		response(res, 200, "Document detail retrieved successfully", document);
	} catch (error) {
		next(error);
	}
};

export const createDocumentController = async (req, res, next) => {
	const userId = req.user.id;
	const file = req.file;

	try {
		const document = await createDocumentService({
			userId,
			file,
		});

		response(res, 201, "Document uploaded successfully", document);
	} catch (error) {
		next(error);
	}
};

export const deleteDocumentController = async (req, res, next) => {
	const { id } = req.validated.params;
	const userId = req.user.id;

	try {
		await deleteDocumentService({ id, userId });
		response(res, 200, "Document deleted successfully");
	} catch (error) {
		next(error);
	}
};
