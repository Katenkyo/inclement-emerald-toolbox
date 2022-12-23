import React, { useEffect } from "react";
import { FormControl, Select, FormLabel } from "@mui/material";
import { createSearchParams, useLocation, useNavigate } from "react-router-dom";
import { MenuItem } from "@mui/material";
import trainers from "@assets/trainers.json";

export const TRAINER_PARAM = "trainer_category";
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

  return {
    title: categories[selected],
    selected,
    trainers: trainers[selected],
  };
};

const TrainerSelect = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const param = new URLSearchParams(location.search).get(TRAINER_PARAM);
  const selected = parseInt(param ?? "0");

  const handleChange = (value: number | string) => {
    navigate(`?${createSearchParams({ [TRAINER_PARAM]: `${value}` })}`);
  };
  useEffect(() => {
    if (param === null) handleChange(0);
  }, [param]);
  return (
    <FormControl sx={{ width: "30ch" }}>
      <FormLabel title="Trainer Category" />
      <Select
        value={selected}
        onChange={(evt) => {
          handleChange(evt.target.value);
        }}
      >
        {categories.map((val, index) => (
          <MenuItem key={val} value={index}>
            {val}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default TrainerSelect;
