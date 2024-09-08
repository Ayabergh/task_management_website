import React from 'react'
import pic1 from '../../assets/pic-01.jpg'
import { MdAddTask } from "react-icons/md";
import { Link } from 'react-router-dom';
const Mainpage = () => {
  return (
    <>
    <div  className=''>
      <div className='bg-orange-100  '>
          <div className='flex'>
          <img src={pic1} className='w-4/6 h-3/5 -mt-12 ' />
          <div className=' ml-40 mt-20'>
          <Link to={'/'} className='-ml-3 flex'>
          <MdAddTask className='font-bold text-4xl'/>
          <p className='font-bold mt-1 ml-1'>Taskly</p></Link >
          <div><p className='-ml-[100px] text-center font-semibold mt-5'>Make Your Life More Organized. <br /> Organized Life ,Happy Life</p></div>
          <Link to={'/login'}>
          <button type="submit" class="shadow mt-20 -ml-10 bg-orange-200 font-bold hover:bg-orange-300 focus:shadow-outline focus:outline-none text-black text-xl py-3 px-10  rounded-full" >
                  Login
           </button>
           </Link>
           
           </div>
          
          </div>
          
        </div>
        
      
    </div>
    </>
  )
}

export default Mainpage