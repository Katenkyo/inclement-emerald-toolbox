import React from "react";
import { useSelectedTrainerCategory } from "./TrainerSelect";

const Home = () => {
  const { title, trainers } = useSelectedTrainerCategory();
  return (
    <>
      {title}
      <br />
      {trainers[0].trainer}
    </>
  );
};

export default Home;
