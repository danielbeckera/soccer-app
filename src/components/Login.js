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
  Grid,
  InputLabel,
  Select,
  MenuItem,
  Box,
} from "@mui/material";
import "./Login.css";
import video from "../assets/video-login.mp4";

export default function Login(props) {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);

  const onUsernameChange = (e) => {
    setLogin(e.target.value);
  };

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };

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
              Please fill all the necessary informations to register.
            </DialogContentText>
            <div className="inputsFormCreateAccount-1">
              <Box m={1}>
                <TextField
                  autoFocus
                  margin="dense"
                  id="nome"
                  label="Nome"
                  type="text"
                  fullWidth
                  variant="standard"
                />
              </Box>
              <Box m={1}>
                <TextField
                  margin="dense"
                  id="sobrenome"
                  label="Sobrenome"
                  type="text"
                  fullWidth
                  variant="standard"
                />
              </Box>
            </div>
            <div className="inputsFormCreateAccount-2">
              <Box m={1}>
                <TextField
                  id="estado"
                  margin="dense"
                  label="Estado"
                  type="text"
                  fullWidth
                  variant="standard"
                />
              </Box>
              <Box m={1}>
                <TextField
                  margin="dense"
                  id="cidade"
                  label="Cidade"
                  type="text"
                  fullWidth
                  variant="standard"
                />
              </Box>
            </div>
            <div className="inputsFormCreateAccount-3">
              <Grid container justifyContent="center">
                <Box m={1}>
                  <TextField
                    id="email"
                    label="Email"
                    type="email"
                    variant="standard"
                  />
                </Box>
              </Grid>
            </div>
            <div className="inputsFormCreateAccount-4">
              <Box m={1}>
                <TextField
                  margin="dense"
                  id="password"
                  label="Password"
                  type="password"
                  fullWidth
                  variant="standard"
                />
              </Box>
              <Box m={1}>
                <TextField
                  margin="dense"
                  id="password"
                  label="Password confirmation"
                  type="password"
                  fullWidth
                  variant="standard"
                />
              </Box>
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
