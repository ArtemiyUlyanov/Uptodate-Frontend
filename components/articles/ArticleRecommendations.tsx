import ArticleCover from "@/components/articles/covers/ArticleCover";
import { ArticlesIcon } from "@/ui/icons/MyArticlesIcon";
import { ArticleModel } from "@/models/article"
import { searchApi } from "@/services/api/search.endpoint";
import { useCallback, useEffect, useState } from "react";

export type ArticleRecommendationsProps = React.HTMLProps<HTMLDivElement> & {
    article?: ArticleModel
}

const ArticleRecommendations: React.FC<ArticleRecommendationsProps> = ({
    article,
    ...props
}) => {
    const [ topArticles, setTopArticles ] = useState<ArticleModel[]>();

    const getArticles = useCallback(() => {
        searchApi({
            filters: {sort_by: 'ascending', topics: []},
            count: 5,
            miniSearch: false,
            query: '',
        }).then(response => setTopArticles(response.articles));
    }, []);

    useEffect(() => {
        getArticles();
    }, []);

    return (
        <div className="w-2/5">
            <div className="sticky top-[75px] flex flex-col gap-1">
                <div className="flex flex-row items-center gap-2">
                    <div className="h-4">
                        <ArticlesIcon />
                    </div>
                    <p className="font-interTight font-semibold text-primaryText text-base">Read also</p>
                </div>
                <div className="flex flex-col w-full gap-1">
                    {topArticles?.filter(topArticle => topArticle.id !== article?.id).map((article, index) =>
                        <ArticleCover
                            key={index}
                            article={article}
                            extended={false}
                            url={"/api/files/get?path=articles/" + article.id + "/icon.png"}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

export default ArticleRecommendations;