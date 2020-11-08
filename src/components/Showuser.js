import React,{useState, useEffect} from 'react'
import {Container, Row, Col,Button} from 'reactstrap'
import '../styles/showuser.css'


export default function Showuser({users}) {
    
    const avgArr=[];

    const [visible, setvisible] = useState(-1);
    const [tag, settag]  = useState('');

  const handleClick = (e, index)=>
  {    
      settag(e.target.value);
      if(users[index].tags){
         users[index].tags.push(e.target.value);
      }
      else{
        users[index].tags=[];
        users[index].tags.push(e.target.value);
      }
  }

  useEffect(() => {

},[visible, tag]);
    
    for(var i=0;i<users.length;i++){
        let avg=0;
        for(let j=0;j<8;j++){
             avg=avg+parseInt(users[i].grades[j]);
        }
        avg=avg/8;
        avgArr.push(avg);
    }
    return (
        <div id="usersList">
        {
            users.map((user, index)=>{
                return (
                    <Container fluid key={index} className="users">
                    <Row>
                        <Col sm="12" md="3" lg="3" xl="3" className="pic">
                        <img src={user.pic} alt="images"/>
                        </Col>
                        <Col sm="12" md="5" lg="5" xl="5" className="info">
                          <h3>{user.firstName} {user.lastName}</h3>
                          <p>Email:{user.email}</p>
                          <p>Comapny:{user.company}</p>
                          <p>Skill:{user.skill}</p>
                          <p>Average:{avgArr[index]}%</p>
                          {
                           visible==index?
                          <div>
                          {
                              user.grades.map((grade, i)=>{
                                  return(
                                      <p key={i}>Test{i+1} {grade}</p>
                                  )
                              })
                          }
                          <p>Tags:</p>
                          {
                              users[index].tags?
                              users[index].tags.map((eachtag, j)=>{
                                 return(
                                     <p key={j}>{eachtag}</p>
                                 )
                              }):""
                          }
                          <input type="text" className="tags" placeholder="add tags" onKeyPress={e=>e.key === 'Enter'?handleClick(e, index):""}/>
                          </div>
                          :""
                          }
                        </Col>
                        <Col sm="12" md="3" lg="3" xl="3">
                           <Button className="toggleButton" onClick={(e)=>visible==index?setvisible(-1):setvisible(index)}>Toggle</Button>
                        </Col>
                    </Row>
        
                    </Container>
                )
            })
        }
          </div>
    )
}
