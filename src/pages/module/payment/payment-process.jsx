// import React from "react";
// // Import search icon - adjust path as needed
// import search from "../../../assets/search.png"; // Update this path to match your search icon location

// function PaymentProcess() {
//   return (
//     <div className="relative">
//       <div className="absolute top-[90px] left-[316px] w-[1108px] h-[72px] bg-white rounded-lg p-4 shadow-md flex justify-between items-center">
//         {/* Left side - Page Title and Search */}
//         <div className="flex items-center gap-6">
//           <div className="w-[280px] h-[36px] font-poppins font-medium text-2xl leading-none text-center flex items-center justify-center text-[#0D2E28]">
//             Payment Management
//           </div>

//           {/* Search Bar */}
//           <div className="relative flex items-center">
//             <img
//               src={search}
//               alt="Search"
//               className="w-6 h-6 absolute left-4 z-10"
//             />
//             <input
//               type="text"
//               placeholder="Search worker name here..."
//               className="w-[400px] h-[40px] rounded-[40px] border border-[#007E74] bg-[#F5FFFF] pt-2 pr-4 pb-2 pl-12 gap-2 outline-none"
//             />
//           </div>
//         </div>
//       </div>

//       {/* Main Content Container */}
//       <div className="w-[1108px] h-[2214px] absolute top-[186px] left-[316px] rounded-[9px] rotate-0 opacity-100 border border-black">
//         <div className="w-[598px] h-[1895px] absolute top-[24px] left-[72px] gap-[44px] rotate-0 opacity-100">
//           {/* Order Number */}
//           <div className="w-[488px] h-[46px] gap-[16px] rotate-0 opacity-100 flex items-center">
//             <span className="font-medium text-gray-700">Order Number:</span>
//             <span className="w-[309px] h-[46px] rounded-lg gap-[10px] rotate-0 opacity-100 border-2 border-[#007E74] pt-2 pr-4 pb-2 pl-4 bg-[#E0E9E9] flex items-center justify-center font-semibold text-gray-900">
//               ORD8468163287164
//             </span>
//           </div>

//           {/* Customer Details Container (starts just below Order Number) */}
//           <div className="w-[598px] min-h-[1805px] gap-[33px] rotate-0 opacity-100 bg-white mt-6">
//             {/* <div className="w-[598px] h-[326px] gap-2 rotate-0 opacity-100"> */}
//             <div className="w-[598px] min-h-[1895px] ml-[-12px] mt-[24px] flex flex-col gap-[44px]">

//               {/* Customer Details heading */}
//               <div className="w-[177px] h-[30px] rotate-0 opacity-100 font-poppins font-semibold text-xl leading-none tracking-normal align-middle text-black flex items-center justify-center">
//                 Customer Details
//               </div>

//               {/* New container inside Customer Details */}
//               <div className="w-[570px] h-[288px] gap-4 rotate-0 opacity-100">
//                 {/* Your content here */}
//                 {/* Customer Name Field */}
//                 <div className="w-[488px] h-[40px] flex items-center gap-2">
//                   {/* Label */}
//                   <span className="w-[163px] h-[24px] ml-[-32px] font-medium text-gray-700 flex justify-end items-center">
//                     Customer Name
//                   </span>

//                   {/* Colon */}
//                   <span className="text-gray-700 text-lg flex items-center justify-center">:</span>

//                   {/* Value Box */}
//                   <span className="w-[309px] h-[40px] bg-[#E0E9E9] border border-[#007E74] rounded-lg px-4 py-2 flex items-center font-semibold text-gray-900">
//                     Suresh Raina
//                   </span>
//                 </div>
//                 <div className="w-[488px] h-[40px] mt-4 flex items-center gap-2">
//                   {/* Label */}
//                   <span className="w-[163px] h-[24px] ml-[-42px] font-medium text-gray-700 flex justify-end items-center">
//                     Phone Number
//                   </span>

//                   {/* Colon */}
//                   <span className="text-gray-700 text-lg flex items-center justify-center">:</span>

//                   {/* Value Box */}
//                   <span className="w-[309px] h-[40px] bg-[#E0E9E9] border border-[#007E74] rounded-lg px-4 py-2 flex items-center font-semibold text-gray-900">
//                     Suresh Raina
//                   </span>
//                 </div>

//                 <div className="w-[488px] h-[40px] mt-4 flex items-center gap-2">
//                   {/* Label */}
//                   <span className="w-[163px] h-[24px] ml-[-42px] font-medium text-gray-700 flex justify-end items-center">
//                     Address
//                   </span>

//                   {/* Colon */}
//                   <span className="text-gray-700 text-lg flex items-center justify-center">:</span>

//                   {/* Value Box */}
//                   <span className="w-[309px] h-[64px] bg-[#E0E9E9] border border-[#007E74] rounded-lg px-4 py-2 flex items-center font-semibold text-gray-900">
//                     1901 Thornridge Cir. Shiloh, Hawaii 81063
//                   </span>
//                 </div>

//                 <div className="w-[488px] h-[40px] mt-4 flex items-center gap-2">
//                   {/* Label */}
//                   <span className="w-[163px] h-[24px] ml-[-42px] font-medium text-gray-700 flex justify-end items-center">
//                     Email ID
//                   </span>

//                   {/* Colon */}
//                   <span className="text-gray-700 text-lg flex items-center justify-center">:</span>

//                   {/* Value Box */}
//                   <span className="w-[309px] h-[40px] bg-[#E0E9E9] border border-[#007E74] rounded-lg px-4 py-2 flex items-center font-semibold text-gray-900">
//                     NirajkumarK23@gmail.com
//                   </span>
//                 </div>
//                 <div className="w-[488px] h-[40px] mt-4 flex items-center gap-2">
//                   {/* Label */}
//                   <span className="w-[163px] h-[24px] ml-[-42px] font-medium text-gray-700 flex justify-end items-center">
//                     Order Status
//                   </span>

//                   {/* Colon */}
//                   <span className="text-gray-700 text-lg flex items-center justify-center">:</span>

//                   {/* Value Box */}
//                   <span className="w-[309px] h-[40px] bg-[#E0E9E9] border border-[#007E74] rounded-lg px-4 py-2 flex items-center font-semibold text-yellow-300">
//                     In Progress
//                   </span>
//                 </div>
//               </div>
//               <div className="w-[598px] h-px bg-[#A29C9C] opacity-100" />

//               {/* New container after underline */}
//               <div className="w-[598px] h-[494px] gap-2 rotate-0 opacity-100">
//                 {/* Service Details heading */}
//                 <div className="w-[150px] h-[30px] rotate-0 opacity-100 font-poppins font-semibold text-xl leading-none tracking-normal align-middle text-black flex items-center justify-center">
//                   Service Details
//                 </div>
//                 <div className="w-[488px] h-[40px] mt-4 flex items-center gap-2">
//                   {/* Label */}
//                   <span className="w-[163px] h-[24px] ml-[-32px] font-medium text-gray-700 flex justify-end items-center">
//                     Service Required
//                   </span>

//                   {/* Colon */}
//                   <span className="text-gray-700 text-lg flex items-center justify-center">:</span>

//                   {/* Value Box */}
//                   <span className="w-[309px] h-[40px] bg-[#E0E9E9] border border-[#007E74] rounded-lg px-4 py-2 flex items-center font-semibold text-gray-900">
//                     Electrecian
//                   </span>
//                 </div>

//                 <div className="w-[488px] h-[40px] mt-4 flex items-center gap-2">
//                   {/* Label */}
//                   <span className="w-[163px] h-[24px] ml-[-32px] font-medium text-gray-700 flex justify-end items-center">
//                     Date
//                   </span>

//                   {/* Colon */}
//                   <span className="text-gray-700 text-lg flex items-center justify-center">:</span>

//                   {/* Value Box */}
//                   <span className="w-[309px] h-[40px] bg-[#E0E9E9] border border-[#007E74] rounded-lg px-4 py-2 flex items-center font-semibold text-gray-900">
//                     16/07/2024
//                   </span>
//                 </div>
//                 <div className="w-[570px] h-[64px] gap-[16px] rotate-0 opacity-100">
//                   {/* Content for the new div */}
//                   <span className="w-[163px] h-[24px] ml-[-32px] mt-4 font-medium text-gray-700 flex justify-end items-center">
//                     Photo
//                   </span>

//                   {/* Colon */}
//                   {/* <span className="text-gray-700 text-lg flex items-center justify-center">:</span> */}

//                 </div>
//               </div>

//             </div>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// }

// export default PaymentProcess;