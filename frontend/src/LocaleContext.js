import { createContext } from "react";

const defaultValue = {
  locale: "en-US",
  setLocale: () => {},
};

export default createContext(defaultValue);
