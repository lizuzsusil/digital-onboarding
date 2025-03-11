import {
    apiGetAllBranches,
    apiGetAllCities,
    apiGetAllDistricts,
    apiGetAllStates,
    apiGetDistrictById
} from "@/services/endpoints";
import {HttpRequest} from "@/services/request";
import {BranchModel, CityModel, DistrictModel, LocationResponse, StateModel} from "@/types/models/location";

export const locationApi = {
    fetchAllStates: async () => {
        const response = await HttpRequest.get<LocationResponse<StateModel>>(apiGetAllStates);
        return response.data
    },
    fetchAllDistricts: async () => {
        const response = await HttpRequest.get<LocationResponse<DistrictModel>>(apiGetAllDistricts);
        return response.data
    },
    fetchDistrictById: async (id: number) => {
        const response = await HttpRequest.get<LocationResponse<DistrictModel>>(apiGetDistrictById.substituteParameter({id}));
        return response.data
    },
    fetchAllBranches: async () => {
        const response = await HttpRequest.get<LocationResponse<BranchModel>>(apiGetAllBranches);
        return response.data
    },
    fetchAllCities: async () => {
        const response = await HttpRequest.get<LocationResponse<CityModel>>(apiGetAllCities);
        return response.data
    }
};
