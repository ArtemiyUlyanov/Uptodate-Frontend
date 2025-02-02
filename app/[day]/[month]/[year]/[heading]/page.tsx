'use client';

import AppFooter from "@/components/AppFooter";
import Article from "@/components/articles/Article";
import ArticleRecommendations from "@/components/articles/ArticleRecommendations";
import TopMenu from "@/components/menu/TopMenu";
import { useArticle } from "@/hooks/articles/useArticle";
import { useDictionary } from "@/hooks/useDictionary";
import MenuPageLayout from "@/layouts/MenuPageLayout";
import { formatDateToISO } from "@/utils/date_utils";
import { capitalizeText } from "@/utils/text_utils";
import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react";
import { useParams } from "next/navigation";
import { useEffect, useMemo } from "react";

const ExplorePage = () => {
    const { translate } = useDictionary();

    const { day, month, year, heading } = useParams();
    const date = useMemo(() => formatDateToISO(Number(day), Number(month), Number(year)), [day, month, year]);

    const { article, refetch } = useArticle(date, decodeURIComponent(heading?.toString() || ''));

    useEffect(() => {
        refetch();
    }, [heading, date]);

    return (
        <MenuPageLayout
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
                            selected: false
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
            footer={
                <AppFooter
                    sectionTemplates={[
                        {
                            name: translate('common.footer.sections.menu.name'),
                            options: [
                                {
                                    text: translate('common.footer.sections.menu.options.home'),
                                    link: `/`
                                },
                                {
                                    text: translate('common.footer.sections.menu.options.explore'),
                                    link: `/explore`
                                },
                                {
                                    text: translate('common.footer.sections.menu.options.about_us'),
                                    link: `/about-us/`
                                },
                                {
                                    text: translate('common.footer.sections.menu.options.categories'),
                                    link: `/categories/`
                                }
                            ]
                        }
                    ]}
                />
            }
        >
            <div className="relative flex flex-col gap-8 items-start w-full pl-16 pr-16">
                <Breadcrumbs
                    itemClasses={{
                        item: 'font-interTight font-semibold text-sm'
                    }}
                >
                    <BreadcrumbItem href="/explore">Explore</BreadcrumbItem>
                    <BreadcrumbItem>{capitalizeText(article?.heading || '')}</BreadcrumbItem>
                </Breadcrumbs>
                <div className="relative flex flex-row gap-8 w-full">
                    {article &&
                        <Article key={article?.id} article={article} updateData={refetch} />
                    }
                    <ArticleRecommendations article={article} />
                </div>
            </div>
        </MenuPageLayout>
    );
}

export default ExplorePage;