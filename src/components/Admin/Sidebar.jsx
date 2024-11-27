import { NavLink } from "react-router-dom";
import { HiOutlineSquares2X2,HiOutlineUsers,HiOutlineDevicePhoneMobile } from "react-icons/hi2";
import { CiMedicalClipboard,CiCreditCard1 } from "react-icons/ci";
import { RiHomeWifiLine } from "react-icons/ri";
import { MdEmojiTransportation } from "react-icons/md";



const Sidebar = () => {

  return (
<div>
<aside id="logo-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
   <div className="h-full px-3 py-4 overflow-y-auto bg-black">
      <a href="http://localhost:5173/admin/overview" className="flex items-center ps-2.5 mb-5">
         <img src="/LOGO-Signature-Master-Right-White_RGB_EN.png" className="h-6 me-3 sm:h-7" alt="Orange Logo" />
         <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Requestor</span>
      </a>
      <ul className="space-y-2 font-medium">
         <li>
            <div className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
            <HiOutlineSquares2X2 />
               <NavLink className="text-white ms-3" to='/admin/overview'>Overview</NavLink>
            </div>
         </li>
         <li>
            <div className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
            <MdEmojiTransportation />
               <NavLink className="text-white ms-3" to='/admin/perdiem'>Per Diem</NavLink>
            </div>
         </li>
         <li>
            <div className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
            <HiOutlineUsers />
               <NavLink className="text-white ms-3" to='/admin/nextofkin'>Next of Kin</NavLink>
            </div>
         </li>
         <li>
            <div className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
            <HiOutlineDevicePhoneMobile />
               <NavLink className="text-white ms-3" to='/admin/phoneclaim'>Phone Claim</NavLink>
            </div>
         </li>
         <li>
            <div className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
            <CiMedicalClipboard />
               <NavLink className="text-white ms-3" to='/admin/insurance'>Insurance</NavLink>
            </div>
         </li>
         <li>
            <div className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
            <RiHomeWifiLine />
               <NavLink className="text-white ms-3" to='/admin/fiber'>Fiber</NavLink>
            </div>
         </li>
         <li>
            <div className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
            <CiCreditCard1 />
               <NavLink className="text-white ms-3" to='/admin/idcard'>ID Card</NavLink>
            </div>
         </li> <li>
            <div className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
            <CiCreditCard1 />
               <NavLink className="text-white ms-3" to='/admin/absence'>Absence Report</NavLink>
            </div>
         </li>
      </ul>
   </div>
</aside>
</div>
  )
  
};

export default Sidebar;
