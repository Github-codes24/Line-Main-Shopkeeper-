import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import useFetch from "../../hook/useFetch";
import {useRecoilState} from "recoil";
import {expertiesAtom, workerAtom} from "../../state/dropdown/dropdownState";
import conf from "../../config";

const useDropdown = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [fetchData] = useFetch();

    const [getExperties, setGetExperties] = useRecoilState(expertiesAtom);
    const [getWorker, setGetWorker] = useRecoilState(workerAtom);

    const fetchExperties = async () => {
        setLoading(true);
        try {
            const res = await fetchData({
                method: "GET",
                url: `${conf.apiBaseUrl}/shopkeeper/bigproduct/experties`,
            });
            if (res) {
                setGetExperties(res?.data);
                setLoading(false);
            }
        } catch (error) {
            console.error("Error while fetching experties:", error);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };

    const fetchWorker = async (experties) => {
        setLoading(true);
        try {
            const res = await fetchData({
                method: "GET",
                url: `${conf.apiBaseUrl}/shopkeeper/worker/${experties}`,
            });
            if (res) {
                setGetWorker(res?.data);
                setLoading(false);
            }
        } catch (error) {
            console.error("Error while fetching worker:", error);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };

    return {loading, getExperties, fetchExperties, getWorker, fetchWorker};
};

export default useDropdown;
