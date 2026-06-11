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
	pgm.createTable("refresh_tokens", {
		id: {
			type: "uuid",
			primaryKey: true,
			default: pgm.func("gen_random_uuid()"),
		},
		user_id: {
			type: "uuid",
			references: "users",
			onDelete: "CASCADE",
		},
		token: { type: "TEXT", notNull: true, unique: true },
		expires_at: {
			type: "timestamptz",
			notNull: true,
			default: pgm.func("now()"),
		},
		created_at: {
			type: "timestamptz",
			notNull: true,
			default: pgm.func("now()"),
		},
	});
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
	pgm.dropTable("refresh_tokens");
};
