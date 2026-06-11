import pool from "../../shared/database/pool.js";

class JobRepositories {
	async getJobs({ title, companyName }) {
		const values = [];
		const conditions = [];

		if (title) {
			values.push(`%${title}%`);
			conditions.push(`jobs.title ILIKE $${values.length}`);
		}

		if (companyName) {
			values.push(`%${companyName}%`);
			conditions.push(`companies.name ILIKE $${values.length}`);
		}

		const whereClause =
			conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

		const query = {
			text: `SELECT
                    jobs.id,
                    jobs.company_id,
                    jobs.category_id,
                    jobs.title,
                    jobs.description,
                    jobs.location,
                    jobs.type,
                    jobs.salary_min,
                    jobs.salary_max,
                    jobs.created_at,
                    jobs.updated_at,
                    companies.name AS company_name,
                    categories.name AS category_name
                FROM jobs
                JOIN companies ON companies.id = jobs.company_id
                JOIN categories ON categories.id = jobs.category_id
                ${whereClause}
                ORDER BY jobs.created_at DESC`,
			values,
		};

		const result = await pool.query(query);
		return result.rows;
	}

	async getJobById(id) {
		const query = {
			text: `SELECT
                    jobs.id,
                    jobs.company_id,
                    jobs.category_id,
                    jobs.title,
                    jobs.description,
                    jobs.location,
                    jobs.type,
                    jobs.salary_min,
                    jobs.salary_max,
                    jobs.created_at,
                    jobs.updated_at,
                    companies.name AS company_name,
                    companies.user_id AS company_owner_id,
                    categories.name AS category_name
                FROM jobs
                JOIN companies ON companies.id = jobs.company_id
                JOIN categories ON categories.id = jobs.category_id
                WHERE jobs.id = $1`,
			values: [id],
		};

		const result = await pool.query(query);
		return result.rows[0];
	}

	async getJobsByCompany(companyId) {
		const query = {
			text: `SELECT
                    jobs.id,
                    jobs.company_id,
                    jobs.category_id,
                    jobs.title,
                    jobs.description,
                    jobs.location,
                    jobs.type,
                    jobs.salary_min,
                    jobs.salary_max,
                    jobs.created_at,
                    jobs.updated_at,
                    companies.name AS company_name,
                    categories.name AS category_name
                FROM jobs
                JOIN companies ON companies.id = jobs.company_id
                JOIN categories ON categories.id = jobs.category_id
                WHERE jobs.company_id = $1
                ORDER BY jobs.created_at DESC`,
			values: [companyId],
		};

		const result = await pool.query(query);
		return result.rows;
	}

	async getJobsByCategory(categoryId) {
		const query = {
			text: `SELECT
                    jobs.id,
                    jobs.company_id,
                    jobs.category_id,
                    jobs.title,
                    jobs.description,
                    jobs.location,
                    jobs.type,
                    jobs.salary_min,
                    jobs.salary_max,
                    jobs.created_at,
                    jobs.updated_at,
                    companies.name AS company_name,
                    categories.name AS category_name
                FROM jobs
                JOIN companies ON companies.id = jobs.company_id
                JOIN categories ON categories.id = jobs.category_id
                WHERE jobs.category_id = $1
                ORDER BY jobs.created_at DESC`,
			values: [categoryId],
		};

		const result = await pool.query(query);
		return result.rows;
	}

	async getCompanyById(companyId) {
		const query = {
			text: `SELECT id, user_id, name
                FROM companies
                WHERE id = $1`,
			values: [companyId],
		};

		const result = await pool.query(query);
		return result.rows[0];
	}

	async getCategoryById(categoryId) {
		const query = {
			text: `SELECT id, name
                FROM categories
                WHERE id = $1`,
			values: [categoryId],
		};

		const result = await pool.query(query);
		return result.rows[0];
	}

	async insertJob({
		companyId,
		categoryId,
		title,
		description,
		location,
		type,
		salaryMin,
		salaryMax,
	}) {
		const query = {
			text: `INSERT INTO jobs (
                    company_id,
                    category_id,
                    title,
                    description,
                    location,
                    type,
                    salary_min,
                    salary_max
                )
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
                RETURNING id, company_id, category_id, title, description, location, type, salary_min, salary_max, created_at, updated_at`,
			values: [
				companyId,
				categoryId,
				title,
				description,
				location,
				type,
				salaryMin,
				salaryMax,
			],
		};

		const result = await pool.query(query);
		return result.rows[0];
	}

	async updateJob({
		id,
		companyId,
		categoryId,
		title,
		description,
		location,
		type,
		salaryMin,
		salaryMax,
	}) {
		const query = {
			text: `UPDATE jobs
                SET company_id = COALESCE($2, company_id),
                    category_id = COALESCE($3, category_id),
                    title = COALESCE($4, title),
                    description = COALESCE($5, description),
                    location = COALESCE($6, location),
                    type = COALESCE($7, type),
                    salary_min = COALESCE($8, salary_min),
                    salary_max = COALESCE($9, salary_max),
                    updated_at = NOW()
                WHERE id = $1
                RETURNING id, company_id, category_id, title, description, location, type, salary_min, salary_max, created_at, updated_at`,
			values: [
				id,
				companyId,
				categoryId,
				title,
				description,
				location,
				type,
				salaryMin,
				salaryMax,
			],
		};

		const result = await pool.query(query);
		return result.rows[0];
	}

	async deleteJob(id) {
		const query = {
			text: `DELETE FROM jobs
                WHERE id = $1
                RETURNING id`,
			values: [id],
		};

		const result = await pool.query(query);
		return result.rows[0];
	}
}

export default new JobRepositories();
