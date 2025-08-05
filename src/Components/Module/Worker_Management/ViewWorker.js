import { useParams, useNavigate } from 'react-router-dom';

import { ArrowLeft } from 'lucide-react';

const workers = [{
    id: 1,
    name: "Theresa Webb",
    expertise: "Plumber",
    phone: "+91-9876543210",
    address: "1901 Thornridge Cir. Shiloh, Hawaii 81063",
  },
  {
    id: 2,
    name: "Jane Cooper",
    expertise: "AC Repair",
    phone: "+91-9876543210",
    address: "3517 W. Gray St. Utica, Pennsylvania 57867",
  },
  {
    id: 3,
    name: "Jacob Jones",
    expertise: "Electrician",
    phone: "+91-9876543210",
    address: "8502 Preston Rd. Inglewood, Maine 98380",
  },
  {
    id: 4,
    name: "Brooklyn Simmons",
    expertise: "Painter",
    phone: "+91-9876543210",
    address: "4140 Parker Rd. Allentown, New Mexico 31134",
  },
  {
    id: 5,
    name: "Jerome Bell",
    expertise: "Carpenter",
    phone: "+91-9876543210",
    address: "2118 Thornridge Cir. Syracuse, 35624",
}]

function ViewWorker() {
  const { id } = useParams();
  const navigate = useNavigate();
  const worker = workers.find((w) => w.id.toString() === id);

   if (!worker) return <div className="text-center text-red-500">Worker not found</div>;
 
  return (
    <div className="flex justify-center bg-gray-100 min-h-screen font-[Poppins] py-8 px-4">
      <div className="w-[1108px]">
        {/* === Top Header Section === */}
        <div className="bg-white w-full h-[72px] rounded-[20px] flex items-center shadow px-6 mb-10">
          <div
            onClick={() => navigate(-1)}
            className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center cursor-pointer mr-4"
          >
            <ArrowLeft size={18} />
          </div>
          <h2 className="text-xl font-bold">View Worker Details</h2>
        </div>

        {/* === Personal Details Section (adjusted width & height, left-aligned) === */}
        <div className="bg-white rounded-[20px] shadow p-6 w-[1108px] h-[600px]"> {/* Height reduced */}
          {/* Title */}
          <div className="mb-4 h-[30px] text-left ml-16">
  <h3 className="text-lg font-semibold">Personal Details</h3>
</div>

          {/* Form aligned to left */}
          <form className="bg-gray-50 p-6 rounded w-[642px] h-[264px] space-y-4">
{/* Name */}
<div className="relative h-[40px] mb-4 ml-12">
  <label className="absolute left-0 top-[8px] w-[227px] text-sm font-semibold text-left">
    Name
  </label>
  <span className="absolute left-[227px] top-[8px] font-semibold">:</span>
  <input
    type="text"
    value={worker.name}
    readOnly
    className="absolute left-[349px] w-[349px] h-[40px] border border-[#19A699] rounded px-4 bg-[#E0E9E9] text-sm"
  />
</div>

           <div className="relative h-[40px] mb-4 ml-12">
  <label className="absolute left-0 top-[8px] w-[227px] text-sm font-semibold text-left">
    Expertise
  </label>
  <span className="absolute left-[227px] top-[8px] font-semibold">:</span>
  <input
    type="text"
    value={worker.expertise}
    readOnly
    className="absolute left-[349px] w-[349px] h-[40px] border border-[#19A699]  rounded px-4 bg-[#E0E9E9] text-sm"
  />
</div>
            
            <div className="relative h-[40px] mb-4 ml-12">
  <label className="absolute left-0 top-[8px] w-[227px] text-sm font-semibold text-left">
    Phone Number
  </label>
  <span className="absolute left-[227px] top-[8px] font-semibold">:</span>
  <input
    type="text"
    value={worker.phone}
    readOnly
    className="absolute left-[349px] w-[349px] h-[40px] border border-[#19A699]  rounded px-4 bg-[#E0E9E9] text-sm"
  />
</div>
           
           <div className="relative h-[40px] mb-4 ml-12">
  <label className="absolute left-0 top-[8px] w-[227px] text-sm font-semibold text-left">
    Address
  </label>
  <span className="absolute left-[227px] top-[8px] font-semibold">:</span>
  <input
    type="text"
    value={worker.address}
    readOnly
    className="absolute left-[349px] w-[349px] h-[40px] border border-[#19A699]  rounded px-4 bg-[#E0E9E9] text-sm"
  />
</div>

<div className="relative h-[40px] mb-4 ml-12">
  <label className="absolute left-0 top-[8px] w-[227px] text-sm font-semibold text-left">
    Email ID
  </label>
  <span className="absolute left-[227px] top-[8px] font-semibold">:</span>
  <input
    type="text"
    
 value={worker.email || ""}
    readOnly
    className="absolute left-[349px] w-[349px] h-[40px] border border-[#19A699]  rounded px-4 bg-[#E0E9E9] text-sm"
  />
</div>
           
<div className="w-[642px] h-[1px] bg-black mt-6"></div>

          </form>

          {/* Edit Button (moved up) */}
          
        </div>
        <div className="mt-10 flex justify-center"> {/* Previously mt-[500px] */}
            <button className="w-[200px] h-[40px] bg-[#007E74] text-white font-semibold rounded " onClick={() => navigate(`/edit-worker/${worker.id}`)}
>  Edit
            </button>
          </div>
      </div>
    </div>
  );
}

export default ViewWorker;

