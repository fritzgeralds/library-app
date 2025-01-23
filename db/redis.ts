import { Redis } from "@upstash/redis";
import config from "@/lib/config";

const {
  env: {
    upstash: { redisUrl, redisToken },
  },
} = config;

const redis = new Redis({
  url: redisUrl,
  token: redisToken,
});

export default redis;
