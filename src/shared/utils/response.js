const response = (res, statusCode, message, data, source) => {
	if (source === "cache") res.set("X-Data-Source", "cache");
	if (source === "database") res.set("X-Data-Source", "database");

	return res
		.status(statusCode)
		.json({
			code: statusCode,
			status: statusCode < 400 ? "success" : "failed",
			message,
			data,
		})
		.end();
};

export default response;
