import { NextRequest, NextResponse } from "next/server";
import {
  deleteUser,
  getUserById,
  updateUser,
} from "@/lib/users/api/services/user.server";

export const dynamic = "force-dynamic";

type Params = Promise<{ id: string }>;

/**
 * GET /api/users/[id]
 * Fetch a user by ID
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Params },
) {
  const { id } = await params;
  const userId = Number.parseInt(id, 10);
  const response = await getUserById(userId);
  return NextResponse.json(response);
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
  if (!response.ok) {
    const error = response.error;
    return NextResponse.json(response, {
      status: error.status,
    });
  }
  return NextResponse.json(response);
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
  return NextResponse.json(response);
}
