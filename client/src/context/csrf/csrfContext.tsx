import { createContext } from "react";

const CsrfContext = createContext<CsrfContextType | null>(null)

export default CsrfContext