import { Request, Response, NextFunction } from "express";
import { TELEGRAM_API_URL } from "../config/tgConfig";
import { appDataSchema } from "../config/schemas/appDataSchema";
import { formatDataMessage } from "../utils";
import db from "../config/db";

export const sendData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("HIT");
  const verificationResult = appDataSchema.safeParse(req.body);
  if (verificationResult.error) {
    const errorMessages = verificationResult.error.errors.map(
      (each) => each.message
    );
    res
      .status(400)
      .send(`Fields verification failed: ${errorMessages.join("; ")}`);
    return;
  }

  try {
    const { apiKey, ...restBody } = verificationResult.data;

    const user = await db.userData.findUnique({ where: { apiKey } });
    if (!user) {
      res.status(403).send("Wrong Api Key!");
      return;
    }

    const qs = new URLSearchParams({
      text: formatDataMessage(restBody),
    }).toString();
    await fetch(
      `${TELEGRAM_API_URL}/sendMessage?chat_id=${user.tgUserId}&${qs}&parse_mode=HTML`
    );
    res.status(200).send("ok");
    return;
  } catch (error) {
    next(error);
  }
};
