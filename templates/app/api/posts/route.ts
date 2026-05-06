import { NextRequest, NextResponse } from "next/server";
import { fetchPosts } from "@/lib/posts/services/post.server";
import { getLogger } from "@config/logger.config";
import { PostFilters } from "@/lib/posts/models/post.model";

const logger = getLogger("server");

export const dynamic = "force-dynamic";

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
  const response = await fetchPosts(filters);
  return NextResponse.json(response, {
    status: 200,
  });
}
