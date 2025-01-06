import { FiltersContext, FiltersProvider } from '@/hooks/explore/useFilters';
import clsx from 'clsx';
import React from 'react';

export type ExplorePageLayoutProps = React.HTMLProps<HTMLDivElement> & {
    topMenu: React.ReactNode
}

const ExplorePageLayout: React.FC<ExplorePageLayoutProps> = ({
    children,
    topMenu,
    ...props
}) => {
    return (
        <div className={clsx(
            'flex flex-col items-center gap-8 sm:gap-16 pb-8 w-full h-auto'
        )}>
            {topMenu}
            <div className={clsx(
                'flex flex-col items-center gap-8 sm:gap-16 pb-8 mt-[120px] w-full'
            )}>
                {children}
            </div>
        </div>
    );
}

export default ExplorePageLayout;