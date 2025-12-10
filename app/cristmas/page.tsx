"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "../hawaii.module.css";
import { useCrystalProgress } from "../lib/useCrystalProgress";
import { CrystalBar } from "../components/CrystalBar";

export default function CristmasPage() {
  const { fragments, markCollected } = useCrystalProgress();
  const [showSantaJump, setShowSantaJump] = useState(false);
  const router = useRouter();

  const handleNext = () => {
    if (!fragments[2]) {
      markCollected(2);
    }
    setShowSantaJump(true);
    setTimeout(() => {
      router.push("/beach");
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
    src="/santa.mp4"
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
            backgroundImage: "url('/cristmas-bg.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <h2 style={{color:"red", border:"2px solid green", borderRadius: 16, padding: 16}}>Різдво на Гаваях.</h2>

          <div style={{ width: "100%", marginBottom: 24 }}>
            <div
              style={{
                position: "relative",
                paddingBottom: "56.25%",
                height: 0,
                overflow: "hidden",
                borderRadius: 16,
              }}
            >
              <iframe
                src="https://www.youtube.com/embed/3L7DS96JC5s"
                title="Різдво на Гаваях"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  border: 0,
                }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>

          <button className={styles.startButton} onClick={handleNext}>
            Далі
          </button>

          {showSantaJump && (
            <div className={styles.stitchDance}>
              🎅 Санта стрибає від радості! + пелюстка 3
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
