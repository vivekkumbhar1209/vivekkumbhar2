import React from 'react'
import { useState } from 'react'
import axios from 'axios'

/*const RegisterPatient = () => {

  const [data , setData] = useState({
    username:'',
    password:''
  })

  const handleChange=(e)=>{
    setData({...data,[e.target.name]:e.target.value})
    console.log(data)
  }

  const handleSubmit=(e)=>{
    e.preventDefault()
    var token = localStorage.getItem('login-token')
    console.log('form submit')
    axios.post('http://127.0.0.1:8000/api/demo',data,{
      headers:{
        Authorization: `Bearer ${token}`
      }
    }).then(res=>{
      console.log(res.data)
    })

  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input onChange={handleChange} type='text' placeholder='username' name='username'/>  
        <input onChange={handleChange} type='password' placeholder='password' name='password'/>
        <input type='submit' />
      </form> 
    </>
  )
}

export default RegisterPatient*/
