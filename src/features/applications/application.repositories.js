import pool from "../../shared/config/pool.js";
import CacheService from "../../shared/services/CacheService.js";
import { cacheAside } from "../../shared/utils/cacheAside.js";

class ApplicationRepositories {
	async getApplications() {
		const query = {
			text: `SELECT
        applications.id,
        applications.user_id,
        applications.job_id,
        applications.status,
        applications.cover_letter,
        applications.applied_at,
        users.name AS user_name,
        users.email AS user_email,
        jobs.title AS job_title,
        companies.id AS company_id,
        companies.name AS company_name,
        categories.id AS category_id,
        categories.name AS category_name
        FROM applications
        JOIN users ON users.id = applications.user_id
        JOIN jobs ON jobs.id = applications.job_id
        JOIN companies ON companies.id = jobs.company_id
        JOIN categories ON categories.id = jobs.category_id
        ORDER BY applications.applied_at DESC`,
		};

		const result = await pool.query(query);
		return result.rows;
	}

	async getApplicationById(id) {
		const cacheKey = `applications:${id}`;

		return cacheAside(cacheKey, async () => {
			const query = {
				text: `SELECT
        applications.id,
        applications.user_id,
        applications.job_id,
        applications.status,
        applications.cover_letter,
        applications.applied_at,
        applications.updated_at,
        users.name AS user_name,
        users.email AS user_email,
        jobs.title AS job_title,
        jobs.company_id,
        companies.name AS company_name,
        companies.user_id AS company_owner_id,
        categories.id AS category_id,
        categories.name AS category_name
        FROM applications
        JOIN users ON users.id = applications.user_id
        JOIN jobs ON jobs.id = applications.job_id
        JOIN companies ON companies.id = jobs.company_id
        JOIN categories ON categories.id = jobs.category_id
        WHERE applications.id = $1`,
				values: [id],
			};

			const result = await pool.query(query);
			return result.rows[0];
		});
	}

	async getApplicationsByUser(userId) {
		const cacheKey = `applications:${userId}`;
		return cacheAside(cacheKey, async () => {
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
                    jobs.description AS job_description,
                    jobs.location AS job_location,
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
		});
	}

	async getApplicationsByJob(jobId) {
		const cacheKey = `applications:${jobId}`;
		return cacheAside(cacheKey, async () => {
			const query = {
				text: `SELECT
        applications.id,
        applications.user_id,
        applications.job_id,
        applications.status,
        applications.cover_letter,
        applications.applied_at,
        applications.updated_at,
        users.name AS user_name,
        users.email AS user_email,
        jobs.title AS job_title
        FROM applications
        JOIN users ON users.id = applications.user_id
        JOIN jobs ON jobs.id = applications.job_id
        WHERE applications.job_id = $1
        ORDER BY applications.applied_at DESC`,
				values: [jobId],
			};

			const result = await pool.query(query);
			return result.rows;
		});
	}

	async getUserById(userId) {
		const query = {
			text: `SELECT id, name, email
                FROM users
                WHERE id = $1`,
			values: [userId],
		};

		const result = await pool.query(query);
		return result.rows[0];
	}

	async getJobById(jobId) {
		const query = {
			text: `SELECT
                    jobs.id,
                    jobs.title,
                    jobs.company_id,
                    companies.user_id AS company_owner_id
                FROM jobs
                JOIN companies ON companies.id = jobs.company_id
                WHERE jobs.id = $1`,
			values: [jobId],
		};

		const result = await pool.query(query);
		return result.rows[0];
	}

	async insertApplication({ userId, jobId, coverLetter }) {
		const cacheKey = `applications:${userId}`;

		const query = {
			text: `INSERT INTO applications (user_id, job_id, cover_letter)
                VALUES ($1, $2, $3)
                RETURNING id, user_id, job_id, status, cover_letter, applied_at, updated_at`,
			values: [userId, jobId, coverLetter],
		};

		CacheService.delete(cacheKey);

		const result = await pool.query(query);
		return result.rows[0];
	}

	async updateApplication({ id, userId, status }) {
		const cacheKey = `applications:${id}`;
		const cacheKey2 = `applications:${userId}`;

		const query = {
			text: `UPDATE applications
                SET status = $2,
                    updated_at = NOW()
                WHERE id = $1
                RETURNING id, user_id, job_id, status, cover_letter, applied_at, updated_at`,
			values: [id, status],
		};

		CacheService.delete(cacheKey);
		CacheService.delete(cacheKey2);
		const result = await pool.query(query);
		return result.rows[0];
	}

	async deleteApplication(id) {
		const cacheKey = `applications:${id}`;
		const query = {
			text: `DELETE FROM applications
                WHERE id = $1
                RETURNING id`,
			values: [id],
		};

		CacheService.delete(cacheKey);
		const result = await pool.query(query);
		return result.rows[0];
	}

	async getDetailForNotification(applicationId) {
		const query = {
			text: `SELECT
                applicants.email AS applicant_email,
                applicants.name AS applicant_name,
                applications.applied_at AS applied_at,
                owners.email AS owner_email
            FROM applications
                JOIN users AS applicants ON applicants.id = applications.user_id
                JOIN jobs ON jobs.id = applications.job_id
                JOIN companies ON companies.id = jobs.company_id
                JOIN users AS owners ON owners.id = companies.user_id
            WHERE applications.id = $1`,
			values: [applicationId],
		};

		const result = await pool.query(query);
		return result.rows[0];
	}
}

export default new ApplicationRepositories();
