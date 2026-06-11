import Joi from "joi";

export const authenticationSchema = Joi.object({
	email: Joi.string().email().required(),
	password: Joi.string().min(8).required(),
});

export const getUserProfileSchema = Joi.object({
	id: Joi.string().uuid().required(),
});

// export const UserDTO = {
// 	toResponse(row) {
// 		return {
// 			id: row.id,
// 			name: row.name,
// 			email: row.email,
// 			createdAt: row.created_at,
// 		};
// 	},

// 	toResponseList(rows) {
// 		return rows.map(UserDTO.toResponse);
// 	},
// };
