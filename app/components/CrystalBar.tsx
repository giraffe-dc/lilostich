"use client";

import styles from "../hawaii.module.css";
import type { CrystalFragments } from "../lib/useCrystalProgress";

interface CrystalBarProps {
  fragments: CrystalFragments;
}

export function CrystalBar({ fragments }: CrystalBarProps) {
  return (
    <div className={styles.progressBar}>
      {fragments.map((collected, index) => (
        <div
          key={index}
          className={`${styles.fragment} ${collected ? styles.collected : ""}`}
        >
          🌺
        </div>
      ))}
    </div>
  );
}
