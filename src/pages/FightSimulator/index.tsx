import React from "react";
import damageCalc from "@common/damageCalc";
import { useSelectedTrainer } from "@pages/Trainers/TrainerSelect";
import { Box, Divider, Grid } from "@mui/material";
import BoxedMon from "@pages/Progression/BoxedMon";

const FightSimulator = () => {
  const trainer = useSelectedTrainer();
  console.log(trainer);
  return (
    <Grid container direction="row" wrap="nowrap">
      <Box flex={1} padding={0.5}>
        <BoxedMon />
      </Box>
      <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />
      <Box flex={2} height={"100%"}></Box>
      <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />
      <Box flex={1} padding={0.5}>
        <BoxedMon />
      </Box>
    </Grid>
  );
};

export default FightSimulator;
