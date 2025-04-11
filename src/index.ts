import { Telegraf } from "telegraf";
import "dotenv/config";

const token = process.env.TG_BOT_TOKEN;
if (!token) throw new Error("Token not provided in env vars");

const bot = new Telegraf(token);
bot.start((ctx) => ctx.reply("Welcome to Ping Lead Bot!"));
bot.launch(() => console.log("Ping Lead Bot is running"));
