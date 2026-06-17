import { createClient } from "redis";

const client = createClient({
	socket: { host: process.env.REDIS_SERVER },
});

client.on("error", (error) => console.error("Redis Client Error", error));
client.connect();

export default client;
