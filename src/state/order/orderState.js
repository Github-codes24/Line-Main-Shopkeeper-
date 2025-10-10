import {atom} from "recoil";
import {recoilPersist} from "recoil-persist";
const {persistAtom} = recoilPersist();

export const getAllOrdersAtom = atom({
    key: "getallorders",
    default: [],
    effects_UNSTABLE: [persistAtom],
});

export const getOrderByIdAtom = atom({
    key: "getorderbyid",
    default: [],
    effects_UNSTABLE: [persistAtom],
});

export const uploadFinalBillAtom = atom({
    key: "uploadfinalbill",
    default: [],
    effects_UNSTABLE: [persistAtom],
});

export const acceptOrderAtom = atom({
    key: "acceptorder",
    default: [],
    effects_UNSTABLE: [persistAtom],
});

export const rejectOrderAtom = atom({
    key: "rejectorder",
    default: [],
    effects_UNSTABLE: [persistAtom],
});

export const reassignWorkerAtom = atom({
    key: "reassignworker",
    default: [],
    effects_UNSTABLE: [persistAtom],
});
