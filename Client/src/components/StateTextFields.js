import * as React from 'react';
import { useState,useEffect } from 'react';
import TextField from '@mui/material/TextField';
import {makeStyles} from  '@material-ui/core/styles'
import { Container,Paper } from '@material-ui/core'
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';

import { styled } from '@mui/material/styles';

import DeleteIcon from '@mui/icons-material/Delete';

import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';





const useStyles = makeStyles((theme)=> ({
  root: {
    '& > *': {
     margin : theme.spacing(1),
   
    },
  },
}));


const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: "#000",
 

}));


export default function StateTextFields() {
 const paperStayle = {padding :'50px 20px', width:600, margin:"20px auto", position: "relative"}
  
//const cl = useStyles();

const [studentName,setStudentName]= useState('');
const [studentAdress ,setStudentAdress] = useState('');
const [students,setStudents]=useState([]);
const [clicked,isCliked]=useState(false);
const [showBlockValide, setShowBlockValide] = useState(false);
const [showBlockNotValide, setShowBlockNotValide] = useState(false);



const HandelClick = (e)=>{
      e.preventDefault()
    const data = {
      name: studentName,
      address: studentAdress
    }


    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }



    fetch("http://127.0.0.1:8080/student", options)
      .then(response => response.json())
      .then(data => console.log("Data inserted:", data))
       isCliked(true);
       if(studentAdress=="" || studentName ==""){
        setShowBlockNotValide(true);
       }else{
         setShowBlockValide(true);
       }


    const timeoutId = setTimeout(() => {
      setShowBlockValide(false);
      setShowBlockNotValide(false);
    }, 2000);
    
  

}


const handelDelete =(e)=>{
 var confirmation = prompt("Please enter 'DELETE' to confirm");
    if (confirmation === "DELETE") {
        fetch("http://127.0.0.1:8080/student/"+e,{method: "DELETE"}).then(isCliked(true)).catch(console.log("error"));
    } else {
      alert("Invalid confirmation, deletion canceled.");
    }
}


const handelClearAll = ()=>{
 var confirmation = prompt("Please enter 'DELETE' to confirm");
  if (confirmation === "DELETE") {
                fetch("http://127.0.0.1:8080/student",{method: "DELETE"}).then(isCliked(true).catch(console.log("erreur")));
  }else {
      alert("Invalid confirmation, deletion canceled.");
    }
           
}





useEffect(()=>{

  
  fetch("http://127.0.0.1:8080/student").then(res=>res.json()).then(data=>setStudents(data));


 isCliked(false);  

 

},[clicked])



  return (
 
   
    <Container>
      
        <Paper   elevation={3} style={paperStayle}>
          <h1 style={{color:'#555'}}>Add Student</h1>
      <form   noValidate autoComplete='off'>
        <TextField  style={{margin:"0px 0px 19px 0px"}}  id="outlined-basic" label="Student Name " variant="outlined"  fullWidth
        
                    value={studentName} onChange={(e)=>setStudentName(e.target.value)}
        />

        <TextField style={{margin:"0px 0px 19px 0px"}} id="outlined-basic" label="Student Adress" variant="outlined" fullWidth
                    value={studentAdress} onChange={(e)=>setStudentAdress(e.target.value)}
        />

        {showBlockValide && <Alert style={{margin:"0px 0px 19px 0px",display:"Hidden"}} severity="success">New Student  Added !! — check it out!</Alert>}

        {showBlockNotValide && <Alert  style={{margin:"0px 0px 19px 0px",display:"Hidden"}} severity="error">Failed to add new Student!! — check it out!</Alert>}

        <Button variant="contained" onClick={HandelClick} >Submit</Button>


      </form>

      </Paper>    

      
        <Paper spacing={4} elevation={3} style={paperStayle}>
           <Button  variant="outlined" startIcon={<DeleteIcon />} style={{ color: "secondary" , variant: "filled",position: "absolute",top:"10px",right:"10px"}}     onClick={(e)=>handelClearAll()}>CLEAR</Button>
            <br></br>
        
           
              {students.map(student=>( 
                <Item  square elevation={5} style={{ position: "relative",margin:"0px 0px 19px 0px",padding:"15",textAlign:"left",color:"#000",font:"bold", borderRadius:"10px", borderBlockColor:"blue"}} Key={student.id}>
                 <h5>{student.name}</h5>
                    <h5>{student.address}</h5>


                       <IconButton style={{position: "absolute",top:"10px",right:"10px"}} aria-label="delete">
                        <DeleteIcon   color="primary" onClick={(e)=>handelDelete(student.id)} />
                      </IconButton>
                </Item>
              ))}

        </Paper>
    </Container>
    
  );
}
