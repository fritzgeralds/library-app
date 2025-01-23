import { Ratelimit } from "@upstash/ratelimit";
import redis from "@/db/redis";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.fixedWindow(5, "1m"),
  analytics: true,
  prefix: "@upstash/ratelimit",
});

export default ratelimit;

export const checkRateLimit = async (): Promise<void> => {
  const ip = (await headers()).get("x-forwarded-for") ?? "127.0.0.1";
  const { success } = await ratelimit.limit(ip);

  if (!success) {
    redirect("/too-fast");
  }
};
