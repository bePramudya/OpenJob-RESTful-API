import AppError from "./AppError.js";

class ValidationError extends AppError {
	constructor(message = "Invalid Input") {
		super("ValidationError", 400, message, true);
	}
}

export default ValidationError;
