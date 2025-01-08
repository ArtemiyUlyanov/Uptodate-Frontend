'use client';

import TransparentButton from '@/components/buttons/TransparentButton';
import DefaultButton from '@/components/buttons/DefaultButton';
import { SearchIcon } from '@/components/icons/SearchIcon';
import { SearchTextIcon } from '@/components/icons/SearchTextIcon';
import IconInput from '@/components/inputs/IconInput';
import TransparentInput from '@/components/inputs/IconInput';
import clsx from 'clsx';
import React from 'react';
import WhiteArrowLink from '@/components/links/DefaultLink';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

export type ExplorePageGreetingProps = React.HTMLProps<HTMLDivElement> & {
}

const ExplorePageGreeting: React.FC<ExplorePageGreetingProps> = ({
}) => {
    const { isAuthenticated } = useSelector((state: RootState) => state.auth);
    const translate = useTranslations('explore');

    return (
        <div className={clsx(
            'flex flex-col gap-12 w-full pl-8 pr-8'
        )}>
            <div className={clsx(
                'flex flex-col items-start gap-4 sm:gap-6'
            )}>
                <div className={clsx(
                    'flex flex-col items-start'
                )}>
                    <p className={clsx(
                        'font-interTight font-semibold text-2xl text-left text-primaryText'
                    )}>
                        {translate('explore_greetings_text')}
                    </p>
                    <p className={clsx(
                        'font-interTight font-medium text-xl text-left text-secondaryText'
                    )}>
                        {translate('explore_greetings_subtext')}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default ExplorePageGreeting;