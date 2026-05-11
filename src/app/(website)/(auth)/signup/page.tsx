import { SignUpView } from "@/lib/auth/components/sign-up-view";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign up",
};


export default function SignUpPage() {
  return <SignUpView />;
}
