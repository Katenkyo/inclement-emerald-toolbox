import React, { useState } from "react";
import { Box, Divider, Grid, Pagination } from "@mui/material";
import r from "@assets/routes.json";
import RouteCard from "./RouteCard/RouteCard";
import BoxedMon from "./BoxedMon";
const routes = r as RouteEntity[];

// Final goal is to have one page for each progression point
// Will make it easier to encounter route if needed
const paginatedRoutes = routes.reduce((acc: RouteEntity[][], val, index) => {
  const page = Math.floor(index / 10);
  if (acc[page] === undefined) acc[page] = [];
  acc[page].push(val);
  return acc;
}, []);

const Progression = () => {
  const [page, setPage] = useState<number>(0);
  return (
    <Grid container direction="row" wrap="nowrap">
      <Box width="30%" padding={0.5}>
        <BoxedMon />
      </Box>
      <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />
      <Grid container direction="column" sx={{ p: 1, "& > *": { my: 0.5 } }}>
        <Pagination
          count={paginatedRoutes.length}
          page={page + 1}
          onChange={(_, page) => setPage(page - 1)}
          shape="rounded"
          sx={{ alignSelf: "center" }}
        />
        {paginatedRoutes[page].map((route) => (
          <RouteCard key={route.name} route={route} />
        ))}
      </Grid>
    </Grid>
  );
};

export default Progression;
