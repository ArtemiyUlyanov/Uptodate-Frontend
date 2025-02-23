'use client';

import AppFooter, { getAppFooterSections } from "@/components/AppFooter";
import ArticlesList from "@/components/articles/ArticlesList";
import TopMenu, { getTopMenuOptions } from "@/components/menu/TopMenu";
import { useArticle } from "@/hooks/models/useArticle";
import { useDictionary } from "@/hooks/useDictionary";
import { ArticlesListLayout } from "@/layouts/ArticlesListLayout";

const ExplorePage = () => {
    const { translate } = useDictionary();
    
    return (
        <ArticlesListLayout
            topMenu={
                <TopMenu 
                    optionTemplates={getTopMenuOptions(translate, 'explore')}
                />
            }
            footer={
                <AppFooter
                    sectionTemplates={getAppFooterSections(translate)}
                />
            }
        >
            <ArticlesList />
        </ArticlesListLayout>
    );
}

export default ExplorePage;