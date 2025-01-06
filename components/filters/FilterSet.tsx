import clsx from "clsx";
import React, { ReactElement, useState } from "react";
import { UnwrappingElementIcon } from "../icons/UnwrappingElementIcon";
import { useLocalSearch, UseLocalSearchResponse } from "@/hooks/explore/useLocalSearch";
import { FilterProps, FilterSearchProps } from "./Filter";
import IconInput from "../inputs/IconInput";
import { SearchIcon } from "../icons/SearchIcon";

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
    const [isUnwrapped, setIsUnwrapped] = useState(false);

    const { searchAllowed } = searchProperties;
    const { searchInput, query, setQuery } = useLocalSearch(
        <IconInput
            placeholder={`Search ${name.toLowerCase()}`}
            customClassName='w-full'
            inputClassName='text-base'
            fullBordered={true}
            icon={<SearchIcon />}
        />
    );

    const updatedChildren = React.Children.map(children, (child) =>
        React.isValidElement(child)
            ? React.cloneElement(child as ReactElement<FilterProps>, { searchProperties: {displaySearch: false, providedLocalSearch: {searchInput, query, setQuery} } })
            : child
    );

    return (
        <div
            className={clsx(
                'flex flex-col',
                'transition-all duration-200',
                !isUnwrapped && 'gap-0',
                isUnwrapped && 'gap-2'
            )}
        >
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
            <div className={clsx(
                'flex flex-col gap-4',
                'transition-all duration-200',
                'overflow-hidden',
                isUnwrapped && 'max-h-auto',
                !isUnwrapped && 'max-h-0'
            )}>
                {searchAllowed &&
                    <div className={clsx(
                        'w-full sm:w-1/2'
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