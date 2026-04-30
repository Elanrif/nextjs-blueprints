import { NextRequest, NextResponse } from "next/server";
import { signIn } from "@/lib/auth/api/services/auth.server";
import { Login } from "@/lib/auth/api/types";

export const dynamic = "force-dynamic";

/**
 * POST /api/auth/login
 * Sign in a user
 */
export async function POST(req: NextRequest) {
  const body = (await req.json()) as Login;
  const response = await signIn(body);
  return NextResponse.json(response);
}
