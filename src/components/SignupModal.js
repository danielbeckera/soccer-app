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
  const [primeiraSenha, setPrimeiraSenha] = useState("");
  const [segundaSenha, setSegundaSenha] = useState("");
  const [email, setEmail] = useState("");
  const [senhasIguais, setSenhasIguais] = useState("hidden");
  const [showPassword, setShowPassword] = useState(false);
  const [contaCriada, setContaCriada] = useState(false);
  const [contaErro, setContaErro] = useState('hidden');
  const [mensagemErro, setMensagemErro] = useState("");
  // Seleção de nome e sobrenome modal
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [alerta, setAlerta] = useState("");
  const [defaultValue, setDefaultValue] = useState("")

  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        email,
        primeiraSenha
      );
      setContaCriada(true);
    } catch (error) {
      setMensagemErro(error.message)
      setContaErro('show')

    }
  };

  useEffect(() => {
    if (primeiraSenha === segundaSenha) {
      setSenhasIguais("hidden");
    } else {
      setSenhasIguais("show");
    }
  }, [segundaSenha]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setDefaultValue("coco")
  };

  useEffect(() => {
    setOpen(props.visibleOn);
  }, [props.visibleOn]);

  const handleChangeNome = (e) => {
    setNome(e.target.value);
  };

  const handleChangeSobrenome = (e) => {
    setSobrenome(e.target.value);
  };

  const handleChangeEstado = (e) => {
    setEstadoSelecionado(e.target.value);
  };

  const handleChangeCidade = (e) => {
    setCidadeSelecionada(e.target.value);
  };

  const handleChangePrimeiraSenha = (e) => {
    setPrimeiraSenha(e.target.value);
  };

  const handleChangeSegundaSenha = (e) => {
    setSegundaSenha(e.target.value);
  };

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
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
          <Box m={1} mr={6}>
          {primeiraSenha !== segundaSenha && segundaSenha !== "" ?  
          <TextField
          error
          id="standard-error-helper-text"
          defaultValue={defaultValue}
          helperText="Senhas diferentes"
          variant="standard"
          onChange={handleChangePrimeiraSenha}
          type="password"
        />
           :
        <TextField
            required
            margin="dense"
            id="password"
            label="Senha"
            type="password"
            variant="standard"
            onChange={handleChangePrimeiraSenha}
          />
        }
          
          </Box>
          <Box m={1} ml={3}>
        {primeiraSenha !== segundaSenha && segundaSenha !== "" ?  
          <TextField
          error
          variant="standard"
          id="outlined-error-helper-text"
          defaultValue={defaultValue}
          helperText="Senhas diferentes"
          type="password" 
          onChange={handleChangeSegundaSenha}
          />

         :
          <TextField
          required
          variant="standard"
          margin="dense"
          id="password"
          label="Confirmação de senha"
          type="password"
          onChange={handleChangeSegundaSenha}
        />
        }
           
          </Box>
        </div>
        {contaCriada ? <Alert
          sx={{ visibility: contaCriada }}
          variant="filled"
          severity="success"
        >
          Conta criada com sucesso!
        </Alert> : <Alert
          sx={{ visibility: contaErro }}
          variant="filled"
          severity="error"
        >
          {mensagemErro}  
        </Alert>}
        
      </DialogContent>

      <DialogActions>
        <Button onClick={props.handleClose} variant="contained" color="error">
          CANCELAR
        </Button>
        <Button
          disabled={
            primeiraSenha !== segundaSenha ||
            primeiraSenha === "" ||
            segundaSenha === "" ||
            email === ""
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
