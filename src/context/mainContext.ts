import { createContext, Context } from "react";

const MainContext: Context<any> = createContext<boolean | undefined>(undefined);
export default MainContext;
