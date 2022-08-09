import {atom} from "recoil";

const fragmentMimeTypeState = atom<string | null>({
    key: "fragmentMimeTypeState",
    default: "",
});

export default fragmentMimeTypeState;