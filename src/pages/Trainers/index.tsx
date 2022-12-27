import { AttemptContext } from "@common/AttemptContext";
import { Grid } from "@mui/material";
import React, { useContext, useState } from "react";
import { useEffect } from "react";
import TrainerCard from "./TrainerCard";
import { useSelectedTrainerCategory } from "./TrainerSelect";

const Home = () => {
  const { title, selected, trainers, simulateAgainst } =
    useSelectedTrainerCategory();
  const { gender } = useContext(AttemptContext);
  const [selectedTrainer, setSelectedTrainer] = useState<number | undefined>();
  useEffect(() => {
    setSelectedTrainer(undefined);
  }, [selected]);
  let filtered = (trainers as any[]).filter(
    (trainer: any) =>
      (gender === "male" &&
        !trainer.trainer.toLocaleLowerCase().startsWith("brendan")) ||
      (gender === "female" &&
        !trainer.trainer.toLocaleLowerCase().startsWith("may"))
  );
  return (
    <Grid
      display="grid"
      gridTemplateColumns="repeat(4, 1fr)"
      gap={2}
      padding={2}
    >
      {filtered.map((trainer, index) => (
        <TrainerCard
          key={`${title}${index}`}
          trainer={trainer}
          selected={index === selectedTrainer}
          onSelect={() =>
            setSelectedTrainer(index === selectedTrainer ? undefined : index)
          }
          onFight={() => simulateAgainst(index)}
        />
      ))}
    </Grid>
  );
};

export default Home;
