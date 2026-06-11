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
	pgm.createType("user_role", ["user", "jobseeker", "employer", "admin"]);
	pgm.createType("job_type", [
		"full-time",
		"part-time",
		"contract",
		"internship",
	]);
	pgm.createType("application_status", [
		"pending",
		"reviewed",
		"accepted",
		"rejected",
	]);

	pgm.createTable("users", {
		id: {
			type: "uuid",
			primaryKey: true,
			default: pgm.func("gen_random_uuid()"),
			notNull: true,
		},
		name: {
			type: "varchar(50)",
			notNull: true,
			unique: true,
		},
		email: {
			type: "varchar(255)",
			notNull: true,
			unique: true,
		},
		password: {
			type: "varchar(255)",
			notNull: true,
		},
		role: {
			type: "user_role",
			notNull: true,
			default: "jobseeker",
		},
		created_at: {
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

	pgm.createIndex("users", "email");
	pgm.createIndex("users", "name");
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
	pgm.dropTable("users");

	pgm.dropType("application_status");
	pgm.dropType("job_type");
	pgm.dropType("user_role");
};
