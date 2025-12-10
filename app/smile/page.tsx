"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../hawaii.module.css";
import { useCrystalProgress } from "../lib/useCrystalProgress";
import { CrystalBar } from "../components/CrystalBar";

const SMILE_IMAGES = [
  "/smile-1.jpg",
  "/smile-2.jpg",
  "/smile-3.jpg",
  "/smile-4.jpg",
  "/smile-5.jpg",
  "/smile-6.jpg",
  "/smile-7.jpg",
  "/smile-8.jpg",
  "/smile-9.jpg",
  "/smile-10.jpg",
  "/smile-11.jpg"
];

export default function SmilePage() {
  const { fragments, markCollected } = useCrystalProgress();
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [showStitch, setShowStitch] = useState(false);
  const router = useRouter();

  const handleGenerate = () => {
    const index = Math.floor(Math.random() * SMILE_IMAGES.length);
    setCurrentImage(SMILE_IMAGES[index]);
  };

  const handleNext = () => {
    if (!fragments[0]) {
      markCollected(0);
    }
    setShowStitch(true);
    setTimeout(() => {
      router.push("/battle");
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
    src="/smile-forest-bg.mp4"
    autoPlay
    muted
    loop
    playsInline
  />
      <CrystalBar fragments={fragments} />
      <main className={styles.main}>
      <audio
            src="/dd25.mp3"
            autoPlay            
            // loop
            // style={{ display: "none" }}
          />
        <div
          className={styles.slide}
          // style={{
          //   backgroundImage: "url('/smile-forest-bg.jpg')",
          //   backgroundSize: "cover",
          //   backgroundPosition: "center",
          // }}
        >
          <h2 style={{color:"red", border:"2px solid green", borderRadius: 16, padding: 16}}>Комічний Ліс — Місія Хохотун</h2>
          {/* <p>Натискай кнопку і дивись, який кумедний герой з'явиться!</p> */}

          <div style={{ margin: "20px 0" }}>
            <button className={styles.startButton} onClick={handleGenerate}>
              Згенерувати
            </button>
          </div>

          {currentImage && (
            <div
              style={{
                maxWidth: 400,
                width: "100%",
                padding: 16,
                background: "rgba(255,255,255,0.8)",
                borderRadius: 16,
              }}
            >
              <img
                src={currentImage}
                alt="Смішний герой"
                style={{ width: "100%", borderRadius: 12 }}
              />
            </div>
          )}

          <div style={{ marginTop: 32 }}>
            <button className={styles.startButton} onClick={handleNext}>
              Далі
            </button>
          </div>

          {showStitch && (
            <div className={styles.stitchDance}>👾  +1 пелюстка</div>
          )}
        </div>
      </main>
    </div>
  );
}
