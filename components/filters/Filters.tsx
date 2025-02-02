'use client';

import { SortFilter } from "@/components/filters/SortFilter";
import { TopicsFilter } from "@/components/filters/TopicsFilter";
import { useFilters } from "@/hooks/explore/useFilters";
import { useDictionary } from "@/hooks/useDictionary";
import { useTopics } from "@/hooks/useTopics";
import { select_value_by_language } from "@/models/translative_string";
import TransparentIconButton from "@/ui/buttons/TransparentIconButton";
import { DefaultDrawer } from "@/ui/drawers/DefaultDrawer";
import { DrawerBody, DrawerTrigger } from "@/ui/drawers/drawer_components";
import { FiltersIcon } from "@/ui/icons/FiltersIcon";
import { SortbyFilterIcon } from "@/ui/icons/SortByFilterIcon";
import { TopicsFilterIcon } from "@/ui/icons/TopicsFilterIcon";
import { Accordion, AccordionItem, Chip } from "@nextui-org/react";
import clsx from "clsx";
import { useMemo } from "react";

export type FiltersProps = React.HTMLProps<HTMLDivElement>

const Filters: React.FC<FiltersProps> = ({
}) => {
    const { topics } = useTopics();

    const { filters } = useFilters();
    const { language, translate } = useDictionary();

    const sortedTopics = useMemo(() =>
        Array.from(
            new Map(
                topics.map(topic => [topic.parent.english, topic.parent])
            )
        ).map(([english, parent]) => {
            const options = topics.filter(topic => topic.parent.english === english).map(topic => 
                ({
                    name: select_value_by_language(topic.name, language),
                    count: topic.count,
                    value: topic.name.english
                })
            )
            return {
                name: select_value_by_language(parent, language),
                count: options.map(option => option.count).reduce((acc, current) => acc + current, 0),
                options: options
            }
        })
    , [topics, language]);
    
    return (
        <div className={clsx(
            'flex flex-row justify-end gap-4'
        )}>
            <DefaultDrawer
                title={translate('common.filters.drawer.name')}
                closeTooltip={translate('common.filters.drawer.close_tooltip')}
            >
                <DrawerTrigger>
                    {(onClick) => (
                        <TransparentIconButton 
                            text={translate('common.filters.drawer.open_drawer_button')}
                            hoverEffect="opacity"
                            image={
                                <div className="h-3">
                                    <FiltersIcon 
                                        className="fill-black" 
                                    />
                                </div>
                            }
                            onClickButton={onClick}
                        />
                    )}
                </DrawerTrigger>
                <DrawerBody>
                    <Accordion
                        isCompact
                        itemClasses={{
                            title: 'font-interTight font-semibold text-primaryText text-base'
                        }}
                    >
                        <AccordionItem 
                            key='sort_by'
                            title={translate('common.filters.sort_by.name')}
                            startContent={
                                <div className="w-3 h-4">
                                    <SortbyFilterIcon 
                                        className="fill-primaryText" 
                                    />
                                </div>
                            }
                        >
                            <SortFilter 
                                name={translate('common.filters.sort_by.name')}
                                options={[
                                    {
                                        name: translate('common.filters.sort_by.options.ascending'),
                                        value: 'Ascending'
                                    },
                                    {
                                        name: translate('common.filters.sort_by.options.descending'),
                                        value: 'Descending'
                                    },
                                    {
                                        name: translate('common.filters.sort_by.options.alphabetically'),
                                        value: 'Alphabetically'
                                    }
                                ]}
                            />
                        </AccordionItem>
                        <AccordionItem
                            key='topics'
                            title={
                                <div className="flex flex-row gap-1">
                                    <p>{translate('common.filters.topics.name')}</p> 
                                    {filters.topics.length > 0 &&
                                        <Chip
                                            size="sm"
                                            color="secondary"
                                            className={clsx(
                                                'font-interTight font-semibold text-oppositeText aspect-square p-0 text-center'
                                            )}
                                        >
                                            {filters.topics.length}
                                        </Chip>
                                    }
                                </div>
                            }
                            startContent={
                                <div className="w-3 h-3">
                                    <TopicsFilterIcon 
                                        className="fill-primaryText" 
                                    />
                                </div>
                            }
                        >
                            <TopicsFilter 
                                name={translate('common.filters.topics.name')}
                                sections={sortedTopics}
                            />
                        </AccordionItem>
                    </Accordion>
                </DrawerBody>
            </DefaultDrawer>
        </div>
    );
}

export default Filters;