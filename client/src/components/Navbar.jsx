
import { Link } from 'react-router-dom'
import MailyLogo from '../assets/maily.svg'
import { useState } from 'react'
import { tryViewTransition } from '../utils/dom'
// import Spinner from './Spinner'


const Navbar = () => {
  const [showMenu, setShowMenu] = useState(true)
  
  function handleToggleMenu(val) {
    // tryViewTransition(setShowMenu, !showMenu)
  }
  return (
    <div className='w-full flex justify-center'>
    <nav className=" select-none z-[9999]  w-[69%] mt-2 rounded-md sticky shadow-md flex items-center justify-between flex-wrap bg-[#222] px-6 py-3">
    <Link to="/" className=" px-2 flex justify-self-start justify-around items-center flex-shrink-0 text-white mr-10">
      <img src={MailyLogo} className='h-[35px]'/>
      <span className="ml-2 font-semibold text-2xl tracking-tight">Maily</span>
    </Link>
    <div className="block lg:hidden">
      <button onClick={handleToggleMenu} className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
        <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
      </button>
    </div>
    <div className="w-full block lg:flex flex-grow lg:items-center lg:w-auto">
      {showMenu && <div className="text-sm lg:flex-grow">
        <Link to="/" className="block mt-4 lg:inline-block lg:mt-0 text-purple-200 hover:text-white mr-4">
          Home
        </Link>
        <Link to="/examples" className="block mt-4 lg:inline-block lg:mt-0 text-purple-200 hover:text-white mr-4">
          Examples
        </Link>
        <Link to="/pricing" className="block mt-4 lg:inline-block lg:mt-0 text-purple-200 hover:text-white mr-4">
            Pricing
          </Link>
        <Link to="/about" className="block mt-4 lg:inline-block lg:mt-0 text-purple-200 hover:text-white">
          About
        </Link>
      </div>}
      <div className='flex justify-around gap-4'>
            {/* <a href="/register" className=" inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0">Get Started</a>
         */}
        <Link to="/client-list" className="block mt-4 lg:inline-block lg:mt-0 text-sky-200 hover:text-white">Clients</Link>
        <Link to="/analytics" className="block mt-4 lg:inline-block lg:mt-0 text-sky-200 hover:text-white">Analytics</Link>

      </div>
    </div>
  </nav>
  </div>
  )
}


export default Navbar