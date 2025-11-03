import {
  BrainCircuit,
  Home,
  School,
  User,
  Users,
  type LucideIcon,
} from "lucide-react";

export const ICONS = new Map<string, LucideIcon>([
  ["/dashboard", Home],
  ["/profile", User],
  ["/lms", BrainCircuit],
  ["/users", Users],
  ["/institute", School],
]);
