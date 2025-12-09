"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../hawaii.module.css";
import { useCrystalProgress } from "../lib/useCrystalProgress";
import { CrystalBar } from "../components/CrystalBar";

export default function StichPage() {
  const { fragments } = useCrystalProgress();
  const [showVideo, setShowVideo] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const alertTimer = setTimeout(() => {
      setShowVideo(true);
    }, 7000);

    const buttonTimer = setTimeout(() => {
      setShowButton(true);
    }, 15000);

    return () => {
      clearTimeout(alertTimer);
      clearTimeout(buttonTimer);
    };
  }, []);

  const handleHelp = () => {
    router.push("/smile");
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
          
        >
          <audio
            src="/alarm-siren.mp3"
            autoPlay
            
            // loop
            style={{ display: "none" }}
          />
          {/* <h2 style={{ color: "#ff4444" }}>Аварія на космічному кораблі!</h2> */}

          {!showVideo && (
            <div className={styles.warningPopup}>
              <h2>⚠️ УВАГА! ⚠️</h2>
              {/* <p>Сигнал тривоги! Стічу потрібна допомога!</p> */}
            </div>
          )}

          {showVideo && (
            <div style={{  width: "100%" }}>
              <video
                src="/stich-message.mp4"
                controls
                style={{ width: "100%", borderRadius: 16 }} autoPlay={true}
              />
            </div>
          )}

          {showButton && (
            <button className={styles.startButton} onClick={handleHelp}>
              На допомогу!
            </button>
          )}
        </div>
      </main>
    </div>
  );
}
