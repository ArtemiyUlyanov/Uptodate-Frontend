import TopMenu from "@/components/menu/TopMenu";
import ExplorePageContent from "@/containers/explore/ExplorePageContent";
import ExplorePageGreeting from "@/containers/explore/ExplorePageGreeting";
import ExplorePageLayout from "@/layouts/ExplorePageLayout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import clsx from "clsx";
import Image from "next/image";

const Explore = () => {
  return (
    <ExplorePageLayout
      topMenu={
        <TopMenu 
        templates={[
          {
            text: 'Home',
            link: '/',
            selected: false
          },
          {
            text: 'Explore',
            link: '/explore',
            selected: true
          },
          {
            text: 'About us',
            link: '/about-us',
            selected: false
          },
          {
            text: 'Categories',
            link: '/categories',
            selected: false
          }
        ]}
      />
      }
    >
      <ExplorePageGreeting />
      <ExplorePageContent />
    </ExplorePageLayout>
  );
}

export default Explore;