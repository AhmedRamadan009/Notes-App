import React from 'react';
import axios from 'axios';
import  { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function SignUP() {
  let baseURL = 'https://route-movies-api.vercel.app/';
  const [user, setUser] = useState({ 'first_name': '', 'last_name': '', 'email': '', 'password': '' })
  const [error, setError] = useState('');
  const [done, setDone] = useState('');
    const [isLoading, setIsLoading] = useState(false)
    let navigate = useNavigate();

  async function signup(e){
    e.preventDefault();
setIsLoading(true)
   let {data}= await axios.post(baseURL+'signup', user);
   setIsLoading(false)
   if (data.message == 'success') {
    setDone(data.message)
    navigate('/signin')
} else {
    setError(data.message)
}
    
  }
  function getuser(e){
    setUser({...user, [e.target.name]:e.target.value})
  }
  return (
    <>

<div className="container my-5 py-5">
                <div className="col-md-5 m-auto text-center">
                    <form onSubmit={signup}>
                        <div className="form-group">
                            <input onChange={getuser} placeholder="Enter your name" name="first_name" type="text" className=" form-control" />
                        </div>
                        <div className="form-group my-2 ">
                            <input onChange={getuser} placeholder="Enter your name" name="last_name" type="text" className="form-control" />
                        </div>
                        <div className="form-group">
                            <input onChange={getuser} placeholder="Enter email" type="email" name="email" className="form-control" />
                        </div>
                        <div className="form-group my-2">
                            <input onChange={getuser} placeholder="Enter you password" type="password" name="password" className=" form-control" />
                        </div>
                        <button type="submit" className={'btn btn-info w-100'+ (isLoading? " disabled":"")}> {isLoading? <i className="fa fa-spinner fa-spin" aria-hidden="true"></i> : 'SignUp'}  </button>

                        {error && <div className="alert alert-danger mt-2">
                            {error}
                        </div>}
                        {done &&  <div className="alert alert-success mt-2">
                            {done} 
                        </div>}
                    </form>
                </div>
            </div>
    </>
  )
}
