import amqp from "amqplib";

const buildAmqpUrl = () => {
	if (process.env.AMQP_URL) {
		return process.env.AMQP_URL;
	}

	const host = process.env.RABBITMQ_HOST;
	const port = process.env.RABBITMQ_PORT || 5672;
	const user = process.env.RABBITMQ_USER || "guest";
	const password = process.env.RABBITMQ_PASSWORD || "guest";

	if (!host) {
		throw new Error("RABBITMQ_HOST is required when AMQP_URL is not set");
	}

	return `amqp://${user}:${password}@${host}:${port}`;
};

let connection = null;
let channel = null;

const getChannel = async () => {
	if (channel) {
		return channel;
	}

	connection = await amqp.connect(buildAmqpUrl());

	connection.on("error", (err) => {
		console.error("RabbitMQ connection error:", err.message);
	});

	connection.on("close", () => {
		console.warn("RabbitMQ connection closed");
		connection = null;
		channel = null;
	});

	channel = await connection.createChannel();
	return channel;
};

const closeConnection = async () => {
	if (channel) await channel.close();
	if (connection) await connection.close();
	channel = null;
	connection = null;
};

export { closeConnection, getChannel };
