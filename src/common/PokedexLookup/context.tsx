import React, { createContext, PropsWithChildren, useState } from "react";

type SearchContextType = { search: string; setSearch: (v: string) => void };

export const SearchContext = createContext<SearchContextType>({
  search: "",
  setSearch: () => {},
});

const SearchContextProvider = (props: PropsWithChildren<{}>) => {
  const [search, setSearch] = useState<string>("");
  return (
    <SearchContext.Provider value={{ search, setSearch }}>
      {props.children}
    </SearchContext.Provider>
  );
};

export default SearchContextProvider;
