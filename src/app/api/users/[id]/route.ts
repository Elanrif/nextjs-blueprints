import { NextRequest, NextResponse } from "next/server";
import {
  deleteUser,
  getUserById,
  updateUser,
} from "@/lib/users/api/services/user.server";

export const dynamic = "force-dynamic";

type Params = Promise<{ id: string }>;

export async function GET(
  request: NextRequest,
  { params }: { params: Params },
) {
  const { id } = await params;

  /**
   * Issue: API route always returned 200 even when business logic failed.
   *
   * ⚠️ Root cause: NextResponse.json() defaults to 200 status.
   * Even if response.ok === false, the HTTP status remained 200.
   *
   * Fix: Check response.ok and return appropriate HTTP status code.
   */
  const userId = Number.parseInt(id, 10);
  const response = await getUserById(userId);
  return NextResponse.json(response, {
    status: response.ok ? 200 : response.error.status,
  });
}

/**
 * PATCH /api/users/[id]
 * Update a user by ID
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Params },
) {
  const { id } = await params;
  const userId = Number.parseInt(id, 10);
  const body = await request.json().catch(() => null);
  const response = await updateUser(userId, body);
  return NextResponse.json(response, {
    status: response.ok ? 200 : response.error.status,
  });
}

/**
 * DELETE /api/users/[id]
 * Delete a user by ID
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Params },
) {
  const { id } = await params;
  const userId = Number.parseInt(id, 10);
  const response = await deleteUser(userId);
  return NextResponse.json(response, {
    status: response.ok ? 200 : response.error.status,
  });
}
