import { createContext } from "react";
import { Access } from "@/types";

export const SessionContext = createContext<Access | null>(null);
