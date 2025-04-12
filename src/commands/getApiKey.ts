import { v4 } from "uuid";
import { UserData } from "@prisma/client";
import { createAppResponse } from "../utils";
import db from "../config/db";

export const getApiKey = async (tgUserId: number) => {
  let user: UserData | null = null;
  try {
    user = await db.userData.upsert({
      where: { tgUserId },
      update: {},
      create: { tgUserId, apiKey: v4() },
    });

    return createAppResponse({
      success: true,
      data: user.apiKey,
    });
  } catch {
    return createAppResponse({
      success: false,
      errorMessage: "An error occured while getting the Api key",
    });
  }
};
