'use client';

import { FiltersProvider } from "@/hooks/explore/useFilters";
import { SearchProvider } from "@/hooks/models/useSearch";
import { CategoriesProvider } from "@/hooks/models/useCategories";
import ProtectedRoute from "@/app/ProtectedRoute";

const DashboardLikedArticlesLayout = ({
    children
}: Readonly<{children: React.ReactNode}>) => {
    return (
        <ProtectedRoute>
            {children}
        </ProtectedRoute>
    );
  }
  
  export default DashboardLikedArticlesLayout;