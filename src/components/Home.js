import { useState, useEffect } from "react";
import { auth } from "../firebase-config";
import { getAuth, signOut } from "firebase/auth";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  MenuItem,
  Menu,
  Button,
} from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import './Home.css'
import ChangePasswordModal from "./ChangePasswordModal";
import Header from "./Header"

import { withRouter, useHistory } from "react-router-dom";

function Home() {
  const [authTst, setAuth] = useState(null);
  const [anchorEl, setAnchorEl] = useState(false);
  const [modalVisible, setVisible] = useState(false);


  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCloseModal = () => {
    setVisible(false);
  };

  const handleOpenModal = () => {
    setVisible(true);
  }

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  let history = useHistory();
  const logout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        history.push("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Header item1="Brasileirão Série A" item2="Brasileirão Série B" item3="Libertadores" />

      
    </>
  );
}

export default withRouter(Home);
