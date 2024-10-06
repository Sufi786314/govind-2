// import React, { useState } from 'react'
// import Layout from '../../components/Layout/Layout'
// import {toast} from 'react-toastify'
// import axios from 'axios';
// import {useNavigate} from 'react-router-dom'
// const Register = () => {
//     const [username,setUsername] = useState("")
//     const [email,setEmail] = useState("")
//     const [password,setPassword] = useState("")
//     const [uid,setUid] = useState("")
//     const navigate = useNavigate()
//     // form function
//     const handleSubmit = async (e) =>{
//         e.preventDefault();
//         try{
//             const res = await axios.post(
//                 `/api/v1/auth/register`,
//                 {
//                 username,
//                 email,
//                 password,
//                 uid
                
//             }
//             );
//             // console.log("Response",res.data);Speacial Note the property is sucess
//             // console.log("ResponseReport",res.data.sucess)
//             if(res.data.sucess){
//                 toast.success(res.data.messsage)
//                 // console.log('yess')
//                 navigate('/login')
//             }
//             else{
//                 toast.error(res.data.messsage)
//             }
//         }
//         catch (error){
//             console.log(error)
//             toast.error('Something went wrong')
//         }
//     }
//   return (
//     <Layout title={'Register-Page SB'}>
//         <div className='register'>
//             <h1>Register Page</h1>
//             <form onSubmit={handleSubmit}>
//     <div className="mb-3">
//         <input type="text" className="form-control" id="exampleInputName" placeholder='Enter Your User Name' value={username} onChange={(e)=>{setUsername(e.target.value)}} required/>
//     </div>
//     <div className="mb-3">
//         <input type="email" className="form-control" id="exampleInputEmail" placeholder='Enter Your Email' value={email} onChange={(e)=>{setEmail(e.target.value)}} required/>
//     </div>
//     <div className="mb-3">
//         <input type="password" className="form-control" id="exampleInputPassword" placeholder='Enter Your Password' value={password} onChange={(e)=>{setPassword(e.target.value)}} required/>
//     </div>
//     <div className="mb-3">
//         <input type="text" className="form-control" id="exampleInputPhone" placeholder='Enter Your Uid' value={uid} onChange={(e)=>{setUid(e.target.value)}} required/>
//     </div>
//     <button type="submit" className="btn btn-primary">Submit</button>
//     </form>
//         </div>
//     </Layout>
//   )
// }

// export default Register



// //////////////////////////////////////


import React, { useState } from 'react';
import Layout from '../../components/Layout/Layout';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Register.css'; // Create and include styles here or use inline styles

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [uid, setUid] = useState('');
    const [rollNumber, setRollNumber] = useState('');
    const [department, setDepartment] = useState('');
    const [year, setYear] = useState('');
    const [division, setDivision] = useState('');
    const [gender, setGender] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`/api/v1/auth/register`, {
                username,
                email,
                password,
                uid,
                rollNumber,
                department,
                year,
                division,
                gender,
            });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate('/login');
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong');
        }
    };

    return (
        <Layout title={'Register Page'}>
            <div className="registration-form">
                <h2>Student Registration</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        placeholder="Enter your username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />

                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Enter your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <label htmlFor="uid">UID</label>
                    <input
                        type="text"
                        id="uid"
                        placeholder="Enter your UID"
                        value={uid}
                        onChange={(e) => setUid(e.target.value)}
                        required
                    />

                    <label htmlFor="roll-number">Roll Number</label>
                    <input
                        type="text"
                        id="roll-number"
                        placeholder="Enter your roll number"
                        value={rollNumber}
                        onChange={(e) => setRollNumber(e.target.value)}
                        required
                    />

                    <label htmlFor="department">Department</label>
                    <select
                        id="department"
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                        required
                    >
                        <option value="">Select Department</option>
                        <option value="IT">Information Technology</option>
                        <option value="CSE">Computer Science and Engineering</option>
                        <option value="ECE">Electronics and Communication Engineering</option>
                        <option value="ME">Mechanical Engineering</option>
                        <option value="EE">Electronics and Electrical Engineering</option>
                        <option value="CE">Civil Engineering</option>
                    </select>

                    <label htmlFor="year">Year of Study</label>
                    <select
                        id="year"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        required
                    >
                        <option value="">Select Year</option>
                        <option value="1">First Year</option>
                        <option value="2">Second Year</option>
                        <option value="3">Third Year</option>
                        <option value="4">Fourth Year</option>
                    </select>

                    <label htmlFor="division">Division</label>
                    <select
                        id="division"
                        value={division}
                        onChange={(e) => setDivision(e.target.value)}
                        required
                    >
                        <option value="A">A</option>
                        <option value="B">B</option>
                    </select>

                    <label>Gender:</label>
                    <div className="gender">
                        <label>
                            <input
                                type="radio"
                                name="gender"
                                value="male"
                                onChange={(e) => setGender(e.target.value)}
                                required
                            /> Male
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="gender"
                                value="female"
                                onChange={(e) => setGender(e.target.value)}
                            /> Female
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="gender"
                                value="other"
                                onChange={(e) => setGender(e.target.value)}
                            /> Other
                        </label>
                    </div>

                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Create a password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <label htmlFor="confirm-password">Confirm Password</label>
                    <input
                        type="password"
                        id="confirm-password"
                        placeholder="Confirm your password"
                        required
                    />

                    <div className="agreement">
                        <label>
                            <input type="checkbox" required /> I agree to the <a href="#">Terms and Conditions</a>
                        </label>
                    </div>

                    <button type="submit">Register</button>
                </form>
            </div>
        </Layout>
    );
};

export default Register;
