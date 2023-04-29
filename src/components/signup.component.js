import React,{useState} from 'react'
import {createUserWithEmailAndPassword} from 'firebase/auth'
import {auth} from '../firebase-config';
import {useNavigate} from "react-router-dom";
import Nav from './nav';
import '../style.css'

export default function SignUp() { 
    

    const[email,setEmail] = useState('')
    const[password,setPassword] = useState('')
    const navigate = useNavigate();

    const register =async () =>{
        try{
        const user = await createUserWithEmailAndPassword(auth,email,password)
        console.log(user);
        alert("Successful sign-up")
        navigate("/sign-in",{state: email});
        }catch(err){
            console.log(err.message);
        }

    }

    return (
        <>
        <Nav />
        <div className='auth'>
        <h3>Sign Up</h3>
        <div className="mb-3">
          <label>Email address</label>
            <input className="form-control" type="email" 
                    onChange={(e)=>{
                    setEmail(e.target.value)
                    }} 
                    placeholder = "Email" 
                    name=""
                    id="">
            </input>


        </div>
        <div className="mb-3">
          <label>Password</label>
                <input className="form-control" type="password" 
                onChange={(e)=>{
                    setPassword(e.target.value)
                    }} 
                    placeholder = "Password" 
                    name="" id="">
                </input>

        </div>
        <div className="d-grid">
          <button onClick={register} type="submit" className="btn btn-primary">
            Sign Up
          </button>
        </div>
        <p className="forgot-password text-right">
          Already registered <a href="/sign-in">sign in?</a>
        </p>
        </div>
        </>
    )
}