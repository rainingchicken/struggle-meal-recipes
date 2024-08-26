import { createContext } from "react";

interface ITheseProceduresContext {
  theseProcedures: string | null | any;
  setTheseProcedures: Function;
}

export const TheseProceduresContext = createContext<ITheseProceduresContext>(
  {} as ITheseProceduresContext
);
