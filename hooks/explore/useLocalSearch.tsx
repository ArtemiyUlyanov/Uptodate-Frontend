import { SearchIcon } from "@/components/icons/SearchIcon"
import { CustomInputProps } from "@/components/inputs/custom_input_props"
import DefaultInput from "@/components/inputs/DefaultInput"
import IconInput from "@/components/inputs/IconInput"
import React, { Dispatch, ReactElement, SetStateAction, useMemo, useState } from "react"

export type UseLocalSearchResponse = {
    searchInput: React.ReactNode
    query: string
    setQuery: Dispatch<SetStateAction<string>>
}

export const useLocalSearch = (input: ReactElement<CustomInputProps>): UseLocalSearchResponse => {
    const [query, setQuery] = useState<string>('');

    const searchInput = useMemo(() =>
        React.cloneElement(input, {
            handleChange: (value) => setQuery(value)
        })
    , [query]);

    return {searchInput: searchInput, query: query, setQuery: setQuery};
}