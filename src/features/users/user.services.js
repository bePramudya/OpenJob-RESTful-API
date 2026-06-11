import bcrypt from "bcrypt";
import "dotenv/config";
import {
	UnauthorizedError,
	ValidationError,
} from "../../shared/errors/index.js";
import TokenManager from "../../shared/middlewares/token-manager.js";
import userRepository from "./user.repository.js";

export const registerService = async ({ email, password }) => {
	if (!email || !password) {
		throw new ValidationError("Email and password are required");
	}

	const name = email.split("@")[0];
	const hashedPassword = await bcrypt.hash(password, 10);

	await userRepository.insertUser({
		name,
		email,
		hashedPassword,
	});
};

export const loginService = async ({ email, password }) => {
	const user = await userRepository.getUser({ email });
	if (!user) throw new UnauthorizedError("Invalid email or password");

	const isPasswordValid = await bcrypt.compare(password, user.password);
	if (!isPasswordValid)
		throw new UnauthorizedError("Invalid email or password");

	const userDataJWT = {
		id: user.id,
		name: user.name,
		email: user.email,
		role: user.role,
		updated_at: user.updated_at,
	};

	const jwt = await TokenManager.signToken(userDataJWT);
	return jwt;
};
