import clsx from "clsx";
import React, { ReactElement, useState } from "react";
import { UnwrappingElementIcon } from "../icons/UnwrappingElementIcon";
import { useLocalSearch, UseLocalSearchResponse } from "@/hooks/explore/useLocalSearch";
import { FilterProps } from "./Filter";
import IconInput from "../inputs/IconInput";
import { SearchIcon } from "../icons/SearchIcon";
import { useTranslations } from "next-intl";
import { useDictionary } from "@/hooks/useDictionary";

export type FilterSetProps = React.HTMLProps<HTMLDivElement> & {
    name: string
    searchProperties: FilterSetSearchProps
}

export type FilterSetSearchProps = {
    searchAllowed: boolean
}

const FilterSet: React.FC<FilterSetProps> = ({
    name,
    searchProperties,
    children
}) => {
    const { language, translate } = useDictionary();

    const [isUnwrapped, setIsUnwrapped] = useState(false);

    const { searchAllowed } = searchProperties;
    const { searchInput, query, setQuery } = useLocalSearch(
        <IconInput
            placeholder={translate('common.filters.search_placeholder').replace('%name%', name.toLowerCase())}
            customClassName='w-full'
            inputClassName='text-base'
            fullBordered={true}
            icon={
                <SearchIcon
                    className="fill-secondaryText" 
                />
            }
        />
    );

    const updatedChildren = React.Children.map(children, (child) =>
        React.isValidElement(child)
            ? React.cloneElement(child as ReactElement<FilterProps>, { queryProperties: {localSearch: {searchInput, query, setQuery} } })
            : child
    );

    return (
        <div
            className={clsx(
                'flex flex-col items-end',
                'transition-all duration-200',
                !isUnwrapped && 'gap-0',
                isUnwrapped && 'gap-2'
            )}
        >
            <div
                className={clsx(
                    'relative flex flex-row items-center select-none gap-2',
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
                            'w-auto h-full',
                            'transition-all duration-200',
                            isUnwrapped && 'rotate-180'
                        )}
                    />
                </div>
            </div>
            <div className={clsx(
                'absolute w-[150%] aspect-[4/3] overflow-y-scroll bg-white top-full mt-1 rounded-md p-3 flex flex-col gap-3 z-[9999]',
                'transition-all duration-200',
                'overflow-hidden',
                isUnwrapped && 'opacity-100',
                !isUnwrapped && 'opacity-0 pointer-events-none'
            )}>
                {searchAllowed &&
                    <div className={clsx(
                        'w-full'
                    )}>
                        {searchInput}
                    </div>
                }
                {updatedChildren}
            </div>
        </div>
    );
}

export default FilterSet;