import { CategoryModel } from "@/models/category";
import { ApiCategoriesGetParams, ApiCategoriesGetResponse, categoriesGetApi } from "@/services/api/categories.get.endpoint";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { createContext, useContext, useEffect, useState } from "react";

const useCategoriesQuery = (
    params: ApiCategoriesGetParams,
    opts: Partial<UseQueryOptions<ApiCategoriesGetResponse>> = {},
) => {
    return useQuery<ApiCategoriesGetResponse>({
      queryKey: ['categories', params.parent],
      queryFn: () => categoriesGetApi(params),
      ...opts,
    });
}

type CategoriesContextType = {
    categories: CategoryModel[]
}

const defaultContext: CategoriesContextType = {
    categories: []
}

export const CategoriesContext = createContext<CategoriesContextType>(defaultContext);

export type CategoriesProviderProps = React.HTMLProps<HTMLDivElement>

export const CategoriesProvider: React.FC<CategoriesProviderProps> = ({
    children
}) => {
    const [categories, setCategories] = useState<CategoryModel[]>([]);
    const categoriesQuery = useCategoriesQuery({});

    useEffect(() => {
        categoriesQuery.refetch();
    }, []);

    useEffect(() => {
        categoriesQuery.data && setCategories(categoriesQuery.data?.categories);
    }, [categoriesQuery.data])

    return (
        <CategoriesContext.Provider value={{ categories }}>
            {children}
        </CategoriesContext.Provider>
    );
}

export const useCategories = () => useContext(CategoriesContext);