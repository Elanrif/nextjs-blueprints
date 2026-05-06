import { fetchAllUsers, createUser } from "@lib/users/services/user.server";
import { NextResponse } from "next/server";
import { getLogger } from "@config/logger.config";
import { ApiErrorResponse } from "@/shared/errors/api-error.server";

const logger = getLogger("server");

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const response = await fetchAllUsers();
    return NextResponse.json(response, {
      status: 200,
    });
  } catch (error) {
    const errMsg = ApiErrorResponse(error, "fetchAllUser");
    const status = errMsg.status || 500;
    logger.error(
      { status, message: errMsg.detail },
      "Error during user fetching",
    );
    return NextResponse.json({ ok: false, error: errMsg }, { status });
  }
}
