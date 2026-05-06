import { searchUsersFilter } from "@lib/users/services/user.server";
import { NextRequest, NextResponse } from "next/server";
import { getLogger } from "@config/logger.config";

const logger = getLogger("server");

export const dynamic = "force-dynamic";

/**
 * GET /api/users/search?email=...&firstName=...&lastName=...&isActive=...
 * Search users with optional filters — proxies to Spring Boot GET /users/search
 */
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  const filters = {
    email: searchParams.get("email") ?? undefined,
    firstName: searchParams.get("firstName") ?? undefined,
    lastName: searchParams.get("lastName") ?? undefined,
    isActive: searchParams.has("isActive")
      ? searchParams.get("isActive") === "true"
      : undefined,
  };

  const response = await searchUsersFilter(filters);
  return NextResponse.json(response, {
    status: 200,
  });
}
