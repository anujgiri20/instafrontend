
import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";








function Profile(props) {
    const history = useHistory()
    const [pro_data, setdata] = useState([])
    const [toggle, toggleNav] = useState(false);
   

    

    const getdata = () => {
        try{
        Axios.get("https://instabackenddata.herokuapp.com/getFrominsta", {
            headers:{
                "access-token": localStorage.getItem("access-token")
            }
        }).then((response) => {
            if(response.status == 200)
            {
              
                localStorage.setItem("login-status" , true)
               history.push("/App")
            }
            else
            {
                history.push("/")
                alert("user is not authenticated")
       

            }
        })
    }catch(err){
         console.log(err)
    }

    }





return (
    <>


<div className="box-2" >
  <div style={{
      marginTop:"200px"
  }}>
    <button onClick={getdata} 
    style={{
        width:"30%",
        height:"50px",
        margin:"auto",
        fontSize:"1rem",
        marginLeft:"35%"
        
        
    }}
    
    className="btn">Verify User</button>


  <p className="popup">Verify user cheks for your token validation , it is mandatory for 
further procedure
.</p>
  </div>
  
</div>

    </>
)
}

export default Profile;