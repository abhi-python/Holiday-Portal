import React ,{useState,useContext} from "react";
import {signInWithEmailAndPassword} from 'firebase/auth'
import {auth} from '../firebase-config';
import { useNavigate} from "react-router-dom";
import Nav from "./nav";
import { UserContext } from "../App";
import '../style.css'
export default function Login() {


    const {state,dispatch} = useContext(UserContext)

    const[email,setEmail] = useState('')
    const[password,setPassword] = useState('')
    const navigate = useNavigate();

    const login =async () =>{
        try{
            const user = await signInWithEmailAndPassword(auth,email,password)
            console.log(user);
            dispatch({type:'USER',payload:true})
            alert("Successful login")
            navigate("/home",{value: email});
            }catch(err){
                alert("Incorrect username or password")
                console.log(err.message);
            }
    }

    return (
      <>
      <Nav />
      <div className="auth">
        <h3>Sign In</h3>
        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            onChange={(e)=>{setEmail(e.target.value)}}
            className="form-control"
            placeholder="Enter email"
          />

        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            onChange={(e)=>{setPassword(e.target.value)}}
            className="form-control"
            placeholder="Enter password"
          />

        </div>
        <div className="mb-3">
        </div>
        <div className="d-grid">
          <button  onClick={login} type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
        <p className="forgot-password text-right">
          Forgot <a href="*">password?</a>
        </p>
        </div>
      </>
    )
}