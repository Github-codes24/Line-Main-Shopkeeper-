import React from 'react';
import search from '../../../assets/search.png';
import filter from '../../../assets/filter.png';
import cross from '../../../assets/cross.png';
import vector from '../../../assets/vector.png';
// import eyeo from '../../../assets/eyeo.png';
// import eyei from '../../../assets/eyei.png';

const Payment = () => {
    return (
        <div className="relative">
            <div className="absolute top-[90px] left-[316px] w-[1108px] h-[72px] bg-white rounded-lg p-4 shadow-md flex justify-between items-center">
                {/* Left side - Page Title and Search */}
                <div className="flex items-center gap-6">
                    <div className="w-[280px] h-[36px] font-poppins font-medium text-2xl leading-none text-center flex items-center justify-center text-[#0D2E28]">
                        Payment Management
                    </div>

                    {/* Search Bar */}
                    <div className="relative flex items-center">
                        <img
                            src={search}
                            alt="Search"
                            className="w-6 h-6 absolute left-4 z-10"
                        />
                        <input
                            type="text"
                            placeholder="Search worker name here..."
                            className="w-[400px] h-[40px] rounded-[40px] border border-[#007E74] bg-[#F5FFFF] pt-2 pr-4 pb-2 pl-12 gap-2 outline-none"
                        />
                    </div>
                </div>

                {/* Right side - Empty for now */}
                <div className="flex items-center gap-4">
                </div>
            </div>

            {/* Body Container */}
            <div className="absolute top-[194px] left-[316px] w-[1108px] h-[770px] bg-white rounded-lg p-4 gap-4 border border-[#999999]">
                {/* Inner div with specified properties */}
                <div className="w-[1076px] h-[40px] flex justify-between items-center">
                    {/* Left side - Filter button and Electrician container */}
                    <div className="flex items-center gap-4">
                        <button
                            className="w-[40px] h-[40px] bg-[#E0E9E9] rounded-[10px] flex items-center justify-center transition-none duration-0"
                            onClick={() => {
                                // Open overlay: "ADMIN WORKER FILTER"
                                console.log('Opening ADMIN WORKER FILTER overlay');
                            }}
                        >
                            <img
                                src={filter}
                                alt="Filter"
                                className="w-6 h-6"
                            />
                        </button>

                        {/* Electrician container */}
                        <div className="w-[148px] h-[40px] bg-[#E0E9E9] rounded-[40px] pt-2 pr-4 pb-2 pl-4 gap-2 flex items-center justify-center">
                            <div className="w-[84px] h-[24px] font-poppins font-medium text-base leading-none text-center flex items-center justify-center text-[#0D2E28]">
                                Electrician
                            </div>
                            <div className="relative w-6 h-6">
                                <img
                                    src={cross}
                                    alt="Close"
                                    className="border-[1.5px]  absolute top-[8.46px] left-[8.46px]"
                                    style={{
                                        width: '10px',
                                        height: '10px'
                                    }}
                                />
                            </div>
                        </div>

                        {/* Plumber container */}
                        <div className="w-[148px] h-[40px] bg-[#E0E9E9] rounded-[40px] pt-2 pr-4 pb-2 pl-4 gap-2 flex items-center justify-center">
                            <div className="w-[84px] h-[24px] font-poppins font-medium text-base leading-none text-center flex items-center justify-center text-[#0D2E28]">
                                Plumber
                            </div>
                            <div className="relative w-6 h-6">
                                <img
                                    src={cross}
                                    alt="Close"
                                    className="border-[1.5px]  absolute top-[8.46px] left-[8.46px]"
                                    style={{
                                        width: '10px',
                                        height: '10px'
                                    }}
                                />
                            </div>
                        </div>

                        {/* Painter container */}
                        <div className="w-[148px] h-[40px] bg-[#E0E9E9] rounded-[40px] pt-2 pr-4 pb-2 pl-4 gap-2 flex items-center justify-center">
                            <div className="w-[84px] h-[24px] font-poppins font-medium text-base leading-none text-center flex items-center justify-center text-[#0D2E28]">
                                Painter
                            </div>
                            <div className="relative w-6 h-6">
                                <img
                                    src={cross}
                                    alt="Close"
                                    className="border-[1.5px]  absolute top-[8.46px] left-[8.46px]"
                                    style={{
                                        width: '10px',
                                        height: '10px'
                                    }}
                                />
                            </div>
                        </div>
                    </div>


                    {/* Right side - Reset Filter button */}
                    <button className="w-[200px] h-[40px] bg-[#D9F1EB] border border-[#007E74] rounded-lg flex items-center justify-center text-[#007E74] font-medium">
                        Reset Filter
                    </button>
                </div>

                {/* Content area */}
                <div className="w-[1076px] h-[590px] rounded-lg border border-[#616666] mt-4">
                    {/* Table layout */}
                    <div className="w-[1076px] h-[456px] flex">
                        {/* First column - Sr.No */}
                        <div className="w-[88px] h-[456px]">
                            {/* Header cell */}
                            <div className="w-[88px] h-[56px] bg-[#E0E9E9] p-4 gap-4 border-b flex items-center justify-center">
                                <div className="w-[42px] h-[24px] font-poppins font-medium text-base leading-none text-center flex items-center justify-center text-[#0D2E28]">
                                    Sr.No
                                </div>
                            </div>

                            {/* Cell with "1" */}
                            <div className="w-[88px] h-[80px] bg-white gap-4 pr-4 pl-4 flex items-center justify-center">
                                <div className="w-[6px] h-[24px] font-poppins font-normal text-base leading-none text-center flex items-center justify-center text-[#0D2E28]">
                                    1
                                </div>
                            </div>

                            {/* Cell with "2" */}
                            <div className="w-[88px] h-[80px] bg-white gap-4 pr-4 pl-4 flex items-center justify-center">
                                <div className="w-[6px] h-[24px] font-poppins font-normal text-base leading-none text-center flex items-center justify-center text-[#0D2E28]">
                                    2
                                </div>
                            </div>

                            {/* Cell with "3" */}
                            <div className="w-[88px] h-[80px] bg-white gap-4 pr-4 pl-4 flex items-center justify-center">
                                <div className="w-[6px] h-[24px] font-poppins font-normal text-base leading-none text-center flex items-center justify-center text-[#0D2E28]">
                                    3
                                </div>
                            </div>

                            {/* Cell with "4" */}
                            <div className="w-[88px] h-[80px] bg-white gap-4 pr-4 pl-4 flex items-center justify-center">
                                <div className="w-[6px] h-[24px] font-poppins font-normal text-base leading-none text-center flex items-center justify-center text-[#0D2E28]">
                                    4
                                </div>
                            </div>

                            {/* Cell with "5" */}
                            <div className="w-[88px] h-[80px] bg-white gap-4 pr-4 pl-4 flex items-center justify-center">
                                <div className="w-[6px] h-[24px] font-poppins font-normal text-base leading-none text-center flex items-center justify-center text-[#0D2E28]">
                                    5
                                </div>
                            </div>
                        </div>

                        {/* Second column - Order No. */}
                        <div className="w-[200px] h-[456px]">
                            {/* Header cell with specified properties */}
                            <div className="w-[200px] h-[56px] bg-[#E0E9E9] p-4 gap-4 border-b flex items-center justify-center">
                                {/* Order No. text with specified properties */}
                                <div className="w-[76px] h-[24px] font-poppins font-medium text-base leading-none text-center flex items-center justify-center text-[#0D2E28]">
                                    Order No.
                                </div>
                            </div>

                            {/* Cell with first order number */}
                            <div className="w-[200px] h-[80px] bg-white gap-4 pr-4 pl-4 flex items-center justify-center">
                                <div className="w-[153px] h-[24px] font-poppins font-normal text-base leading-none text-center flex items-center justify-center text-[#0D2E28]">
                                    ORD8468163287164
                                </div>
                            </div>

                            {/* Cell with second order number */}
                            <div className="w-[200px] h-[80px] bg-white gap-4 pr-4 pl-4 flex items-center justify-center">
                                <div className="w-[153px] h-[24px] font-poppins font-normal text-base leading-none text-center flex items-center justify-center text-[#0D2E28]">
                                    ORD8468163287164
                                </div>
                            </div>

                            {/* Cell with third order number */}
                            <div className="w-[200px] h-[80px] bg-white gap-4 pr-4 pl-4 flex items-center justify-center">
                                <div className="w-[153px] h-[24px] font-poppins font-normal text-base leading-none text-center flex items-center justify-center text-[#0D2E28]">
                                    ORD8468163287164
                                </div>
                            </div>

                            {/* Cell with fourth order number */}
                            <div className="w-[200px] h-[80px] bg-white gap-4 pr-4 pl-4 flex items-center justify-center">
                                <div className="w-[153px] h-[24px] font-poppins font-normal text-base leading-none text-center flex items-center justify-center text-[#0D2E28]">
                                    ORD8468163287164
                                </div>
                            </div>

                            {/* Cell with fifth order number */}
                            <div className="w-[200px] h-[80px] bg-white gap-4 pr-4 pl-4 flex items-center justify-center">
                                <div className="w-[153px] h-[24px] font-poppins font-normal text-base leading-none text-center flex items-center justify-center text-[#0D2E28]">
                                    ORD8468163287164
                                </div>
                            </div>
                        </div>

                        {/* Third column - Worker Role */}
                        <div className="w-[160px] h-[456px]">
                            {/* Header cell with specified properties */}
                            <div className="w-[160px] h-[56px] bg-[#E0E9E9] p-4 gap-4 border-b flex items-center justify-center">
                                {/* Worker Role text with specified properties */}
                                <div className="w-[96px] h-[24px] font-poppins font-medium text-base leading-none text-center flex items-center justify-center text-[#0D2E28]">
                                    Worker Role
                                </div>
                            </div>

                            {/* First data cell */}
                            <div className="w-[160px] h-[80px] bg-white gap-4 pr-4 pl-4 flex items-center justify-center">
                                {/* Plumber text with specified properties */}
                                <div className="w-[67px] h-[24px] font-poppins font-normal text-base leading-none text-center flex items-center justify-center text-[#0D2E28]">
                                    Plumber
                                </div>
                            </div>

                            {/* Second data cell - AC Repair */}
                            <div className="w-[160px] h-[80px] bg-white gap-4 pr-4 pl-4 flex items-center justify-center">
                                <div className="w-[80px] h-[24px] font-poppins font-normal text-base leading-none text-center flex items-center justify-center text-[#0D2E28]">
                                    AC Repair
                                </div>
                            </div>

                            {/* Third data cell - Electrician */}
                            <div className="w-[160px] h-[80px] bg-white gap-4 pr-4 pl-4 flex items-center justify-center">
                                <div className="w-[67px] h-[24px] font-poppins font-normal text-base leading-none text-center flex items-center justify-center text-[#0D2E28]">
                                    Electrician
                                </div>
                            </div>

                            {/* Fourth data cell - Painter */}
                            <div className="w-[160px] h-[80px] bg-white gap-4 pr-4 pl-4 flex items-center justify-center">
                                <div className="w-[67px] h-[24px] font-poppins font-normal text-base leading-none text-center flex items-center justify-center text-[#0D2E28]">
                                    Painter
                                </div>
                            </div>

                            {/* Fifth data cell - Carpenter */}
                            <div className="w-[160px] h-[80px] bg-white gap-4 pr-4 pl-4 flex items-center justify-center">
                                <div className="w-[67px] h-[24px] font-poppins font-normal text-base leading-none text-center flex items-center justify-center text-[#0D2E28]">
                                    Carpenter
                                </div>
                            </div>
                        </div>

                        {/* Fourth column - New column with specified properties */}
                        <div className="w-[160px] h-[456px]">
                            {/* Header cell with specified properties */}
                            <div className="w-[160px] h-[56px] bg-[#E0E9E9] p-4 gap-4 border-b flex items-center justify-center">
                                {/* Worker name text with specified properties */}
                                <div className="w-[150px] h-[24px] font-poppins font-medium text-base leading-none text-center flex items-center justify-center text-[#0D2E28]">
                                    Worker name
                                </div>
                            </div>

                            {/* First data cell with specified styling */}
                            <div className="w-[160px] h-[80px] opacity-100 gap-4 px-4 bg-white flex items-center justify-center">
                                <div className="w-[115px] h-[24px] opacity-100 font-poppins font-normal text-base leading-none text-center flex items-center justify-center text-[#0D2E28]">
                                    William Clarke
                                </div>
                            </div>

                            {/* Second data cell */}
                            <div className="w-[160px] h-[80px] opacity-100 gap-4 px-4 bg-white flex items-center justify-center">
                                <div className="w-[130px] h-[24px] opacity-100 font-poppins font-normal text-base leading-none text-center flex items-center justify-center text-[#0D2E28] whitespace-nowrap">
                                    Thomas Bennett
                                </div>
                            </div>

                            {/* Third data cell */}
                            <div className="w-[160px] h-[80px] opacity-100 gap-4 px-4 bg-white flex items-center justify-center">
                                <div className="w-[115px] h-[24px] opacity-100 font-poppins font-normal text-base leading-none text-center flex items-center justify-center text-[#0D2E28]">
                                    Charles Turner
                                </div>
                            </div>

                            {/* Fourth data cell */}
                            <div className="w-[160px] h-[80px] opacity-100 gap-4 px-4 bg-white flex items-center justify-center">
                                <div className="w-[115px] h-[24px] opacity-100 font-poppins font-normal text-base leading-none text-center flex items-center justify-center text-[#0D2E28]">
                                    Samuel Hughes
                                </div>
                            </div>

                            {/* Fifth data cell */}
                            <div className="w-[160px] h-[80px] opacity-100 gap-4 px-4 bg-white flex items-center justify-center">
                                <div className="w-[115px] h-[24px] opacity-100 font-poppins font-normal text-base leading-none text-center flex items-center justify-center text-[#0D2E28]">
                                    Oliver Foster
                                </div>
                            </div>
                        </div>

                        {/* Fifth column with specified properties */}
                        <div className="w-[157px] h-[456px] opacity-100">
                            {/* Header cell with specified properties */}
                            <div className="w-[157px] h-[56px] opacity-100 p-4 gap-4 border-b bg-[#E0E9E9] flex items-center justify-center">
                                <div className="w-[107px] h-[24px] opacity-100 font-poppins font-medium text-base leading-none text-center flex items-center justify-center text-[#0D2E28]">
                                    Last updated
                                </div>
                            </div>

                            {/* First data cell with specified styling */}
                            <div className="w-[157px] h-[80px] opacity-100 gap-4 px-4 bg-white flex items-center justify-center">
                                <div className="w-[82px] h-[24px] opacity-100 font-poppins font-normal text-base leading-none text-center flex items-center justify-center text-[#0D2E28]">
                                    10-5-2025
                                </div>
                            </div>

                            {/* Second data cell */}
                            <div className="w-[157px] h-[80px] opacity-100 gap-4 px-4 bg-white flex items-center justify-center">
                                <div className="w-[82px] h-[24px] opacity-100 font-poppins font-normal text-base leading-none text-center flex items-center justify-center text-[#0D2E28]">
                                    15-05-2025
                                </div>
                            </div>

                            {/* Third data cell */}
                            <div className="w-[157px] h-[80px] opacity-100 gap-4 px-4 bg-white flex items-center justify-center">
                                <div className="w-[82px] h-[24px] opacity-100 font-poppins font-normal text-base leading-none text-center flex items-center justify-center text-[#0D2E28]">
                                    16-07-2025
                                </div>
                            </div>

                            {/* Fourth data cell */}
                            <div className="w-[157px] h-[80px] opacity-100 gap-4 px-4 bg-white flex items-center justify-center">
                                <div className="w-[82px] h-[24px] opacity-100 font-poppins font-normal text-base leading-none text-center flex items-center justify-center text-[#0D2E28]">
                                    12-04-2025
                                </div>
                            </div>

                            {/* Fifth data cell */}
                            <div className="w-[157px] h-[80px] opacity-100 gap-4 px-4 bg-white flex items-center justify-center">
                                <div className="w-[82px] h-[24px] opacity-100 font-poppins font-normal text-base leading-none text-center flex items-center justify-center text-[#0D2E28]">
                                    28-05-2025
                                </div>
                            </div>
                        </div>

                        {/* Sixth column with specified properties */}
                        <div className="w-[177px] h-[456px] opacity-100">
                            {/* Header cell with specified properties */}
                            <div className="w-[210px] h-[56px] opacity-100 p-4 gap-4 border-b bg-[#E0E9E9] flex items-center justify-center">
                                <div className="w-[178px] h-[24px] opacity-100 font-poppins font-medium text-base leading-none text-center flex items-center justify-center text-[#0D2E28]">
                                    Settlement Status
                                </div>
                            </div>

                            {/* First data cell with specified styling */}
                            <div className="w-[177px] h-[80px] opacity-100 gap-4 px-4 bg-white flex items-center justify-center">
                                <div className="w-[66px] h-[24px] opacity-100 font-poppins font-normal text-base leading-none text-center flex items-center justify-center text-[#FFCC00]">
                                    Pending
                                </div>
                            </div>

                            {/* Second data cell */}
                            <div className="w-[177px] h-[80px] opacity-100 gap-4 px-4 bg-white flex items-center justify-center">
                                <div className="w-[66px] h-[24px] opacity-100 font-poppins font-normal text-base leading-none text-center flex items-center justify-center text-[#00CC66]">
                                    Paid
                                </div>
                            </div>

                            {/* Third data cell */}
                            <div className="w-[177px] h-[80px] opacity-100 gap-4 px-4 bg-white flex items-center justify-center">
                                <div className="w-[66px] h-[24px] opacity-100 font-poppins font-normal text-base leading-none text-center flex items-center justify-center text-[#FFCC00]">
                                    Pending
                                </div>
                            </div>

                            {/* Fourth data cell */}
                            <div className="w-[177px] h-[80px] opacity-100 gap-4 px-4 bg-white flex items-center justify-center">
                                <div className="w-[66px] h-[24px] opacity-100 font-poppins font-normal text-base leading-none text-center flex items-center justify-center text-[#00CC66]">
                                    Paid
                                </div>
                            </div>

                            {/* Fifth data cell */}
                            <div className="w-[177px] h-[80px] opacity-100 gap-4 px-4 bg-white flex items-center justify-center">
                                <div className="w-[66px] h-[24px] opacity-100 font-poppins font-normal text-base leading-none text-center flex items-center justify-center text-[#FFCC00]">
                                    Pending
                                </div>
                            </div>
                        </div>

                        {/* Seventh column with specified properties */}
                        <div className="w-[134px] h-[456px] opacity-100">
                            {/* Header cell with specified properties */}
                            <div className="w-[134px] h-[56px] opacity-100 p-4 gap-4 border-b bg-[#E0E9E9] flex items-center justify-center">
                                <div className="w-[52px] h-[24px] opacity-100 font-poppins font-medium text-base leading-none text-center flex items-center justify-center text-[#0D2E28]">
                                    Action
                                </div>
                            </div>

                            {/* First data cell with specified styling */}
                            <div className="w-[134px] h-[80px] opacity-100 gap-4 px-4 bg-white flex items-center justify-center">
                                <div className="w-[24px] h-[24px] opacity-100 relative flex items-center justify-center">
                                    {/* Eye outline - eye shape */}
                                    <div className="w-[22px] h-[14px] bg-transparent border-2 border-[#007E74] relative flex items-center justify-center"
                                        style={{
                                            borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
                                            transform: 'rotate(0deg)'
                                        }}>
                                        {/* Eye pupil - hollow inner circle */}
                                        <div className="w-[6px] h-[6px] bg-transparent border-2 border-[#007E74] rounded-full"></div>
                                    </div>
                                </div>
                                <button className="w-[62px] h-[40px] opacity-100 rounded-lg border px-4 bg-[#D9F1EB] border-[#007E74] flex items-center justify-center text-[#007E74] font-medium text-sm">
                                    Pay
                                </button>
                            </div>

                            {/* Second data cell */}
                            <div className="w-[134px] h-[80px] opacity-100 gap-4 px-4 bg-white flex items-center justify-center">
                                <div className="w-[24px] h-[24px] opacity-100 relative flex items-center justify-center">
                                    {/* Eye outline - eye shape */}
                                    <div className="w-[22px] h-[14px] bg-transparent border-2 border-[#007E74] relative flex items-center justify-center"
                                        style={{
                                            borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
                                            transform: 'rotate(0deg)'
                                        }}>
                                        {/* Eye pupil - hollow inner circle */}
                                        <div className="w-[6px] h-[6px] bg-transparent border-2 border-[#007E74] rounded-full"></div>
                                    </div>
                                </div>
                                <button className="w-[62px] h-[40px] opacity-100 rounded-lg border px-4 bg-[#D9F1EB] border-[#007E74] flex items-center justify-center text-[#007E74] font-medium text-sm">
                                    Pay
                                </button>
                            </div>

                            {/* Third data cell */}
                            <div className="w-[134px] h-[80px] opacity-100 gap-4 px-4 bg-white flex items-center justify-center">
                                <div className="w-[24px] h-[24px] opacity-100 relative flex items-center justify-center">
                                    {/* Eye outline - eye shape */}
                                    <div className="w-[22px] h-[14px] bg-transparent border-2 border-[#007E74] relative flex items-center justify-center"
                                        style={{
                                            borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
                                            transform: 'rotate(0deg)'
                                        }}>
                                        {/* Eye pupil - hollow inner circle */}
                                        <div className="w-[6px] h-[6px] bg-transparent border-2 border-[#007E74] rounded-full"></div>
                                    </div>
                                </div>
                                <button className="w-[62px] h-[40px] opacity-100 rounded-lg border px-4 bg-[#D9F1EB] border-[#007E74] flex items-center justify-center text-[#007E74] font-medium text-sm">
                                    Pay
                                </button>
                            </div>

                            {/* Fourth data cell */}
                            <div className="w-[134px] h-[80px] opacity-100 gap-4 px-4 bg-white flex items-center justify-center">
                                <div className="w-[24px] h-[24px] opacity-100 relative flex items-center justify-center">
                                    {/* Eye outline - eye shape */}
                                    <div className="w-[22px] h-[14px] bg-transparent border-2 border-[#007E74] relative flex items-center justify-center"
                                        style={{
                                            borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
                                            transform: 'rotate(0deg)'
                                        }}>
                                        {/* Eye pupil - hollow inner circle */}
                                        <div className="w-[6px] h-[6px] bg-transparent border-2 border-[#007E74] rounded-full"></div>
                                    </div>
                                </div>
                                <button className="w-[62px] h-[40px] opacity-100 rounded-lg border px-4 bg-[#D9F1EB] border-[#007E74] flex items-center justify-center text-[#007E74] font-medium text-sm">
                                    Pay
                                </button>
                            </div>

                            {/* Fifth data cell */}
                            <div className="w-[134px] h-[80px] opacity-100 gap-4 px-4 bg-white flex items-center justify-center">
                                <div className="w-[24px] h-[24px] opacity-100 relative flex items-center justify-center">
                                    {/* Eye outline - eye shape */}
                                    <div className="w-[22px] h-[14px] bg-transparent border-2 border-[#007E74] relative flex items-center justify-center"
                                        style={{
                                            borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
                                            transform: 'rotate(0deg)'
                                        }}>
                                        {/* Eye pupil - hollow inner circle */}
                                        <div className="w-[6px] h-[6px] bg-transparent border-2 border-[#007E74] rounded-full"></div>
                                    </div>
                                </div>
                                <button className="w-[62px] h-[40px] opacity-100 rounded-lg border px-4 bg-[#D9F1EB] border-[#007E74] flex items-center justify-center text-[#007E74] font-medium text-sm">
                                    Pay
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Admin Pagination */}
                <div className="w-[1076px] h-[40px] bg-[#F5F5F5] rounded-lg pt-2 pr-4 pb-2 pl-4 flex justify-between items-center mt-4">
                    {/* Left side - Items info */}
                    <div className="font-poppins font-semibold text-sm text-[#0D2E28]">
                        Showing 1 to 5 of 5 Entries
                    </div>

                    {/* Right side - Pagination controls */}
                    <div className="flex items-center gap-2">
                        <img
                            src={vector}
                            alt="Previous"
                            className="w-4 h-4 cursor-pointer"
                        />
                        <button className="px-2 py-1 bg-[#007E74] text-white border border-[#007E74] rounded cursor-pointer text-xs">
                            1
                        </button>
                        <button className="w-6 h-6 rounded-lg p-2 bg-[#D9F1EB] font-poppins font-semibold text-sm text-[#007E74] border-none cursor-pointer flex items-center justify-center">
                            2
                        </button>
                        <button className="w-6 h-6 rounded-lg p-2 bg-[#D9F1EB] font-poppins font-semibold text-sm text-[#007E74] border-none cursor-pointer flex items-center justify-center">
                            3
                        </button>
                        <img
                            src={vector}
                            alt="Next"
                            className="w-4 h-4 rotate-180 cursor-pointer"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payment;