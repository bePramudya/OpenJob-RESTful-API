import pool from "../../shared/database/pool.js";

class UserRepositories {
	async insertUser({ name, email, hashedPassword, role }) {
		const query = {
			text: `INSERT INTO users (name, email, password, role)
            VALUES ($1, $2, $3, $4)
            RETURNING id, name, email, role`,
			values: [name, email, hashedPassword, role],
		};

		const result = await pool.query(query);
		return result.rows[0];
	}

	async getUserById(id) {
		const query = {
			text: `SELECT id, name, email, role FROM users
            WHERE id = $1`,
			values: [id],
		};

		const result = await pool.query(query);
		return result.rows[0];
	}
}

export default new UserRepositories();
