'use client';

import { SortFilter } from "@/components/filters/SortFilter";
import { CategoriesFilter } from "@/components/filters/CategoriesFilter";
import { useFilters } from "@/hooks/explore/useFilters";
import { useDictionary } from "@/hooks/useDictionary";
import { select_value_by_language } from "@/models/translative_string";
import TransparentIconButton from "@/ui/buttons/TransparentIconButton";
import { DefaultDrawer } from "@/ui/drawers/DefaultDrawer";
import { DrawerBody, DrawerTrigger } from "@/ui/drawers/drawer_components";
import { FiltersIcon } from "@/ui/icons/FiltersIcon";
import { SortbyFilterIcon } from "@/ui/icons/SortbyFilterIcon";
import { CategoriesFilterIcon } from "@/ui/icons/CategoriesFilterIcon";
import { Accordion, AccordionItem, Chip } from "@heroui/react";
import clsx from "clsx";
import { useMemo } from "react";
import { useCategories } from "@/hooks/models/useCategories";

export type FiltersProps = React.HTMLProps<HTMLDivElement>

const Filters: React.FC<FiltersProps> = ({
}) => {
    const { categories } = useCategories();

    const { filters } = useFilters();
    const { language, translate } = useDictionary();

    const sortedCategories = useMemo(() =>
        Array.from(
            new Map(
                categories.map(category => [category.parent.english, category.parent])
            )
        ).map(([english, parent]) => {
            const options = categories.filter(category => category.parent.english === english).map(category => 
                ({
                    name: select_value_by_language(category.name, language),
                    count: category.count,
                    value: category.name.english
                })
            )
            return {
                name: select_value_by_language(parent, language),
                count: options.map(option => option.count).reduce((acc, current) => acc + current, 0),
                options: options
            }
        })
    , [categories, language]);
    
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
                                <div className="h-3 fill-primaryText">
                                    <FiltersIcon />
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
                                <div className="h-5 fill-secondaryText">
                                    <SortbyFilterIcon />
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
                            key='categories'
                            title={
                                <div className="flex flex-row gap-2">
                                    <p>{translate('common.filters.categories.name')}</p> 
                                    {filters.categories.length > 0 &&
                                        <Chip
                                            size="sm"
                                            color="secondary"
                                            className={clsx(
                                                'font-interTight font-semibold text-primaryText aspect-square p-0 text-center text-sm'
                                            )}
                                        >
                                            {filters.categories.length}
                                        </Chip>
                                    }
                                </div>
                            }
                            startContent={
                                <div className="w-3 h-3">
                                    <CategoriesFilterIcon 
                                        className="fill-primaryText" 
                                    />
                                </div>
                            }
                        >
                            <CategoriesFilter 
                                name={translate('common.filters.categories.name')}
                                sections={sortedCategories}
                            />
                        </AccordionItem>
                    </Accordion>
                </DrawerBody>
            </DefaultDrawer>
        </div>
    );
}

export default Filters;