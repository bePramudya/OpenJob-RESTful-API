import AppError from "./AppError.js";

class ForbiddenError extends AppError {
	constructor(message = "Forbidden") {
		super("ForbiddenError", 403, message, true);
	}
}

export default ForbiddenError;
