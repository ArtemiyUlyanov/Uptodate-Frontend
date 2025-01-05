import TopMenu from "@/components/menu/TopMenu";
import ExplorePageContent from "@/containers/explore/ExplorePageContent";
import ExplorePageGreeting from "@/containers/explore/ExplorePageGreeting";
import LoginPageContent from "@/containers/login/LoginPageContent";
import ExplorePageLayout from "@/layouts/explore/ExplorePageLayout";
import LoginPageLayout from "@/layouts/login/LoginPageLayout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import clsx from "clsx";
import Image from "next/image";

const LoginPage = () => {
  return (
    <LoginPageLayout>
      <LoginPageContent />
    </LoginPageLayout>
  );
}

export default LoginPage;