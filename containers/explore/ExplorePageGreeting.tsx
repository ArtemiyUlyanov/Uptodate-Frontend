'use client';

import TransparentButton from '@/components/buttons/TransparentButton';
import DefaultButton from '@/components/buttons/DefaultButton';
import { SearchIcon } from '@/components/icons/SearchIcon';
import { SearchTextIcon } from '@/components/icons/SearchTextIcon';
import IconInput from '@/components/inputs/IconInput';
import TransparentInput from '@/components/inputs/IconInput';
import clsx from 'clsx';
import React from 'react';
import WhiteArrowLink from '@/components/links/WhiteLink';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

export type ExplorePageGreetingProps = React.HTMLProps<HTMLDivElement> & {
}

const ExplorePageGreeting: React.FC<ExplorePageGreetingProps> = ({
}) => {
    const { isAuthenticated } = useSelector((state: RootState) => state.auth);

    return (
        <div className={clsx(
            'flex flex-col gap-12 w-[100%] p-4 sm:w-[50%] sm:p-0'
        )}>
            <div className={clsx(
                'flex flex-col items-center gap-4 sm:gap-6'
            )}>
                {/* <div className={clsx(
                    'h-10'
                )}>
                    <SearchTextIcon />
                </div> */}
                <div className={clsx(
                    'flex flex-col items-center gap-2'
                )}>
                    <p className={clsx(
                        'font-interTight font-semibold text-3xl text-center text-primaryText'
                    )}>
                        Explore all articles on our website
                    </p>
                    <p className={clsx(
                        'font-interTight font-medium text-lg text-center text-secondaryText'
                    )}>
                        There are a plenty of various articles in there with lots of different topics for every taste and need
                    </p>
                </div>
                <div className={clsx(
                    'flex flex-row flex-wrap justify-center items-center w-[100%] gap-4',
                    isAuthenticated && 'hidden'
                )}>
                    <DefaultButton
                        text='Get started'
                        link='/register'
                        className='font-semibold text-base sm:text-sm'
                    />
                    <WhiteArrowLink 
                        text='I already have an account'
                        link='/login'
                        actived={true}
                        arrowActived={true}
                        underliningActived={true}
                        className='font-medium text-base sm:text-sm'
                    />
                </div>
            </div>
        </div>
    );
}

export default ExplorePageGreeting;