import React, { useContext } from "react";
import LocalFlorist from "@mui/icons-material/LocalFlorist";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import {
  Box,
  IconButton,
  styled,
  Switch,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { blue, pink, green, red } from "@mui/material/colors";
import { AttemptContext } from "@common/AttemptContext";

const MaleToggle = styled(ToggleButton)(({ theme }) => ({
  color: blue["A400"],
  "&.Mui-selected": {
    backgroundColor: blue["A400"],
  },
}));
const FemaleToggle = styled(ToggleButton)(({ theme }) => ({
  color: pink[400],
  "&.Mui-selected": {
    backgroundColor: pink[400],
  },
}));
const FireToggle = styled(ToggleButton)(({ theme }) => ({
  color: red["A700"],
  "&.Mui-selected": {
    backgroundColor: red["A700"],
  },
}));
const PlantToggle = styled(ToggleButton)(({ theme }) => ({
  color: green[700],
  "&.Mui-selected": {
    backgroundColor: green[700],
  },
}));
const WaterToggle = styled(ToggleButton)(({ theme }) => ({
  color: blue[600],
  "&.Mui-selected": {
    backgroundColor: blue[600],
  },
}));

const Controls = () => {
  const { controls, ...attempt } = useContext(AttemptContext);
  return (
    <Box sx={{ display: "flex", flexDirection: "row", "& > *": { mx: 0.5 } }}>
      <ToggleButtonGroup
        size="small"
        exclusive
        value={attempt.gender}
        onChange={(_, value) => {
          if (value !== null) controls.setGender(value);
        }}
      >
        <MaleToggle value="male">
          <MaleIcon />
        </MaleToggle>
        <FemaleToggle value="female">
          <FemaleIcon />
        </FemaleToggle>
      </ToggleButtonGroup>
      <ToggleButtonGroup
        size="small"
        exclusive
        value={attempt.startingType}
        onChange={(_, value) => {
          if (value !== null) controls.setStartingType(value);
        }}
      >
        <PlantToggle value="grass">
          <LocalFlorist />
        </PlantToggle>
        <FireToggle value="fire">
          <LocalFireDepartmentIcon />
        </FireToggle>
        <WaterToggle value="water">
          <WhatshotIcon />
        </WaterToggle>
      </ToggleButtonGroup>
      <IconButton onClick={() => controls.startNewAttempt()}>
        <RestartAltIcon />
      </IconButton>
    </Box>
  );
};

export default Controls;
