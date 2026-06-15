import response from "../../shared/utils/response.js";
import {
	createDocumentService,
	deleteDocumentService,
	getDocumentByIdService,
	getDocumentsService,
} from "./document.services.js";

export const getDocumentsController = async (_req, res) => {
	const documents = await getDocumentsService();
	response(res, 200, "Documents retrieved successfully", documents);
};

export const getDocumentByIdController = async (req, res) => {
	const { id } = req.validated.params;

	const document = await getDocumentByIdService(id);
	response(res, 200, "Document detail retrieved successfully", document);
};

export const createDocumentController = async (req, res) => {
	const userId = req.user.id;
	const file = req.file;

	const document = await createDocumentService({
		userId,
		file,
	});

	response(res, 201, "Document uploaded successfully", document);
};

export const deleteDocumentController = async (req, res) => {
	const { id } = req.validated.params;
	const userId = req.user.id;

	await deleteDocumentService({ id, userId });
	response(res, 200, "Document deleted successfully");
};
