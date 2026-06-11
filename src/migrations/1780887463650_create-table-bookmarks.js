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
	pgm.createTable("bookmarks", {
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
		job_id: {
			type: "uuid",
			notNull: true,
			references: '"jobs"(id)',
			onDelete: "CASCADE",
		},
		created_at: {
			type: "timestamptz",
			notNull: true,
			default: pgm.func("now()"),
		},
	});

	pgm.createIndex("bookmarks", "user_id");
	pgm.createIndex("bookmarks", "job_id");

	pgm.addConstraint(
		"bookmarks",
		"unique_user_job_bookmark",
		"UNIQUE (user_id, job_id)",
	);
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
	pgm.dropConstraint("bookmarks", "unique_user_job_bookmark");
	pgm.dropTable("bookmarks");
};
