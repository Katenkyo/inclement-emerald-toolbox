import Boy from "@mui/icons-material/Boy";
import {
  Box,
  Grid,
  Paper,
  PaperProps,
  styled,
  Typography,
} from "@mui/material";
import { Card } from "@mui/material";
import React from "react";
import { TrainerEntity } from "../TrainerSelect";

const StyledBoy = styled(Boy)({ "&:last-of-type": { marginLeft: "-12px" } });
const ElevatedPaper = styled((props: PaperProps) => (
  <Paper elevation={2} {...props} />
))();

const TrainerCard = ({
  trainer,
  selected = false,
  onSelect = () => {},
}: {
  trainer: TrainerEntity;
  selected?: boolean;
  onSelect?: (selected: boolean) => void;
}) => {
  const team = trainer.team;
  return (
    <Card
      sx={{
        gridColumn: `span ${selected ? 4 : 1}`,
        display: "flex",
        flexDirection: "column",
      }}
      onClick={() => onSelect(!selected)}
    >
      <Grid container direction="row" justifyContent="space-between">
        <Box sx={{ display: "flex", direction: "row" }}>
          <Typography variant="h5">{trainer.trainer}</Typography>
          <Typography variant="h6">{trainer.level}</Typography>
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
        margin={1}
        padding={1}
      >
        {team.map((pokemon, index) => (
          <Paper key={pokemon?.name ?? index} elevation={3}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <img
                src={`https://play.pokemonshowdown.com/sprites/gen5/${(
                  pokemon?.name ?? ""
                ).toLocaleLowerCase()}.png`}
                width="96px"
                height="96px"
              />
              <Typography variant="caption" textAlign="center">
                {pokemon?.name ?? ""}
              </Typography>
            </Box>
          </Paper>
        ))}
      </Grid>
    </Card>
  );
};

export default TrainerCard;
