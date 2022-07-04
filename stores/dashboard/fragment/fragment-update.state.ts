import {atom} from "recoil";
import Fragment from "../../../types/dashboard/fragments/fragment.type";

const fragmentUpdateState = atom<Fragment | null>({
    key: "fragmentUpdateState",
    default: null,
});

export default fragmentUpdateState;