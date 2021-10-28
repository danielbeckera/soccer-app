import { useState } from "react";
import {
  Button,
  TextField,
  Checkbox,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Dialog,
} from "@mui/material";
import "./Login.css";
import video from "../assets/video-login.mp4";

export default function Login(props) {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);

  function onUsernameChange(event) {
    setLogin(event.target.value);
  }

  function onPasswordChange(event) {
    setPassword(event.target.value);
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="page">
      <video autoPlay muted loop id="myVideo">
        <source src={video} type="video/mp4"></source>
      </video>
      <div className="container">
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Create an account</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please fill all the necessary informations.
            </DialogContentText>
            <div className="inputsFormCreateAccount-1">
              <div className="emailForm">
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Email Address"
                  type="email"
                  fullWidth
                  variant="standard"
                />
              </div>
              <div className="passwordForm">
                <TextField
                  margin="dense"
                  id="name"
                  label="Password"
                  type="password"
                  fullWidth
                  variant="standard"
                />
              </div>
            </div>
            <div className="inputsFormCreateAccount-2">
              <div class="nomeForm">
                <TextField
                  id="nomeFormLogin"
                  margin="dense"
                  label="Nome"
                  type="password"
                  fullWidth
                  variant="standard"
                />
              </div>
              <div className="sobrenomeForm">
                <TextField
                  margin="dense"
                  id="name"
                  label="Sobrenome"
                  type="password"
                  fullWidth
                  variant="standard"
                />
              </div>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleClose}>Create account</Button>
          </DialogActions>
        </Dialog>
        <div className="login-box">
          <div className="username">
            <TextField
              onChange={onUsernameChange}
              className="inputLogin"
              size="large"
              id="outlined-basic"
              label="Username"
              variant="outlined"
            />
          </div>
          <div className="password">
            <TextField
              onChange={onPasswordChange}
              className="inputLogin"
              id="outlined-basic"
              label="Password"
              type="password"
              variant="outlined"
            />
          </div>
          <div className="loginButton">
            <Button size="large" className="inputLogin" variant="contained">
              LOGIN
            </Button>
          </div>
          <div className="checkbox">
            <Checkbox></Checkbox>
            <p id="testee">Remember me</p>
          </div>
          <div className="signup">
            <p>
              Don't have an account yet?{" "}
              <a href="#" onClick={handleClickOpen}>
                <span>
                  <strong>Sign up now</strong>
                </span>
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
