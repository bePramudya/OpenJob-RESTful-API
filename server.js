import app from "./app.js";

const port = process.env.PORT || 3000;

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});

process.on("SIGTERM", () => {
	server.close(() => {
		console.log("Server closed gracefully");
		process.exit(0);
	});
});

process.on("unhandledRejection", (err) => {
	console.error("Unhandled rejection:", err);
	server.close(() => process.exit(1));
});
