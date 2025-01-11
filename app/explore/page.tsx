'use client';

import TopMenu from "@/components/menu/TopMenu";
import ExplorePageContent from "@/containers/explore/ExplorePageContent";
import ExplorePageGreeting from "@/containers/explore/ExplorePageGreeting";
import AuthContainer from "@/containers/auth/AuthContainer";
import { useDictionary } from "@/hooks/useDictionary";
import ExplorePageLayout from "@/layouts/explore/ExplorePageLayout";
import { defaultLocale } from "@/next-intl.config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import clsx from "clsx";
import { NextIntlClientProvider, useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect } from "react";

const ExplorePage = () => {
  // const translate = useTranslations('common.menu');
  const { translate } = useDictionary();
  
  return (
    <ExplorePageLayout
      topMenu={
        <TopMenu 
          templates={[
            {
              text: translate('common.menu.home_page_link'),
              link: '/',
              selected: false
            },
            {
              text: translate('common.menu.explore_page_link'),
              link: '/explore',
              selected: true
            },
            {
              text: translate('common.menu.about_us_page_link'),
              link: '/about-us',
              selected: false
            },
            {
              text: translate('common.menu.categories_page_link'),
              link: '/categories',
              selected: false
            }
          ]}
        />
      }
    >
      <ExplorePageGreeting />
      <ExplorePageContent />
      <AuthContainer />
    </ExplorePageLayout>
  );
}

export default ExplorePage;