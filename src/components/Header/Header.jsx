import React from 'react'
import { Logo, RegisterBtn } from '../index'
import { Link, useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { signout as authSignout }  from '../../features/authSlice';
import Button from '../Button'
import authService from '../../firebase/AuthService';

export default function Header() {
    const authStatus = useSelector((state)=>state.auth.status)
    const dispatch = useDispatch()
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

    const signout= async() => {
        await authService.signout()
        dispatch(authSignout())
    }
    return (
        <header className='shadow'>
            <div className='bg-slate-800 text-white p-6 flex justify-between items-center'>
                <Link to = '/'>
                    <Logo />
                </Link>

                <ul className = 'flex ml-auto gap-2'>
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
                {
                    authStatus===false ? (
                        <li key='register'>
                            <RegisterBtn />
                        </li>
                    ) : (<li key='logout'>
                        <Button children={'Logout'} 
                        className='
                            bg-red-500
                            px-6 py-2 
                            duration-200 
                            hover:bg-red-700
                            rounded-full'
                            onClick = {signout}/>
                        </li>
                    )
                }
                </ul>
            </div>
        </header>
    );
}
