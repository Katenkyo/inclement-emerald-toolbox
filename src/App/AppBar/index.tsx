import React from "react";
import { AppBar, Typography, Toolbar } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import TrainerSelect from "@pages/Trainers/TrainerSelect";

const ActualBar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  return (
    <AppBar component="nav" position="sticky">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Main menu
        </Typography>
        {pathname.startsWith("/trainers") ? (
          <TrainerSelect />
        ) : (
          <Link to="/trainers">Trainers</Link>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default ActualBar;
