import response from "../../shared/utils/response.js";
import { getUserByIdService, registerService } from "./user.services.js";

export const registerController = async (req, res, next) => {
	const { name, email, password, role } = req.validated.body;

	try {
		const user = await registerService({ name, email, password, role });
		return response(res, 201, "Register successful", user);
	} catch (error) {
		next(error);
	}
};

export const getUserByIdController = async (req, res, next) => {
	const { id } = req.validated.params;

	try {
		const userData = await getUserByIdService(id);
		response(res, 200, "User profile retrieved successfully", userData);
	} catch (error) {
		next(error);
	}
};
