import React, { useState, useContext, useEffect } from 'react';
import { MdAddTask } from "react-icons/md";
import { LuMenu } from "react-icons/lu";
import { VscAccount } from "react-icons/vsc";
import { UserContext } from '../mainpage/UserContext';
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { AiOutlineEdit } from "react-icons/ai";
import { IoSettingsSharp } from "react-icons/io5";
import { HiOutlineLogout } from "react-icons/hi";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Sidebar = () => {
    const [open, setOpen] = useState(true);
    const { userName, useremail } = useContext(UserContext);
    const [auth, setAuth] = useState(false);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    axios.defaults.withCredentials = true;
//This endpoint is used to read the user data .
    useEffect(() => {
        axios.get('http://localhost:3001')
            .then(res => {
                if (res.data.status === 'success') {
                    setAuth(true);
                } else {
                    setAuth(false);
                    setMessage(res.data.error());
                }
            })
            .catch(err => console.log(err));
    }, []);
//this endpoint is to logout
    const handleLogout = () => {
        axios.get('http://localhost:3001/logout')
            .then(res => {
                location.reload(true);
            }).catch(err => console.log(err));
        navigate('/login');
    }

    return (
        <aside className={`fixed top-0 left-0 h-screen  ${open ? "w-60" : "w-20"} bg-orange-100  font-jost relative duration-300 z-50`}>
            <nav className='relative h-full'>
                <LuMenu
                    className={`absolute cursor-pointer rounded -right-4 top-4 w-7 border-2 border-neutral-800 text-3xl bg-white transition-transform duration-300 ${open ? 'rotate-0' : 'rotate-180'}`}
                    onClick={() => setOpen(!open)}
                />
                <div className={`flex items-center font-bold text-2xl ml-6 pt-2 transition-all duration-300`}>
                    <MdAddTask className='text-3xl' />
                    <span className={`ml-2 transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0'} ${!open && 'hidden'}`}>Taskly</span>
                </div>
                
                {/** The user */}
                <div className={`flex items-center font-medium text-lg ml-6 pt-28 transition-all duration-300`}>
                    <VscAccount className='text-[25px] ' />
                    <span className={`ml-2 transition-opacity text-[15px] duration-300 ${open ? 'opacity-100' : 'opacity-0'} ${!open && 'hidden'}`}>{userName && <p> {userName}!</p>} {useremail && <p> {useremail}</p>} </span>
                </div>
                {/** Dashboard */}
                <div className={`flex items-center font-medium text-lg ml-6 pt-5 transition-all duration-300`}>
                    <TbLayoutDashboardFilled className='text-[25px] ' />
                    <span className={`ml-2 transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0'} ${!open && 'hidden'}`}>Dashboard</span>
                </div>

                {/** Trash */}
                <div className={`flex items-center font-medium text-lg ml-6 pt-5 transition-all duration-300`}>
                    <Link className='flex'>
                        <AiOutlineEdit className='text-[25px] ' />
                        <span className={`ml-2 transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0'} ${!open && 'hidden'}`}>Trash</span>
                    </Link>
                </div>
                
                {/** Settings */}
                <div className={`flex items-center font-medium text-lg ml-6 pt-64 transition-all duration-300`}>
                    <Link className='flex'>
                        <IoSettingsSharp className='text-[25px] ' />
                        <span className={`ml-2 transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0'} ${!open && 'hidden'}`}>Settings</span>
                    </Link> 
                </div>

                {/** Logout */}
                <div className={`flex items-center font-medium text-lg ml-6 pt-5 transition-all duration-300`}>
                    <button onClick={handleLogout} className='flex'>
                        <HiOutlineLogout className='text-[25px] ' />
                        <span className={`ml-2 transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0'} ${!open && 'hidden'}`}>Logout</span>
                    </button >
                </div>
            </nav>
        </aside>
    );
}

export default Sidebar;
