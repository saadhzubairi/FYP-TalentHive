import { useEffect, useState } from 'react'
import './login.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login(props) {
    const [user, setUser] = useState({})
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })
    useEffect(() => {
        const checkReRoute = () => {
            if (localStorage.getItem("userType") == 2) {
                console.log("Hey hr jani")
                console.log(localStorage.getItem("userType"))
                navigate("/HRView")
            }
            if (localStorage.getItem("userType") == 3) {
                console.log("Hey candidate jani")
                navigate("/CANDView")
            }
            console.log(localStorage.getItem("userType"))
        }
        checkReRoute();
    })

    const { email, password } = formData;
    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }
    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.post("/auth/login", {
            email: e.target.email.value,
            password: e.target.password.value
        }).then((res) => {
            setUser(res.data)
            localStorage.setItem("userId", res.data._id)
            localStorage.setItem("userType", res.data.userType)
            console.log(localStorage.getItem("userId"))
            console.log(localStorage.getItem("userpass"))
            if (res.data.userType === 3) {
                navigate('/CANDView')
            }
            else if (res.data.userType === 2) {
                navigate('/HRView')
                localStorage.setItem("companyId", res.data.companyId)
            }
        }).catch((e) => console.log("NOT FOUND"))
    }

    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="TalentHiveLogo">Talent Hive</div>
                <form onSubmit={onSubmit} className='form'>
                    <input type="email" className="form-control" id='email' name='email'
                        value={email} onChange={onChange} placeholder='Enter your email' required />
                    <input type="password" className="form-control" id='password' name='password'
                        value={password} onChange={onChange} placeholder='Enter your password' required />
                    <div className="form-group">
                        <button type="submit" className='btn'>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default Login