import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { Sprite, TypeImage } from "../image";

const Profile = ({
  name,
  nickname,
  type1,
  type2,
}: {
  name?: string;
  nickname?: string;
  type1?: PokemonType;
  type2?: PokemonType;
}) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Sprite name={name} />
      <Typography variant="caption" textAlign="center">
        {nickname ?? name ?? ""}
      </Typography>
      <Grid container direction="row" justifyContent="center">
        {[type1, type2].map((t) => t && <TypeImage key={t} name={t} />)}
      </Grid>
    </Box>
  );
};
export default Profile;
