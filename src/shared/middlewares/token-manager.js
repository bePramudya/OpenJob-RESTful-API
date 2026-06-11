import "dotenv/config";
import * as jose from "jose";
import { InternalServerError, UnauthorizedError } from "../errors/index.js";

const TokenManager = {
	signToken: async (payload) => {
		try {
			const secret = new TextEncoder().encode(process.env.ACCESS_TOKEN_KEY);
			const jwt = await new jose.SignJWT(payload)
				.setProtectedHeader({ alg: "HS256" })
				.setIssuedAt()
				.setExpirationTime("3 hour")
				.sign(secret);

			return jwt;
		} catch (_error) {
			throw new InternalServerError("Failed to sign token");
		}
	},

	signRefreshToken: async (payload) => {
		try {
			const secret = new TextEncoder().encode(process.env.REFRESH_TOKEN_KEY);
			const refreshToken = await new jose.SignJWT(payload)
				.setProtectedHeader({ alg: "HS256" })
				.setIssuedAt()
				.setExpirationTime("1 day")
				.sign(secret);

			return refreshToken;
		} catch (_error) {
			throw new InternalServerError("Failed to create refresh token");
		}
	},

	verifyToken: async (bearerToken) => {
		try {
			const secret = new TextEncoder().encode(process.env.ACCESS_TOKEN_KEY);
			const { payload } = await jose.jwtVerify(bearerToken, secret, {});
			return { user: payload };
		} catch (_error) {
			throw new UnauthorizedError("Token is invalid or expired");
		}
	},

	verifyRefreshToken: async (bearerToken) => {
		try {
			const secret = new TextEncoder().encode(process.env.REFRESH_TOKEN_KEY);
			const { payload } = await jose.jwtVerify(bearerToken, secret, {});

			return payload;
		} catch (_error) {
			throw new UnauthorizedError("Refresh token is invalid or expired");
		}
	},
};

export default TokenManager;
