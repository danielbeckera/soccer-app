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
  Box,
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
  const [alerta, setAlerta] = useState("");
  const [defaultValue, setDefaultValue] = useState("");
  const [contaErro, setContaErro] = useState("hidden");
  const [mensagemErro, setMensagemErro] = useState("");
  const [contaCriada, setContaCriada] = useState(false);

  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        email,
        senha.primeiraSenha
      );
    } catch (error) {
      setMensagemErro(error.message);
      setContaErro("show");
      setContaCriada(true);
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
    setDefaultValue("coco");
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

  const handleCloseModal = () => {
    props.handleClose();
    setSenha({ ...senha, primeiraSenha: "" });
    setSenha({ ...senha, segundaSenha: "" });
    setEmail("");
  };

  return (
    <>
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
                required
                type="email"
                variant="standard"
                onChange={handleChangeEmail}
              />
            </Grid>
          </div>
          <div className="inputsFormCreateAccount-4">
            <Box m={1} mr={0}>
              {senha.primeiraSenha !== senha.segundaSenha &&
              senha.segundaSenha !== "" ? (
                <TextField
                  error
                  id="standard-error-helper-text"
                  defaultValue={defaultValue}
                  helperText="Senhas diferentes"
                  variant="standard"
                  onChange={handleChangePrimeiraSenha}
                  type="password"
                />
              ) : (
                <TextField
                  required
                  margin="dense"
                  id="password"
                  label="Senha"
                  type="password"
                  variant="standard"
                  onChange={handleChangePrimeiraSenha}
                />
              )}
            </Box>
            <Box m={1} ml={3}>
              {senha.primeiraSenha !== senha.segundaSenha &&
              senha.segundaSenha !== "" ? (
                <TextField
                  error
                  variant="standard"
                  id="outlined-error-helper-text"
                  helperText="Senhas diferentes"
                  type="password"
                  onChange={handleChangeSegundaSenha}
                />
              ) : (
                <TextField
                  required
                  variant="standard"
                  margin="dense"
                  id="password"
                  label="Confirmação de senha"
                  type="password"
                  onChange={handleChangeSegundaSenha}
                />
              )}
            </Box>
          </div>
          {contaCriada ? (
            <Alert
              sx={{ visibility: contaCriada }}
              variant="filled"
              severity="success"
            >
              Conta criada com sucesso!
            </Alert>
          ) : (
            <Alert
              sx={{ visibility: contaErro }}
              variant="filled"
              severity="error"
            >
              {mensagemErro}
            </Alert>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCloseModal} variant="contained" color="error">
            CANCELAR
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
            CRIAR CONTA
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
