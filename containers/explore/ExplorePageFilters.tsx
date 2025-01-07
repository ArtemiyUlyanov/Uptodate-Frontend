import Filter from "@/components/filters/Filter"
import FilterSet from "@/components/filters/FilterSet"
import { FiltersAscendingIcon } from "@/components/icons/FiltersAscendingIcon"
import { FiltersIcon } from "@/components/icons/FiltersIcon"
import { useFilters } from "@/hooks/explore/useFilters"
import { useTopics } from "@/hooks/useTopics"
import { splitTextBySubtexts } from "@/utils/text_utils"
import clsx from "clsx"
import { useEffect, useState } from "react"

export type ExplorePageFiltersProps = React.HTMLProps<HTMLDivElement> & {

}

const ExplorePageFilters: React.FC<ExplorePageFiltersProps> = ({

}) => {
    const { filters, setFilter } = useFilters();
    const { topics } = useTopics();

    useEffect(() => console.log(splitTextBySubtexts('Real Estate', ['es'])), []);

    return (
        <div className={clsx(
            'relative flex flex-row gap-4',
            'transition-all duration-200',
        )}>
            <div className={clsx(
                'flex flex-row gap-4 relative'
            )}>
                <Filter
                    name='Sort by'
                    isSelected={option => filters.sort_by === option}
                    applyFilter={option => setFilter('sort_by', option)}
                    options={['Ascending', 'Descending', 'Alphabetically']}
                    multiple={false}
                    unwrapping={true}
                    searchProperties={
                        {
                            displaySearch: false
                        }
                    }
                />
                <Filter
                    name='Sort by'
                    isSelected={option => filters.sort_by === option}
                    applyFilter={option => setFilter('sort_by', option)}
                    options={['Ascending', 'Descending', 'Alphabetically']}
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