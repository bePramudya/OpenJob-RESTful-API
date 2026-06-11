import response from "../../shared/utils/response.js";
import {
	createCompanyService,
	deleteCompanyService,
	getCompaniesService,
	getCompanyByIdService,
	updateCompanyService,
} from "./company.services.js";

export const getCompaniesController = async (_req, res, next) => {
	try {
		const companies = await getCompaniesService();
		response(res, 200, "Companies retrieved successfully", { companies });
	} catch (error) {
		next(error);
	}
};
export const getCompanyByIdController = async (req, res, next) => {
	const { id } = req.validated.params;

	try {
		const company = await getCompanyByIdService(id);
		response(res, 200, "Company detail retrieved successfully", company);
	} catch (error) {
		next(error);
	}
};

export const createCompanyController = async (req, res, next) => {
	const { name, description, location, website } = req.validated.body;
	const userId = req.user.id;

	try {
		const company = await createCompanyService({
			userId,
			name,
			description,
			location,
			website,
		});

		response(res, 201, "Company created successfully", company);
	} catch (error) {
		next(error);
	}
};

export const updateCompanyController = async (req, res, next) => {
	const { id } = req.validated.params;
	const { name, description, location, website } = req.validated.body;
	const userId = req.user.id;

	try {
		const company = await updateCompanyService({
			id,
			userId,
			name,
			description,
			location,
			website,
		});

		response(res, 200, "Company updated successfully", company);
	} catch (error) {
		next(error);
	}
};

export const deleteCompanyController = async (req, res, next) => {
	const { id } = req.validated.params;
	const userId = req.user.id;

	try {
		await deleteCompanyService({ id, userId });
		response(res, 200, "Company deleted successfully");
	} catch (error) {
		next(error);
	}
};
