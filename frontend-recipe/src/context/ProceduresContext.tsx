import { createContext } from "react";

// interface IProceduresContext {
//   procedures: string | null | any;
//   setProcedures: Function;
// }

export const ProceduresContext = createContext<any>({} as any);
