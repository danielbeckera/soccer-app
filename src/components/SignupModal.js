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
} from "@mui/material";
import axios from "axios";

export default function SignupModal(props) {
  // Abertura do modal
  const [open, setOpen] = useState(props.visibleOn);
  // Seleção do estado/cidade
  const [estados, setEstados] = useState([]);
  const [estadoSelecionado, setEstadoSelecionado] = useState("");
  const [cidadesDoEstado, setCidadesDoEstado] = useState([]);
  const [cidadeSelecionada, setCidadeSelecionada] = useState("");
  // Seleção de senhas do modal
  const [primeiraSenha, setPrimeiraSenha] = useState("");
  const [segundaSenha, setSegundaSenha] = useState("");
  const [email, setEmail] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setOpen(props.visibleOn);
  }, [props.visibleOn]);

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
        <div className="inputsFormCreateAccount-1">
          <Box m={1}>
            <TextField
              margin="dense"
              id="nome"
              label="Nome"
              type="text"
              variant="standard"
            />
          </Box>
          <Box m={1}>
            <TextField
              margin="dense"
              id="sobrenome"
              label="Sobrenome"
              type="text"
              variant="standard"
            />
          </Box>
        </div>
        <div className="inputsFormCreateAccount-2">
          <Box mt={0.4}>
            <FormControl
              style={{ minWidth: 200 }}
              variant="standard"
              sx={{ m: 1, minWidth: 120 }}
              size="small"
            >
              <InputLabel id="demo-simple-select-autowidth-label">
                Estado
              </InputLabel>
              <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                value={estadoSelecionado}
                autoWidth
                label="Age"
                onChange={handleChangeEstado}
              >
                {estados.map((estado) => {
                  return (
                    <MenuItem value={estado.sigla}>{estado.sigla}</MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Box>
          <Box mt={0.4}>
            <FormControl
              style={{ minWidth: 200 }}
              variant="standard"
              sx={{ m: 0.7 }}
            >
              <InputLabel id="demo-simple-select-autowidth-label">
                Cidade
              </InputLabel>
              <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                value={cidadeSelecionada}
                onChange={handleChangeCidade}
                label="Age"
              >
                {cidadesDoEstado.map((cidade) => {
                  return <MenuItem value={cidade.nome}>{cidade.nome}</MenuItem>;
                })}
              </Select>
            </FormControl>
          </Box>
        </div>
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
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose}>Cancel</Button>
        <Button onClick={props.handleClose}>Create account</Button>
      </DialogActions>
    </Dialog>
  );
}
