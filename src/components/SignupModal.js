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
  const [open, setOpen] = useState(false);
  const [estados, setEstados] = useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
    <Dialog
      sx={{ visibility: props.visibleOn }}
      open={handleClickOpen}
      onClose={handleClose}
    >
      <DialogTitle>Create an account</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please fill all the necessary informations to register.
        </DialogContentText>
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
          <Box>
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
                value="{age}"
                onChange=""
                autoWidth
                label="Age"
              >
                {estados.map((estado) => {
                  return <MenuItem value={estado.nome}>{estado.nome}</MenuItem>;
                })}
              </Select>
            </FormControl>
          </Box>
          <Box>
            <TextField
              margin="dense"
              id="cidade"
              label="Cidade"
              type="text"
              variant="standard"
            />
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
            />
          </Box>
          <Box m={1}>
            <TextField
              margin="dense"
              id="password"
              label="Password confirmation"
              type="password"
              variant="standard"
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
