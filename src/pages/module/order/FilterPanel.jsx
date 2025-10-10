import React from "react";

const FilterPanel = ({selectedExpertise, selectedStatus, toggleFilter}) => {
    const expertiseList = ["Electrician", "Plumber", "Painter", "Carpenter", "AC Repair", "Tile Fitting"];
    const statusList = ["Pending", "Work in Progress", "Completed", "Rejected"];

    return (
        <div className="bg-white rounded-lg shadow-md px-3 py-2 w-64 text-sm border border-gray-300">
            <p className="text-base font-semibold mb-2">Expertise</p>
            {expertiseList.map((item) => (
                <label key={item} className="flex items-center space-x-2 mb-2">
                    <input
                        type="checkbox"
                        checked={selectedExpertise.includes(item)}
                        onChange={() => toggleFilter("expertise", item)}
                    />
                    <span>{item}</span>
                </label>
            ))}

            <p className="text-base font-semibold mt-3 mb-2">Status</p>
            {statusList.map((item) => (
                <label key={item} className="flex items-center space-x-2 mb-2">
                    <input
                        type="checkbox"
                        checked={selectedStatus.includes(item)}
                        onChange={() => toggleFilter("status", item)}
                    />
                    <span>{item}</span>
                </label>
            ))}
        </div>
    );
};

export default FilterPanel;
