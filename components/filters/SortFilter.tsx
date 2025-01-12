'use client';

import { useFilters } from "@/hooks/explore/useFilters"
import clsx from "clsx"
import { useEffect, useMemo, useState } from "react"
import { UnwrappingElementIcon } from "../icons/UnwrappingElementIcon"
import { Accordion, AccordionItem, Checkbox, CheckboxGroup, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";
import { FilterOption } from "./filter_option";

export type SortFilterProps = React.HTMLProps<HTMLDivElement> & {
    name: string
    options: FilterOption[]
}

export const SortFilter: React.FC<SortFilterProps> = ({
    name,
    options
}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());

    const { filters, setFilter } = useFilters();

    useEffect(() => {
        setSelectedKeys(new Set([filters.sort_by as string]));
    }, []);

    useEffect(() => {
        setFilter('sort_by', Array.from(selectedKeys)[0]);
    }, [selectedKeys]);

    const trigger = useMemo(() => 
        <div className={clsx(
            'flex flex-row items-center gap-2',
            'font-interTight font-semibold'
        )}>
            <p>{name}</p>
            <div className={clsx(
                'h-1.5'
            )}>
                <UnwrappingElementIcon
                    className={clsx(
                        'w-auto h-full fill-primaryColor',
                        'transition-all duration-200',
                        isOpen && 'rotate-180'
                    )}
                />
            </div>
        </div>    
    , [name, isOpen]);

    return (
        <Dropdown 
            className="relative w-auto"
            shouldBlockScroll={false}
            onOpenChange={setIsOpen}
        >
            <DropdownTrigger 
                className={clsx(
                    "w-auto text-primaryText",
                    "transition-all duration-200",
                    "sm:hover:opacity-50",
                    "active:opacity-50 sm:active:opacity"
                )}
            >
                {trigger}
            </DropdownTrigger>
            <DropdownMenu
                disallowEmptySelection
                aria-label="Action event example" 
                selectionMode="single"
                itemClasses={{
                    title: [
                        'font-interTight font-medium text-primaryText'
                    ],
                    selectedIcon: "text-redText",
                }}
                variant="flat"
                selectedKeys={selectedKeys}
                closeOnSelect={false}
                onSelectionChange={(key) => setSelectedKeys(key as Set<string>)}
            >
                {options.map(option => 
                    <DropdownItem
                        key={option.value}
                    >
                        {option.name}
                    </DropdownItem>
                )}
            </DropdownMenu>
        </Dropdown>
    );
}