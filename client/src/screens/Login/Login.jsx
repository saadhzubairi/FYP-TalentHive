import { useState } from 'react'
import './login.css'

function Login(props) {

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const { email, password } = formData;
    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }
    const onSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <div className="login">
            <div className="loginWrapper">
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