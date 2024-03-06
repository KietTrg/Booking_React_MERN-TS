// import React from 'react'
import { Link } from "react-router-dom"
import { useAppContext } from "../contexts/AppContext"
import SignOutButton from "./SignOutButton"

const Header = () => {
  const {isLogin} = useAppContext()
  return (
    <div className="bg-black py-6">
        <div className="container mx-auto flex justify-between">
            <span className="text-3xl text-white font-bold tracking-tight">
                <Link to={'/'}>MernHoliday.com</Link>
            </span>
            <span className="flex space-x-2">
              {
                isLogin ? <>
                <Link className="text-white flex items-center px-3 font-bold hover:bg-gray-100 hover:text-black transition-all duration-300" to='/my-booking'>My Booking</Link>
                <Link className="text-white flex items-center px-3 font-bold hover:bg-gray-100 hover:text-black transition-all duration-300"  to='/my-hotels'>My Hotels</Link>
                <SignOutButton/>
                </>
                :
                <Link to='/sign-in' className="flex items-center text-white px-3 font-bold hover:bg-gray-100 hover:text-black transition-all duration-300">Sign In</Link>
              }
                
            </span>
        </div>
    </div>
  )
}

export default Header