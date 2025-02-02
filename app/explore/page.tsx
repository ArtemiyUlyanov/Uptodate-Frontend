'use client';

import AppFooter from "@/components/AppFooter";
import ArticlesList from "@/components/articles/ArticlesList";
import TopMenu from "@/components/menu/TopMenu";
import { useDictionary } from "@/hooks/useDictionary";
import { ArticlesListLayout } from "@/layouts/ArticlesListLayout";

const ExplorePage = () => {
    const { translate } = useDictionary();
    
    return (
        <ArticlesListLayout
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
            <ArticlesList />
        </ArticlesListLayout>
    );
}

export default ExplorePage;