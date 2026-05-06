import { NextRequest, NextResponse } from "next/server";
import { fetchPostById } from "@/lib/posts/services/post.server";
export const dynamic = "force-dynamic";

type Params = Promise<{ id: string }>;

/**
 * GET /api/posts/[id]
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Params },
) {
  const { id } = await params;
  const postId = Number.parseInt(id, 10);

  const response = await fetchPostById(postId);
  return NextResponse.json(response, { status: 200 });
}
