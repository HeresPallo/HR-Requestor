import { NavLink } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="bg-white border-gray-200 dark:bg-black">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="http://localhost:5173/" className="flex items-center space-x-3 rtl:space-x-reverse">
      <img src="public/LOGO-Signature-Master-Right-White_RGB_EN.svg" className="h-8" alt="Orange Logo" />
      <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Requestor</span>
  </a>
  <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-user"> 
  <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-black md:dark:bg-black dark:border-black">
                <li>
                    <NavLink className="text-white" to='/'>Overview</NavLink>
                </li>
                <li>
                    <NavLink className="text-white"  to='/nextofkin'>Next of Kin</NavLink>
                </li>
                <li>
                    <NavLink className="text-white"  to='/phoneclaim'>Phone Claim</NavLink>
                </li>
                <li>
                    <NavLink className="text-white"  to='/insurance'>Medical Insurance</NavLink>
                </li>
                <li>
                    <NavLink className="text-white"  to='/fiber'>Fiber</NavLink>
                </li>
                <li>
                    <NavLink className="text-white"  to='/idcard'>ID Cards</NavLink>
                </li>
            </ul>
            </div>

  <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-user">
           
            </div>
            </div>

        </nav>
    );
};

export default Navbar;
