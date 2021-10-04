import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from "react";




export default function App() {
  

  const [name, setName] = useState();

  const [pic, setPic] = useState();


  const [users, setUsers] = useState([

  ]);

  const getData = () => {
    fetch("https://615156d34a5f22001701d14b.mockapi.io/users", { method: "GET" })
      .then((data) => data.json())
      .then((newdata) => setUsers(newdata))


  }




  useEffect(() => {
    getData()
  }, [])

  const addUser = () => {
    fetch("https://615156d34a5f22001701d14b.mockapi.io/users", {
      method: "POST",
      // header reamains same in all update operations
      headers: { "Content-Type": "application/json" },  
      body: JSON.stringify({
        name: name,
        pic: pic
      })

    }).then(() => getData());

   
setPic("")
setName("")

  }
  return (
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
        <User key={ur.id} username={ur.name} userpic={ur.pic} userid={ur.id} getData1={getData} />
      ))}

    </div>
  );
}


function User({ username, userpic, userid, getData1 }) {
  const deletUser = () => {
    fetch("https://615156d34a5f22001701d14b.mockapi.io/users/" + userid,
      { method: "DELETE" }).then(() => getData1());
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
    setedit(false)
    fetch("https://615156d34a5f22001701d14b.mockapi.io/users/" + userid, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      
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
        <button className="editbutton"  onClick={editu}>
          Edit User
        </button>
      </div>


    </div>
  )
}