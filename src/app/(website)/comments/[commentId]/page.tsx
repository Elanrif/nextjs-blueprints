import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/query-client";
import { commentByIdOptions } from "@/lib/comments/api/queries/queries.server";
import CommentViewPage from "@/lib/comments/components/comment-view-page";
import PageContainer from "@/lib/_/components/layout/page-container";

export const metadata = {
  title: "Dashboard : Comment View",
};

type PageProps = { params: Promise<{ commentId: string }> };

export default async function Page(props: PageProps) {
  const params = await props.params;
  const queryClient = getQueryClient();

  if (params.commentId !== "new") {
    void queryClient.prefetchQuery(
      commentByIdOptions(Number(params.commentId)),
    );
  }

  return (
    <PageContainer>
      <div className="flex-1 space-y-4">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <CommentViewPage commentId={params.commentId} />
        </HydrationBoundary>
      </div>
    </PageContainer>
  );
}
