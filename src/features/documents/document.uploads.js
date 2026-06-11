import fs from "node:fs";
import path from "node:path";
import multer from "multer";

const uploadDir = path.join(process.cwd(), "public", "uploads", "documents");

if (!fs.existsSync(uploadDir)) {
	fs.mkdirSync(uploadDir, { recursive: true });
}

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
	const allowedTypes = [
		"application/pdf",
		"image/jpeg",
		"image/png",
		"application/msword",
		"application/vnd.openxmlformats-officedocument.wordprocessingml.document",
	];

	if (!allowedTypes.includes(file.mimetype)) {
		return cb(new Error("Invalid document type"));
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
