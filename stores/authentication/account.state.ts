import {atom} from "recoil";
import User from "../../types/fragments/user.type";

const accountState = atom<User | null>({
    key: "accountState",
    default: null as User | null,
});

export default accountState;