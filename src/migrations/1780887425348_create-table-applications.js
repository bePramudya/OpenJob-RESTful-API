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
	pgm.createTable("applications", {
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
		status: {
			type: "application_status",
			notNull: true,
			default: "pending",
		},
		cover_letter: {
			type: "text",
			notNull: false,
		},
		applied_at: {
			type: "timestamptz",
			notNull: true,
			default: pgm.func("now()"),
		},
		updated_at: {
			type: "timestamptz",
			notNull: true,
			default: pgm.func("now()"),
		},
	});

	pgm.createIndex("applications", "user_id");
	pgm.createIndex("applications", "job_id");
	pgm.createIndex("applications", "status");

	pgm.addConstraint(
		"applications",
		"unique_user_job_application",
		"UNIQUE (user_id, job_id)",
	);
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
	pgm.dropConstraint("applications", "unique_user_job_application");
	pgm.dropTable("applications");
};
