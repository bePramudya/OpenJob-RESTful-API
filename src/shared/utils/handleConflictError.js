import { ConflictError } from "../errors";

export const handleConflictError = (conflictMessage) => (err) => {
	if (err.code === "23505") throw new ConflictError(conflictMessage);
	throw err;
};
