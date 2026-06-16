import pool from "../../shared/database/pool.js";

class ProfileRepositories {
	async getProfile(userId) {
		const query = {
			text: `SELECT id, name, email, role, created_at, updated_at
                FROM users
                WHERE id = $1`,
			values: [userId],
		};

		const result = await pool.query(query);
		return result.rows[0];
	}

	async getMyApplications(userId) {
		const query = {
			text: `SELECT 
                    applications.id,
                    applications.user_id,
                    applications.job_id,
                    applications.status,
                    applications.cover_letter,
                    applications.applied_at,
                    applications.updated_at,
                    jobs.title AS job_title,
                    jobs.type AS job_type,
                    jobs.salary_min,
                    jobs.salary_max,
                    companies.id AS company_id,
                    companies.name AS company_name,
                    categories.id AS category_id,
                    categories.name AS category_name
                FROM applications
                JOIN jobs ON jobs.id = applications.job_id
                JOIN companies ON companies.id = jobs.company_id
                JOIN categories ON categories.id = jobs.category_id
                WHERE applications.user_id = $1
                ORDER BY applications.applied_at DESC`,
			values: [userId],
		};

		const result = await pool.query(query);
		return result.rows;
	}

	async getMyBookmarks(userId) {
		const query = {
			text: `SELECT
                    bookmarks.id,
                    bookmarks.user_id,
                    bookmarks.job_id,
                    bookmarks.created_at,
                    jobs.title AS job_title,
                    jobs.description AS job_description,
                    jobs.location AS job_location,
                    jobs.type AS job_type,
                    jobs.salary_min,
                    jobs.salary_max,
                    companies.id AS company_id,
                    companies.name AS company_name,
                    categories.id AS category_id,
                    categories.name AS category_name
                FROM bookmarks
                JOIN jobs ON jobs.id = bookmarks.job_id
                JOIN companies ON companies.id = jobs.company_id
                JOIN categories ON categories.id = jobs.category_id
                WHERE bookmarks.user_id = $1
                ORDER BY bookmarks.created_at DESC`,
			values: [userId],
		};

		const result = await pool.query(query);
		return result.rows;
	}
}

export default new ProfileRepositories();
