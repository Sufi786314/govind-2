// import React, { useState } from 'react'
// import Layout from '../../components/Layout/Layout'
// import {toast} from 'react-toastify'
// import axios from 'axios';
// import {useNavigate,useLocation} from 'react-router-dom'
// import { useAuth } from '../../context/auth';

// const Login = () => {
//     const [auth,setAuth] = useAuth()
//     const [email,setEmail] = useState("")
//     const [password,setPassword] = useState("")
//     const navigate = useNavigate()
//     const location = useLocation()
//     // form function
//     const handleSubmit = async (e) =>{
//         e.preventDefault();
//         try{
//             const res = await axios.post(
//                 `/api/v1/auth/login`,
//                 {email,password}
//             );
//             // console.log("Response",res.data);//Speacial Note the property is sucess
//             // console.log("ResponseReport",res.data.success)
//             if(res.data.success){
//                 toast.success(res.data.messsage)
//                 // console.log('yess')
//                 setAuth({
//                     ...auth,
//                     user:res.data.user,
//                     token:res.data.token
//                 })
//                 localStorage.setItem('auth',JSON.stringify(res.data));
//                 // console.log(localStorage.getItem('auth'))   
//                 navigate(location.state||'/'); 
//             }
//             else{
//                 toast.error(res.data.message)
//             }
//         }
//         catch (error){
//             console.log(error)
//             toast.error('Something went wrong')
//         }
//     }
//   return (
//     <Layout title={'Login-Page SB'}>
//         <div className='register'>
//             <h1>Login Page</h1>
//             <form onSubmit={handleSubmit}>
    
//     <div className="mb-3">
//         <input type="email" className="form-control"  placeholder='Enter Your Email' value={email} onChange={(e)=>{setEmail(e.target.value)}} required/>
//     </div>
//     <div className="mb-3">
//         <input type="password" className="form-control"  placeholder='Enter Your Password' value={password} onChange={(e)=>{setPassword(e.target.value)}} required/>
//     </div>
//     <div className='mb-3'>
//         <button type="submit" className="btn btn-primary">   Login      </button>
//     </div>
//     <button className="btn btn-primary" onClick={()=>{navigate("/forgot-password")}}>Forgot Password</button>

//     </form>
//         </div>
//     </Layout>
//   )
// }

// export default Login




////////////////////////////////////
import React, { useState } from 'react';
import Layout from '../../components/Layout/Layout';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/auth';
import './AuthPage.css'; // Ensure this CSS file is included for styles

const Login = () => {
    const [auth, setAuth] = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false); // Loading state
    const navigate = useNavigate();
    const location = useLocation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Set loading state
        try {
            const res = await axios.post('/api/v1/auth/login', { email, password });
            if (res.data.success) {
                toast.success(res.data.message);
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token,
                });
                localStorage.setItem('auth', JSON.stringify(res.data));
                navigate(location.state || '/');
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong');
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    return (
        <Layout title={'Login Page'}>
            <div className="container" id="container">
                <div className="form-container sign-in-container">
                    <form onSubmit={handleSubmit}>
                        <h1>Sign In</h1>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button type="submit" className="btn btn-primary" disabled={loading}>
                            {loading ? 'Signing In...' : 'Login'}
                        </button>
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => navigate("/forgot-password")}
                        >
                            Forgot Password
                        </button>
                    </form>
                </div>
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h1>Welcome Back!</h1>
                            <p>To keep connected with us, please login with your personal info</p>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <h1>Not yet Signed Up?</h1>
                            <p>Enter your personal details and start your journey with us</p>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Login;
