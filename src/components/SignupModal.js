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
  // Seleção de email/senha do modal
  const [senha, setSenha] = useState({ primeiraSenha: "", segundaSenha: "" });
  const [email, setEmail] = useState("");
  const [emailValidado, setEmailValidado] = useState(false);
  const [defaultValue, setDefaultValue] = useState("");
  const [contaErro, setContaErro] = useState(false);
  const [mensagemErro, setMensagemErro] = useState("");
  const [contaCriada, setContaCriada] = useState(false);
  const [user, setUser] = useState("");

  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        email,
        senha.primeiraSenha
      );
      setUser(user);
      setContaCriada(true);
    } catch (error) {
      setMensagemErro(error.message);
      setContaErro(true);
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
    setContaCriada(false);
    setContaErro(false);
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{props.title}</DialogTitle>
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
                  label="Confirmação senha"
                  type="password"
                  onChange={handleChangeSegundaSenha}
                />
              )}
            </Box>
          </div>
          {contaCriada ? (
            <Alert variant="filled" severity="success">
              Conta criada com sucesso!
            </Alert>
          ) : (
            <></>
          )}
          {contaErro ? (
            <Alert variant="filled" severity="error">
              {mensagemErro}
            </Alert>
          ) : (
            <></>
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
            {props.nomeButton}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
