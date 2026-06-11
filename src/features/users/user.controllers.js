import response from "../../shared/utils/response.js";
import { loginService, registerService } from "./user.service.js";

export const registerController = async (req, res, next) => {
	const { email, password } = req.validated.body;

	try {
		await registerService({ email, password });
		return response(res, 201, "Register successful");
	} catch (error) {
		next(error);
	}
};

export const loginController = async (req, res, next) => {
	const { email, password } = req.validated.body;

	try {
		const jwt = await loginService({ email, password });
		response(res, 200, "Login successful", { token: jwt });
	} catch (error) {
		next(error);
	}
};

export const getUserProfileController = async (req, res, next) => {
	const { id } = req.validated.params;

	try {
		const userData = await getUserProfileService({ id });
		response(res, 200, "User profile retrieved successfully", userData);
	} catch (error) {
		next(error);
	}
};
