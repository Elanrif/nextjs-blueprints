import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/query-client";
import { userByIdOptions } from "@/lib/users/api/queries/queries.server";
import UserViewPage from "@/lib/users/components/user-view-page";
import PageContainer from "@/lib/_/components/layout/page-container";

export const metadata = {
  title: "Dashboard : User View",
};

type PageProps = { params: Promise<{ userId: string }> };

export default async function Page(props: PageProps) {
  const params = await props.params;
  const queryClient = getQueryClient();

  if (params.userId !== "new") {
    void queryClient.prefetchQuery(userByIdOptions(Number(params.userId)));
  }

  return (
    <PageContainer>
      <div className="flex-1 space-y-4">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <UserViewPage userId={params.userId} />
        </HydrationBoundary>
      </div>
    </PageContainer>
  );
}
