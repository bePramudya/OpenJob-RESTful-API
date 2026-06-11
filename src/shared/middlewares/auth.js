import response from "../utils/response.js";
import TokenManager from "./token-manager.js";

const authenticate = async (req, res, next) => {
	const authHeader = req.headers.authorization;

	if (!authHeader?.startsWith("Bearer "))
		return response(res, 401, "Unauthorized: No token provided");

	try {
		const token = authHeader.split(" ")[1];
		const authData = await TokenManager.verifyToken(token);

		req.user = authData.user;

		next();
	} catch (error) {
		next(error);
	}
};

export default authenticate;
