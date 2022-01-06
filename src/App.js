import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from "react";
import Axios from "axios"
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Loginuser from './loginform';
import Profile from './Auth';
import { useHistory } from 'react-router-dom';

export default function Main() {
  return (
    <>
      <div>
        <Link to="/" />
        <Link to="/App" />
        <Link to="/ver" />
      </div>
      <div>

        <Switch>
          <Route exact path="/">
            <Loginuser />
          </Route>

          <Route exact path="/ver">
            <Profile />
          </Route>

          <Route exact path="/App">
            <App />
          </Route>



        </Switch>
      </div>
    </>
  )
}



function App() {

  const history = useHistory()
  const [name, setName] = useState();

  const [pic, setPic] = useState();


  const [users, setUsers] = useState([

  ]);

  const getData = () => {
    try {
      Axios.get("https://instabackenddata.herokuapp.com/getFrominsta", {
        headers: {
          "access-token": localStorage.getItem("access-token")
        }
      }).then((response) => {
        if (response.status == 200) {
          console.log(response)
          setUsers(response.data)
        }
        else {
          history.push("/")
          alert("user is not authenticated")


        }
      }).catch((err) => history.push("/"))
    } catch (err) {
      console.log(err)
    }

  }

  useEffect(() => {
    getData()
  }, [])




  const addUser = () => {

    fetch("https://instabackenddata.herokuapp.com/insertToinsta", {
      method: "POST",
      // header reamains same in all update operations
      headers: {
        "Content-Type": "application/json",
        "access-token": localStorage.getItem("access-token")
      },

      body: JSON.stringify({
        name: name,
        pic: pic
      })

    }).then((response) => {
      if (response.status !== 400) {
        getData()
        alert("Add user processing")
      }
      else {

        history.push("/")
        alert("you are not authorize user")
      }

    }).catch((err) => history.push("/"))


    setPic("")
    setName("")

  }


  function logout() {
    localStorage.removeItem("access-token");
    history.push("/")
  }

  return (
    <>


      <>

      </>
      <button style={{ width: "20%" }} onClick={logout} className='btn'>Logout</button>
      <div className="App">
        <h1 className="title">Insta Profiles</h1>
        <div className="aaddcandid">
          <input
            className="input"
            value={name}
            onChange={(event) => setName(event.target.value)}

            placeholder="Enter your name"
          />

          <input
            className="input1"
            value={pic}
            onChange={(event) => setPic(event.target.value)}
            placeholder="Enter your pic url"
          />

          <button className="button1" onClick={addUser}>
            Add User
          </button>

        </div>
        {users.map((ur) => (
          <User key={ur._id} username={ur.name} userpic={ur.pic} userid={ur._id} getData1={getData} />
        ))}

      </div>
    </>
  );

}


function User({ username, userpic, userid, getData1 }) {
  const history = useHistory()

  const deletUser = () => {
    fetch("https://instabackenddata.herokuapp.com/deleteFrominsta/" + userid,
      {
        method: "DELETE",
        headers: { "access-token": localStorage.getItem("access-token") }
      }).then((response) => {
        if (response.status !== 400) {
          getData1()
          alert("User delete succesfull")
        }
        else {
          alert("you are not authorize user")
          history.push("/")
        }

      }).catch((err) => history.push("/"))

  }
  const [edit, setedit] = useState(false)


  return (
    <>

      <div className="container">

        <img className="img" height="120" width="120" src={userpic} alt={username} />
        <div className="namediv">
          <h1 className="name">{username}</h1>
          <button className="btn" onClick={deletUser}>Delete user</button>
          <button className="editbtn" onClick={() => setedit(!edit)}>{edit ? "cansel " : ""}Edit</button>
        </div>
      </div>
      {edit ? <Edituser username={username} userpic={userpic} userid={userid} getData={getData1}
        setedit={setedit}
      /> : ""}
    </>
  );
}






function Edituser({ username, userpic, userid, getData, setedit }) {
  const [name, setName] = useState(username);


  const [pic, setPic] = useState(userpic);

  const editu = () => {
    alert("Updation Processing")
    setedit(false)
    fetch("https://instabackenddata.herokuapp.com/patchinsta/" + userid, {
      method: "PUT"
      , headers: {
        "Content-Type": "application/json",
        "access-token": localStorage.getItem("access-token")

      },
      body: JSON.stringify({
        name: name,
        pic: pic
      })



    }).then(() => getData());


  };
  return (
    <div className="App">
      <div className="aaddcandid">
        <input
          className="edituserinput"
          value={name}
          onChange={(event) => setName(event.target.value)}

          placeholder="Enter your name"
        />

        <input
          className="edituserinput"
          value={pic}
          onChange={(event) => setPic(event.target.value)}
          placeholder="Enter your pic url"
        />
        <button className="editbutton" onClick={editu}>
          Edit User
        </button>
      </div>


    </div>
  )
}