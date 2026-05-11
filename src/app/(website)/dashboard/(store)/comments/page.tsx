import { Icons } from "@/lib/_/components/icons";
import PageContainer from "@/lib/_/components/layout/page-container";
import { buttonVariants } from "@/lib/_/components/ui/button";
import { searchParamsCache } from "@/lib/searchparams";
import CommentListingPage from "@/lib/comments/components/comment-listing";
import { cn } from "@/lib/utils";
import Link from "next/link";
import type { SearchParams } from "nuqs/server";

export const metadata = {
  title: "Dashboard: Comments",
};

type PageProps = {
  searchParams: Promise<SearchParams>;
};

export default async function CommentsPage(props: PageProps) {
  const searchParams = await props.searchParams;
  searchParamsCache.parse(searchParams);

  return (
    <PageContainer
      pageTitle="Comments"
      pageDescription="Manage comments (React Query + nuqs table pattern.)"
      pageHeaderAction={
        <Link
          href="/comments/new"
          className={cn(buttonVariants(), "text-xs md:text-sm")}
        >
          <Icons.add className="mr-2 h-4 w-4" /> Add New
        </Link>
      }
    >
      <CommentListingPage />
    </PageContainer>
  );
}
