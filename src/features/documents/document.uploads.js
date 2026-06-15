import fs from "node:fs";
import path from "node:path";
import multer from "multer";

const uploadDir = path.join(process.cwd(), "public", "uploads", "documents");
fs.mkdirSync(uploadDir, { recursive: true });

const ALLOWED_MIME_TYPES = new Set([
	"application/pdf",
	// "image/jpeg",
	// "image/png",
	// "application/msword",
	// "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

const storage = multer.diskStorage({
	destination: (_req, _file, cb) => {
		cb(null, uploadDir);
	},
	filename: (_req, file, cb) => {
		const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
		const extension = path.extname(file.originalname);
		const filename = `${uniqueSuffix}${extension}`;

		cb(null, filename);
	},
});

const fileFilter = (_req, file, cb) => {
	if (!ALLOWED_MIME_TYPES.has(file.mimetype)) {
		return cb(
			new Error("Invalid file type. Allowed: pdf"),
			// new Error("Invalid file type. Allowed: pdf, jpg, png, doc, docx"),
		);
	}
	cb(null, true);
};

const uploadDocument = multer({
	storage,
	fileFilter,
	limits: {
		fileSize: 5 * 1024 * 1024,
	},
});

export default uploadDocument;
