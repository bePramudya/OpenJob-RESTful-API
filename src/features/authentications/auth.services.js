import bcrypt from "bcrypt";
import {
	UnauthorizedError,
	ValidationError,
} from "../../shared/errors/index.js";
import TokenManager from "../../shared/middlewares/token-manager.js";
import AuthRepositories from "./auth.repositories.js";

export const loginService = async ({ email, password }) => {
	const user = await AuthRepositories.getUser({ email });
	if (!user) throw new UnauthorizedError("Invalid email or password");

	const isPasswordValid = await bcrypt.compare(password, user.password);
	if (!isPasswordValid)
		throw new UnauthorizedError("Invalid email or password");

	const userDataJWT = {
		id: user.id,
		name: user.name,
		email: user.email,
		role: user.role,
	};

	const accessToken = await TokenManager.signToken(userDataJWT);
	const refreshToken = await TokenManager.signRefreshToken(userDataJWT);

	await AuthRepositories.saveRefreshToken({
		userId: user.id,
		token: refreshToken,
	});

	return { accessToken, refreshToken };
};

export const refreshTokenService = async (refreshToken) => {
	const checkToken = await AuthRepositories.checkRefreshToken({
		token: refreshToken,
	});
	if (!checkToken) throw new ValidationError("Invalid refresh token");

	const payload = await TokenManager.verifyRefreshToken(refreshToken);

	const accessToken = await TokenManager.signToken({
		id: payload.id,
		name: payload.name,
		email: payload.email,
		role: payload.role,
	});

	return accessToken;
};

export const logoutService = async (refreshToken) => {
	const checkToken = await AuthRepositories.checkRefreshToken({
		token: refreshToken,
	});
	if (!checkToken) throw new ValidationError("Invalid refresh token");

	await AuthRepositories.deleteToken({ token: refreshToken });
};
