import React, { useState } from "react";
import axios from "axios";


const Dashboard =()=>{
    const [show, setShow] = useState(false);
const[user,setUsers]=useState([])

    const getAllUsers = async () => {
        await axios
          .get(`http://localhost:5000/users`)
          .then((res) => {
            setUsers(res.data.users)
    
            setShow(true);
          })
          .catch((err) => {
            throw err;
          });
      };


      const deleteUser = async (id) => {
        try {
          await axios.delete(`http://localhost:5000/users/${id}`);
         
          getAllUsers()
    
        } catch (error) {
            throw error;
        }
      };
      
      return(
          <div> Dashboard</div>
      )
}
export default Dashboard