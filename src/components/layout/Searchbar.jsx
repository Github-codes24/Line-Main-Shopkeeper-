import {Search} from "lucide-react"; // for the search icon
import {useCallback, useRef, useState} from "react";
import useDashboard from "../../hook/dashboard/useDashboard";

export default function ProductListHeader() {
    const {loading, checkShopAvailability, searchProducts, searchProduct} = useDashboard();
    const [isOnline, setIsOnline] = useState(true);
    const timeoutRef = useRef(null);

    const debouncedSearch = useCallback(
        (value) => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            timeoutRef.current = setTimeout(() => {
                if (value?.trim()) searchProducts(value);
            }, 500);
        },
        [searchProducts]
    );

    const handleSearch = (e) => {
        debouncedSearch(e.target.value);
        if (!e.target.value.trim()) searchProducts(""); // Clear search
    };

    const handleStatus = () => {
        const status = {status: isOnline ? "Offline" : "Online"};
        checkShopAvailability(status);
        setIsOnline((prev) => !prev);
    };

    return (
        <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-3 bg-white p-3 rounded-md shadow">
            {/* Title */}
            <h4 className="font-semibold text-xl">Product List</h4>

            {/* Search bar */}
            <div className="flex items-center border border-teal-600 rounded-full px-3 py-1 w-full sm:w-[300px] bg-gray-200">
                <Search className="text-teal-600 mr-2" size={18} />
                <input
                    type="text"
                    placeholder="Search by Product Name..."
                    className="flex-1 outline-none bg-transparent text-sm placeholder-black"
                    onChange={(e) => {
                        handleSearch(e);
                    }}
                />
            </div>

            {/* Toggle Button */}
            <button
                className="bg-teal-600 text-white px-14 py-1.5 rounded-md hover:bg-teal-700 w-full sm:w-auto"
                onClick={handleStatus}
            >
                {isOnline ? "Go Offline" : "Go Online"}
            </button>
        </div>
    );
}
