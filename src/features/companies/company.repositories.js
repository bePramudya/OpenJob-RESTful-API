import pool from "../../shared/database/pool.js";

class CompanyRepositories {
	async getCompanies() {
		const query = {
			text: `SELECT id, user_id, name, description, location, website, created_at, updated_at
                FROM companies
                ORDER BY created_at DESC`,
		};

		const result = await pool.query(query);
		return result.rows;
	}

	async getCompanyById(id) {
		const query = {
			text: `SELECT id, user_id, name, description, location, website, created_at, updated_at
                FROM companies
                WHERE id = $1`,
			values: [id],
		};

		const result = await pool.query(query);
		return result.rows[0];
	}

	async insertCompany({ userId, name, description, location, website }) {
		const query = {
			text: `INSERT INTO companies (user_id, name, description, location, website)
                VALUES ($1, $2, $3, $4, $5)
                RETURNING id, user_id, name, description, location, website, created_at, updated_at`,
			values: [userId, name, description, location, website],
		};

		const result = await pool.query(query);
		return result.rows[0];
	}

	async updateCompany({ id, name, description, location, website }) {
		const query = {
			text: `UPDATE companies
                SET name = COALESCE($2, name),
                    description = COALESCE($3, description),
                    location = COALESCE($4, location),
                    website = COALESCE($5, website),
                    updated_at = NOW()
                WHERE id = $1
                RETURNING id, user_id, name, description, location, website, created_at, updated_at`,
			values: [id, name, description, location, website],
		};

		const result = await pool.query(query);
		return result.rows[0];
	}

	async deleteCompany(id) {
		const query = {
			text: `DELETE FROM companies
                WHERE id = $1
                RETURNING id`,
			values: [id],
		};

		const result = await pool.query(query);
		return result.rows[0];
	}
}

export default new CompanyRepositories();
