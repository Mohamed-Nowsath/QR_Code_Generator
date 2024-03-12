import React, { useState } from 'react';
import "./FromApp.css"

function FromApp() {
    const [user,setUser]=useState({
        name:"Nowsath",
        age:23,
        gender:"Male",
        isMarried:false,
        country:"India",
        Bio:"Write something about yourself",
    })

    function changeHandler(e){
            const name = e.target.name;
            const value = e.target.type==="checkbox" ? e.target.checked : e.target.value;
            setUser({...user, [name]:value})
    }

  return (
    <>
        <table>
            <tbody>
                <tr>
                    <th>Name</th>
                    <td>{user.name}</td>
                </tr>
                <tr>
                    <th>Age</th>
                    <td>{user.age}</td>
                </tr>
                <tr>
                    <th>Gender</th>
                    <td>{user.gender}</td>
                </tr>
                <tr>
                    <th>isMarried</th>
                    <td>{user.isMarried ? "Married" : "Not Married"}</td>
                </tr>
                <tr>
                    <th>Country</th>
                    <td>{user.country}</td>
                </tr>
                <tr>
                    <th>Bio</th>
                    <td>{user.Bio}</td>
                </tr>
            </tbody>
        </table>

        <form>
            <input className='input name' type='text' placeholder='Full Name' value={user.name} name='name' onChange={changeHandler}/>
            <input className='input age' type='number' placeholder='Age' value={user.age} name='age' onChange={changeHandler}/>
            <div className='gender'>
                <label htmlFor='male'>
                    <input type='radio' name='gender' id='male' checked={user.gender=="Male"} value="Male" onChange={changeHandler} />
                    Male
                </label>
                <label htmlFor='female'>
                    <input type='radio' name='gender' id='female' checked={user.gender=="Female"} value="Female" onChange={changeHandler}/>
                    Female
                </label>
            </div>
            <label htmlFor='isMarried'>
                <input type='checkbox' id='isMarried'checked={user.isMarried} name='isMarried'onChange={changeHandler}/>
                isMarried
            </label>
            <div className='selectDiv'>
                <label htmlFor='country'>Select Country</label>
                <select name='country' id='country' value={user.country} onChange={changeHandler}>
                    <option value="India">India</option>
                    <option value="USA">USA</option>
                    <option value="UK">UK</option>
                </select>
            </div>
            <textarea rows={5} name='Bio' placeholder='Write about you' value={user.Bio} onChange={changeHandler}></textarea>
        </form>
    </>
  )
}

export default FromApp