import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { Sprite, TypeImage } from "../image";

const Profile = ({
  name,
  type1,
  type2,
}: {
  name?: string;
  type1?: PokemonType;
  type2?: PokemonType;
}) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Sprite name={name} />
      <Typography variant="caption" textAlign="center">
        {name ?? ""}
      </Typography>
      <Grid container direction="row" justifyContent="center">
        {[type1, type2].map((t) => t && <TypeImage key={t} name={t} />)}
      </Grid>
    </Box>
  );
};
export default Profile;
