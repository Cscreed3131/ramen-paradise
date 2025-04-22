import React from 'react'
import { Logo, RegisterBtn } from '../index'
import { Link, useNavigate } from 'react-router-dom';

export default function Header() {
    // const navigate = useNavigate();
    
    const navItems = [
        {
            name: 'Home',
            slug: '/home',
            active: true
        },
        {
            name: 'Food',
            slug: '/food',
            active: true
        },
        {
            name: 'Services',
            slug: '/services',
            active: true
        },
        {
            name: 'Resturant',
            slug: '/resturant',
            active: true
        },
        {
            name: 'Offers',
            slug: '/offers',
            active: true
        },
    ]

    return (
        <header className='shadow'>
            <div className='bg-slate-800 text-white p-6 flex justify-between items-center'>
                {/* <Link to = '/'> */}
                <Logo />
                {/* </Link> */}
                <ul className = 'flex ml-auto'></ul>
            </div>
        </header>
    );
}
