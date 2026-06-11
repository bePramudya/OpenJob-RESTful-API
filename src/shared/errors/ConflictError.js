import AppError from "./AppError.js";

class ConflictError extends AppError {
	constructor(message = "Resource already exists") {
		super("ConflictError", 409, message, true);
	}
}

export default ConflictError;
