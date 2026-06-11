import pool from "../../shared/database/pool.js";
import { ConflictError } from "../../shared/errors/index.js";

class CategoryRepositories {
	async getCategories() {
		const query = {
			text: `SELECT id, name, description, created_at, updated_at
                FROM categories
                ORDER BY created_at DESC`,
		};

		const result = await pool.query(query);
		return result.rows;
	}

	async getCategoryById(id) {
		const query = {
			text: `SELECT id, name, description, created_at, updated_at
                FROM categories
                WHERE id = $1`,
			values: [id],
		};

		const result = await pool.query(query);
		return result.rows[0];
	}

	async insertCategory({ name, description }) {
		const query = {
			text: `INSERT INTO categories (name, description)
                VALUES ($1, $2)
                RETURNING id, name, description, created_at, updated_at`,
			values: [name, description],
		};

		try {
			const result = await pool.query(query);
			return result.rows[0];
		} catch (error) {
			if (error.code === "23505") {
				throw new ConflictError("Category already exists");
			}
			throw error;
		}
	}

	async updateCategory({ id, name, description }) {
		const query = {
			text: `UPDATE categories
                SET name = COALESCE($2, name),
                    description = COALESCE($3, description),
                    updated_at = NOW()
                WHERE id = $1
                RETURNING id, name, description, created_at, updated_at`,
			values: [id, name, description],
		};

		try {
			const result = await pool.query(query);
			return result.rows[0];
		} catch (error) {
			if (error.code === "23505") {
				throw new ConflictError("Category already exists");
			}
			throw error;
		}
	}

	async deleteCategory(id) {
		const query = {
			text: `DELETE FROM categories
                WHERE id = $1
                RETURNING id`,
			values: [id],
		};

		const result = await pool.query(query);
		return result.rows[0];
	}
}

export default new CategoryRepositories();
