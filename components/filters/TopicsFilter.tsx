'use client';

import { useFilters } from "@/hooks/explore/useFilters"
import clsx from "clsx"
import { use, useEffect, useMemo, useRef, useState } from "react"
import { UnwrappingElementIcon } from "../icons/UnwrappingElementIcon"
import { Accordion, AccordionItem, Checkbox, CheckboxGroup, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";
import { FilterSection } from "./filter_option";

export type TopicsFilterProps = React.HTMLProps<HTMLDivElement> & {
    name: string
    sections: FilterSection[]
}

export const TopicsFilter: React.FC<TopicsFilterProps> = ({
    name,
    sections
}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [selectedKeys, setSelectedKeys] = useState<Record<string, Array<string>>>({});

    const { filters, setFilter } = useFilters();

    useEffect(() => {
        setFilter('topics', Object.values(selectedKeys)
            .reduce((acc, currentArr) => {
                currentArr.forEach(item => acc.push(item));
                return currentArr;
            }, [])
        );
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
                aria-label="Action event example"
                itemClasses={{
                    title: 'font-interTight font-medium text-primaryText',
                    selectedIcon: "text-redText",
                }}
                className="aspect-[3/4] overflow-y-scroll"
                variant="flat"
                closeOnSelect={false}
            >
                {sections.map(({name, options}) => 
                    <DropdownItem
                        key={name}
                        className="p-0"
                    >
                        <Accordion 
                            isCompact
                            itemClasses={{
                                title: 'font-interTight font-semibold text-primaryText text-sm'
                            }}
                        >
                            <AccordionItem key={name} aria-label={name} title={name}>
                                <CheckboxGroup
                                    onValueChange={(keys) => setSelectedKeys(prev => ({
                                        ...prev,
                                        [name]: keys
                                    }))}
                                >
                                    {options.map(option => 
                                        <Checkbox size="sm" color="secondary" value={option.value}>{option.name}</Checkbox>
                                    )}
                                </CheckboxGroup>
                            </AccordionItem>
                        </Accordion>
                    </DropdownItem>
                )}
            </DropdownMenu>
        </Dropdown>
    );
}