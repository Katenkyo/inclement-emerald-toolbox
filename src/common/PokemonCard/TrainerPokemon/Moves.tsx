import React, { useContext, useRef } from "react";
import { DexContext } from "@common/DexContext";
import {
  Box,
  Card,
  styled,
  Typography,
  Tooltip,
  List,
  ListItem,
} from "@mui/material";
import { TypeImage } from "../components/image";

const StyledCard = styled(Card)({
  display: "flex",
  flexDirection: "row",
  flexWrap: "nowrap",
  padding: "0px 1ch",
});
const MoveCard = ({ move }: { move: MoveEntity }) => {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <Tooltip
      title={
        <List>
          <ListItem>Power: {move.power}</ListItem>
          <ListItem>Category: {move.category}</ListItem>
          <ListItem>Changes: {move.changes}</ListItem>
        </List>
      }
    >
      <StyledCard ref={ref}>
        <TypeImage name={move.type} />
        <Typography variant="caption">{move.name}</Typography>
      </StyledCard>
    </Tooltip>
  );
};
const AbilityCard = ({ ability }: { ability: AbilityEntity }) => {
  return (
    <Tooltip
      title={
        <List>
          <ListItem>Effect: {ability.effect}</ListItem>
          {ability.original && (
            <ListItem>Original: {ability.original}</ListItem>
          )}
        </List>
      }
    >
      <StyledCard>
        <Typography variant="caption">{ability.name}</Typography>
      </StyledCard>
    </Tooltip>
  );
};
const PokemonMoves = ({
  names,
  ability: abilityName,
  item,
}: {
  names: string[];
  ability: string;
  item?: string;
}) => {
  const { moveDex, abilityDex } = useContext(DexContext);
  const moves = names
    .map((n) =>
      moveDex.find(
        (move) => move.name.toLocaleLowerCase() === n.toLocaleLowerCase()
      )
    )
    .filter((m) => m !== undefined) as MoveEntity[];
  const ability = abilityDex.find((a) => abilityName === a.name);
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
      {ability && <AbilityCard ability={ability} />}

      <StyledCard>
        <Typography variant="caption">{item ?? "No item"}</Typography>
      </StyledCard>

      {moves.map((m) => (
        <MoveCard key={m.name} move={m} />
      ))}
    </Box>
  );
};

export default PokemonMoves;
