import { useEffect, useState } from 'react'
import {Header,Footer} from './components/index'
import { useDispatch } from 'react-redux';
import authService from './firebase/AuthService';
import {signin,signout} from './features/authSlice'
import { Outlet } from 'react-router-dom';

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser().then((userData)=>{
      if(userData){
        dispatch(signin({userData}))
      } else {
        dispatch(signout())
      }
    }).finally(()=>{
      setLoading(false)
    })
  },[])

  return !loading ? (
    <>
      <div className='w-full'>
        <Header/>
        <Outlet />
        <Footer/>
      </div>
    </>
  ) : null
}

export default App
