import pool from "../../shared/database/pool.js";
import { ConflictError } from "../../shared/errors/index.js";

class userRepository {
	async insertUser({ name, email, hashedPassword }) {
		const query = {
			text: `INSERT INTO users (name, email, password)
            VALUES ($1, $2, $3)
            RETURNING name, email`,
			values: [name, email, hashedPassword],
		};

		try {
			const result = await pool.query(query);
			return result.rows[0];
		} catch (error) {
			if (error.code === "23505") {
				throw new ConflictError("User already exists");
			}
			throw error;
		}
	}

	async getUser({ email }) {
		const query = {
			text: `SELECT id, name, email, role, created_at, password FROM users
            WHERE email = $1`,
			values: [email],
		};

		const result = await pool.query(query);
		return result.rows[0];
	}
}

export default new userRepository();
