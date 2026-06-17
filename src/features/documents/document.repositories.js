import pool from "../../shared/config/pool.js";

class DocumentRepositories {
	async getDocuments() {
		const query = {
			text: `SELECT
                    documents.id,
                    documents.user_id,
                    documents.filename,
                    documents.file_url,
                    documents.file_type,
                    documents.file_size,
                    documents.uploaded_at,
                    users.name AS user_name,
                    users.email AS user_email
                FROM documents
                JOIN users ON users.id = documents.user_id
                ORDER BY documents.uploaded_at DESC`,
		};

		const result = await pool.query(query);
		return result.rows;
	}

	async getDocumentById(id) {
		const query = {
			text: `SELECT
                    documents.id,
                    documents.user_id,
                    documents.filename,
                    documents.file_url,
                    documents.file_type,
                    documents.file_size,
                    documents.uploaded_at,
                    users.name AS user_name,
                    users.email AS user_email
                FROM documents
                JOIN users ON users.id = documents.user_id
                WHERE documents.id = $1`,
			values: [id],
		};

		const result = await pool.query(query);
		return result.rows[0];
	}

	async insertDocument({
		userId,
		filename,
		originalName,
		fileUrl,
		fileType,
		fileSize,
	}) {
		const query = {
			text: `INSERT INTO documents (
                    user_id,
                    filename,
                    original_name,
                    file_url,
                    file_type,
                    file_size
                )
                VALUES ($1, $2, $3, $4, $5, $6)
                RETURNING id, filename, original_name, file_size`,
			values: [userId, filename, originalName, fileUrl, fileType, fileSize],
		};

		const result = await pool.query(query);
		return result.rows[0];
	}

	async deleteDocument(id) {
		const query = {
			text: `DELETE FROM documents
                WHERE id = $1
                RETURNING id, file_url`,
			values: [id],
		};

		const result = await pool.query(query);
		return result.rows[0];
	}
}

export default new DocumentRepositories();
