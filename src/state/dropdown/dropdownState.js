import {atom} from "recoil";
import {recoilPersist} from "recoil-persist";
const {persistAtom} = recoilPersist();

export const expertiesAtom = atom({
    key: "experties",
    default: [],
    effects_UNSTABLE: [persistAtom],
});

export const workerAtom = atom({
    key: "worker",
    default: [],
    effects_UNSTABLE: [persistAtom],
});
