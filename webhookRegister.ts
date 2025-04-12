import { TELEGRAM_API_URL, WEBHOOK_URL } from "./src/config/tgConfig";

fetch(
  `${TELEGRAM_API_URL}/setWebhook?url=${WEBHOOK_URL}&drop_pending_updates=true`
)
  .then(() => {
    console.log("Successfully registered webhook");
  })
  .catch(() => {
    console.error("An error occured while registering webhook");
  });
