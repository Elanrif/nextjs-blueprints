import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/query-client";
import { postByIdOptions } from "@/lib/posts/api/queries/queries.server";
import PostViewPage from "@/lib/posts/components/post-view-page";
import PageContainer from "@/lib/_/components/layout/page-container";

export const metadata = {
  title: "Dashboard : Post View",
};

type PageProps = { params: Promise<{ postId: string }> };

export default async function Page(props: PageProps) {
  const params = await props.params;
  const queryClient = getQueryClient();

  if (params.postId !== "new") {
    void queryClient.prefetchQuery(postByIdOptions(Number(params.postId)));
  }

  return (
    <PageContainer>
      <div className="flex-1 space-y-4">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <PostViewPage postId={params.postId} />
        </HydrationBoundary>
      </div>
    </PageContainer>
  );
}
