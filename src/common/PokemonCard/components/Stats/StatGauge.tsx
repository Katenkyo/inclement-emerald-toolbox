import { Box, styled, TextField, Theme, Typography } from "@mui/material";
import React from "react";
import { natureColor, NATURES } from "./consts";

const generateGradient = (base: number) => (theme: Theme) => {
  const low = theme.palette.error.dark;
  const mid = theme.palette.warning.dark;
  const high = theme.palette.success.dark;
  const background = theme.palette.background.default;
  const selected = base <= 50 ? low : base < 100 ? mid : high;
  // not a lot of base 255, or over 155, so let's just have a better representation of stats
  const percent = Math.min(base / 1.55, 100);

  return `linear-gradient(90deg, ${selected} 0%, ${selected} ${percent}%, ${background} ${percent}%, ${background} 100%)`;
};

type StatGaugeOfInstanceProps = StatGaugeProps & {
  iv: number;
  ev: number;
  nature: NatureName;
  onEdit?: (
    ivOrEv: keyof Pick<PlayerPokemonInstance, "ivs" | "evs">,
    value: number
  ) => void;
};
type StatGaugeProps = { base: number; label: keyof PokemonStats };
const isStatGaugeOfInstance = (
  x: StatGaugeOfInstanceProps | StatGaugeProps
): x is StatGaugeOfInstanceProps =>
  (x as StatGaugeOfInstanceProps).ev !== undefined;
const Field = styled(TextField)(({ theme }) => ({
  width: "6ch",
  "&  input": { padding: 0, paddingLeft: "12px" },
  "& > .MuiInputBase-root": {
    "&.Mui-disabled": {
      backgroundColor: theme.palette.grey["900"],
    },
    "& > .MuiInputBase-input.Mui-disabled": {
      "-webkit-text-fill-color": "inherit",
    },
  },
}));
const StatGauge = (props: StatGaugeProps | StatGaugeOfInstanceProps) => {
  const { base, label } = props;
  const isInstance = isStatGaugeOfInstance(props);

  return (
    <Box sx={{ display: "flex", flexDirection: "row" }}>
      <Box
        sx={{
          width: "100px",
          borderRadius: "3em",
          backgroundColor: "red",
          background: generateGradient(base),
          my: 0.5,
          height: "16px",
          padding: 0,
        }}
      >
        <Typography
          sx={{
            width: "100%",
            paddingLeft: 1,
            fontSize: "12px",
            top: "3px",
            lineHeight: 1,
            position: "relative",
          }}
        >
          {`${label.padEnd(4, " ")}${base}`}
        </Typography>
      </Box>
      {/* {isInstance && (
        <Typography
          variant="caption"
          sx={{ color: natureColor(label, NATURES[props.nature]) }}
        >{`${("" + props.iv).padStart(2, "0")}|${props.ev}`}</Typography>
      )} */}
      {isInstance && (
        <>
          {[
            { key: "ivs", value: props.iv },
            { key: "evs", value: props.ev },
          ].map(({ key, value }) => (
            <Field
              key={key}
              variant="filled"
              hiddenLabel
              disabled={props.onEdit === undefined}
              defaultValue={value}
              onBlur={(evt) =>
                (props.onEdit ?? (() => {}))(
                  key as "ivs" | "evs",
                  parseInt(evt.target.value)
                )
              }
              sx={{
                "& > .MuiInputBase-root": {
                  color: natureColor(label, NATURES[props.nature]),
                  "& > .MuiInputBase-input.Mui-disabled": {
                    color: natureColor(label, NATURES[props.nature]),
                  },
                },
              }}
            />
          ))}
        </>
      )}
    </Box>
  );
};
export default StatGauge;
