import ApplicationRepositories from "../src/features/applications/application.repositories.js";
import MailSender from "./MailSender.js";
import NotificationListener from "./NotificationListener.js";
import { getChannel } from "./rabbitmq.js";

const QUEUE_NAME = "new_application";

const init = async () => {
	const channel = await getChannel();
	const mailSender = new MailSender();
	const listener = new NotificationListener(
		ApplicationRepositories,
		mailSender,
	);

	await channel.assertQueue(QUEUE_NAME, { durable: true });
	console.log(`Consumer siap, menunggu pesan dari queue "${QUEUE_NAME}"...`);

	channel.consume(QUEUE_NAME, listener.listen, { noAck: true });
};

init().catch((error) => {
	console.error("Consumer gagal start:", error);
	process.exit(1);
});
