import SignInView from "@/lib/auth/components/sign-in-view";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign in",
};

export default function SignInPage() {
  return <SignInView />;
}
