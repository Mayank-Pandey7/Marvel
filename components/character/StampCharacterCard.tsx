"use client";

import React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import {
  Shield,
  Swords,
  Heart,
  Zap,
  Sparkles,
  Flame,
  Crown,
  ArrowRight,
  Film,
} from "lucide-react";
import type { Character } from "@/data/characters";
import { getCharacterAvatar, getCharacterBackdrop } from "@/data/characterBackdrops";

interface RoleConfig {
  tag: string;
  tier: string;
  themeColor: string;
  borderColor: string;
  bgColor: string;
  patternColor: string;
  badgeBg: string;
  icon: React.ElementType;
}

export function getCharacterRoleConfig(character: Character, index: number): RoleConfig {
  const roleLower = (character.role + " " + character.faction).toLowerCase();
  const idLower = character.id.toLowerCase();

  const isVillain =
    roleLower.includes("villain") ||
    roleLower.includes("titan") ||
    roleLower.includes("conqueror") ||
    roleLower.includes("warlord") ||
    roleLower.includes("tyrant") ||
    roleLower.includes("threat") ||
    roleLower.includes("butcher") ||
    roleLower.includes("hydra") ||
    roleLower.includes("black order") ||
    roleLower.includes("latveria") ||
    idLower === "thanos" ||
    idLower === "kang-the-conqueror" ||
    idLower === "doctor-doom" ||
    idLower === "ultron" ||
    idLower === "green-goblin" ||
    idLower === "doc-ock" ||
    idLower === "hela" ||
    idLower === "killmonger" ||
    idLower === "gorr" ||
    idLower === "mysterio" ||
    idLower === "vulture" ||
    idLower === "red-skull" ||
    idLower === "high-evolutionary" ||
    idLower === "cassandra-nova" ||
    idLower === "galactus" ||
    idLower === "dormammu" ||
    idLower === "zemo" ||
    idLower === "abomination" ||
    idLower === "modok";

  if (isVillain) {
    return {
      tag: "VILLAIN",
      tier: "OMEGA",
      themeColor: "#f59e0b",
      borderColor: "#f59e0b",
      bgColor: "from-amber-100 via-yellow-50 to-orange-100",
      patternColor: "rgba(245, 158, 11, 0.15)",
      badgeBg: "bg-amber-100 text-amber-600 border-amber-200",
      icon: Flame,
    };
  }

  if (roleLower.includes("magic") || roleLower.includes("sorcerer") || roleLower.includes("witch") || roleLower.includes("mystic")) {
    return {
      tag: "MYSTIC",
      tier: "LEGENDARY",
      themeColor: "#22c55e",
      borderColor: "#22c55e",
      bgColor: "from-emerald-100 via-green-50 to-teal-100",
      patternColor: "rgba(34, 197, 94, 0.15)",
      badgeBg: "bg-green-100 text-green-600 border-green-200",
      icon: Sparkles,
    };
  }

  if (roleLower.includes("defender") || roleLower.includes("shield") || roleLower.includes("street") || roleLower.includes("soldier")) {
    return {
      tag: "DEFENDER",
      tier: "EPIC",
      themeColor: "#a855f7",
      borderColor: "#a855f7",
      bgColor: "from-purple-100 via-fuchsia-50 to-indigo-100",
      patternColor: "rgba(168, 85, 247, 0.15)",
      badgeBg: "bg-purple-100 text-purple-600 border-purple-200",
      icon: Shield,
    };
  }

  if (roleLower.includes("cosmic") || roleLower.includes("god") || roleLower.includes("thunder") || roleLower.includes("multiverse")) {
    return {
      tag: "COSMIC",
      tier: "MYTHIC",
      themeColor: "#06b6d4",
      borderColor: "#06b6d4",
      bgColor: "from-cyan-100 via-sky-50 to-blue-100",
      patternColor: "rgba(6, 182, 212, 0.15)",
      badgeBg: "bg-cyan-100 text-cyan-600 border-cyan-200",
      icon: Zap,
    };
  }

  if (roleLower.includes("tech") || roleLower.includes("iron") || roleLower.includes("stark") || roleLower.includes("genius")) {
    return {
      tag: "TECH",
      tier: "LEGENDARY",
      themeColor: "#ef4444",
      borderColor: "#ef4444",
      bgColor: "from-rose-100 via-red-50 to-amber-100",
      patternColor: "rgba(239, 68, 68, 0.15)",
      badgeBg: "bg-rose-100 text-rose-600 border-rose-200",
      icon: Crown,
    };
  }

  return {
    tag: "ALL-ROUNDER",
    tier: "EPIC",
    themeColor: "#f97316",
    borderColor: "#f97316",
    bgColor: "from-orange-100 via-amber-50 to-orange-100",
    patternColor: "rgba(249, 115, 22, 0.15)",
    badgeBg: "bg-orange-100 text-orange-600 border-orange-200",
    icon: Swords,
  };
}

export default function StampCharacterCard({
  character,
  index,
}: {
  character: Character;
  index: number;
}) {
  const config = getCharacterRoleConfig(character, index);
  const avatarUrl = getCharacterAvatar(character.id);
  const displayNumber = String(index + 1).padStart(3, "0");
  const IconComponent = config.icon;

  return (
    <div className="w-full max-w-[270px] mx-auto select-none">
      <Link
        href={`/characters/${character.id}`}
        className="group relative block w-full cursor-pointer rounded-none transform-gpu will-change-transform transition-all duration-200 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:-translate-y-2.5 hover:scale-[1.04] active:scale-[0.97]"
      >
      {/* 1. PERFORATED STAMP TICKET CONTAINER (Crisp 90-Degree Square Corners) */}
      <div className="relative bg-white shadow-[0_16px_36px_rgba(0,0,0,0.65)] group-hover:shadow-[0_24px_48px_rgba(0,0,0,0.9)] p-2 rounded-none transition-shadow duration-200">
        
        {/* Scalloped Perforation Punch-Out Teeth along Top Edge */}
        <div className="absolute -top-2.5 inset-x-3 flex justify-between pointer-events-none z-30">
          {Array.from({ length: 13 }).map((_, i) => (
            <span key={`top-${i}`} className="w-4 h-4 rounded-full bg-black block shrink-0" />
          ))}
        </div>

        {/* Scalloped Perforation Punch-Out Teeth along Bottom Edge */}
        <div className="absolute -bottom-2.5 inset-x-3 flex justify-between pointer-events-none z-30">
          {Array.from({ length: 13 }).map((_, i) => (
            <span key={`bot-${i}`} className="w-4 h-4 rounded-full bg-black block shrink-0" />
          ))}
        </div>

        {/* Scalloped Perforation Punch-Out Teeth along Left Edge */}
        <div className="absolute -left-2.5 inset-y-3 flex flex-col justify-between pointer-events-none z-30">
          {Array.from({ length: 20 }).map((_, i) => (
            <span key={`left-${i}`} className="w-4 h-4 rounded-full bg-black block shrink-0" />
          ))}
        </div>

        {/* Scalloped Perforation Punch-Out Teeth along Right Edge */}
        <div className="absolute -right-2.5 inset-y-3 flex flex-col justify-between pointer-events-none z-30">
          {Array.from({ length: 20 }).map((_, i) => (
            <span key={`right-${i}`} className="w-4 h-4 rounded-full bg-black block shrink-0" />
          ))}
        </div>

        {/* 2. INNER CARD BODY */}
        <div className="relative flex flex-col gap-2 bg-white rounded-none">

          {/* 3. TOP ART WINDOW WITH SHARP SQUARE EDGES */}
          <div
            className="relative w-full aspect-[3/4] rounded-none overflow-hidden bg-stone-900 flex items-center justify-center"
          >
            {/* Full Character Artwork */}
            <img
              src={getCharacterBackdrop(character.id) || avatarUrl}
              alt={character.name}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover object-top filter brightness-95 group-hover:brightness-105 group-hover:scale-105 transition-all duration-500 ease-out"
            />

            {/* Subtle Gradient Overlays for Depth & Watermark Contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/15 pointer-events-none" />
          </div>

          {/* 4. TICKET BOTTOM SECTION (Matching screenshot layout) */}
          <div className="flex items-end justify-between gap-2 px-1 pt-1.5 pb-0.5 border-t border-stone-100">
            <div className="flex flex-col min-w-0">
              {/* Character Name */}
              <h3 className="text-xs sm:text-[13.5px] font-black font-sans uppercase text-stone-900 tracking-tight leading-tight truncate group-hover:text-black">
                {character.name}
              </h3>
              {/* Films Count */}
              <span className="text-[9px] sm:text-[9.5px] font-mono font-semibold text-stone-500 uppercase tracking-wider mt-0.5">
                {character.entries.length} FILMS
              </span>
            </div>

            {/* Black EXPLORE Button */}
            <div className="flex items-center gap-1 py-1 px-2.5 bg-black text-white text-[8.5px] sm:text-[9px] font-mono font-black tracking-wider uppercase group-hover:bg-stone-800 transition-colors shrink-0 shadow-xs">
              <span>EXPLORE &gt;</span>
            </div>
          </div>

        </div>

      </div>
    </Link>
  </div>
  );
}
