import { Client as WorkflowClient } from "@upstash/workflow";
import { Client as QStashClient, resend } from "@upstash/qstash";
import config from "@/lib/config";

const {
  env: {
    upstash: { qstashUrl, qstashToken },
    resendToken,
  },
} = config;

export const workflowClient = new WorkflowClient({
  baseUrl: qstashUrl,
  token: qstashToken,
});

const qstashClient = new QStashClient({ token: qstashToken });

export const sendEmail = async ({
  email,
  subject,
  message,
}: {
  email: string;
  subject: string;
  message: string;
}) => {
  // Implement email sending logic here
  await qstashClient.publishJSON({
    api: {
      name: "email",
      provider: resend({ token: resendToken }),
    },
    body: {
      from: "BookWise <onboarding@dischner.me>",
      to: [email],
      subject,
      html: message,
    },
  });
};
