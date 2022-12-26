import React, {
  createContext,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";

type AttemptControls = {
  setGender: (g: Attempt["gender"]) => void;
  setStartingType: (t: Attempt["startingType"]) => void;
  startNewAttempt: () => void;
  addEnconter: (p: PlayerPokemonInstance) => void;
};
type AttemptContextType = Attempt & {
  controls: AttemptControls;
  attemptNo: number;
};
// Using these as defaults as it looks like that's what I'll be going for
// Don't wanna deal with that ES Arcanine,
const defaultAttempt: Attempt = {
  pokemons: [],
  startingType: "fire",
  gender: "male",
};
const defaultValue: AttemptContextType = {
  ...defaultAttempt,
  attemptNo: 0,
  controls: {
    setGender: () => {},
    setStartingType: () => {},
    startNewAttempt: () => {},
    addEnconter: () => {},
  },
};
export const AttemptContext = createContext<AttemptContextType>(defaultValue);

/**
 * Storage
 */
export const STORAGE_ATTEMPT_KEY = "attempts";
const getAttempts = () => {
  let val = localStorage.getItem(STORAGE_ATTEMPT_KEY);
  if (val === null) return [];
  return JSON.parse(val) as Attempt[];
};
const saveAttempts = (x: Attempt[]) => {
  localStorage.setItem(STORAGE_ATTEMPT_KEY, JSON.stringify(x));
};
/**
 * Controls builders
 */

const getGenderControl =
  (dispatch: React.Dispatch<React.SetStateAction<Attempt[]>>) =>
  (gender: Attempt["gender"]) =>
    dispatch((attempts) => {
      const current = attempts.pop();
      const modified =
        current === undefined ? [] : [...attempts, { ...current, gender }];
      saveAttempts(modified);
      return modified;
    });
const getStartingTypeControl =
  (dispatch: React.Dispatch<React.SetStateAction<Attempt[]>>) =>
  (startingType: Attempt["startingType"]) =>
    dispatch((attempts) => {
      const current = attempts.pop();
      const modified =
        current === undefined
          ? []
          : [...attempts, { ...current, startingType }];
      saveAttempts(modified);
      return modified;
    });
const getNewAttemptControl =
  (dispatch: React.Dispatch<React.SetStateAction<Attempt[]>>) => () => {
    dispatch((attempts) => {
      const modified = [...attempts, defaultAttempt];
      saveAttempts(modified);
      return modified;
    });
  };
const getAddEnconterControl =
  (dispatch: React.Dispatch<React.SetStateAction<Attempt[]>>) =>
  (p: PlayerPokemonInstance) =>
    dispatch((attempts) => {
      const modified = attempts.map((a, i) =>
        i !== attempts.length - 1 ? a : { ...a, pokemons: [...a.pokemons, p] }
      );
      const isStarter = p.captureLocationName.toLocaleLowerCase() === "starter";
      if (isStarter) {
        modified[modified.length - 1].startingType =
          p.dexEntry.type1.toLocaleLowerCase() as PokemonType;
      }
      saveAttempts(modified);
      return [...modified];
    });

const getControls = (
  dispatch: React.Dispatch<React.SetStateAction<Attempt[]>>
): AttemptControls => ({
  setGender: getGenderControl(dispatch),
  setStartingType: getStartingTypeControl(dispatch),
  startNewAttempt: getNewAttemptControl(dispatch),
  addEnconter: getAddEnconterControl(dispatch),
});

const AttempContextProvider = (props: PropsWithChildren<{}>) => {
  const [attempts, setAttempts] = useState<Attempt[]>(getAttempts());
  useEffect(() => {
    if (attempts.length === 0) saveAttempts([defaultValue]);
  }, [attempts]);

  const currentAttempt = attempts[attempts.length - 1];
  return (
    <AttemptContext.Provider
      value={
        {
          ...currentAttempt,
          controls: getControls(setAttempts),
          attemptNo: attempts.length,
        } ?? defaultValue
      }
    >
      {props.children}
    </AttemptContext.Provider>
  );
};

export default AttempContextProvider;
