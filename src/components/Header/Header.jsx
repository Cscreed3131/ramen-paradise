import React from 'react'
import { Logo, RegisterBtn } from '../index'
import { Link, useNavigate } from 'react-router-dom';
import {useSelector} from 'react-redux';

export default function Header() {
    const authStatus = useSelector((state)=>{state.auth.status})
    
    const navigate = useNavigate();

    const navItems = [
        {
            name: 'Home',
            slug: '/home',
            active: true
        },
        {
            name: 'Food',
            slug: '/food',
            active: !authStatus
        },
        {
            name: 'Services',
            slug: '/services',
            active: !authStatus
        },
        {
            name: 'Resturant',
            slug: '/resturant',
            active: !authStatus
        },
        {
            name: 'Offers',
            slug: '/offers',
            active: !authStatus
        },
    ]

    return (
        <header className='shadow'>
            <div className='bg-slate-800 text-white p-6 flex justify-between items-center'>
                <Link to = '/'>
                    <Logo />
                </Link>

                <ul className = 'flex ml-auto'>
                    {navItems.map(item => 
                        item.active ? (
                            <li key={item.name}>
                                <button onClick={()=> navigate(item.slug)}
                                    className='
                                    inline-block 
                                    px-6 py-2 
                                    duration-200 
                                    hover:bg-blue-100 
                                    rounded-full'>
                                        {item.name}
                                </button>
                            </li>
                        ): null
                    )
                }
                <li><RegisterBtn /></li>
                </ul>
            </div>
        </header>
    );
}
