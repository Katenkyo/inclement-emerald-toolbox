import { styled } from "@mui/material";
import React from "react";

const TypeImg = styled("img")({
  height: "14px",
  width: "32px",
  alignSelf: "center",
  margin: "0px 4px",
});
export const TypeImage = ({ name }: { name?: PokemonType }) => (
  <>
    {name && (
      <TypeImg
        src={`https://veekun.com/dex/media/types/en/${name.toLocaleLowerCase()}.png`}
      />
    )}
  </>
);

const StyledImg = styled("img")({ height: "96px", width: "96px" });
export const Sprite = ({ name }: { name?: string }) => (
  <StyledImg
    src={`https://play.pokemonshowdown.com/sprites/gen5/${(
      name ?? ""
    ).toLocaleLowerCase()}.png`}
  />
);
