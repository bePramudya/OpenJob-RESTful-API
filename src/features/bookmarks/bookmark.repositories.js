import pool from "../../shared/config/pool.js";
import CacheService from "../../shared/services/CacheService.js";
import { cacheAside } from "../../shared/utils/cacheAside.js";

class BookmarkRepositories {
	async getBookmarksByUser(userId) {
		const cacheKey = `bookmarks:${userId}`;

		return cacheAside(cacheKey, async () => {
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
        companies.location as company_location,
        companies.website as company_website,
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

			console.log("lol4");

			const result = await pool.query(query);
			console.log(result.rowCount);
			return result.rows;
		});
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

		const result = await pool.query(query);
		return result.rows[0];
	}

	async deleteBookmarkByUserAndJob({ userId, jobId }) {
		const cacheKey = `bookmarks:${userId}`;

		const query = {
			text: `DELETE FROM bookmarks
        WHERE user_id = $1 AND job_id = $2
        RETURNING id`,
			values: [userId, jobId],
		};

		CacheService.delete(cacheKey);

		const result = await pool.query(query);
		return result.rows[0];
	}
}

export default new BookmarkRepositories();
