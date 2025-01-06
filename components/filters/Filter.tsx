import { useFilters } from "@/hooks/explore/useFilters"
import clsx from "clsx"
import { FiltersIcon } from "../icons/FiltersIcon"
import { CheckboxCheckedIcon } from "../icons/CheckboxCheckedIcon"
import { useMemo, useState } from "react"
import { UnwrappingElementIcon } from "../icons/UnwrappingElementIcon"
import { useLocalSearch, UseLocalSearchResponse } from "@/hooks/explore/useLocalSearch"
import { splitQueryText } from "@/utils/text_utils"
import IconInput from "../inputs/IconInput"
import { SearchIcon } from "../icons/SearchIcon"

export type FilterProps = React.HTMLProps<HTMLDivElement> & {
    name: string
    options: string[]
    applyFilter: (option: string) => void
    isSelected: (option: string) => boolean
    unwrapping: boolean
    searchProperties?: FilterSearchProps
    multiple: boolean
}

export type FilterSearchProps = {
    displaySearch: boolean
    providedLocalSearch?: UseLocalSearchResponse
}

const Filter: React.FC<FilterProps> = ({
    name,
    options,
    applyFilter,
    isSelected,
    unwrapping,
    searchProperties,
    multiple
}) => {
    const [isUnwrapped, setIsUnwrapped] = useState(false);
    const { filters, setFilter } = useFilters();

    const { displaySearch } = searchProperties || {displaySearch: false};
    const { searchInput, query, setQuery } = searchProperties?.providedLocalSearch || useLocalSearch(
        <IconInput
            placeholder={`Search ${name.toLowerCase()}`}
            customClassName='w-full'
            inputClassName='text-base'
            fullBordered={true}
            icon={<SearchIcon />}
        />
    );

    const filteredOptions = useMemo(() => 
        options.filter(option => option.toLowerCase().includes(query.toLowerCase()))
    , [query]);

    return (
        <div className={clsx(
            'flex flex-col',
            'transition-all duration-200',
            !unwrapping && 'gap-2',
            unwrapping && isUnwrapped && 'gap-2',
            unwrapping && !isUnwrapped && 'gap-0',
            searchProperties?.providedLocalSearch && filteredOptions.length <= 0 && 'hidden'
        )}>
            {(unwrapping ?
                <div
                    className={clsx(
                        'flex flex-row items-center select-none gap-2',
                        'transition-all duration-200',
                        'sm:hover:opacity-50',
                        'active:opacity-50 sm:active:opacity'
                    )}
                    onClick={() => setIsUnwrapped(prev => !prev)}
                >
                    <p>{name}</p>
                    <div className={clsx(
                        'h-1.5'
                    )}>
                        <UnwrappingElementIcon
                            className={clsx(
                                'w-auto h-full',
                                'transition-all duration-200',
                                isUnwrapped && 'rotate-180'
                            )}
                        />
                    </div>
                </div>
            :
                <p className={clsx(
                    'font-interTight font-medium text-secondaryText text-sm'
                )}>{name}</p>
            )}
            <ul className={clsx(
                'flex flex-wrap gap-2',
                'transition-all duration-200',
                multiple && 'flex-row',
                !multiple && 'flex-col',
                unwrapping && 'overflow-hidden',
                unwrapping && isUnwrapped && 'max-h-auto',
                unwrapping && !isUnwrapped && 'max-h-0'
            )}>
                {displaySearch && 
                    <div className={clsx(
                        'w-full sm:w-1/2'
                    )}>
                        {searchInput}
                    </div>
                }
                {multiple && filteredOptions.map(option =>
                    <li
                        className={clsx(
                            'select-none pr-2 pl-2 pt-1 pb-1',
                            'rounded-full',
                            'border border-borderColor',
                            'font-interTight font-medium text-sm',
                            'transition-all duration-200',
                            isSelected(option) && 'bg-emphasizingColor2'
                        )}
                        onClick={() => applyFilter(option)}
                    >
                        {splitQueryText(option, query, 'bg-blueText text-primaryText')}
                    </li>
                )}
                {!multiple && filteredOptions.filter(option => option.toLowerCase().includes(query.toLowerCase())).map(option =>
                    <li
                        className={clsx(
                            'select-none flex flex-row items-center gap-2',
                            'font-interTight font-medium text-sm',
                            'transition-all duration-200',
                        )}
                        onClick={() => applyFilter(option)}
                    >
                        <div className={clsx(
                            'flex flex-row items-center p-1 rounded-full aspect-square',
                            'border border-borderColor'
                        )}>
                            <span className={clsx(
                                'w-2 h-2 bg-white rounded-full',
                                'transition-all duration-200',
                                !isSelected(option) && 'opacity-0'
                            )}></span>
                        </div>
                        {splitQueryText(option, query, 'bg-blueText text-primaryText')}
                    </li>
                )}
            </ul>
        </div>
    );
}

export default Filter;