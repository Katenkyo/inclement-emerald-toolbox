import Boy from "@mui/icons-material/Boy";
import {
  Box,
  Button,
  Grid,
  IconButton,
  Paper,
  PaperProps,
  styled,
  Typography,
} from "@mui/material";
import { Card } from "@mui/material";
import React from "react";
import { TrainerEntity, useSelectedTrainerCategory } from "../TrainerSelect";
import { TrainerPokemonCard } from "@common/PokemonCard";
import DeviceHubIcon from "@mui/icons-material/DeviceHub";
import { useNavigate } from "react-router-dom";

const StyledBoy = styled(Boy)({ "&:last-of-type": { marginLeft: "-12px" } });
const ElevatedPaper = styled((props: PaperProps) => (
  <Paper elevation={2} {...props} />
))({});

const TrainerCard = ({
  trainer,
  selected = false,
  onSelect = () => {},
  onFight = () => {},
}: {
  trainer: TrainerEntity;
  selected?: boolean;
  onSelect?: (selected: boolean) => void;
  onFight?: () => void;
}) => {
  const team = trainer.team;
  return (
    <Card
      sx={{
        gridColumn: `span ${selected ? 4 : 1}`,
        display: "flex",
        flexDirection: "column",
        padding: 1,
      }}
      component={selected ? Paper : Button}
      onClick={() => (selected ? undefined : onSelect(!selected))}
    >
      <Grid container direction="row" justifyContent="space-between">
        <Box sx={{ display: "flex", direction: "row" }}>
          <Typography variant="h5">{trainer.trainer}</Typography>
          <Typography variant="h6" color="text.disabled">
            {trainer.level}
          </Typography>
          {selected && (
            <IconButton onClick={() => onFight()}>
              <DeviceHubIcon />
            </IconButton>
          )}
        </Box>
        <Box sx={{ display: "flex", direction: "row" }}>
          {trainer.format?.includes("Double") ? (
            <>
              <StyledBoy />
              <StyledBoy />
            </>
          ) : (
            <></>
          )}
        </Box>
      </Grid>
      <Grid
        display="grid"
        gridTemplateColumns="repeat(3,1fr)"
        component={ElevatedPaper}
        gap={1}
        flex={1}
        padding={1}
        width="100%"
      >
        {team.map((pokemon, index) => (
          <TrainerPokemonCard
            key={pokemon?.name ?? index}
            pokemon={pokemon}
            expanded={selected}
          />
        ))}
      </Grid>
    </Card>
  );
};

export default TrainerCard;
