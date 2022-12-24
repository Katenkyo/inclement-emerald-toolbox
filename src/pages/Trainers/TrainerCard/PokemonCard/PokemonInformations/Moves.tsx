import React, { useContext } from "react";
import { DexContext } from "@common/DexContext";
import { Box, Card, styled, Typography } from "@mui/material";

const StyledImg = styled("img")({
  height: "14px",
  width: "32px",
  alignSelf: "center",
  px: "4px",
});
const PokemonMoves = ({ names }: { names: string[] }) => {
  const { moveDex } = useContext(DexContext);
  const moves = names
    .map((n) =>
      moveDex.find(
        (move) => move.name.toLocaleLowerCase() === n.toLocaleLowerCase()
      )
    )
    .filter((m) => m !== undefined) as MoveEntity[];
  return (
    <Box
      sx={{
        display: "flex",
        width: "20ch",
        flexDirection: "column",
        height: "100%",
        justifyContent: "space-around",
      }}
    >
      {moves.map((m) => (
        <Card
          key={m.name}
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "nowrap",
            px: "1ch",
          }}
        >
          <StyledImg
            src={`https://veekun.com/dex/media/types/en/${m.type.toLocaleLowerCase()}.png`}
          />
          <Typography variant="caption">{m.name}</Typography>
        </Card>
      ))}
    </Box>
  );
};

export default PokemonMoves;
