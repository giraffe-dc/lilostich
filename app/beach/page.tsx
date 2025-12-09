"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "../hawaii.module.css";
import { useCrystalProgress } from "../lib/useCrystalProgress";
import { CrystalBar } from "../components/CrystalBar";

export default function BeachPage() {
  const { fragments, markCollected } = useCrystalProgress();
  const [showStitch, setShowStitch] = useState(false);
  const router = useRouter();

  const handleNext = () => {
    if (!fragments[3]) {
      markCollected(3);
    }
    setShowStitch(true);
    setTimeout(() => {
      router.push("/change");
    }, 1500);
  };

  return (
    <div className={styles.page} style={{
            backgroundImage: "url('/birthday-bg.mp4')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}>
    <video
    className={styles.videoBackground}
    src="/birthday-bg.mp4"
    autoPlay
    muted
    loop
    playsInline
  />
      <CrystalBar fragments={fragments} />
      <main className={styles.main}>
        <div
          className={styles.slide}
          style={{
            backgroundImage: "url('/beach-bg.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <h2>Гавайський Пляж.</h2>
          <p>Час відпочинку, але пригода триває!</p>

          <button className={styles.startButton} onClick={handleNext}>
            Далі
          </button>

          {showStitch && (
            <div className={styles.stitchDance}>
              👾 Стіч стрибає на піску! + пелюстка 4
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
