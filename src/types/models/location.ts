import {PrimaryBase, TimeStampBase} from "@/types/models/base";

export interface StateModel extends PrimaryBase, TimeStampBase {
    name: string;
    name_np: string;
    name_final: string;
    name_combined: string;
    code: string;
}

export interface DistrictModel extends PrimaryBase, TimeStampBase {
    name: string;
    name_np: string;
    name_final: string;
    name_combined: string;
    code: string;
    ng_id: string;
    state: StateModel;
    state_id: number;
    cbs_code: string | null;
}

export interface CityModel extends PrimaryBase {
    name: string;
    district_id: number;
    name_np: string;
    name_final: string;
    name_combined: string;
    code: number;
}

export interface BranchModel extends PrimaryBase, TimeStampBase {
    branch_name: string;
    code: string;
    description: string;
    city_id: number;
    city: CityModel;
    state_id: number | null;
    district_id: number;
    street_address: string;
    ward_no: string;
    tel: string;
    email: string;
    fax: string;
}

export interface LocationResponse<T> {
    data: Array<T>
}