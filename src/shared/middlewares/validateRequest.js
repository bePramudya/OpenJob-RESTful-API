const validateRequest =
	(schema, source = "body") =>
	(req, _res, next) => {
		const { error, value } = schema.validate(req[source], {
			abortEarly: false,
			allowUnknown: false,
			stripUnknown: true,
		});

		if (error) return next(error);

		req.validated = { ...req.validated, ...{ [source]: value } };
		next();
	};

export default validateRequest;
