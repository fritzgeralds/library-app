import { Client, resend } from "@upstash/qstash";
import config from "@/lib/config";

const {
  env: {
    upstash: { qstashToken },
    resendToken,
  },
} = config;

const client = new Client({ token: qstashToken });

await client.publishJSON({
  api: {
    name: "email",
    provider: resend({ token: resendToken }),
  },
  body: {
    from: "Acme <onboarding@resend.dev>",
    to: ["delivered@resend.dev"],
    subject: "Hello World",
    html: "<p>It works!</p>",
  },
});
