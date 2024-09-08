import React,{useState} from 'react'
import { Link ,useNavigate} from 'react-router-dom';
import pic1 from '../../assets/pic-01.jpg'
import { MdAddTask } from "react-icons/md";
import axios from 'axios';
const Register = () => {
  const [values, setValues] = React.useState({
    name: '',
    email: '',
    password: '',
  })
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/signup',values)
             .then(res => {
              if(res.data.status === 'success'){
                navigate('/login');
              }else{
                alert('already exists !');
              }
             })
             .then(err => console.log(err));
    }
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
          <div >
          <form onSubmit={handleSubmit}>
          <div className='-ml-32  mt-12  '>
              <label htmlFor="name" className='text-[17px]  ml-4 text-center font-light '> name* </label>
            <div className='text-center '>
              <input type="text" placeholder="aya bgh"  value={values.name}
              onChange={e=>setValues({...values, name:e.target.value})}
              className='bg-white-100 w-[300px] appearance-none border-2 border-white rounded-full  py-3 px-8  leading-tight focus:outline-none focus:bg-white focus:border-orange-100'
              name='name'/>
            </div>
            </div>
            {/***************************************************************************/}
            <div className='-ml-32  mt-4  '>
              <label htmlFor="email" className='text-[17px]  ml-4 text-center font-light '> Email* </label>
            <div className='text-center '>
              <input type="email" placeholder="------@gmail.com" value={values.email}
              onChange={e => setValues({...values,email:e.target.value})}
              className='bg-white-100 w-[300px] appearance-none border-2 border-white rounded-full  py-3 px-8  leading-tight focus:outline-none focus:bg-white focus:border-orange-100'
              name='email'/>
            </div>
            </div>
            {/***************************************************************************/}
            <div className='-ml-32  mt-4 '>
              <label htmlFor="Password" className='text-[17px]  ml-4 text-center font-light '> Password* </label>
            <div className='text-center '>
              <input type="Password" placeholder="**********" 
              onChange={e => setValues({...values,password:e.target.value})}
              className='bg-white-100 w-[300px] appearance-none border-2 border-white rounded-full  py-3 px-8  leading-tight focus:outline-none focus:bg-white focus:border-orange-100'
              name='Password'/>
            </div>
            </div>
            {/***************************************************************************/}
            <div class="items-center -ml-48 mt-5">
                 <div class="text-center ">
                <button type="submit" class="shadow mt-3  ml-10 bg-orange-200 hover:bg-orange-300 focus:shadow-outline focus:outline-none text-black font-bold py-2 px-8 rounded-full" >
                  Register
                  </button>
                </div>
                 </div>
          </form>
          <p className='-ml-24 mt-2 '>Have an account already <Link to='/login' className='underline'>Login</Link> </p>
          </div>
        </div>
        
        </div>
        
      </div>
      
    
  </div>
    </>
  )
}

export default Register