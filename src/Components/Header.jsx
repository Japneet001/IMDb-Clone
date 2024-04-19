import React from 'react'
// import './Header.css'
import { NavLink } from "react-router-dom";
import SearchBar from './SearchBar';

const Header = () => {
  return (
    <div className="header mx-9 my-0 items-center flex justify-between h-24">
        <div className="headerLeft flex items-center">
            <NavLink to='/'><img src="/logo2.png" className='header__icon cursor-pointer w-48 hover:scale'/></NavLink>
            <NavLink to='/movies/popular' style={{textDecoration: 'none'}}><span className=" mx-28 my-0 text-2xl cursor-pointer text-white hover:text-red-600" >Popular</span></NavLink>
            <NavLink to='/movies/top_rated'  className=" mx-28 text-2xl cursor-pointer text-white hover:text-red-600"style={{textDecoration: 'none'}}><span>Top Rated </span></NavLink>
            <NavLink to='/movies/upcoming' className=" mx-28 text-2xl cursor-pointer text-white hover:text-red-600" style={{textDecoration: 'none'}}><span>Upcoming</span></NavLink>
        <div className="">
          <SearchBar/>
        </div>
        </div>
    </div>
  )
}

export default Header