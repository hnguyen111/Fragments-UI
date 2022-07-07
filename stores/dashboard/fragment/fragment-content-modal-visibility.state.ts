import {atom} from "recoil";

const fragmentContentModalVisibilityState = atom<boolean>({
    key: "fragmentContentModalVisibilityState",
    default: false,
});

export default fragmentContentModalVisibilityState;