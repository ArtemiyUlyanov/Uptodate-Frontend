'use client';

import { FiltersProvider } from "@/hooks/explore/useFilters";
import { SearchProvider } from "@/hooks/explore/useSearch";
import { CategoriesProvider } from "@/hooks/useCategories";

const ExploreLayout = ({
    children
}: Readonly<{children: React.ReactNode}>) => {
    return (
        <FiltersProvider>
            <SearchProvider>
                <CategoriesProvider>
                    {children}
                </CategoriesProvider>
            </SearchProvider>
        </FiltersProvider>
    );
  }
  
  export default ExploreLayout;