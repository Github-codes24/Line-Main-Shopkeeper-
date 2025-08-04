import React from 'react';
import logoe from '../../../assets/logoe.png';
import logoi from '../../../assets/logoi.png';
import vector from '../../../assets/vector.png';
import image from '../../../assets/image.png';

const Payment = () => {
  return (
    <div className="relative">
      <div className="absolute top-[90px] left-[316px] w-[1108px] h-[72px] bg-white rounded-lg p-4 shadow-md flex justify-between items-center">
        {/* Left side - Type and Page Title */}
        <div className="flex items-center gap-4">
          <span className="font-bold"></span>
          <h2 className="m-0 text-lg font-semibold">Payment List</h2>
        </div>

        {/* Right side - Search and Button */}
        <div className="flex items-center gap-4">
          <div className="relative flex items-center -ml-5">
            <img
              src={image}
              alt="Search"
              className="w-6 h-6 absolute left-4 z-10"
            />
            <input
              type="text"
              placeholder="Search by Transaction Id..."
              className="w-[400px] h-10 rounded-full border border-[#007E74] bg-[#F5FFFF] py-2 pr-4 pl-12 outline-none"
            />
          </div>
        </div>
      </div>

      {/* Body Container */}
      <div className="absolute top-[178px] left-[316px] w-[1108px] h-[830px] bg-white rounded-lg p-4 gap-4 shadow-md flex flex-col">
        {/* Payment Table */}
        <div className="flex-1 flex flex-col gap-4">
          <table className="w-[1076px] h-[742px] rounded-lg border border-[#616666] border-collapse bg-white">
            <thead>
              <tr>
                <th className="w-20 h-14 p-4 gap-4 border-b border-[#616666] bg-[#E0E9E9] text-left font-poppins font-semibold text-sm">
                  <div className="w-[46px] h-6 font-poppins font-medium text-base leading-none text-center flex items-center justify-center text-[#0D2E28]">
                    Sr.No.
                  </div>
                </th>
                <th className="w-[180px] h-14 p-4 gap-4 border-b border-[#616666] bg-[#E0E9E9] text-left font-poppins font-semibold text-sm">
                  <div className="w-[116px] h-6 font-poppins font-medium text-base leading-none text-center flex items-center justify-center text-[#0D2E28]">
                    Transaction ID
                  </div>
                </th>
                <th className="w-[140px] h-14 p-4 gap-4 border-b border-[#616666] bg-[#E0E9E9] text-left font-poppins font-semibold text-sm">
                  <div className="w-[66px] h-6 font-poppins font-medium text-base leading-none text-center flex items-center justify-center text-[#0D2E28]">
                    Order ID
                  </div>
                </th>
                <th className="w-[120px] h-14 p-4 gap-4 border-b border-[#616666] bg-[#E0E9E9] text-left font-poppins font-semibold text-sm">
                  <div className="w-[65px] h-6 font-poppins font-medium text-base leading-none text-center flex items-center justify-center text-[#0D2E28]">
                    Amount
                  </div>
                </th>
                <th className="w-[180px] h-14 p-4 gap-4 border-b border-[#616666] bg-[#E0E9E9] text-left font-poppins font-semibold text-sm">
                  <div className="w-[146px] h-6 font-poppins font-medium text-base leading-none text-center flex items-center justify-center text-[#0D2E28]">
                    Transaction Mode
                  </div>
                </th>
                <th className="w-[236px] h-14 p-4 gap-4 border-b border-[#616666] bg-[#E0E9E9] text-left font-poppins font-semibold text-sm">
                  <div className="w-[71px] h-6 font-poppins font-medium text-base leading-none text-center flex items-center justify-center text-[#0D2E28]">
                    Remarks
                  </div>
                </th>
                <th className="w-[140px] h-14 p-4 gap-4 border-b border-[#616666] bg-[#E0E9E9] text-left font-poppins font-semibold text-sm">
                  <div className="w-[52px] h-6 font-poppins font-medium text-base leading-none text-center flex items-center justify-center text-[#0D2E28]">
                    Action
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="w-20 h-20 px-4 bg-white font-poppins text-sm text-center align-middle">
                  1
                </td>
                <td className="p-3 font-poppins text-sm">
                  TRN64486644FHD6
                </td>
                <td className="p-3 font-poppins text-sm">
                  OD54845478
                </td>
                <td className="p-3 font-poppins text-sm">
                  <span className="text-[#FF383C] px-2 py-1 rounded text-[15px]">
                    -₹5,894
                  </span>
                </td>
                <td className="p-3 font-poppins text-sm">
                  Online
                </td>
                <td className="p-3 font-poppins text-sm">
                  Amount Refunded To Worker's Wallet
                </td>
                <td className="w-[140px] h-20 gap-4 px-4 font-poppins text-sm relative">
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <img
                      src={logoe}
                      alt="Action Logo"
                      className="w-[22px] h-4 relative border-2 "
                    />
                    <img
                      src={logoi}
                      alt="Inner Logo"
                      className="w-[6px] h-[6px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-2 border-[#EC2D01]"
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td className="w-20 h-20 px-4 bg-white font-poppins text-sm text-center align-middle">
                  2
                </td>
                <td className="p-3 font-poppins text-sm">
                  TRN64486644FHD6
                </td>
                <td className="p-3 font-poppins text-sm">
                  OD54845478
                </td>
                <td className="p-3 font-poppins text-sm">
                  <span className="text-[#34C759] px-2 py-1 rounded text-[15px]">
                    +₹5,894
                  </span>
                </td>
                <td className="p-3 font-poppins text-sm">
                  Wallet
                </td>
                <td className="p-3 font-poppins text-sm">
                  Amount Deducted From Worker's Wallet
                </td>
                <td className="w-[140px] h-20 gap-4 px-4 font-poppins text-sm relative">
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <img
                      src={logoe}
                      alt="Action Logo"
                      className="w-[22px] h-4 relative border-2 "
                    />
                    <img
                      src={logoi}
                      alt="Inner Logo"
                      className="w-[6px] h-[6px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-2 border-[#EC2D01]"
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td className="w-20 h-20 px-4 bg-white font-poppins text-sm text-center align-middle">
                  3
                </td>
                <td className="p-3 font-poppins text-sm">
                  TRN64486644FHD6
                </td>
                <td className="p-3 font-poppins text-sm">
                  OD54845478
                </td>
                <td className="p-3 font-poppins text-sm">
                  <span className="text-[#FF383C] px-2 py-1 rounded text-[15px]">
                    -₹5,894
                  </span>
                </td>
                <td className="p-3 font-poppins text-sm">
                  Online
                </td>
                <td className="p-3 font-poppins text-sm">
                  Amount Refunded To Customer Account
                </td>
                <td className="w-[140px] h-20 gap-4 px-4 font-poppins text-sm relative">
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <img
                      src={logoe}
                      alt="Action Logo"
                      className="w-[22px] h-4 relative border-2 "
                    />
                    <img
                      src={logoi}
                      alt="Inner Logo"
                      className="w-[6px] h-[6px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-2 border-[#EC2D01]"
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td className="w-20 h-20 px-4 bg-white font-poppins text-sm text-center align-middle">
                  4
                </td>
                <td className="p-3 font-poppins text-sm">
                  TRN64486644FHD6
                </td>
                <td className="p-3 font-poppins text-sm">
                  OD54845478
                </td>
                <td className="p-3 font-poppins text-sm">
                  <span className="text-[#34C759] px-2 py-1 rounded text-[15px]">
                    +₹25,894
                  </span>
                </td>
                <td className="p-3 font-poppins text-sm">
                  Online
                </td>
                <td className="p-3 font-poppins text-sm">
                  Payment Received From Customer
                </td>
                <td className="w-[140px] h-20 gap-4 px-4 font-poppins text-sm relative">
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <img
                      src={logoe}
                      alt="Action Logo"
                      className="w-[22px] h-4 relative border-2 "
                    />
                    <img
                      src={logoi}
                      alt="Inner Logo"
                      className="w-[6px] h-[6px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-2 border-[#EC2D01]"
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td className="w-20 h-20 px-4 bg-white font-poppins text-sm text-center align-middle">
                  5
                </td>
                <td className="p-3 font-poppins text-sm">
                  TRN64486644FHD6
                </td>
                <td className="p-3 font-poppins text-sm">
                  OD54845478
                </td>
                <td className="p-3 font-poppins text-sm">
                  <span className="text-[#34C759] px-2 py-1 rounded text-[15px]">
                    +₹5,894
                  </span>
                </td>
                <td className="p-3 font-poppins text-sm">
                  Online
                </td>
                <td className="p-3 font-poppins text-sm">
                  Payment Received From Customer
                </td>
                <td className="w-[140px] h-20 gap-4 px-4 font-poppins text-sm relative">
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <img
                      src={logoe}
                      alt="Action Logo"
                      className="w-[22px] h-4 relative border-2 "
                    />
                    <img
                      src={logoi}
                      alt="Inner Logo"
                      className="w-[6px] h-[6px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-2 border-[#EC2D01]"
                    />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Admin Pagination - Inside Body Container */}
        <div className="w-[1076px] h-10 rounded-lg justify-between py-2 px-4 bg-[#F5F5F5] flex items-center mt-auto">
          {/* Left side - Items info */}
          <div className="w-[181px] h-[21px] font-poppins font-semibold text-sm leading-none text-center flex items-center justify-center text-[#0D2E28]">
            Showing 1 to 5 of 5 Entries
          </div>

          {/* Right side - Pagination controls */}
          <div className="flex items-center gap-2">
            <img
              src={vector}
              alt="vector"
              className="w-4 h-4 cursor-pointer"
            />
            <button className="px-2 py-1 bg-[#007E74] text-white border border-[#007E74] rounded cursor-pointer text-xs">
              1
            </button>

            <button className="w-6 h-6 rounded-lg p-2 bg-[#D9F1EB] font-poppins font-semibold text-sm leading-none text-center flex items-center justify-center text-[#007E74] border-none cursor-pointer">
              2
            </button>

            <button className="w-6 h-6 rounded-lg p-2 bg-[#D9F1EB] font-poppins font-semibold text-sm leading-none text-center flex items-center justify-center text-[#007E74] border-none cursor-pointer">
              3
            </button>

            <img
              src={vector}
              alt="vector"
              className="w-4 h-4 rotate-180 cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Your other content goes here */}
    </div>
  );
};

export default Payment;
