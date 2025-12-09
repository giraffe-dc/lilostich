"use client";

import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "ohana_crystal_fragments";
const FRAGMENTS_COUNT = 7;

export type CrystalFragments = boolean[];

function getInitialFragments(): CrystalFragments {
  if (typeof window === "undefined") {
    return Array(FRAGMENTS_COUNT).fill(false);
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return Array(FRAGMENTS_COUNT).fill(false);
    const parsed = JSON.parse(raw) as boolean[];
    if (!Array.isArray(parsed)) return Array(FRAGMENTS_COUNT).fill(false);
    const normalized = Array(FRAGMENTS_COUNT)
      .fill(false)
      .map((_, i) => Boolean(parsed[i]));
    return normalized;
  } catch {
    return Array(FRAGMENTS_COUNT).fill(false);
  }
}

export function useCrystalProgress() {
  const [fragments, setFragments] = useState<CrystalFragments>(getInitialFragments);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(fragments));
  }, [fragments]);

  const markCollected = useCallback((index: number) => {
    setFragments(prev => {
      if (index < 0 || index >= FRAGMENTS_COUNT) return prev;
      if (prev[index]) return prev;
      const next = [...prev];
      next[index] = true;
      return next;
    });
  }, []);

  const resetFragments = useCallback(() => {
    setFragments(Array(FRAGMENTS_COUNT).fill(false));
  }, []);

  return { fragments, markCollected, resetFragments };
}
