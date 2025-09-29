import {atom} from "recoil";
import {recoilPersist} from "recoil-persist";
const {persistAtom} = recoilPersist();

export const shopkeeperLoginAtom = atom({
    key: "shopkeeper",
    default: {isAuthenticated: false},
    effects_UNSTABLE: [persistAtom],
});

export const profileAtom = atom({
    key: "profile",
    default: [],
    effects_UNSTABLE: [persistAtom],
});
