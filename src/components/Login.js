import { useState, useEffect } from "react";
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
  CircularProgress,
} from "@mui/material";
import "./Login.css";
import video from "../assets/video.mp4";
import SignupModal from "./SignupModal";
import { getAuth, signInWithEmailAndPassword } from "@firebase/auth";
import { auth } from "../firebase-config";

export default function Login(props) {
  const [login, setLogin] = useState({ username: "", password: "" });
  const [modalVisible, setVisible] = useState(false);
  const [erroSenha, setErroSenha] = useState("hidden");
  const [erroAuth, setErroAuth] = useState("");
  const [contaLogada, setContaLogada] = useState(false);
  const [emailValidado, setEmailValidado] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogin((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  const handleClickOpen = () => {
    setVisible(true);
  };

  const handleClose = () => {
    setVisible(false);
  };

  const loginValidator = () => {
    /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(login.username)
      ? setEmailValidado(true)
      : setEmailValidado(false);
  };

  useEffect(() => {
    loginValidator();
  }, [login]);

  const loginUser = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        login.username,
        login.password
      );
      console.log(user);
      setContaLogada(true);
    } catch (error) {
      setErroSenha("show");
      setErroAuth(error.message);
    }
  };

  return (
    <div className="page">
      {/* <video autoPlay muted loop id="myVideo">
        <source src={video} type="video/mp4"></source>
      </video> */}
      <div className="container">
        {/* Componente do Modal de criação de conta sendo chamado*/}
        <SignupModal handleClose={handleClose} visibleOn={modalVisible} />
        <div className="login-box">
          <div className="username">
            <TextField
              onChange={handleChange}
              className="inputLogin"
              size="large"
              id="outlined-basic"
              label="Usuário"
              variant="outlined"
              name="username"
            />
          </div>
          <div className="password">
            <TextField
              onChange={handleChange}
              className="inputLogin"
              id="outlined-basic"
              label="Senha"
              type="password"
              variant="outlined"
              name="password"
            />
            {erroSenha ? (
              <Alert
                sx={{ visibility: erroSenha }}
                variant="filled"
                severity="error"
              >
                {erroAuth}
              </Alert>
            ) : null}
          </div>
          <div className="loginButton">
            <Button
              disabled={login.password === "" || emailValidado === false}
              size="large"
              className="inputLogin"
              variant="contained"
              onClick={loginUser}
            >
              ENTRAR
            </Button>
          </div>

          <div className="checkbox">
            <Checkbox></Checkbox>
            <p id="testee">Lembrar senha </p>
          </div>
          <div className="signup">
            <p>
              Ainda não possui uma conta?{" "}
              <a href="#" onClick={handleClickOpen}>
                <span>
                  <strong>Inscreva-se</strong>
                </span>
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
