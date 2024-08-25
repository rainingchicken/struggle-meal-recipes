import { useContext } from "react";
import { ProceduresContext } from "./ProceduresContext";

export const useProceduresContext = () => {
  const context = useContext(ProceduresContext);
  if (!context) {
    throw Error(
      "useProceduresContext must be used inside an ProceduresContextProvider"
    );
  }
  return context;
};
