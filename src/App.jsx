import { useEffect, useState } from 'react'
import {Header,Footer,Home,Menu, Services} from './components/index'
import { useDispatch } from 'react-redux';
import authService from './firebase/AuthService';
import {signin,signout} from './features/authSlice'
import { Outlet } from 'react-router-dom';

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   authService.getCurrentUserId().then((userData)=>{
  //     if(userData){
  //       dispatch(signin({userData}))
  //     } else {
  //       dispatch(signout())
  //     }
  //   }).finally(()=>{
  //     setLoading(false)
  //   })
  // },[])

  return (<>
      <div className='w-full h-full'>
      <Header/>
      <Outlet />
      <Footer/>

      </div>
    </>);
  
}

export default App
