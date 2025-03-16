import React, { useEffect } from "react";
import { DashboardSectionTemplate } from "./DashboardNavigation";
import { Accordion, AccordionItem, Button, Divider } from "@heroui/react";
import clsx from "clsx";
import { UnwrappingElementIcon } from "@/ui/icons/UnwrappingElementIcon";

export type DashboardNavigationSectionListProps = React.HTMLProps<HTMLDivElement> & {
    sections: DashboardSectionTemplate[]
}

export const DashboardNavigationSectionList: React.FC<DashboardNavigationSectionListProps> = ({
    sections
}) => {
    return (
        <Accordion
            className="flex flex-col gap-2 p-0 w-full"
            itemClasses={{
                base: clsx(
                    'p-0 rounded-lg shadow-none bg-[transparent] h-auto'
                ),
                trigger: clsx(
                    'w-full gap-3 p-0 pt-1.5 pb-1.5 bg-[transparent] rounded-lg',
                    'transition-all duration-200',
                    'hover:bg-emphasizingColor2'
                ),
                // titleWrapper: 'bg-red-500',
                startContent: 'pl-3',
                title: 'font-interTight font-semibold text-sm',
                indicator: 'text-secondaryText mr-3'
            }}
            showDivider={false}
            variant="splitted"
        >
            {sections.map(section => 
                <AccordionItem
                    key={section.name}
                    aria-label={section.name}
                    title={section.name}
                    startContent={section.icon}
                    indicator={
                        <div className={clsx(
                            'h-1'
                        )}>
                            <UnwrappingElementIcon
                                className={clsx(
                                    'w-auto h-full fill-secondaryColor',
                                    'transition-all duration-200 rotate-90',
                                )}
                            />
                        </div>
                    }
                >
                    <div className="flex flex-row pl-4 gap-2 w-full h-auto">
                        <Divider orientation="vertical" className="h-auto bg-borderColor" />
                        <div className="flex flex-col items-end gap-1 w-full h-auto">
                            {section.options.map((option) =>
                                <Button
                                    as='a'
                                    href={option.link}
                                    className={clsx(
                                        'w-full justify-start pl-3 pr-3 pt-1.5 pb-1.5 h-auto gap-3 rounded-lg opacity-100',
                                        'data-[hover=true]:bg-emphasizingColor2',
                                        'transition-all duration-200',
                                        option.selected && 'bg-emphasizingColor2 text-primaryText',
                                        !option.selected && 'text-primaryText',
                                        'transition-all duration-200'
                                    )}
                                    isDisabled={option.selected}
                                    size='sm'
                                    variant='light'
                                    startContent={
                                        <div className={clsx(
                                            option.selected && "fill-primaryColor",
                                            !option.selected && "fill-primaryColor"
                                        )}>
                                            {option.icon}
                                        </div>
                                    }
                                >
                                    <p className={clsx(
                                        'font-interTight font-semibold text-sm w-full max-w-xs truncate line-clamp-2 text-wrap',
                                    )}>{option.text}</p>
                                </Button>
                            )}
                        </div>
                    </div>
                </AccordionItem>
            )}
        </Accordion>
    );
}