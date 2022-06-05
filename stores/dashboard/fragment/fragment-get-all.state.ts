import {atom, selector} from "recoil";
import accountState from "../../authentication/account.state";
import {getAllFragments} from "../../../services/fragment/fragment.service";
import Fragment from "../../../types/dashboard/fragments/fragment.type";

export const defaultState = selector<Fragment[]>(({
    key: "getAllFragmentsDefaultState",
    get: async ({get}) => {
        try {
            const account = get(accountState);
            if (account) {
                const response = await getAllFragments(account, 1);
                return response.fragments;
            } else {
                return [];
            }
        } catch (error) {
            return [];
        }
    }
}));

const getAllFragmentsState = atom<Fragment[]>({
    key: "getAllFragmentsState",
    default: defaultState,
});

export default getAllFragmentsState;