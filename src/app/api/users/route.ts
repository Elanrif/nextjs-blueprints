import { NextRequest, NextResponse } from "next/server";
import { createUser, getUsers } from "@/lib/users/api/services/user.server";

export const dynamic = "force-dynamic";

/**
 * GET /api/users
 * Fetch all users
 */
export async function GET(_request: NextRequest) {
  const response = await getUsers();
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
