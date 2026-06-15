import { ConflictError } from "../errors/index.js";

export const handleConflictError = (conflictMessage) => (err) => {
	if (err.code === "23505") throw new ConflictError(conflictMessage);
	throw err;
};
