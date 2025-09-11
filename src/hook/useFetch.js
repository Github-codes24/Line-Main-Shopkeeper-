import axios from "axios";

const useFetch = () => {
  const fetchData = async ({ method, url, data = null, headers = {} }) => {
    try {
      const token = localStorage.getItem("token"); // get token from localStorage

      const config = {
        method,
        url,
        data,
        headers: {
          ...headers,
          Authorization: token ? `Bearer ${token}` : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OGJlZTZkNzM2NmYwZjY1NDU4YmMwZjYiLCJyb2xlIjoic2hvcGtlZXBlciIsImlhdCI6MTc1NzQ4MTY4MiwiZXhwIjoxNzYwMDczNjgyfQ.uNdDvIPsRS84-_Xfn2P-QjZqxf2eNSNQIWB7pED3JA4", // send token if available
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
