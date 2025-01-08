'use client';

import TopMenu from "@/components/menu/TopMenu";
import ExplorePageContent from "@/containers/explore/ExplorePageContent";
import ExplorePageGreeting from "@/containers/explore/ExplorePageGreeting";
import ExplorePageLayout from "@/layouts/explore/ExplorePageLayout";
import { defaultLocale } from "@/next-intl.config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import clsx from "clsx";
import { NextIntlClientProvider, useTranslations } from "next-intl";
import Image from "next/image";

const ExplorePage = () => {
  const translate = useTranslations('common.menu');
  
  return (
    <ExplorePageLayout
      topMenu={
        <TopMenu 
          templates={[
            {
              text: translate('home_page_link'),
              link: '/',
              selected: false
            },
            {
              text: translate('explore_page_link'),
              link: '/explore',
              selected: true
            },
            {
              text: translate('about_us_page_link'),
              link: '/about-us',
              selected: false
            },
            {
              text: translate('categories_page_link'),
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

export default ExplorePage;