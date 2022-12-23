import { Grid } from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";
import TrainerCard from "./TrainerCard";
import { useSelectedTrainerCategory } from "./TrainerSelect";

const Home = () => {
  const { title, selected, trainers } = useSelectedTrainerCategory();
  const [selectedTrainer, setSelectedTrainer] = useState<number | undefined>();
  useEffect(() => {
    setSelectedTrainer(undefined);
  }, [selected]);
  return (
    <>
      {title}
      <br />
      <Grid
        display="grid"
        gridTemplateColumns="repeat(4, 1fr)"
        gap={2}
        padding={2}
      >
        {trainers.map((trainer, index) => (
          <TrainerCard
            key={`${title}${index}`}
            trainer={trainer}
            selected={index === selectedTrainer}
            onSelect={(selected) =>
              setSelectedTrainer(index === selectedTrainer ? undefined : index)
            }
          />
        ))}
      </Grid>
    </>
  );
};

export default Home;
