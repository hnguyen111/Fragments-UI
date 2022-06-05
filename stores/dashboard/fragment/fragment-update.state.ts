import {atom} from "recoil";

const fragmentUpdateState = atom<any>({
    key: "fragmentUpdateState",
    default: null,
});

export default fragmentUpdateState;