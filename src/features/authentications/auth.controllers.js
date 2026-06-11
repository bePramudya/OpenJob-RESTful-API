import response from "../../shared/utils/response.js";
import {
	loginService,
	logoutService,
	refreshTokenService,
} from "./auth.services.js";

export const loginController = async (req, res, next) => {
	const { email, password } = req.validated.body;
	if (!email || !password) response(res, 400, "Email or Password not found!");

	try {
		const token = await loginService({ email, password });
		response(res, 200, "Login successful", token);
	} catch (error) {
		next(error);
	}
};

export const refreshTokenController = async (req, res, next) => {
	const { refreshToken } = req.validated.body;
	if (!refreshToken) response(req, 400, "Token not found");

	try {
		const accessToken = await refreshTokenService(refreshToken);
		response(res, 200, "Success", { accessToken });
	} catch (error) {
		next(error);
	}
};

export const logoutController = async (req, res, next) => {
	const { refreshToken } = req.validated.body;

	try {
		await logoutService(refreshToken);
		response(res, 200, "Logout Success");
	} catch (error) {
		next(error);
	}
};
