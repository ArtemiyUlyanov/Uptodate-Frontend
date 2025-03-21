'use client';

import { FiltersProvider } from "@/hooks/explore/useFilters";
import { SearchProvider } from "@/hooks/models/useSearch";
import ProtectedRoute from "@/app/ProtectedRoute";

const DashboardArticleCreateLayout = ({
    children
}: Readonly<{children: React.ReactNode}>) => {
    return (
        <ProtectedRoute>
            <FiltersProvider>
                <SearchProvider>
                    {children}
                </SearchProvider>
            </FiltersProvider>
        </ProtectedRoute>
    );
  }
  
  export default DashboardArticleCreateLayout;