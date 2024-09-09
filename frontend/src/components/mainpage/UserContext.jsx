import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userName, setUserName] = useState('');
  const[userId,setUserId]=useState('');
  const[useremail,setUseremail]=useState('');
  

  return (
    <UserContext.Provider value={{ userName, setUserName,userId,setUserId,useremail,setUseremail }}>
      {children}
    </UserContext.Provider>
  );
};
