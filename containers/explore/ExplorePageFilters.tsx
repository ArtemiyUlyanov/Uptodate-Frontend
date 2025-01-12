'use client';

import { SortFilter } from "@/components/filters/SortFilter";
import { TopicsFilter } from "@/components/filters/TopicsFilter"
import { FiltersAscendingIcon } from "@/components/icons/FiltersAscendingIcon"
import { FiltersIcon } from "@/components/icons/FiltersIcon"
import { useFilters } from "@/hooks/explore/useFilters"
import { useDictionary } from "@/hooks/useDictionary";
import { useTopics } from "@/hooks/useTopics"
import { select_value_by_language } from "@/models/translative_string";
import { splitTextBySubtexts } from "@/utils/text_utils"
import clsx from "clsx"
import { useTranslations } from "next-intl"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useMemo, useState } from "react"

export type ExplorePageFiltersProps = React.HTMLProps<HTMLDivElement>

const ExplorePageFilters: React.FC<ExplorePageFiltersProps> = ({
}) => {
    const { filters, setFilter } = useFilters();
    const { topics } = useTopics();

    const { language, translate } = useDictionary();

    const sortedTopics = useMemo(() =>
        Array.from(
            new Map(
                topics.map(topic => [topic.parent.english, topic.parent])
            )
        ).map(([english, parent]) =>
            ({
                name: select_value_by_language(parent, language),
                options: topics.filter(topic => topic.parent.english === english).map(topic => 
                    ({
                        name: `${select_value_by_language(topic.name, language)} (${topic.count})`,
                        value: select_value_by_language(topic.name, language)
                    })
                )       
            })
        )
    , [topics, language]);
    
    return (
        <div className={clsx(
            'relative flex flex-row gap-4',
            'transition-all duration-200',
        )}>
            <div className={clsx(
                'flex flex-row gap-4 relative'
            )}>
                <SortFilter 
                    name={translate('common.filters.sort_by.name')}
                    options={[
                        {
                            name: translate('common.filters.sort_by.options.ascending'),
                            value: 'Ascending'
                        },
                        {
                            name: translate('common.filters.sort_by.options.descending'),
                            value: 'Descending'
                        },
                        {
                            name: translate('common.filters.sort_by.options.alphabetically'),
                            value: 'Alphabetically'
                        }
                    ]}
                />
                <TopicsFilter 
                    name={translate('common.filters.topics.name')}
                    sections={sortedTopics}
                />
            </div>
        </div>
    );
}

export default ExplorePageFilters;