import response from "../../shared/utils/response.js";
import { getUserByIdService, registerService } from "./user.services.js";

export const registerController = async (req, res) => {
	const { name, email, password, role } = req.validated.body;

	const user = await registerService({ name, email, password, role });
	return response(res, 201, "Register successful", user);
};

export const getUserByIdController = async (req, res) => {
	const { id } = req.validated.params;

	const { user, source } = await getUserByIdService(id);
	response(res, 200, "User profile retrieved successfully", user, source);
};
