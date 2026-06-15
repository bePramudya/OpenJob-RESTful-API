import response from "../../shared/utils/response.js";
import {
	createCompanyService,
	deleteCompanyService,
	getCompaniesService,
	getCompanyByIdService,
	updateCompanyService,
} from "./company.services.js";

export const getCompaniesController = async (_req, res) => {
	const companies = await getCompaniesService();
	response(res, 200, "Companies retrieved successfully", { companies });
};
export const getCompanyByIdController = async (req, res) => {
	const { id } = req.validated.params;

	const company = await getCompanyByIdService(id);
	response(res, 200, "Company detail retrieved successfully", company);
};

export const createCompanyController = async (req, res) => {
	const { name, description, location, website } = req.validated.body;
	const userId = req.user.id;

	const company = await createCompanyService({
		userId,
		name,
		description,
		location,
		website,
	});

	response(res, 201, "Company created successfully", company);
};

export const updateCompanyController = async (req, res) => {
	const { id } = req.validated.params;
	const { name, description, location, website } = req.validated.body;
	const userId = req.user.id;

	const company = await updateCompanyService({
		id,
		userId,
		name,
		description,
		location,
		website,
	});

	response(res, 200, "Company updated successfully", company);
};

export const deleteCompanyController = async (req, res) => {
	const { id } = req.validated.params;
	const userId = req.user.id;

	await deleteCompanyService({ id, userId });
	response(res, 200, "Company deleted successfully");
};
