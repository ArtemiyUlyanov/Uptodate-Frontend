import { authorizedAxios } from "@/services/api/axios.config";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import qs from 'qs';
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

export type UseRetrieveConfigurer = {
    endpoint: string
    pathVariables?: Record<string, any>
    payload: any
}

const updateModel = async (depends_on: any | undefined, endpoint: string, payload: Record<string, string>): Promise<any | undefined> => {
    if (depends_on === undefined) {
        console.log('Unable to pull request: expected depending value is not provided!');
        return undefined;
    }

    const response = await authorizedAxios.get(endpoint || '', {
        params: payload,
        paramsSerializer: (params) => qs.stringify(params, { arrayFormat: "comma" }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    
    return response.data.response;
}

const useRetrieveQuery = <T> (
    params: {depends_on: any | undefined, endpoint: string, payload: Record<string, string>},
    opts: Partial<UseQueryOptions<T>> = {},
) => {
    return useQuery<T>({
      queryKey: ['depends_on', params.depends_on, 'endpoint', params.endpoint, 'payload', params.payload],
      queryFn: () => updateModel(params.depends_on, params.endpoint, params.payload),
      ...opts,
    });
}

export const useRetrieve = <T> (depends_on: any | undefined, configurer: UseRetrieveConfigurer): [T | undefined, () => void] => {
    const [response, setResponse] = useState<T | undefined>();
    
    const processedEndpoint = useMemo(() => {
        if (configurer.pathVariables) {
            return Object.entries(configurer.pathVariables).reduce(
                (acc: string, [key, value]: [string, any]) => acc.replace(`%${key}%`, value.toString()),
                configurer.endpoint
            )
        }

        return configurer.endpoint;
    }, [configurer.endpoint]);

    const { data, refetch } = useRetrieveQuery<T>({ depends_on, endpoint: processedEndpoint, payload: configurer.payload });

    useEffect(() => {
        refetch();
    }, []);

    useEffect(() => {
        if(data !== undefined) {
            setResponse(data);
        }
    }, [data]);

    return [response, refetch];
}
