import {apiGetAllAccountTypes} from "@/services/endpoints";
import {HttpRequest} from "@/services/request";
import {BankAccount} from "@/types/models/account";

export const accountTypeApi = {
    fetchAll: async () => {
        const response = await HttpRequest.get<BankAccount[]>(apiGetAllAccountTypes);
        return response.data;
    }
};
