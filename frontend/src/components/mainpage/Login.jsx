import React,{useState,useContext}  from 'react'
import { Link ,useNavigate} from 'react-router-dom';
import pic1 from '../../assets/pic-01.jpg'
import { MdAddTask } from "react-icons/md";
import axios from 'axios';
import { UserContext } from '../mainpage/UserContext';


const Login = () => {
  const [values, setValues] = React.useState({
    email: '',
    password: '',
  })
  const { setUserName } = useContext(UserContext);  
  const {setUserId}=useContext(UserContext);
  const {setUseremail}=useContext(UserContext);

  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  //the endpoint to login 
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/login',values)
             .then(res => {
              if(res.data.status === 'success'){
                setUserName(res.data.name);
                setUserId(res.data.id);
                setUseremail(res.data.email);
                 navigate('/dashboard');
              }else{
                alert(res.data.error);
              }
             })
             .catch(err => console.log(err));
    };
  return (
    <>
        <div  className=' font-jost '>
      <div className='bg-orange-100  '>
        <div className='flex'>
        <img src={pic1} className='w-4/6 h-3/5 -mt-12 ' />
        <div className=' ml-40 mt-20'>
        <Link to={'/'} className='-ml-3 flex'>
          <MdAddTask className='font-bold text-4xl'/>
          <p className='font-bold mt-1 ml-1'>Taskly</p></Link >
          <div><p className='-ml-[100px] text-center font-semibold mt-5'>Make Your Life More Organized. <br /> Organized Life ,Happy Life</p></div>
          
          <form action="" onSubmit={handleSubmit}>
          <div className='-ml-32  mt-16  '>
              <label htmlFor="email" className='text-[17px]  ml-4 text-center font-light '> Email* </label>
            <div className='text-center '>
              <input type="email" placeholder="------@gmail.com" 
              className='bg-white-100 w-[300px] appearance-none border-2 border-white rounded-full  py-3 px-8  leading-tight focus:outline-none focus:bg-white focus:border-orange-100'
              value={values.email}
              onChange={e=>setValues({...values, email:e.target.value})}
              
              name='email'/>
            </div>
            </div>
            {/********/}
            <div className='-ml-32  mt-4 '>
              <label htmlFor="Password" className='text-[17px]  ml-4 text-center font-light '> Password* </label>
            <div className='text-center '>
              <input type="Password" placeholder="**********" 
              className='bg-white-100 w-[300px] appearance-none border-2 border-white rounded-full  py-3 px-8  leading-tight focus:outline-none focus:bg-white focus:border-orange-100'
              value={values.password}
              onChange={e=>setValues({...values, password:e.target.value})}
              
              name='Password'/>
            </div>
            </div>
            <div className="items-center -ml-48 mt-5">
                
                 <div className="text-center ">
                <button type="submit" className="shadow mt-3 ml-10 bg-orange-200 hover:bg-orange-300 focus:shadow-outline focus:outline-none text-black font-bold py-2 px-8 rounded-full" >
                  Login
                  </button>
                </div>
                 </div>
          </form>
          <p className='-ml-24 mt-2 '>Don't have an account <Link to='/signup' className='underline'>Sign-Up</Link> </p>
        </div>
        
        </div>
        
      </div>
      
    
  </div>
    </>
  )
}

export default Login