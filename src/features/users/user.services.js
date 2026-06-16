import bcrypt from "bcrypt";
import "dotenv/config";
import { NotFoundError, ValidationError } from "../../shared/errors/index.js";
import { handleConflictError } from "../../shared/utils/handleConflictError.js";
import { isUuid } from "../../shared/utils/isUuid.js";
import UserRepositories from "./user.repositories.js";

export const registerService = async ({
	name,
	email,
	password,
	role = "user",
}) => {
	if (!name || !email || !password) {
		throw new ValidationError("Name, email and password are required");
	}

	const hashedPassword = await bcrypt.hash(password, 10);

	const user = await Promise.try(() =>
		UserRepositories.insertUser({ name, email, hashedPassword, role }),
	).catch(handleConflictError("Email Already Registered"));

	return user;
};

export const getUserByIdService = async (id) => {
	if (!id || !isUuid(id)) throw new NotFoundError("User Not Found");

	const { data: user, source } = await UserRepositories.getUserById(id);
	if (!user) throw new NotFoundError("User not Found");

	return { user, source };
};
