import React from "react";
import { AppBar, Typography, Box, Grid } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import TrainerSelect from "@pages/Trainers/TrainerSelect";
import PokedexLookup from "@common/PokedexLookup";

const ActualBar = () => {
  const { pathname } = useLocation();
  return (
    <AppBar component="nav" position="sticky">
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        padding={1}
        alignItems="center"
      >
        <Box
          sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
        >
          <Typography variant="h6" sx={{ width: "20ch" }}>
            Main menu
          </Typography>
          <PokedexLookup />
        </Box>
        {pathname.startsWith("/trainers") ? (
          <TrainerSelect />
        ) : (
          <Link to="/trainers">Trainers</Link>
        )}
      </Grid>
    </AppBar>
  );
};

export default ActualBar;
