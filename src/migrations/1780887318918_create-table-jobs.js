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
	pgm.createTable("jobs", {
		id: {
			type: "uuid",
			primaryKey: true,
			default: pgm.func("gen_random_uuid()"),
			notNull: true,
		},
		company_id: {
			type: "uuid",
			notNull: true,
			references: '"companies"(id)',
			onDelete: "CASCADE",
		},
		category_id: {
			type: "uuid",
			notNull: true,
			references: '"categories"(id)',
			onDelete: "RESTRICT",
		},
		title: {
			type: "varchar(100)",
			notNull: true,
		},
		description: {
			type: "text",
			notNull: true,
		},
		location: {
			type: "varchar(150)",
			notNull: false,
		},
		type: {
			type: "job_type",
			notNull: true,
		},
		salary_min: {
			type: "integer",
			notNull: false,
		},
		salary_max: {
			type: "integer",
			notNull: false,
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

	pgm.createIndex("jobs", "company_id");
	pgm.createIndex("jobs", "category_id");
	pgm.createIndex("jobs", "type");

	pgm.createIndex("jobs", ["salary_min", "salary_max"]);

	pgm.addConstraint(
		"jobs",
		"salary_range_check",
		"CHECK (salary_min IS NULL OR salary_max IS NULL OR salary_min <= salary_max)",
	);
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
	pgm.dropConstraint("jobs", "salary_range_check");
	pgm.dropTable("jobs");
};
