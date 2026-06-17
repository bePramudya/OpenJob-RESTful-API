import client from "../config/redisClient.js";

class CacheService {
	constructor(client) {
		this._client = client;
	}

	async set(key, value, expirationInSecond = 3600) {
		await this._client.set(key, value, { EX: expirationInSecond });
	}

	async get(key) {
		const result = await this._client.get(key);
		if (result === null) throw new Error("Cache tidak ditemukan");
		return result;
	}

	delete(key) {
		return this._client.del(key);
	}
}

export default new CacheService(client);
