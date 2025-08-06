import React from "react";
// Import search icon - adjust path as needed
import search from "../../../assets/search.png"; // Update this path to match your search icon location
import image1 from "../../../assets/image1.png";
import image2 from "../../../assets/image2.png";
import image3 from "../../../assets/image3.png";
function PaymentProcess() {
  return (
    <div className="relative">
      <div className="absolute top-[90px] left-[316px] w-[1108px] h-[72px] bg-white rounded-lg p-4 shadow-md flex justify-between items-center">
        {/* Left side - Page Title and Search */}
        <div className="flex items-center gap-8">
          <div className="w-[280px] h-[36px] font-poppins font-medium text-2xl leading-none text-left flex items-center justify-start text-[#0D2E28]">
            Wallet
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
      </div>

      {/* Main Content Container */}
      <div className="w-[1108px] h-[2330px] absolute top-[186px] left-[316px] rounded-[9px] rotate-0 opacity-100 border border-black">
        <div className="w-[598px] h-[1895px] absolute top-[24px] left-[72px] gap-[44px] rotate-0 opacity-100">
          {/* Order Number */}
          <div className="w-[488px] h-[46px] gap-[16px] rotate-0 opacity-100 flex items-center">
            <span className="font-medium text-gray-700">Order Number:</span>
            <span className="w-[309px] h-[46px] rounded-lg gap-[10px] rotate-0 opacity-100 border-2 border-[#007E74] pt-2 pr-4 pb-2 pl-4 bg-[#E0E9E9] flex items-center justify-center font-semibold text-gray-900">
              ORD8468163287164
            </span>
          </div>

          {/* Customer Details Container (starts just below Order Number) */}
          <div className="w-[598px] min-h-[1805px] gap-[33px] rotate-0 opacity-100 bg-white mt-6">
            {/* <div className="w-[598px] h-[326px] gap-2 rotate-0 opacity-100"> */}
            <div className="w-[598px] min-h-[1895px] ml-[-12px] mt-[24px] flex flex-col gap-[44px]">

              {/* Customer Details heading */}
              <div className="w-[177px] h-[30px] rotate-0 opacity-100 font-poppins font-semibold text-xl leading-none tracking-normal align-middle text-black flex items-center justify-center">
                Customer Details
              </div>

              {/* New container inside Customer Details */}
              <div className="w-[570px] h-[288px] gap-4 rotate-0 opacity-100">
                {/* Your content here */}
                {/* Customer Name Field */}
                <div className="w-[488px] h-[40px] flex items-center gap-2">
                  {/* Label */}
                  <span className="w-[163px] h-[24px] ml-[-32px] font-medium text-gray-700 flex justify-end items-center">
                    Customer Name
                  </span>

                  {/* Colon */}
                  <span className="text-gray-700 text-lg flex items-center justify-center">:</span>

                  {/* Value Box */}
                  <span className="w-[309px] h-[40px] bg-[#E0E9E9] border border-[#007E74] rounded-lg px-4 py-2 flex items-center font-semibold text-gray-900">
                    Suresh Raina
                  </span>
                </div>
                <div className="w-[488px] h-[40px] mt-4 flex items-center gap-2">
                  {/* Label */}
                  <span className="w-[163px] h-[24px] ml-[-42px] font-medium text-gray-700 flex justify-end items-center">
                    Phone Number
                  </span>

                  {/* Colon */}
                  <span className="text-gray-700 text-lg flex items-center justify-center">:</span>

                  {/* Value Box */}
                  <span className="w-[309px] h-[40px] bg-[#E0E9E9] border border-[#007E74] rounded-lg px-4 py-2 flex items-center font-semibold text-gray-900">
                    Suresh Raina
                  </span>
                </div>

                <div className="w-[488px] h-[40px] mt-4 flex items-center gap-2">
                  {/* Label */}
                  <span className="w-[163px] h-[24px] ml-[-42px] font-medium text-gray-700 flex justify-end items-center">
                    Address
                  </span>

                  {/* Colon */}
                  <span className="text-gray-700 text-lg flex items-center justify-center">:</span>

                  {/* Value Box */}
                  <span className="w-[309px] h-[64px] bg-[#E0E9E9] border border-[#007E74] rounded-lg px-4 py-2 flex items-center font-semibold text-gray-900">
                    1901 Thornridge Cir. Shiloh, Hawaii 81063
                  </span>
                </div>

                <div className="w-[488px] h-[40px] mt-4 flex items-center gap-2">
                  {/* Label */}
                  <span className="w-[163px] h-[24px] ml-[-42px] font-medium text-gray-700 flex justify-end items-center">
                    Email ID
                  </span>

                  {/* Colon */}
                  <span className="text-gray-700 text-lg flex items-center justify-center">:</span>

                  {/* Value Box */}
                  <span className="w-[309px] h-[40px] bg-[#E0E9E9] border border-[#007E74] rounded-lg px-4 py-2 flex items-center font-semibold text-gray-900">
                    NirajkumarK23@gmail.com
                  </span>
                </div>
                <div className="w-[488px] h-[40px] mt-4 flex items-center gap-2">
                  {/* Label */}
                  <span className="w-[163px] h-[24px] ml-[-42px] font-medium text-gray-700 flex justify-end items-center">
                    Order Status
                  </span>

                  {/* Colon */}
                  <span className="text-gray-700 text-lg flex items-center justify-center">:</span>

                  {/* Value Box */}
                  <span className="w-[309px] h-[40px] bg-[#E0E9E9] border border-[#007E74] rounded-lg px-4 py-2 flex items-center font-semibold text-yellow-300">
                    In Progress
                  </span>
                </div>
              </div>
              <div className="w-[598px] h-px bg-[#A29C9C] opacity-100" />

              {/* New container after underline */}
              <div className="w-[598px] h-[494px] gap-2 rotate-0 opacity-100">
                {/* Service Details heading */}
                <div className="w-[150px] h-[30px] rotate-0 opacity-100 font-poppins font-semibold text-xl leading-none tracking-normal align-middle text-black flex items-center justify-center">
                  Service Details
                </div>
                <div className="w-[488px] h-[40px] mt-4 flex items-center gap-2">
                  {/* Label */}
                  <span className="w-[163px] h-[24px] ml-[-32px] font-medium text-gray-700 flex justify-end items-center">
                    Service Required
                  </span>

                  {/* Colon */}
                  <span className="text-gray-700 text-lg flex items-center justify-center">:</span>

                  {/* Value Box */}
                  <span className="w-[309px] h-[40px] bg-[#E0E9E9] border border-[#007E74] rounded-lg px-4 py-2 flex items-center font-semibold text-gray-900">
                    Electrecian
                  </span>
                </div>

                <div className="w-[488px] h-[40px] mt-4 flex items-center gap-2">
                  {/* Label */}
                  <span className="w-[163px] h-[24px] ml-[-32px] font-medium text-gray-700 flex justify-end items-center">
                    Date
                  </span>

                  {/* Colon */}
                  <span className="text-gray-700 text-lg flex items-center justify-center">:</span>

                  {/* Value Box */}
                  <span className="w-[309px] h-[40px] bg-[#E0E9E9] border border-[#007E74] rounded-lg px-4 py-2 flex items-center font-semibold text-gray-900">
                    16/07/2024
                  </span>
                </div>
                <div className="w-[570px] h-[64px] mt-4 mr-6 flex items-center gap-[6px]">
                  {/* Label: Photo */}
                  <span className="w-[163px] mt-4  font-medium text-gray-700 flex justify-end items-center">
                    Photo
                  </span>
                  <span className="text-gray-700 mt-4 text-lg flex items-center justify-center">:</span>


                  {/* Images in horizontal flow */}
                  <div className="flex gap-2 overflow-x-auto">
                    <img src={image1} alt="image1" className="w-16 h-16 rounded-lg" />
                    <img src={image2} alt="image2" className="w-16 h-16 rounded-lg" />
                    <img src={image3} alt="image3" className="w-16 h-16 rounded-lg" />
                    {/* View All link */}
                    <a href="/view-all" className="text-[#007E74] mt-4 text-sm font-medium underline whitespace-nowrap">
                      View All
                    </a>
                  </div>
                </div>
                <span className="w-[163px] mt-4  font-medium text-gray-700 flex justify-end items-center">
                  Product List
                </span>
                {/* <span className="text-gray-700 mb-6 text-lg flex items-center justify-center">:</span> */}

                {/* Colon */}
                {/* <span className="text-gray-700 text-lg flex items-center justify-center">:</span> */}

                {/* Product List Table Container */}
                <div className="mt-4 w-[500px] h-[300px] border border-[#999999] rotate-0 opacity-100">
                  {/* Header row with Product Name, Details, Qty */}
                  <div className="flex items-center w-[500px] h-[56px] rotate-0 opacity-100 border-b border-[#999999] p-4">
                    <span className="w-[120px] h-[24px] rotate-0 opacity-100 flex items-center font-poppins font-medium text-base leading-none tracking-normal align-middle text-black whitespace-nowrap">Product Name</span>
                    <div className="flex-1"></div>
                    <span className="w-[55px] h-[24px] rotate-0 opacity-100 flex items-center font-poppins font-medium text-base leading-none tracking-normal align-middle text-black mr-8">Details</span>
                    <span className="w-[55px] h-[24px] rotate-0 opacity-100 flex items-center font-poppins font-medium text-base leading-none tracking-normal align-middle text-black">Qty</span>
                  </div>

                  {/* Product row with PVC Wire data */}
                  <div className="flex items-center w-[500px] h-[32px] rotate-0 opacity-100 border-b border-[#999999] p-4">
                    <span className="w-[120px] h-[24px] rotate-0 opacity-100 flex items-center font-poppins font-medium text-base leading-none tracking-normal align-middle text-black whitespace-nowrap">PVC Wire</span>
                    <div className="flex-1"></div>
                    <span className="w-[55px] h-[24px] rotate-0 opacity-100 flex items-center font-poppins font-medium text-base leading-none tracking-normal align-middle text-black mr-8">2m</span>
                    <span className="w-[55px] h-[24px] rotate-0 opacity-100 flex items-center font-poppins font-medium text-base leading-none tracking-normal align-middle text-black">1</span>
                  </div>

                  {/* Product row with LED Light 100 Watt data */}
                  <div className="flex items-center w-[500px] h-[32px] rotate-0 opacity-100 border-b border-[#999999] p-4">
                    <span className="w-[120px] h-[24px] rotate-0 opacity-100 flex items-center font-poppins font-medium text-base leading-none tracking-normal align-middle text-black whitespace-nowrap">LED Light</span>
                    <div className="flex-1"></div>
                    <span className="w-[80px] h-[24px] rotate-0 opacity-100 flex items-center font-poppins font-medium text-base leading-none tracking-normal align-middle text-black mr-8 whitespace-nowrap">100 Watt</span>
                    <span className="w-[55px] h-[24px] rotate-0 opacity-100 flex items-center font-poppins font-medium text-base leading-none tracking-normal align-middle text-black">5</span>
                  </div>

                  {/* Product row with Switches data */}
                  <div className="flex items-center w-[500px] h-[32px] rotate-0 opacity-100 border-b border-[#999999] p-4">
                    <span className="w-[120px] h-[24px] rotate-0 opacity-100 flex items-center font-poppins font-medium text-base leading-none tracking-normal align-middle text-black whitespace-nowrap">Switches</span>
                    <div className="flex-1"></div>
                    <span className="w-[55px] h-[24px] rotate-0 opacity-100 flex items-center font-poppins font-medium text-base leading-none tracking-normal align-middle text-black mr-8"></span>
                    <span className="w-[55px] h-[24px] rotate-0 opacity-100 flex items-center font-poppins font-medium text-base leading-none tracking-normal align-middle text-black">7</span>
                  </div>

                  {/* Product row with Connector data */}
                  <div className="flex items-center w-[500px] h-[32px] rotate-0 opacity-100 border-b border-[#999999] p-4">
                    <span className="w-[120px] h-[24px] rotate-0 opacity-100 flex items-center font-poppins font-medium text-base leading-none tracking-normal align-middle text-black whitespace-nowrap">Connector</span>
                    <div className="flex-1"></div>
                    <span className="w-[55px] h-[24px] rotate-0 opacity-100 flex items-center font-poppins font-medium text-base leading-none tracking-normal align-middle text-black mr-8"></span>
                    <span className="w-[55px] h-[24px] rotate-0 opacity-100 flex items-center font-poppins font-medium text-base leading-none tracking-normal align-middle text-black">1</span>
                  </div>

                  {/* Product row with LED Light 50 Watt data */}
                  <div className="flex items-center w-[500px] h-[32px] rotate-0 opacity-100 p-4">
                    <span className="w-[120px] h-[24px] rotate-0 opacity-100 flex items-center font-poppins font-medium text-base leading-none tracking-normal align-middle text-black whitespace-nowrap">LED Light</span>
                    <div className="flex-1"></div>
                    <span className="w-[80px] h-[24px] rotate-0 opacity-100 flex items-center font-poppins font-medium text-base leading-none tracking-normal align-middle text-black mr-8 whitespace-nowrap">50 Watt</span>
                    <span className="w-[55px] h-[24px] rotate-0 opacity-100 flex items-center font-poppins font-medium text-base leading-none tracking-normal align-middle text-black">3</span>
                  </div>
                </div>

                {/* Underline below product table */}
                <div className="w-[598px] h-px rotate-0 opacity-100 bg-[#A29C9C] mt-4"></div>

                {/* Customer Details section below underline */}
                <div className="w-[177px] h-[30px] rotate-0 opacity-100 font-poppins font-semibold text-xl leading-none tracking-normal align-middle text-black flex items-center justify-center mt-6">
                  Customer Details
                </div>

                {/* Customer Details container */}
                <div className="w-[570px] h-[288px] gap-4 rotate-0 opacity-100 mt-4">
                  {/* Customer Name Field */}
                  <div className="w-[488px] h-[40px] flex items-center gap-2">
                    {/* Label */}
                    <span className="w-[163px] h-[24px] ml-[-32px] font-medium text-gray-700 flex justify-end items-center">
                      Worker Assigned
                    </span>

                    {/* Colon */}
                    <span className="text-gray-700 text-lg flex items-center justify-center">:</span>

                    {/* Value Box */}
                    <span className="w-[309px] h-[40px] bg-[#E0E9E9] border border-[#007E74] rounded-lg px-4 py-2 flex items-center font-semibold text-gray-900">
                      Niranjankumar Kalantri
                    </span>
                  </div>
                  <div className="w-[488px] h-[40px] mt-4 flex items-center gap-2">
                    {/* Label */}
                    <span className="w-[163px] h-[24px] ml-[-42px] font-medium text-gray-700 flex justify-end items-center">
                      Worker Assigned
                    </span>

                    {/* Colon */}
                    <span className="text-gray-700 text-lg flex items-center justify-center">:</span>

                    {/* Value Box */}
                    <span className="w-[309px] h-[40px] bg-[#E0E9E9] border border-[#007E74] rounded-lg px-4 py-2 flex items-center font-semibold text-gray-900">
                      Niranjankumar Kalantri
                    </span>
                  </div>


                  <div className="w-[488px] h-[40px] mt-4 flex items-center gap-2">
                    {/* Label */}
                    <span className="w-[163px] h-[24px] ml-[-42px] font-medium text-gray-700 flex justify-end items-center">
                      Last Updated
                    </span>

                    {/* Colon */}
                    <span className="text-gray-700 text-lg flex items-center justify-center">:</span>

                    {/* Value Box */}
                    <span className="w-[309px] h-[40px] bg-[#E0E9E9] border border-[#007E74] rounded-lg px-4 py-2 flex items-center font-semibold text-gray-900">
                      16/07/2024
                    </span>
                  </div>
                  <div className="w-[488px] h-[40px] mt-4 flex items-center gap-2">
                    {/* Label */}
                    <span className="w-[163px] h-[24px] ml-[-42px] font-medium text-gray-700 flex justify-end items-center">
                      Quotation Status
                    </span>

                    {/* Colon */}
                    <span className="text-gray-700 text-lg flex items-center justify-center">:</span>

                    {/* Value Box */}
                    <span className="w-[309px] h-[40px] bg-[#E0E9E9] border border-[#007E74] rounded-lg px-4 py-2 flex items-center font-semibold text-[#34C759]">
                      Approved
                    </span>
                  </div>
                </div>

                {/* New container below Customer Details */}
                <div className="w-[428px] h-[292px] border border-[#999999] rotate-0 opacity-100 gap-4 p-6 mt-4">
                  {/* Inner div with specified styling */}
                  <div className="w-[380px] h-[84px] rotate-0 opacity-100 gap-4 flex flex-col">
                    {/* Nested div with new specifications */}
                    <div className="w-[380px] h-[48px] rotate-0 opacity-100 gap-4">
                      {/* Another nested div with latest specifications */}
                      <div className="w-[122px] h-[48px] rotate-0 opacity-100 gap-2 flex flex-col">
                        {/* Text element with specified styling */}
                        <span
                          className="w-[122px] h-[20px] rotate-0 opacity-100 font-inter font-medium text-xl text-black flex items-center"
                          style={{
                            lineHeight: '19.2px',
                            letterSpacing: '-0.24px'
                          }}
                        >
                          Suresh Raina
                        </span>

                        {/* Phone number text element */}
                        <span
                          className="w-[122px] h-[20px] rotate-0 opacity-100 font-inter font-normal text-base text-black flex items-center"
                          style={{
                            lineHeight: '19.2px',
                            letterSpacing: '-0.24px'
                          }}
                        >
                          5165484623
                        </span>
                      </div>
                    </div>

                    {/* New div with space-between layout */}
                    <div className="w-[380px] h-[20px] flex justify-between rotate-0 opacity-100">
                      {/* First inner div with specified styling */}
                      <div className="w-[114px] h-[20px] rotate-0 opacity-100 gap-2 flex">
                        {/* Quotation No text element */}
                        <span
                          className="w-[114px] h-[20px] rotate-0 opacity-100 font-inter font-medium text-base text-black flex items-center"
                          style={{
                            lineHeight: '19.2px',
                            letterSpacing: '-0.24px'
                          }}
                        >
                          Quotation No: 1
                        </span>
                      </div>

                      {/* Second inner div with specified styling */}
                      <div className="w-[210px] h-[20px] rotate-0 opacity-100 gap-2 flex">
                        {/* Quotation Date text element */}
                        <span
                          className="w-[210px] h-[20px] rotate-0 opacity-100 font-inter font-medium text-base text-black flex items-center"
                          style={{
                            lineHeight: '19.2px',
                            letterSpacing: '-0.24px'
                          }}
                        >
                          Quotation Date: 10-07-2025
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* New container with specified styling */}
                  <div className="w-[380px] h-[144px] border border-[#999999] rotate-0 opacity-100 px-4 mt-4">
                    {/* New container with width: 348, height: 32, justify-content: space-between, border-bottom */}
                    <div className="w-[348px] h-[32px] flex items-center rotate-0 opacity-100 border-b border-black" style={{ gap: '8px' }}>
                      {/* New container with width: 8, height: 20, gap: 8px */}
                      <div className="w-[8px] h-[20px] rotate-0 opacity-100 gap-2">
                        {/* Text element with Inter font and specified styling */}
                        <span
                          className="w-[8px] h-[20px] rotate-0 opacity-100 font-inter font-medium text-xs text-black flex items-center"
                          style={{
                            lineHeight: '19.2px',
                            letterSpacing: '-0.24px'
                          }}
                        >
                          #
                        </span>
                      </div>

                      {/* Products container with width: 87, height: 20, gap: 8px */}
                      <div className="w-[87px] h-[20px] rotate-0 opacity-100 gap-2">
                        {/* Products text element with specified styling */}
                        <span
                          className="w-[50px] h-[20px] rotate-0 opacity-100 font-inter font-medium text-xs text-black flex items-center"
                          style={{
                            lineHeight: '19.2px',
                            letterSpacing: '-0.24px'
                          }}
                        >
                          Products
                        </span>
                      </div>

                      {/* Price container with width: 87, height: 20, gap: 8px */}
                      <div className="w-[87px] h-[20px] rotate-0 opacity-100 gap-2">
                        {/* Price text element with specified styling */}
                        <span
                          className="w-[50px] h-[20px] rotate-0 opacity-100 font-inter font-medium text-xs text-black flex items-center"
                          style={{
                            lineHeight: '19.2px',
                            letterSpacing: '-0.24px'
                          }}
                        >
                          Price
                        </span>
                      </div>

                      {/* Qty container with width: 87, height: 20, gap: 8px */}
                      <div className="w-[87px] h-[20px] rotate-0 opacity-100 gap-2">
                        {/* Qty text element with specified styling */}
                        <span
                          className="w-[50px] h-[20px] rotate-0 opacity-100 font-inter font-medium text-xs text-black flex items-center"
                          style={{
                            lineHeight: '19.2px',
                            letterSpacing: '-0.24px'
                          }}
                        >
                          Qty
                        </span>
                      </div>

                      {/* Amount container with width: 87, height: 20, gap: 8px */}
                      <div className="w-[87px] h-[20px] rotate-0 opacity-100 gap-2">
                        {/* Amount text element with specified styling */}
                        <span
                          className="w-[50px] h-[20px] rotate-0 opacity-100 font-inter font-medium text-xs text-black flex items-center"
                          style={{
                            lineHeight: '19.2px',
                            letterSpacing: '-0.24px'
                          }}
                        >
                          Amount
                        </span>
                      </div>
                    </div>

                    {/* New div with width: 348, height: 20, with gap layout to match header */}
                    <div className="w-[348px] h-[20px] flex items-center rotate-0 opacity-100" style={{ gap: '8px' }}>
                      {/* Number 1 container */}
                      <div className="w-[8px] h-[20px] rotate-0 opacity-100 gap-2">
                        <span
                          className="w-[6px] h-[20px] rotate-0 opacity-100 font-inter font-medium text-xs text-black flex items-center"
                          style={{
                            lineHeight: '19.2px',
                            letterSpacing: '-0.24px'
                          }}
                        >
                          1
                        </span>
                      </div>

                      {/* Ambuja cement container - positioned to align with Products */}
                      <div className="w-[87px] h-[20px] rotate-0 opacity-100 gap-2">
                        <span
                          className="w-[87px] h-[20px] rotate-0 opacity-100 font-inter font-medium text-xs text-black flex items-center"
                          style={{
                            lineHeight: '19.2px',
                            letterSpacing: '-0.24px'
                          }}
                        >
                          Ambuja cement
                        </span>
                      </div>

                      {/* 380rs/bag container - positioned to align with Price */}
                      <div className="w-[87px] h-[20px] rotate-0 opacity-100 gap-2">
                        <span
                          className="w-[59px] h-[20px] rotate-0 opacity-100 font-inter font-medium text-xs text-black flex items-center"
                          style={{
                            lineHeight: '19.2px',
                            letterSpacing: '-0.24px'
                          }}
                        >
                          380rs/bag
                        </span>
                      </div>

                      {/* 4 Bag container - positioned to align with Qty */}
                      <div className="w-[87px] h-[20px] rotate-0 opacity-100 gap-2">
                        <span
                          className="w-[33px] h-[20px] rotate-0 opacity-100 font-inter font-medium text-xs text-black flex items-center"
                          style={{
                            lineHeight: '19.2px',
                            letterSpacing: '-0.24px'
                          }}
                        >
                          4 Bag
                        </span>
                      </div>

                      {/* Amount value container - positioned to align with Amount */}
                      <div className="w-[87px] h-[20px] rotate-0 opacity-100 gap-2">
                        <span
                          className="w-[50px] h-[20px] rotate-0 opacity-100 font-inter font-medium text-xs text-black flex items-center"
                          style={{
                            lineHeight: '19.2px',
                            letterSpacing: '-0.24px'
                          }}
                        >
                          400
                        </span>
                      </div>
                    </div>

                    {/* Row 2 - Same structure as row 1 */}
                    <div className="w-[348px] h-[20px] flex items-center rotate-0 opacity-100" style={{ gap: '8px' }}>
                      {/* Number 2 container */}
                      <div className="w-[8px] h-[20px] rotate-0 opacity-100 gap-2">
                        <span
                          className="w-[6px] h-[20px] rotate-0 opacity-100 font-inter font-medium text-xs text-black flex items-center"
                          style={{
                            lineHeight: '19.2px',
                            letterSpacing: '-0.24px'
                          }}
                        >
                          2
                        </span>
                      </div>

                      {/* Product name container */}
                      <div className="w-[87px] h-[20px] rotate-0 opacity-100 gap-2">
                        <span
                          className="w-[87px] h-[20px] rotate-0 opacity-100 font-inter font-medium text-xs text-black flex items-center"
                          style={{
                            lineHeight: '19.2px',
                            letterSpacing: '-0.24px'
                          }}
                        >
                          Ambuja cement
                        </span>
                      </div>

                      {/* Price container */}
                      <div className="w-[87px] h-[20px] rotate-0 opacity-100 gap-2">
                        <span
                          className="w-[59px] h-[20px] rotate-0 opacity-100 font-inter font-medium text-xs text-black flex items-center"
                          style={{
                            lineHeight: '19.2px',
                            letterSpacing: '-0.24px'
                          }}
                        >
                          380rs/bag
                        </span>
                      </div>

                      {/* Qty container */}
                      <div className="w-[87px] h-[20px] rotate-0 opacity-100 gap-2">
                        <span
                          className="w-[33px] h-[20px] rotate-0 opacity-100 font-inter font-medium text-xs text-black flex items-center"
                          style={{
                            lineHeight: '19.2px',
                            letterSpacing: '-0.24px'
                          }}
                        >
                          4 Bag
                        </span>
                      </div>

                      {/* Amount container */}
                      <div className="w-[87px] h-[20px] rotate-0 opacity-100 gap-2">
                        <span
                          className="w-[50px] h-[20px] rotate-0 opacity-100 font-inter font-medium text-xs text-black flex items-center"
                          style={{
                            lineHeight: '19.2px',
                            letterSpacing: '-0.24px'
                          }}
                        >
                          400
                        </span>
                      </div>
                    </div>

                    {/* Row 3 - Same structure as row 1 */}
                    <div className="w-[348px] h-[20px] flex items-center rotate-0 opacity-100" style={{ gap: '8px' }}>
                      {/* Number 3 container */}
                      <div className="w-[8px] h-[20px] rotate-0 opacity-100 gap-2">
                        <span
                          className="w-[6px] h-[20px] rotate-0 opacity-100 font-inter font-medium text-xs text-black flex items-center"
                          style={{
                            lineHeight: '19.2px',
                            letterSpacing: '-0.24px'
                          }}
                        >
                          3
                        </span>
                      </div>

                      {/* Product name container */}
                      <div className="w-[87px] h-[20px] rotate-0 opacity-100 gap-2">
                        <span
                          className="w-[87px] h-[20px] rotate-0 opacity-100 font-inter font-medium text-xs text-black flex items-center"
                          style={{
                            lineHeight: '19.2px',
                            letterSpacing: '-0.24px'
                          }}
                        >
                          Ambuja cement
                        </span>
                      </div>

                      {/* Price container */}
                      <div className="w-[87px] h-[20px] rotate-0 opacity-100 gap-2">
                        <span
                          className="w-[59px] h-[20px] rotate-0 opacity-100 font-inter font-medium text-xs text-black flex items-center"
                          style={{
                            lineHeight: '19.2px',
                            letterSpacing: '-0.24px'
                          }}
                        >
                          380rs/bag
                        </span>
                      </div>

                      {/* Qty container */}
                      <div className="w-[87px] h-[20px] rotate-0 opacity-100 gap-2">
                        <span
                          className="w-[33px] h-[20px] rotate-0 opacity-100 font-inter font-medium text-xs text-black flex items-center"
                          style={{
                            lineHeight: '19.2px',
                            letterSpacing: '-0.24px'
                          }}
                        >
                          4 Bag
                        </span>
                      </div>

                      {/* Amount container */}
                      <div className="w-[87px] h-[20px] rotate-0 opacity-100 gap-2">
                        <span
                          className="w-[50px] h-[20px] rotate-0 opacity-100 font-inter font-medium text-xs text-black flex items-center"
                          style={{
                            lineHeight: '19.2px',
                            letterSpacing: '-0.24px'
                          }}
                        >
                          400
                        </span>
                      </div>
                    </div>

                    {/* Row 4 - Same structure as row 1 */}
                    <div className="w-[348px] h-[20px] flex items-center rotate-0 opacity-100" style={{ gap: '8px' }}>
                      {/* Number 4 container */}
                      <div className="w-[8px] h-[20px] rotate-0 opacity-100 gap-2">
                        <span
                          className="w-[6px] h-[20px] rotate-0 opacity-100 font-inter font-medium text-xs text-black flex items-center"
                          style={{
                            lineHeight: '19.2px',
                            letterSpacing: '-0.24px'
                          }}
                        >
                          4
                        </span>
                      </div>

                      {/* Product name container */}
                      <div className="w-[87px] h-[20px] rotate-0 opacity-100 gap-2">
                        <span
                          className="w-[87px] h-[20px] rotate-0 opacity-100 font-inter font-medium text-xs text-black flex items-center"
                          style={{
                            lineHeight: '19.2px',
                            letterSpacing: '-0.24px'
                          }}
                        >
                          Ambuja cement
                        </span>
                      </div>

                      {/* Price container */}
                      <div className="w-[87px] h-[20px] rotate-0 opacity-100 gap-2">
                        <span
                          className="w-[59px] h-[20px] rotate-0 opacity-100 font-inter font-medium text-xs text-black flex items-center"
                          style={{
                            lineHeight: '19.2px',
                            letterSpacing: '-0.24px'
                          }}
                        >
                          380rs/bag
                        </span>
                      </div>

                      {/* Qty container */}
                      <div className="w-[87px] h-[20px] rotate-0 opacity-100 gap-2">
                        <span
                          className="w-[33px] h-[20px] rotate-0 opacity-100 font-inter font-medium text-xs text-black flex items-center"
                          style={{
                            lineHeight: '19.2px',
                            letterSpacing: '-0.24px'
                          }}
                        >
                          4 Bag
                        </span>
                      </div>

                      {/* Amount container */}
                      <div className="w-[87px] h-[20px] rotate-0 opacity-100 gap-2">
                        <span
                          className="w-[50px] h-[20px] rotate-0 opacity-100 font-inter font-medium text-xs text-black flex items-center"
                          style={{
                            lineHeight: '19.2px',
                            letterSpacing: '-0.24px'
                          }}
                        >
                          400
                        </span>
                      </div>
                    </div>

                    {/* Underline before Final Amount */}
                    <div className="w-[348px] h-px bg-black rotate-0 opacity-100 my-1"></div>

                    {/* Final Amount container - matching table structure */}
                    <div className="w-[348px] h-[20px] flex items-center rotate-0 opacity-100" style={{ gap: '8px' }}>
                      {/* Empty space for # column */}
                      <div className="w-[8px] h-[20px] rotate-0 opacity-100 gap-2">
                      </div>

                      {/* Final Amount text - positioned in Products column area */}
                      <div className="w-[87px] h-[20px] rotate-0 opacity-100 gap-2">
                        <span
                          className="w-[73px] h-[20px] rotate-0 opacity-100 font-inter font-medium text-xs text-black flex items-center"
                          style={{
                            lineHeight: '19.2px',
                            letterSpacing: '-0.24px'
                          }}
                        >
                          Final Amount
                        </span>
                      </div>

                      {/* Empty space for Price column */}
                      <div className="w-[87px] h-[20px] rotate-0 opacity-100 gap-2">
                      </div>

                      {/* Empty space for Qty column */}
                      <div className="w-[87px] h-[20px] rotate-0 opacity-100 gap-2">
                      </div>

                      {/* Amount value - positioned in Amount column */}
                      <div className="w-[87px] h-[20px] rotate-0 opacity-100 gap-2">
                        <span
                          className="w-[33px] h-[20px] rotate-0 opacity-100 font-inter font-medium text-xs text-black flex items-center"
                          style={{
                            lineHeight: '19.2px',
                            letterSpacing: '-0.24px'
                          }}
                        >
                          6,000
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Underline below the entire table */}
                <div className="w-[598px] h-px rotate-0 opacity-100 bg-[#A29C9C] mt-4"></div>

              </div>


            </div>
            <div className="w-[177px] h-[30px] rotate-0 opacity-100 font-poppins font-semibold text-xl leading-none tracking-normal align-middle text-black flex items-center justify-center mt-1">
              Payment Details
            </div>

            {/* Customer Details container */}
            <div className="w-[570px] h-[280px] gap-4 rotate-0 opacity-100 mt-4">
              {/* Customer Name Field */}
              <div className="w-[488px] h-[40px] flex items-center gap-2">
                {/* Label */}
                <span className="w-[163px] h-[24px] ml-[-32px] font-medium text-gray-700 flex justify-end items-center">
                  Total Bill
                </span>

                {/* Colon */}
                <span className="text-gray-700 text-lg flex items-center justify-center">:</span>

                {/* Value Box */}
                <span className="w-[309px] h-[40px] bg-[#E0E9E9] border border-[#007E74] rounded-lg px-4 py-2 flex items-center font-semibold text-gray-900">
                  ₹2670
                </span>
              </div>
              <div className="w-[488px] h-[40px] mt-4 flex items-center gap-2">
                {/* Label */}
                <span className="w-[163px] h-[24px] ml-[-42px] font-medium text-gray-700 flex justify-end items-center">
                  Payment Method
                </span>

                {/* Colon */}
                <span className="text-gray-700 text-lg flex items-center justify-center">:</span>

                {/* Value Box */}
                <span className="w-[309px] h-[40px] bg-[#E0E9E9] border border-[#007E74] rounded-lg px-4 py-2 flex items-center font-semibold text-gray-900">
                  Cash
                </span>
              </div>


              <div className="w-[488px] h-[40px] mt-4 flex items-center gap-2">
                {/* Label */}
                <span className="w-[163px] h-[24px] ml-[-42px] font-medium text-gray-700 flex justify-end items-center">
                  Payment Status
                </span>

                {/* Colon */}
                <span className="text-gray-700 text-lg flex items-center justify-center">:</span>

                {/* Value Box */}
                <span className="w-[309px] h-[40px] text-[#34C759] bg-[#E0E9E9] border border-[#007E74] rounded-lg px-4 py-2 flex items-center font-semibold text-gray-900">
                  Collected
                </span>
              </div>
              <div className="w-[488px] h-[40px] mt-4 flex items-center gap-2">
                {/* Label */}
                <span className="w-[163px] h-[24px] ml-[-42px] font-medium text-gray-700 flex justify-end items-center">
                  Amount Status
                </span>

                {/* Colon */}
                <span className="text-gray-700 text-lg flex items-center justify-center">:</span>

                {/* Value Box */}
                <span className="w-[309px] h-[40px] text-[#FF383C] bg-[#E0E9E9] border border-[#007E74] rounded-lg px-4 py-2 flex items-center font-semibold text-[#34C759]">
                  Not Collected
                </span>
              </div>
            </div>

          </div>
        </div>
      </div>

    </div>

  );

}

export default PaymentProcess;