import axios from "axios";

const useFetch = () => {
    const fetchData = async ({method, url, data = null, headers = {}}) => {
        try {
            const token = sessionStorage.getItem("token");

            const config = {
                method,
                url,
                data,
                headers: {
                    ...headers,
                    Authorization: token ? `Bearer ${token}` : "",
                },
            };

            const response = await axios(config);
            return response.data;
        } catch (error) {
            console.error("API Error:", error);
            return {
                success: false,
                message: error.response?.data?.message || error.message || "Something went wrong",
            };
        }
    };

    return [fetchData];
};

export default useFetch;
