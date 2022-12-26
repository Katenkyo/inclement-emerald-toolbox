import { Grid } from "@mui/material";
import React from "react";
import r from "@assets/routes.json";
import RouteCard from "./RouteCard/RouteCard";
const routes = r as RouteEntity[];

const Progression = () => {
  return (
    <Grid container direction="column" sx={{ p: 1, "& > *": { my: 0.5 } }}>
      {routes.slice(0, 10).map((route) => (
        <RouteCard key={route.name} route={route} />
      ))}
    </Grid>
  );
};

export default Progression;
