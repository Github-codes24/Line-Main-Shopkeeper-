import React, { useState ,useRef , useEffect} from 'react';
// import './Navbar.css';
import { ChevronDown } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import useAuth from "../../hook/useAuth";



function Navbar() {

   const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { logout } = useAuth(); // get logout from custom hook
    const navigate = useNavigate(); // get navigate function

      function handleLogout() {
        localStorage.removeItem("token"); // clear session
        window.location.href = "/login";  // redirect to login
      }


  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  

  
  return (
    <div className="navbar border p-2 ">
      <h2 className='text-[#007E74] font-poppins font-bold'>LineMan Logo</h2>
      <div className='flex'>
            <img src="img1.jpg" alt="profile" className="profile-pic rounded-full w-6  " />
            <div ref={dropdownRef} className="relative">
          <ChevronDown
            className="w-4 h-4 mt-2 mr-6 text-gray-700 cursor-pointer"
            onClick={() => setOpen(!open)}
          />

          {open && (
            <div className="absolute right-0 mt-2 w-36 bg-white border rounded shadow-md z-50">
              <ul className="text-sm text-gray-700 ">
                <li className="px-1 py-2 hover:bg-gray-100 cursor-pointer text-[#007E74]">Admin Profile</li>
        
                 <button className="px-1 py-2 hover:bg-gray-100 cursor-pointer text-red-600" onClick={handleLogout}>Logout</button>
              </ul>
            </div>
          )}
        </div>
            
            
      </div>
      
    </div>
  );
}

export default Navbar;
