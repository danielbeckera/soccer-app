import { useState, useEffect } from "react";
import { Button, TextField, Checkbox, Alert } from "@mui/material";
import "./Login.css";
import video from "../assets/video.mp4";
import SignupModal from "./SignupModal";
import { getAuth, signInWithEmailAndPassword, signOut } from "@firebase/auth";
import { auth } from "../firebase-config";
import { Route, Redirect, Link, useHistory } from "react-router-dom";
import Home from "./Home";

export default function Login(props) {
  const [login, setLogin] = useState({ username: "", password: "" });
  const [modalVisible, setVisible] = useState(false);
  const [erroSenha, setErroSenha] = useState("hidden");
  const [erroAuth, setErroAuth] = useState("");
  const [contaLogada, setContaLogada] = useState(false);
  const [emailValidado, setEmailValidado] = useState(false);
  const [user, setUser] = useState("");

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
      setUser(user);
      console.log(user);
      setContaLogada(true);
      contaLogada ? <Redirect to="/home" /> : <Redirect to="/" />;
    } catch (error) {
      setErroSenha("show");
      setErroAuth(error.message);
    }
  };

  // Checa se user esta logado, se sim passa pra tela home
  let history = useHistory();
  useEffect(() => {
    if (contaLogada) {
      history.push("/home");
    }
  }, [contaLogada, history]);

  const auth = getAuth();
  const testelog = signOut(auth)
    .then(() => {
      // Sign-out successful.
      console.log("signout successful");
    })
    .catch((error) => {
      // An error happened.
      console.log("error");
    });

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
