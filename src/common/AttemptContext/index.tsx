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
    dispatch((attempts) => [...attempts, defaultAttempt]);
  };

const getControls = (
  dispatch: React.Dispatch<React.SetStateAction<Attempt[]>>
): AttemptControls => ({
  setGender: getGenderControl(dispatch),
  setStartingType: getStartingTypeControl(dispatch),
  startNewAttempt: getNewAttemptControl(dispatch),
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
