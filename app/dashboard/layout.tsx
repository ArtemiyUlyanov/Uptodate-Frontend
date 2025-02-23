'use client';

import { FiltersProvider } from "@/hooks/explore/useFilters";
import { SearchProvider } from "@/hooks/models/useSearch";
import { CategoriesProvider } from "@/hooks/models/useCategories";

const DashboardLayout = ({
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
  
  export default DashboardLayout;