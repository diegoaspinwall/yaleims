import React from "react";
import Link from "next/link";
import { FaHome, FaCalendar } from "react-icons/fa";
import { BsFileBarGraphFill } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { IoIosMenu, IoMdClose } from "react-icons/io";

const NavBar: React.FC = () => {
  const [isClick, setisClick] = React.useState(false);

  const toggleNavbar = () => {
    setisClick(!isClick);
  };

  const turnMenuOff = () => {
    setisClick(false);
  };

  const links = [
    {href: '/', text: 'Home', icon: [<FaHome/>]},
    {href: '/scores', text: 'Scores', icon: [<BsFileBarGraphFill/>]},
    {href: '/schedule', text: 'Schedule', icon: [<FaCalendar/>]},
    {href: '/profile', text: 'Profile', icon: [<CgProfile/>]}
  ];

  return (
    <nav className="md:bg-blue-600 bg-blue-600 md:p-4 text-white items-center w-full fixed top-0">
      <div className="md:flex md:block justify-between hidden">
        <div className="flex space-x-4">          
          {links.slice(0, -1).map((link) => (
              <Link href={link.href} className="hover:underline flex fustify-between items-center" >
                    {link.icon[0]}
                    {link.text}
                </Link>
          ))}
        </div>
        <div className="w-auto">
          <Link href={links[links.length - 1].href} className="hover:underline flex fustify-between items-center">
              {links[links.length - 1].icon}{links[links.length - 1].text}          
          </Link>
        </div>
      </div>
      <div className='md:hidden flex p-3 items-center'>
        <button onClick={toggleNavbar}>      
          {isClick? (<IoMdClose  size={30}/>) : (<IoIosMenu  size={30}/>)}       
        </button>
      </div>
      {isClick && (
        <div className='md:hidden flex flex-col pb-4 pl-4 space-y-2'>
          {links.map((link) => (
            <Link href={link.href} onClick={turnMenuOff} className='hover:underline flex fustify-between items-center'>{link.icon[0]}{link.text}</Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default NavBar;
