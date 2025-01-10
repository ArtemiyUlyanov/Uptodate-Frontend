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
    toggleFilter: (option: string) => void
    isSelected: (option: string) => boolean
    unwrapping: boolean
    searchProperties?: FilterSearchProps
    multiple: boolean
}

export type FilterOption = {
    name: string
    value: string
}

export type FilterSearchProps = {
    displaySearch: boolean
    providedLocalSearch?: UseLocalSearchResponse
}

const Filter: React.FC<FilterProps> = ({
    name,
    options,
    toggleFilter,
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
        options.filter(option => option.value.toLowerCase().includes(query.toLowerCase()))
    , [query, options]);

    return (
        <div className={clsx(
            'flex flex-col relative',
            searchProperties?.providedLocalSearch && 'items-start',
            !searchProperties?.providedLocalSearch && 'items-end',
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
                        'whitespace-nowrap font-interTight font-semibold text-primaryText'
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
                    searchProperties?.providedLocalSearch && 'w-full relative space-y-1 flex flex-col z-[9999]',
                    !searchProperties?.providedLocalSearch && 'w-auto p-2 absolute space-y-1 flex flex-col top-full mt-1 z-[9999]',
                    'bg-white rounded-md',
                    'transition-all duration-200',
                    unwrapping && 'overflow-hidden',
                    searchProperties?.providedLocalSearch && unwrapping && isUnwrapped && 'max-h-auto',
                    searchProperties?.providedLocalSearch && unwrapping && !isUnwrapped && 'max-h-0',
                    !searchProperties?.providedLocalSearch && unwrapping && isUnwrapped && 'opacity-100',
                    !searchProperties?.providedLocalSearch && unwrapping && !isUnwrapped && 'opacity-0 pointer-events-none'
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
                            !searchProperties?.providedLocalSearch && 'whitespace-nowrap',
                            'select-none flex flex-row justify-start items-center gap-2',
                            'pl-2 pr-2 pt-1 pb-1 rounded-md',
                            'font-interTight font-medium text-primaryText text-sm',
                            'transition-all duration-200',
                            !isSelected(option.value) && 'sm:hover:opacity-50',
                        )}
                        onClick={() => toggleFilter(option.value)}
                    >
                        <div className={clsx(
                            'w-auto rounded-md h-auto p-1 box-border',
                            !isSelected(option.value) && 'border border-borderColor',
                            isSelected(option.value) && 'bg-primaryColor border border-[transparent]',
                            'transition-all duration-200',
                        )}>
                            <div className={clsx(
                                'w-2',
                                'transition-all duration-200',
                                isSelected(option.value) && 'opacity-100',
                                !isSelected(option.value) && 'opacity-0'
                            )}>
                                <CheckboxCheckedIcon
                                    className={clsx(
                                        'w-full h-auto fill-oppositeText',
                                        'transition-all duration-200',
                                    )}
                                />
                            </div>
                        </div>
                        <p className={clsx(
                            'font-interTight font-medium text-left'
                        )}>{splitQueryText(option.name, query, 'bg-blueText text-primaryText')}</p>
                    </li>
                )}
                {!multiple && filteredOptions.map((option, index) =>
                    <li
                        key={index}
                        className={clsx(
                            !searchProperties?.providedLocalSearch && 'whitespace-nowrap',
                            'select-none whitespace-nowrap flex flex-row items-center gap-4 justify-between',
                            'pl-2 pr-2 pt-1 pb-1 rounded-md',
                            'font-interTight font-medium text-primaryText text-sm',
                            'transition-all duration-200',
                            !isSelected(option.value) && 'sm:hover:bg-emphasizingColor2',
                            isSelected(option.value) && 'bg-emphasizingColor2'
                        )}
                        onClick={() => toggleFilter(option.value)}
                    >
                        {splitQueryText(option.name, query, 'bg-blueText text-primaryText')}
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