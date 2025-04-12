import "dotenv/config";

const token = process.env.TG_BOT_TOKEN;
if (!token) throw new Error("Token not provided in env vars");

export const APP_PORT = Number(process.env.APP_PORT || 80);
export const TELEGRAM_API_URL = `https://api.telegram.org/bot${token}`;
export const WEBHOOK_PATH = `/webhook/${token}`;
export const WEBHOOK_URL = `${
  process.env.APP_DOMAIN || "localhost"
}${WEBHOOK_PATH}`;
