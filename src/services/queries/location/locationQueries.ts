import {useQuery} from '@tanstack/react-query';
import {locationApi} from "@/services/api/location";
import {locationKeys} from "@/services/queries/location/locationKeys";

export const locationQueries = {
    useFetchAllBranches: () => {
        return useQuery({
            queryKey: locationKeys.LOCATION_BRANCHES,
            queryFn: locationApi.fetchAllBranches,
        });
    },
    useFetchAllStates: () => {
        return useQuery({
            queryKey: locationKeys.LOCATION_STATE,
            queryFn: locationApi.fetchAllStates,
        });
    },
    useFetchAllCities: () => {
        return useQuery({
            queryKey: locationKeys.LOCATION_CITIES,
            queryFn: locationApi.fetchAllCities,
        });
    },
    useFetchAllDistricts: () => {
        return useQuery({
            queryKey: locationKeys.LOCATION_DISTRICTS_ALL,
            queryFn: locationApi.fetchAllDistricts,
        });
    },
    useFetchDistrictById: (id: string) => {
        return useQuery({
            queryKey: locationKeys.LOCATION_DISTRICT,
            queryFn: () => locationApi.fetchDistrictById(id),
            enabled: !!id,
        });
    },
};