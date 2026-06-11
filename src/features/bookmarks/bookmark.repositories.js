import pool from "../../shared/database/pool.js";
import { ConflictError } from "../../shared/errors/index.js";

class BookmarkRepositories {
	async getBookmarksByUser(userId) {
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
                    jobs.created_at AS job_created_at,
                    jobs.updated_at AS job_updated_at,
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

	async getBookmarkById({ id, jobId }) {
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
                WHERE bookmarks.id = $1 AND bookmarks.job_id = $2`,
			values: [id, jobId],
		};

		const result = await pool.query(query);
		return result.rows[0];
	}

	async getBookmarkByUserAndJob({ userId, jobId }) {
		const query = {
			text: `SELECT id, user_id, job_id, created_at
                FROM bookmarks
                WHERE user_id = $1 AND job_id = $2`,
			values: [userId, jobId],
		};

		const result = await pool.query(query);
		return result.rows[0];
	}

	async getJobById(jobId) {
		const query = {
			text: `SELECT id, title
                FROM jobs
                WHERE id = $1`,
			values: [jobId],
		};

		const result = await pool.query(query);
		return result.rows[0];
	}

	async insertBookmark({ userId, jobId }) {
		const query = {
			text: `INSERT INTO bookmarks (user_id, job_id)
                VALUES ($1, $2)
                RETURNING id, user_id, job_id, created_at`,
			values: [userId, jobId],
		};

		try {
			const result = await pool.query(query);
			return result.rows[0];
		} catch (error) {
			if (error.code === "23505") {
				throw new ConflictError("Job already bookmarked");
			}
			throw error;
		}
	}

	async deleteBookmarkByUserAndJob({ userId, jobId }) {
		const query = {
			text: `DELETE FROM bookmarks
                WHERE user_id = $1 AND job_id = $2
                RETURNING id`,
			values: [userId, jobId],
		};

		const result = await pool.query(query);
		return result.rows[0];
	}
}

export default new BookmarkRepositories();
