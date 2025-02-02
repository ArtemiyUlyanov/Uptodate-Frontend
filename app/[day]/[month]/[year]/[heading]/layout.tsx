'use client';

import { FiltersProvider } from "@/hooks/explore/useFilters";
import { SearchProvider } from "@/hooks/explore/useSearch";
import { TopicsProvider } from "@/hooks/useTopics";

const ExploreLayout = ({
    children
}: Readonly<{children: React.ReactNode}>) => {
    return (
        <FiltersProvider>
            <SearchProvider>
                <TopicsProvider>
                    {children}
                </TopicsProvider>
            </SearchProvider>
        </FiltersProvider>
    );
  }
  
  export default ExploreLayout;