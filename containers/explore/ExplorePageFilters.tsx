'use client';

import Filter, { FilterOption } from "@/components/filters/Filter"
import FilterSet from "@/components/filters/FilterSet"
import { FiltersAscendingIcon } from "@/components/icons/FiltersAscendingIcon"
import { FiltersIcon } from "@/components/icons/FiltersIcon"
import { useFilters } from "@/hooks/explore/useFilters"
import { useTopics } from "@/hooks/useTopics"
import { splitTextBySubtexts } from "@/utils/text_utils"
import clsx from "clsx"
import { useTranslations } from "next-intl"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useMemo, useState } from "react"

export type ExplorePageFiltersProps = React.HTMLProps<HTMLDivElement> & {

}

const ExplorePageFilters: React.FC<ExplorePageFiltersProps> = ({

}) => {
    const { lang } = useParams();

    const { filters, setFilter } = useFilters();
    const { topics } = useTopics();

    const translate = useTranslations('common.filters');
    
    return (
        <div className={clsx(
            'relative flex flex-row gap-4',
            'transition-all duration-200',
        )}>
            <div className={clsx(
                'flex flex-row gap-4 relative'
            )}>
                <Filter
                    name={translate('sort_by.name')}
                    isSelected={option => filters.sort_by === option}
                    applyFilter={option => setFilter('sort_by', option)}
                    options={[
                        {
                            translativeName: 'common.filters.sort_by.options.ascending',
                            value: 'Ascending'
                        },
                        {
                            translativeName: 'common.filters.sort_by.options.descending',
                            value: 'Descending'
                        },
                        {
                            translativeName: 'common.filters.sort_by.options.alphabetically',
                            value: 'Alphabetically'
                        }
                    ]}
                    multiple={false}
                    unwrapping={true}
                    searchProperties={
                        {
                            displaySearch: false
                        }
                    }
                />
            </div>
        </div>
    );
}

export default ExplorePageFilters;