import { getChannel } from "../../../consumer/rabbitmq.js";

const QUEUE_NAME = "new_application";

const publishNewApplication = async (applicationId) => {
	const channel = await getChannel();

	await channel.assertQueue(QUEUE_NAME, { durable: true });

	const payload = JSON.stringify({ application_id: applicationId });

	channel.sendToQueue(QUEUE_NAME, Buffer.from(payload), {
		persistent: true,
	});
};

export { publishNewApplication, QUEUE_NAME };
