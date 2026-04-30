import { NextRequest, NextResponse } from "next/server";
import { signUp } from "@/lib/auth/api/services/auth.server";
import { Registrer } from "@/lib/auth/api/types";

export const dynamic = "force-dynamic";

/**
 * POST /api/auth/register
 * Register a new user
 */
export async function POST(req: NextRequest) {
  const body = (await req.json()) as Registrer;
  const res = await signUp(body);
  return NextResponse.json(res);
}
