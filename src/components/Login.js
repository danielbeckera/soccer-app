import { useState } from "react";
import { Button, TextField, Checkbox } from '@mui/material';
import "./Login.css"
import video from "./video-login.mp4"


export default function Login(props) {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    function onUsernameChange(event) {
        setLogin(event.target.value);
    }

    function onPasswordChange(event) {
        setPassword(event.target.value)
    }

    return (
        <div className="page">
            <video autoPlay muted loop id="myVideo">
                <source src={video} type="video/mp4"></source>
            </video>
            <div className="container">
                <div className='login-box'>
                    <div className='username'>
                        <TextField onChange={onUsernameChange} className="inputLogin" size="large" id="outlined-basic" label="Username" variant="outlined" />
                    </div>
                    <div className="password">    
                        <TextField onChange={onPasswordChange} className="inputLogin"   id="outlined-basic" label="Password" type='password' variant="outlined" />
                    </div>
                    <div className="loginButton">
                        <Button className="inputLogin"  variant="contained">LOGIN</Button>
                    </div>
                    <div className="checkbox">
                        <Checkbox></Checkbox>
                        <p id="testee">Remember me</p>
                    </div>

                </div>
            </div>
        </div>

    )
}