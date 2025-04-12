import { NextFunction, Request, Response } from "express";
import { TELEGRAM_API_URL } from "./config/tgConfig";
import { getApiKey } from "./commands/getApiKey";

export const webhookRequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      message: {
        from: { id, is_bot },
        text,
      },
    } = req.body;

    if (!id || is_bot) {
      const qs = new URLSearchParams({
        text: "Only human interaction.",
      }).toString();
      await fetch(`${TELEGRAM_API_URL}/sendMessage?chat_id=${id}&${qs}`);
      res.status(200).send("ok");
      return;
    }

    if (text === "/get_api_key") {
      const { success, data, errorMessage } = await getApiKey(id);
      const qs = new URLSearchParams({
        text: success ? data!.toString() : errorMessage!,
      }).toString();
      await fetch(`${TELEGRAM_API_URL}/sendMessage?chat_id=${id}&${qs}`);
      res.status(200).send("ok");
      return;
    }

    const qs = new URLSearchParams({
      text: "Command not recognized.",
    }).toString();
    await fetch(`${TELEGRAM_API_URL}/sendMessage?chat_id=${id}&${qs}`);
    res.status(200).send("ok");
    return;
  } catch (error) {
    next(error);
  }
};
