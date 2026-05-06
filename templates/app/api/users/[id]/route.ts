import { NextRequest, NextResponse } from "next/server";
import { fetchUserById } from "@/lib/users/services/user.server";

export const dynamic = "force-dynamic";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const { id } = await params;
  const userId = Number.parseInt(id, 10);

  const response = await fetchUserById(userId);
  return NextResponse.json(response, {
    status: 200,
  });
}
