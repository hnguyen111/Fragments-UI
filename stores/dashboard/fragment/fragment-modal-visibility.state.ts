import {atom} from "recoil";

const fragmentModalVisibilityState = atom<boolean>({
    key: "fragmentModalVisibilityState",
    default: false,
});

export default fragmentModalVisibilityState;