import { NextRequest, NextResponse } from "next/server";
import { PostFilters } from "@/lib/posts/api/types";
import { getPosts } from "@/lib/posts/api/services/post.server";

export const dynamic = "force-dynamic";

/**
 * GET /api/posts
 * Fetch all posts with optional filters
 */
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const filters: PostFilters = {
    page: searchParams.get("page")
      ? Number(searchParams.get("page"))
      : undefined,
    size: searchParams.get("size")
      ? Number(searchParams.get("size"))
      : undefined,
    sort: searchParams.get("sort") ?? undefined,
  };

  const response = await getPosts(filters);
  return NextResponse.json(response);
}
