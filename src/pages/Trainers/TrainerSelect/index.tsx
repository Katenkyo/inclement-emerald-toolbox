import React, { useContext, useEffect } from "react";
import { FormControl, Select, FormLabel } from "@mui/material";
import { createSearchParams, useLocation, useNavigate } from "react-router-dom";
import { MenuItem } from "@mui/material";
import trainers from "@assets/trainers.json";
import { AttemptContext } from "@common/AttemptContext";
export type TrainerEntity = typeof trainers[number][number];

export const TRAINER_PARAM = "trainer_category";
export const TRAINER_ID = "trainer_id";
export const categories = [
  "Gym leaders",
  "Elite 4 + Champion",
  "Aqua/Magma",
  "Wally",
  "Rival(Grass)",
  "Rival(Fire)",
  "Rival(Water)",
  "Rematches(Single)",
  "Rematches(Double)",
  "Others",
];

export const useSelectedTrainerCategory = () => {
  const location = useLocation();
  const param = new URLSearchParams(location.search).get(TRAINER_PARAM);
  const selected = parseInt(param ?? "0");
  const navigate = useNavigate();

  return {
    title: categories[selected],
    selected,
    trainers: trainers[selected],
    simulateAgainst: (id: number) =>
      navigate(
        `/simulator?${createSearchParams({
          [TRAINER_PARAM]: `${selected}`,
          [TRAINER_ID]: `${id}`,
        })}`
      ),
  };
};
export const useSelectedTrainer = () => {
  const location = useLocation();
  const categoryParam = new URLSearchParams(location.search).get(TRAINER_PARAM);
  const category = parseInt(categoryParam ?? "0");
  const idParam = new URLSearchParams(location.search).get(TRAINER_ID);
  const id = parseInt(idParam ?? "0");
  return trainers[category][id];
};

const TrainerSelect = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const param = new URLSearchParams(location.search).get(TRAINER_PARAM);
  const selected = parseInt(param ?? "0");
  const { startingType } = useContext(AttemptContext);

  const handleChange = (value: number | string, replace?: boolean) => {
    navigate(`?${createSearchParams({ [TRAINER_PARAM]: `${value}` })}`, {
      replace,
    });
  };
  useEffect(() => {
    if (param === null) handleChange(0, true);
  }, [param]);
  return (
    <FormControl sx={{ width: "30ch" }} size="small">
      <FormLabel title="Trainer Category" />
      <Select
        value={selected}
        onChange={(evt) => {
          handleChange(evt.target.value);
        }}
        size="small"
      >
        {categories.map((val, index) => (
          <MenuItem
            key={val}
            value={index}
            disabled={
              !val
                .toLocaleLowerCase()
                .includes(startingType.toLocaleLowerCase()) &&
              val.toLocaleLowerCase().includes("rival")
            }
          >
            {val}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default TrainerSelect;
