import { useState, useEffect } from "react";
import {
  Button,
  TextField,
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
  FormControl,
  Alert,
} from "@mui/material";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase-config";

export default function SignupModal(props) {
  // Abertura do modal
  const [open, setOpen] = useState(props.visibleOn);
  // Seleção do estado/cidade
  const [estados, setEstados] = useState([]);
  const [estadoSelecionado, setEstadoSelecionado] = useState("");
  const [cidadesDoEstado, setCidadesDoEstado] = useState([]);
  const [cidadeSelecionada, setCidadeSelecionada] = useState("");
  // Seleção de email/senha do modal
  const [senha, setSenha] = useState({ primeiraSenha: "", segundaSenha: "" });
  const [email, setEmail] = useState("");
  const [senhasIguais, setSenhasIguais] = useState("hidden");
  const [showPassword, setShowPassword] = useState(false);
  const [emailValidado, setEmailValidado] = useState(false);
  // Seleção de nome e sobrenome modal
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");

  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        email,
        senha.primeiraSenha
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSamePassword = () => {
    if (senha.primeiraSenha === senha.segundaSenha) {
      setSenhasIguais("hidden");
    } else {
      setSenhasIguais("show");
    }
  };

  const emailValidator = () => {
    /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)
      ? setEmailValidado(true)
      : setEmailValidado(false);
  };

  useEffect(() => {
    emailValidator();
  }, [email]);

  useEffect(() => {
    handleSamePassword();
  }, [senha.segundaSenha]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setOpen(props.visibleOn);
  }, [props.visibleOn]);

  const handleChangeCidade = (e) => {
    setCidadeSelecionada(e.target.value);
  };

  const handleChangePrimeiraSenha = (e) => {
    setSenha({ ...senha, primeiraSenha: e.target.value });
  };

  const handleChangeSegundaSenha = (e) => {
    setSenha({ ...senha, segundaSenha: e.target.value });
  };

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  useEffect(() => {
    async function getCities() {
      const response = await fetch(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estadoSelecionado}/distritos`
      );
      const data = await response.json();
      setCidadesDoEstado(data);
    }
    getCities();
  }, [estadoSelecionado]);

  useEffect(() => {
    async function getStates() {
      const response = await fetch(
        "https://servicodados.ibge.gov.br/api/v1/localidades/estados"
      );
      const data = await response.json();
      setEstados(data);
    }
    getStates();
  }, []);

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Crie sua conta!</DialogTitle>
      <DialogContent>
        <DialogContentText>Preencha os dados obrigatórios.</DialogContentText>
        <div className="inputsFormCreateAccount-3">
          <Grid container justifyContent="center">
            <TextField
              style={{ minWidth: 410 }}
              margin="dense"
              id="email"
              label="Email"
              type="email"
              variant="standard"
              onChange={handleChangeEmail}
            />
          </Grid>
        </div>
        <div className="inputsFormCreateAccount-4">
          <Box m={1}>
            <TextField
              margin="dense"
              id="password"
              label="Password"
              type="password"
              variant="standard"
              onChange={handleChangePrimeiraSenha}
            />
          </Box>
          <Box m={1}>
            <TextField
              margin="dense"
              id="password"
              label="Password confirmation"
              type="password"
              variant="standard"
              onChange={handleChangeSegundaSenha}
            />
          </Box>
        </div>
        <Alert
          sx={{ visibility: senhasIguais }}
          variant="filled"
          severity="error"
        >
          As senhas devem ser iguais.
        </Alert>
      </DialogContent>

      <DialogActions>
        <Button onClick={props.handleClose} variant="contained" color="error">
          Cancel
        </Button>
        <Button
          disabled={
            senha.primeiraSenha !== senha.segundaSenha ||
            senha.primeiraSenha === "" ||
            senha.segundaSenha === "" ||
            emailValidado === false
          }
          onClick={register}
          variant="contained"
        >
          Create account
        </Button>
      </DialogActions>
    </Dialog>
  );
}
