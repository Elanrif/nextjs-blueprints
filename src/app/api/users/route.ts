import { NextRequest, NextResponse } from "next/server";
import { createUser, getUsers } from "@/lib/users/api/services/user.server";
import type { UserFilters } from "@/lib/users/api/types";

export const dynamic = "force-dynamic";

/**
 * GET /api/users
 * Fetch all users
 */
export async function GET(_request: NextRequest) {
  const sp =
    _request.nextUrl?.searchParams ?? new URL(_request.url).searchParams;
  const filters: UserFilters = {
    page: sp.has("page") ? Number(sp.get("page")) : undefined,
    limit: sp.has("limit") ? Number(sp.get("limit")) : undefined,
    roles: sp.get("roles") ?? undefined,
    search: sp.get("search") ?? undefined,
    sort: sp.get("sort") ?? undefined,
  };

  const response = await getUsers(filters);
  return NextResponse.json(response);
}

/**
 * POST /api/users
 * Create a new user
 */
export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const response = await createUser(body);
  return NextResponse.json(response);
}
