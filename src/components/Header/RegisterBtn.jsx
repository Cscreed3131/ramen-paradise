import React from 'react'
import {useDispatch} from 'react-redux';
import authService from '../../firebase/AuthService';
import {signin,signout} from '../../features/authSlice';
import { useNavigate } from 'react-router-dom';

export default function RegisterBtn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signinHandler = async () => {
    await authService.signin();
    dispatch(signin())
  }

  const signoutHandler = async () => {
    await authService.signout();
    dispatch(signout());
  }

  return (
    <button className='
    bg-red-700 
    text-white 
    border 
    rounded-2xl 
    px-6 py-2
    text-xl' 
    onClick={() => navigate('/auth-page')}>
      Register Now
    </button>
  )
}
