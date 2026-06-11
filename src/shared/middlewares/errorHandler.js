import { AppError } from "../errors/index.js";
import response from "../utils/response.js";

const errorHandler = (err, _req, res, _next) => {
	if (err instanceof AppError && err.isOperational) {
		console.warn(`[Operational Error] ${err.httpCode} - ${err.message}`);
		return response(res, err.httpCode, err.message, null);
	}

	if (err.isJoi) {
		const message = err.details
			.map((d) => d.message.replace(/['"]/g, ""))
			.join(", ");

		console.warn(`[Validation Error] ${message}`);
		return response(res, 400, message, null);
	}

	if (err.name === "MulterError" || err.message === "Invalid document type") {
		console.warn(`[Upload Error] ${err.message}`);
		return response(res, 400, err.message, null);
	}

	console.error("[Unhandled Error]", err);
	return response(res, 500, "Internal Server Error", null);
};

export default errorHandler;
