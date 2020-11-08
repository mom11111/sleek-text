import {useEffect, useState} from 'react'
import axios from 'axios'
import Showuser from './components/Showuser'
import './App.css';

function App() {

  const url = "https://www.hatchways.io/api/assessment/students";

  const [user, setuser] = useState([]);
  const [filUser, setfilUser] = useState([]);
  const [value, setvalue] = useState('');
  const [inputtag, setinputtag] = useState('');
  const[flag, setflag] = useState(true);

  useEffect(()=>{
     axios.get(url).then(res=>{
       setuser(res.data.students);
       setflag(false);
     }).catch(err=>{
       console.log(err);
     })
  },[]);

  useEffect(()=>{
      const allUser=user;
      var newArray = allUser.filter((d)=>{
        return d.firstName.indexOf(value)!==-1 || d.lastName.indexOf(value)!==-1;
      })
      setfilUser(newArray);
      setflag(true);
  },[value]);
  
  return (
    <div className="App">
    <div className="inputs">
       <input type="text" placeholder="search by name" className="inputField"  onChange={e=>setvalue(e.target.value)} /> <br/>
       <input type="text" placeholder="search by tags" className="inputField"  onChange={e=>setinputtag(e.target.value)} />
       {
         flag===true?<Showuser users={filUser} />:<Showuser users={user} />
         }
      </div>
    </div>
  );
}

export default App;
