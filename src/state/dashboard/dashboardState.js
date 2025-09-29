import {atom} from "recoil";
import {recoilPersist} from "recoil-persist";
const {persistAtom} = recoilPersist();

export const productDetailsAtom = atom({
    key: "productDetails",
    default: [],
    effects_UNSTABLE: [persistAtom],
});

export const searchProductAtom = atom({
    key: "searchproduct",
    default: [],
    effects_UNSTABLE: [persistAtom],
});

export const checkAvailabilityAtom = atom({
    key: "checkavailability",
    default: [],
    effects_UNSTABLE: [persistAtom],
});

export const getTopSellingProductAtom = atom({
    key: "gettopsellingproduct",
    default: [],
    effects_UNSTABLE: [persistAtom],
});
