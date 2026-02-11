import {
  Flame,
  Lock,
  Wrench,
  Construction,
  Wind,
  Scaling,
  Zap,
  Biohazard,
  FileSearch,
  MountainSnow,
  HeartPulse,
  BrainCircuit,
  BookOpen,
  type LucideIcon,
} from 'lucide-react'

const ICON_MAP: Record<string, LucideIcon> = {
  Flame,
  Lock,
  Wrench,
  Construction,
  Wind,
  Scaling,
  Zap,
  Biohazard,
  FileSearch,
  MountainSnow,
  HeartPulse,
  BrainCircuit,
}

export function getCourseIcon(iconName: string): LucideIcon {
  return ICON_MAP[iconName] ?? BookOpen
}
