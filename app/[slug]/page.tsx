'use client';

import AppFooter from "@/components/AppFooter";
import Article from "@/components/articles/Article";
import TopMenu from "@/components/menu/TopMenu";
import { useArticle } from "@/hooks/models/useArticle";
import { useDictionary } from "@/hooks/useDictionary";
import MenuPageLayout from "@/layouts/MenuPageLayout";
import { formatDateToISO } from "@/utils/date_utils";
import { capitalizeText } from "@/utils/text_utils";
import { BreadcrumbItem, Breadcrumbs, Spinner } from "@nextui-org/react";
import { useParams } from "next/navigation";
import { useEffect, useMemo } from "react";

const ExplorePage = () => {
    const { translate } = useDictionary();

    const { slug } = useParams();
    const { article, refetch, likeMutate } = useArticle({ slug: slug?.toString() });

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
            <div className="flex flex-row justify-center w-full">
                <div className="relative flex flex-col gap-8 items-start w-3/4">
                    <div className="relative flex flex-row justify-center gap-8 w-full">
                        {article &&
                            <Article key={article?.id} article={article} likeMutate={likeMutate} />
                        }
                        {!article &&
                            <Spinner color="secondary" />
                        }
                    </div>
                </div>
            </div>
        </MenuPageLayout>
    );
}

export default ExplorePage;