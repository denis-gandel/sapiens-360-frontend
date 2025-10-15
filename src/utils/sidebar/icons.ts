import {
  BrainCircuit,
  Home,
  School,
  Users,
  type LucideIcon,
} from "lucide-react";

export const ICONS = new Map<string, LucideIcon>([
  ["/dashboard", Home],
  ["/lms", BrainCircuit],
  ["/users", Users],
  ["/institute", School],
]);
