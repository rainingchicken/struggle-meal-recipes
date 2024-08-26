import { useContext } from "react";
import { TheseProceduresContext } from "./TheseProceduresContext";

export const useProceduresContext = () => {
  const context = useContext(TheseProceduresContext);
  if (!context) {
    throw Error(
      "TheseProceduresContext must be used inside an TheseProceduresContextProvider"
    );
  }
  return context;
};
