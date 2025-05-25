import { createClient, RedisClientType } from "redis"
import { env } from "./env.configs"

let redisClient: RedisClientType;

async function connectRedis() {

  redisClient = createClient({
    url: env.REDIS_URL,
    socket: {
      reconnectStrategy(retries) {
        console.log("retries",retries);
        
        if (retries > 5) {
          console.error("Max Redis reconnect attempts reached.");
          return false;
        }
        return Math.min(retries * 100, 2000);
      },
    },
 
  });

  redisClient.on("connect", () => {
    console.log("Connected ");
  });

  redisClient.on("error", (err) => {
    console.error("Redis connection error:", err);
  });

  await redisClient.connect();
}

export { connectRedis, redisClient };