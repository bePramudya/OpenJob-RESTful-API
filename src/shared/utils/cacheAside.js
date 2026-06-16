import CacheService from "../services/CacheService.js";

export const cacheAside = async (cacheKey, fetchFn, expirationInSecond) => {
	try {
		const cached = await CacheService.get(cacheKey);
		return { data: JSON.parse(cached), source: "cache" };
	} catch (_error) {
		const data = await fetchFn();
		if (data)
			await CacheService.set(
				cacheKey,
				JSON.stringify(data),
				expirationInSecond,
			);
		return { data, source: "database" };
	}
};
