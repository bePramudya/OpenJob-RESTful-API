import {
	ForbiddenError,
	NotFoundError,
	ValidationError,
} from "../../shared/errors/index.js";
import { isUuid } from "../../shared/utils/isUuid.js";
import CompanyRepositories from "./company.repositories.js";

export const getCompaniesService = async () => {
	const companies = await CompanyRepositories.getCompanies();
	return companies;
};

export const getCompanyByIdService = async (id) => {
	if (!id || !isUuid(id)) throw new NotFoundError("Company Id not found");

	const { data: company, source } =
		await CompanyRepositories.getCompanyById(id);

	if (!company) throw new NotFoundError("Company");

	return { company, source };
};

export const createCompanyService = async ({
	userId,
	name,
	description,
	location,
	website,
}) => {
	if (!userId) throw new ValidationError("User ID is required");
	if (!name) throw new ValidationError("Company name is required");

	const company = await CompanyRepositories.insertCompany({
		userId,
		name,
		description,
		location,
		website,
	});

	return company;
};

export const updateCompanyService = async ({
	id,
	userId,
	name,
	description,
	location,
	website,
}) => {
	if (!id || !isUuid(id)) throw new NotFoundError("Company ID not found");
	if (!userId) throw new ValidationError("User ID is required");

	const company = await CompanyRepositories.getCompanyById(id);
	if (!company) throw new NotFoundError("Company");

	if (company.user_id !== userId) {
		throw new ForbiddenError("You are not allowed to update this company");
	}

	const updatedCompany = await CompanyRepositories.updateCompany({
		id,
		name,
		description,
		location,
		website,
	});

	return updatedCompany;
};

export const deleteCompanyService = async ({ id, userId }) => {
	if (!id || !isUuid(id)) throw new NotFoundError("Company ID not found");
	if (!userId) throw new ValidationError("User ID is required");

	const company = await CompanyRepositories.getCompanyById(id);
	if (!company) throw new NotFoundError("Company");

	if (company.user_id !== userId) {
		throw new ForbiddenError("You are not allowed to delete this company");
	}

	await CompanyRepositories.deleteCompany(id);
};
