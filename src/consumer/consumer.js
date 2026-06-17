import ApplicationRepositories from "../features/applications/application.repositories.js";
import MailSender from "../shared/config/MailSender.js";
import { getChannel } from "../shared/config/rabbitmq.js";
import NotificationListener from "./NotificationListener.js";

const QUEUE_NAME = "new_application";

const init = async () => {
	const channel = await getChannel();
	const mailSender = new MailSender();
	const listener = new NotificationListener(
		ApplicationRepositories,
		mailSender,
	);
	// listener.setChannel(channel);

	await channel.assertQueue(QUEUE_NAME, { durable: true });
	console.log(`Consumer siap, menunggu pesan dari queue "${QUEUE_NAME}"...`);

	channel.consume(QUEUE_NAME, listener.listen, { noAck: false });
};

init().catch((error) => {
	console.error("Consumer gagal start:", error);
	process.exit(1);
});
