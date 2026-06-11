import AppError from "./AppError.js";

class InternalServerError extends AppError {
	constructor(message = "Internal server error") {
		super("InternalServerError", 500, message, true);
	}
}

export default InternalServerError;
