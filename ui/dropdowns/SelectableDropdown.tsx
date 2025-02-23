import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/react";
import clsx from "clsx";
import React, { useMemo, useState } from "react"
import { UnwrappingElementIcon } from "../icons/UnwrappingElementIcon";

export type SelectableDropdownProps = React.HTMLProps<HTMLDivElement> & {
    name?: string
    icon?: React.ReactNode
    selectedKeys?: string[]
    componentSize: 'sm' | 'base' | 'md'
    onSelected?: (key: Set<string>) => void
    options: SelectableDropdownOption[]
}

export type SelectableDropdownOption = {
    name: string
    value?: string
    classNames?: Partial<{title: string}>
    icon?: React.ReactNode
    props?: Partial<typeof DropdownItem>
}

const SelectableDropdown: React.FC<SelectableDropdownProps> = ({
    name,
    icon,
    type,
    componentSize,
    selectedKeys,
    onSelected,
    options
}) => {
    const [isOpen, setIsOpen] = useState<boolean>();

    const trigger = useMemo(() => 
        <div className={clsx(
            'flex flex-row items-center gap-2',
            'font-interTight font-semibold'
        )}>
            <div className={clsx(
                componentSize === 'sm' && 'h-4',
                componentSize === 'base' && 'h-4',
                componentSize === 'md' && 'h-5',
            )}>
                {icon}
            </div>
            <p className={clsx(
                !name && 'hidden',
                `text-${componentSize}`
            )}>{name}</p>
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
    , [name, icon, isOpen]);

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
                selectionMode="single"
                itemClasses={{
                    title: 'font-interTight font-medium',
                    selectedIcon: "text-roseText",
                }}
                variant="flat"
                selectedKeys={selectedKeys}
                closeOnSelect={false}
                onSelectionChange={(keys) => {
                    onSelected && onSelected(keys as Set<string>)
                }}
            >
                {options.map((option, index) => 
                    <DropdownItem
                        key={option.value || index}
                        startContent={option.icon}
                        classNames={{
                            title: option.classNames?.title
                        }}
                        {...option.props}
                    >
                        {option.name}
                    </DropdownItem>
                )}
            </DropdownMenu>
        </Dropdown>
    );
}

export default SelectableDropdown;