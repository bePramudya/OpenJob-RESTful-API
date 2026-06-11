import pool from "../../shared/database/pool.js";
import { InternalServerError } from "../../shared/errors/index.js";

class AuthRepositories {
	async getUser({ email }) {
		const query = {
			text: `SELECT id, name, email, role, created_at, password FROM users
            WHERE email = $1`,
			values: [email],
		};

		const result = await pool.query(query);
		return result.rows[0];
	}

	async saveRefreshToken({ userId, token }) {
		const client = await pool.connect();

		try {
			await client.query("BEGIN");

			await client.query({
				text: `DELETE FROM refresh_tokens WHERE user_id = $1`,
				values: [userId],
			});

			const result = await client.query({
				text: `INSERT INTO refresh_tokens (user_id, token, expires_at)
              VALUES ($1, $2, NOW() + INTERVAL '7 days')`,
				values: [userId, token],
			});

			await client.query("COMMIT");
			return result.rows[0];
		} catch (_error) {
			throw new InternalServerError("Failed to save refresh token");
		} finally {
			client.release();
		}
	}

	async checkRefreshToken({ token }) {
		const query = {
			text: `SELECT token from refresh_tokens
            WHERE token = $1`,
			values: [token],
		};

		const result = await pool.query(query);
		return result.rows[0];
	}

	async deleteToken({ token }) {
		const query = {
			text: `DELETE FROM refresh_tokens WHERE token = $1`,
			values: [token],
		};

		const result = await pool.query(query);
		return result.rows[0];
	}
}

export default new AuthRepositories();
