import AppError from "./AppError.js";

class NotFoundError extends AppError {
	constructor(resource = "Resource") {
		super("NotFoundError", 404, `${resource} not found`, true);
	}
}

export default NotFoundError;
