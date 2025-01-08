'use client';

import { useFilters } from "@/hooks/explore/useFilters"
import clsx from "clsx"
import { FiltersIcon } from "../icons/FiltersIcon"
import { CheckboxCheckedIcon } from "../icons/CheckboxCheckedIcon"
import { useEffect, useMemo, useRef, useState } from "react"
import { UnwrappingElementIcon } from "../icons/UnwrappingElementIcon"
import { useLocalSearch, UseLocalSearchResponse } from "@/hooks/explore/useLocalSearch"
import { splitQueryText } from "@/utils/text_utils"
import IconInput from "../inputs/IconInput"
import { SearchIcon } from "../icons/SearchIcon"
import { useTranslations } from "next-intl"

export type FilterProps = React.HTMLProps<HTMLDivElement> & {
    name: string
    options: FilterOption[]
    applyFilter: (option: string) => void
    isSelected: (option: string) => boolean
    unwrapping: boolean
    searchProperties?: FilterSearchProps
    multiple: boolean
}

export type FilterOption = {
    translativeName: string
    value: string
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
    const translate = useTranslations();

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
        options.filter(option => option.value.toLowerCase().includes(query.toLowerCase()))
    , [query]);

    return (
        <div className={clsx(
            'flex flex-col items-end relative',
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
                    <p className={clsx(
                        'font-interTight font-semibold text-primaryText'
                    )}>{name}</p>
                    <div className={clsx(
                        'h-1.5'
                    )}>
                        <UnwrappingElementIcon
                            className={clsx(
                                'w-auto h-full fill-primaryColor',
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
            <ul
                className={clsx(
                    'absolute space-y-1 top-full mt-1 z-[9999]',
                    'p-2 bg-white rounded-md',
                    'transition-all duration-200',
                    multiple && 'flex-row',
                    !multiple && 'flex-col',
                    unwrapping && 'overflow-hidden',
                    unwrapping && isUnwrapped && 'opacity-100',
                    unwrapping && !isUnwrapped && 'opacity-0 pointer-events-none'
                )}
            >
                {displaySearch && 
                    <div className={clsx(
                        'w-full sm:w-1/2'
                    )}>
                        {searchInput}
                    </div>
                }
                {multiple && filteredOptions.map((option, index) =>
                    <li
                        key={index}
                        className={clsx(
                            'select-none whitespace-nowrap pr-2 pl-2 pt-1 pb-1',
                            'rounded-full',
                            'border border-borderColor',
                            'font-interTight font-medium text-primaryText text-sm',
                            'transition-all duration-200',
                            isSelected(option.value) && 'bg-emphasizingColor2'
                        )}
                        onClick={() => applyFilter(option.value)}
                    >
                        {splitQueryText(translate(option.translativeName), query, 'bg-blueText text-primaryText')}
                    </li>
                )}
                {!multiple && filteredOptions.map((option, index) =>
                    <li
                        key={index}
                        className={clsx(
                            'select-none whitespace-nowrap flex flex-row items-center gap-4 justify-between',
                            'pl-2 pr-2 pt-1 pb-1 rounded-md',
                            'font-interTight font-medium text-primaryText text-sm',
                            'transition-all duration-200',
                            !isSelected(option.value) && 'sm:hover:bg-emphasizingColor2',
                            isSelected(option.value) && 'bg-emphasizingColor2'
                        )}
                        onClick={() => applyFilter(option.value)}
                    >
                        {splitQueryText(translate(option.translativeName), query, 'bg-blueText text-primaryText')}
                        <div className={clsx(
                            'w-3',
                            'transition-all duration-200',
                            isSelected(option.value) && 'opacity-100',
                            !isSelected(option.value) && 'opacity-0'
                        )}>
                            <CheckboxCheckedIcon
                                className={clsx(
                                    'w-full h-auto fill-blueText',
                                    'transition-all duration-200',
                                )}
                            />
                        </div>
                    </li>
                )}
            </ul>
        </div>
    );
}

export default Filter;