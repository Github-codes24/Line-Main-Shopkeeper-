import {useRecoilState} from "recoil";
import conf from "../../config";
import useFetch from "../../hook/useFetch";
import {
    checkAvailabilityAtom,
    getTopSellingProductAtom,
    productDetailsAtom,
    searchProductAtom,
} from "../../state/dashboard/dashboardState";
import {useState} from "react";

const useDashboard = () => {
    const [loading, setLoading] = useState(false);
    const [fetchData] = useFetch();
    const [dashboardData, setDashboardData] = useRecoilState(productDetailsAtom);
    const [searchProduct, setSearchProduct] = useRecoilState(searchProductAtom);
    const [checkAvailability, setCheckAvailability] = useRecoilState(checkAvailabilityAtom);
    const [topsellingProduct, setTopSellingProduct] = useRecoilState(getTopSellingProductAtom);

    const fetchProductDetails = async () => {
        setLoading(true);
        try {
            const res = await fetchData({
                method: "GET",
                url: `${conf.apiBaseUrl}/shopkeeper/dashboard`,
            });
            if (res) {
                setDashboardData(res);
            }
        } catch (error) {
            console.log("Error while fetch Profile :", error);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };

    const searchProducts = async (productName) => {
        if (!productName?.trim()) {
            setSearchProduct([]);
            return;
        }
        setLoading(true);
        try {
            const res = await fetchData({
                method: "GET",
                url: `${conf.apiBaseUrl}/shopkeeper/dashboard/search-products?name=${encodeURIComponent(productName)}`,
            });
            if (res?.data) {
                setSearchProduct(res?.data);
            }
        } catch (error) {
            console.log("Error while searching product", error);
        } finally {
            setLoading(false);
        }
    };

    const checkShopAvailability = async (status) => {
        setLoading(true);
        try {
            const res = await fetchData({
                method: "PATCH",
                url: `${conf.apiBaseUrl}/shopkeeper/dashboard/update-availability`,
                data: status,
            });
            if (res) {
                setCheckAvailability(res);
            }
        } catch (error) {
            console.log("Error while checking availability", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchTopSellingProducts = async () => {
        setLoading(true);
        try {
            const res = await fetchData({
                method: "GET",
                url: `${conf.apiBaseUrl}/shopkeeper/dashboard`,
            });
            if (res) {
                setTopSellingProduct(res?.topSellingProduct);
            }
        } catch (error) {
            console.log("Error while fetching top selling products", error);
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        fetchProductDetails,
        dashboardData,
        searchProducts,
        searchProduct,
        checkShopAvailability,
        checkAvailability,
        fetchTopSellingProducts,
        topsellingProduct,
    };
};

export default useDashboard;
