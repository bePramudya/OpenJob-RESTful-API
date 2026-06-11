/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const up = (pgm) => {
	pgm.createTable("documents", {
		id: {
			type: "uuid",
			primaryKey: true,
			default: pgm.func("gen_random_uuid()"),
			notNull: true,
		},
		user_id: {
			type: "uuid",
			notNull: true,
			references: '"users"(id)',
			onDelete: "CASCADE",
		},
		filename: {
			type: "varchar(255)",
			notNull: true,
		},
		file_url: {
			type: "varchar(500)",
			notNull: true,
			comment: "Cloud storage URL (S3, Cloudinary, etc)",
		},
		file_type: {
			type: "varchar(50)",
			notNull: true,
			comment: "MIME type e.g. application/pdf, image/png",
		},
		file_size: {
			type: "integer",
			notNull: true,
			comment: "File size in bytes",
		},
		uploaded_at: {
			type: "timestamptz",
			notNull: true,
			default: pgm.func("now()"),
		},
	});

	pgm.createIndex("documents", "user_id");

	pgm.addConstraint("documents", "file_size_positive", "CHECK (file_size > 0)");
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
	pgm.dropConstraint("documents", "file_size_positive");
	pgm.dropTable("documents");
};
