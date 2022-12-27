import React, { useContext } from "react";
import { IconButton } from "@mui/material";
import Vaccines from "@mui/icons-material/Vaccines";
import { AttemptContext } from "@common/AttemptContext";

const KillButton = ({ pokemon }: { pokemon: PlayerPokemonInstance }) => {
  const { controls } = useContext(AttemptContext);
  return (
    <>
      <IconButton onClick={() => controls.kill(pokemon)}>
        <Vaccines />
      </IconButton>
    </>
  );
};

export default KillButton;
