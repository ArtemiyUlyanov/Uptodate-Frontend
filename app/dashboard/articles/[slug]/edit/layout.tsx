'use client';

import { FiltersProvider } from "@/hooks/explore/useFilters";
import { SearchProvider } from "@/hooks/models/useSearch";
import { CategoriesProvider } from "@/hooks/models/useCategories";
import ProtectedRoute from "@/app/ProtectedRoute";

const DashboardArticleCreateLayout = ({
    children
}: Readonly<{children: React.ReactNode}>) => {
    return (
        <ProtectedRoute>
            <FiltersProvider>
                <SearchProvider>
                    <CategoriesProvider>
                        {children}
                    </CategoriesProvider>
                </SearchProvider>
            </FiltersProvider>
        </ProtectedRoute>
    );
  }
  
  export default DashboardArticleCreateLayout;