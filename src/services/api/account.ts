import {apiGetAllAccountTypes} from "@/services/endpoints";
import {HttpRequest} from "@/services/request";
import {BankAccountResponse} from "@/types/models/account";

export const accountTypeApi = {
    fetchAll: async () => {
        const response = await HttpRequest.get<BankAccountResponse>(apiGetAllAccountTypes);
        return response.data;
    }
};
