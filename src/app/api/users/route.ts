import { NextRequest, NextResponse } from "next/server";
import { createUser, getUsers } from "@/lib/users/api/services/user.server";
import type { UserFilters } from "@/lib/users/api/types";

export const dynamic = "force-dynamic";

export async function GET(_request: NextRequest) {
  /**
   * Issue: API route always returned 200 even when business logic failed.
   *
   * ⚠️ Root cause: NextResponse.json() defaults to 200 status.
   * Even if response.ok === false, the HTTP status remained 200.
   *
   * Fix: Check response.ok and return appropriate HTTP status code.
   */
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
  return NextResponse.json(response, {
    status: response.ok ? 200 : response.error.status,
  });
}

/**
 * POST /api/users
 * Create a new user
 */
export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const response = await createUser(body);
  return NextResponse.json(response, {
    status: response.ok ? 201 : response.error.status,
  });
}
