import { Redis } from "@upstash/redis";

// поддержка и SvelteKit, и Node-скриптов
const redis_url =
    process.env.VITE_UPSTASH_REDIS_REST_URL ||
    import.meta.env?.VITE_UPSTASH_REDIS_REST_URL;
const redis_token =
    process.env.VITE_UPSTASH_REDIS_REST_TOKEN ||
    import.meta.env?.VITE_UPSTASH_REDIS_REST_TOKEN;

if (!redis_url || !redis_token) {
    throw new Error("Redis config is missing in environment variables");
}

export const redis = new Redis({
    url: redis_url,
    token: redis_token,
});
