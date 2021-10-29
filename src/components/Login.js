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
  Alert,
} from "@mui/material";
import "./Login.css";
import video from "../assets/video.mp4";
import SignupModal from "./SignupModal";
import { signInWithEmailAndPassword } from "@firebase/auth";
import { auth } from "../firebase-config";

export default function Login(props) {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [erroSenha, setErroSenha] = useState("hidden");
  const [erroAuth, setErroAuth] = useState("");

  const onUsernameChange = (e) => {
    setLogin(e.target.value);
  };

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleClickOpen = () => {
    setVisible(true);
  };

  const handleClose = () => {
    setVisible(false);
  };

  const loginUser = async () => {
    try {
      const user = await signInWithEmailAndPassword(auth, login, password);
      console.log(user);
    } catch (error) {
      setErroSenha("show");
      setErroAuth(error.message);
      console.log(error.message);
    }
  };

  return (
    <div className="page">
      {/* <video autoPlay muted loop id="myVideo">
        <source src={video} type="video/mp4"></source>
      </video> */}
      <div className="container">
        {/* Modal de criação de conta */}
        <SignupModal handleClose={handleClose} visibleOn={visible} />
        <div className="login-box">
          <div className="username">
            <TextField
              onChange={onUsernameChange}
              className="inputLogin"
              size="large"
              id="outlined-basic"
              label="Usuário"
              variant="outlined"
            />
          </div>
          <div className="password">
            <TextField
              onChange={onPasswordChange}
              className="inputLogin"
              id="outlined-basic"
              label="Senha"
              type="password"
              variant="outlined"
            />
            <Alert
              sx={{ visibility: erroSenha }}
              variant="filled"
              severity="error"
            >
              {erroAuth}
            </Alert>
          </div>
          <div className="loginButton">
            <Button
              size="large"
              className="inputLogin"
              variant="contained"
              onClick={loginUser}
              disabled={login === "" || password === ""}
            >
              ENTRAR
            </Button>
          </div>

          <div className="checkbox">
            <Checkbox></Checkbox>
            <p id="testee">Manter conectado</p>
          </div>
          <div className="signup">
            <p>
              Ainda não possui uma conta?{" "}
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
