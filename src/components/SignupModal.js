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
  FormControl,
} from "@mui/material";

export default function SignupModal(visibility, onOpen, onClose) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      sx={{ visibility: { "visible" } }}
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
          <Box m={1}>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
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
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Twenty</MenuItem>
                <MenuItem value={21}>Twenty one</MenuItem>
                <MenuItem value={22}>Twenty one and a half</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box m={1}>
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
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleClose}>Create account</Button>
      </DialogActions>
    </Dialog>
  );
}
