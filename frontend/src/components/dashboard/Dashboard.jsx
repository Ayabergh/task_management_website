import React , { useContext, useEffect,useState }from 'react'
import { UserContext }  from '../mainpage/UserContext';
import { Link ,useNavigate} from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const { userName } = useContext(UserContext);
  const [auth, setAuth] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  useEffect(()=>{
    axios.get('http://localhost:3001')
             .then(res => {
              if(res.data.status === 'success'){
                 setAuth(true);
                 
              }else{
                setAuth(false);
                setMessage(res.data.error());
                
              }
             })
             .then(err=>console.log(err)
            );
  },[])

   const handlelogout=()=>{
    axios.get('http://localhost:3001/logout')
          .then(res => {
            location.reload(true);
            
          }).catch(err => console.log(err));
          navigate('/login');
   }
  return (
    <>
    <div>
        <h1>Welcome to the Home Page</h1>
        {userName && <p>Hello, {userName}!</p>}  {/* Display the user's name */}

        <button className='border-2 border-black' onClick={handlelogout}>Logout</button>
      </div>
    </>
  )
}

export default Dashboard