"use client";

import ArticleCover from '@/components/articles/covers/ArticleCover';
import TransparentButton from '@/components/buttons/TransparentButton';
import DefaultButton from '@/components/buttons/DefaultButton';
import { SearchIcon } from '@/components/icons/SearchIcon';
import { SearchTextIcon } from '@/components/icons/SearchTextIcon';
import IconInput from '@/components/inputs/IconInput';
import TransparentInput from '@/components/inputs/IconInput';
import article_icon_1 from '@/public/images/article_icon_1.png';
import article_icon_2 from '@/public/images/article_icon_2.png';
import article_icon_3 from '@/public/images/article_icon_3.png';
import { Article } from "@/models/article";
import { SearchProvider, useSearch } from '@/hooks/explore/useSearch';
import clsx from 'clsx';
import React, { useEffect, useMemo, useState, useTransition } from 'react';
import TransparentIconButton from '@/components/buttons/TransparentIconButton';
import filters_icon from "@/public/images/filters_icon.png";
import { FiltersIcon } from '@/components/icons/FiltersIcon';
import TextButton from '@/components/buttons/TextButton';
import { useQuery } from '@tanstack/react-query';
import { ApiTopicsGetParams, ApiTopicsGetResponse, topicsGetApi } from '@/services/api/topics.get.endpoint';
import { TopicsProvider, useTopics } from '@/hooks/useTopics';
import { ArticleTopic, ParentTopicsSet } from '@/models/article_topic';
import ExplorePageSearch from './ExplorePageSearch';
import ExplorePageArticles from './ExplorePageArticles';
import { FiltersProvider } from '@/hooks/explore/useFilters';
import AppFooter from '../AppFooter';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { useDictionary } from '@/hooks/useDictionary';
import { Button, Card, CardBody, CardFooter, CardHeader, Image } from '@nextui-org/react';

export type ExplorePageContentProps = React.HTMLProps<HTMLDivElement>

const ExplorePageContent: React.FC<ExplorePageContentProps> = ({
}) => {
    const { language, translate } = useDictionary();

    return (
        <div className={clsx(
            'flex flex-col w-full pl-8 pr-8 gap-32'
        )}>
            <ExplorePageArticles />
            <AppFooter
                sectionTemplates={[
                    {
                        name: translate('common.footer.sections.menu.name'),
                        options: [
                            {
                                text: translate('common.footer.sections.menu.options.home'),
                                link: `/`
                            },
                            {
                                text: translate('common.footer.sections.menu.options.explore'),
                                link: `/explore`
                            },
                            {
                                text: translate('common.footer.sections.menu.options.about_us'),
                                link: `/about-us/`
                            },
                            {
                                text: translate('common.footer.sections.menu.options.categories'),
                                link: `/categories/`
                            }
                        ]
                    }
                ]}
            />
        </div>
    );
}

export default ExplorePageContent;