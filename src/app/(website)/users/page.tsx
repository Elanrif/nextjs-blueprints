import PageContainer from "@/lib/_/components/layout/page-container";
import { searchParamsCache } from "@/lib/searchparams";
import { UserFormSheetTrigger } from "@/lib/users/components/user-form-sheet";
import UserListingPage from "@/lib/users/components/user-listing";
import type { SearchParams } from "nuqs/server";

export const metadata = {
  title: "Dashboard: Users",
};

type PageProps = {
  searchParams: Promise<SearchParams>;
};

export default async function UsersPage(props: PageProps) {
  const searchParams = await props.searchParams;
  searchParamsCache.parse(searchParams);

  return (
    <PageContainer
      pageTitle="Users"
      pageDescription="Manage users (React Query + nuqs table pattern.)"
      pageHeaderAction={<UserFormSheetTrigger />}
    >
      <UserListingPage />
    </PageContainer>
  );
}
