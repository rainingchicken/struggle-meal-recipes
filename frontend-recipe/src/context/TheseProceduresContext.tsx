import { createContext } from "react";

// interface ITheseProceduresContext {
//   theseProcedures: string | null | any;
//   setTheseProcedures: Function;
// }

export const TheseProceduresContext = createContext<any>({} as any);
