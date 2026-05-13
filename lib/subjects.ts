import {
  Atom,
  FlaskConical,
  Sigma,
  Flower2,
  Palette,
  FlaskConicalIcon,
} from "lucide-react";

export const subjects = [
  {
    name: "Physics",
    slug: "physics",
    icon: Atom,

    theme: {
      text: "text-cyan-300",
      border: "border-cyan-500/20",
      bg: "bg-cyan-500/10",
      glow: "bg-cyan-500/10",
      badge: "bg-cyan-500/10 text-cyan-300",
    },

    description:
      "Concepts, formulas, derivations and intuition.",
  },

  {
    name: "Chemistry",
    slug: "chemistry",
    icon: FlaskConicalIcon,

    theme: {
      text: "text-emerald-300",
      border: "border-emerald-500/20",
      bg: "bg-emerald-500/10",
      glow: "bg-emerald-500/10",
      badge:
        "bg-emerald-500/10 text-emerald-300",
    },

    description:
      "Reactions, mechanisms and quick revision.",
  },

  {
    name: "Math",
    slug: "math",
    icon: Sigma,

    theme: {
      text: "text-violet-300",
      border: "border-violet-500/20",
      bg: "bg-violet-500/10",
      glow: "bg-violet-500/10",
      badge: "bg-violet-500/10 text-violet-300",
    },

    description:
      "Theorems, formulas and problem solving.",
  },

  {
    name: "Yoga",
    slug: "yoga",
    icon: Flower2,

    theme: {
      text: "text-amber-300",
      border: "border-amber-500/20",
      bg: "bg-amber-500/10",
      glow: "bg-amber-500/10",
      badge: "bg-amber-500/10 text-amber-300",
    },

    description:
      "Theory, wellness and mindfulness.",
  },

  {
    name: "Painting",
    slug: "painting",
    icon: Palette,

    theme: {
      text: "text-rose-300",
      border: "border-rose-500/20",
      bg: "bg-rose-500/10",
      glow: "bg-rose-500/10",
      badge: "bg-rose-500/10 text-rose-300",
    },

    description:
      "Color, composition and artistic practice.",
  },
];