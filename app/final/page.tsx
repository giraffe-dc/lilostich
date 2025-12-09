"use client";

import { useState } from "react";
import styles from "../hawaii.module.css";
import { useCrystalProgress } from "../lib/useCrystalProgress";
import { CrystalBar } from "../components/CrystalBar";

export default function FinalPage() {
  const { fragments } = useCrystalProgress();
  const [showConfetti, setShowConfetti] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleFinal = () => {
    setShowConfetti(true);
    setShowModal(true);
  };

  return (
    <div className={styles.page}  style={{
            backgroundImage: "url('/cabibaras-bg.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}>
    <video
    className={styles.videoBackground}
    src="/final-video.mp4"
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
            backgroundImage: "url('/final-bg.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <h2>OHANA IS POWER</h2>

          <div style={{ maxWidth: 640, width: "100%", marginBottom: 24 }}>
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
                src="https://www.youtube.com/embed/nBh7yWbNOfY"
                title="Танець Стіча"
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

          <button className={styles.startButton} onClick={handleFinal}>
            Фінал
          </button>
{/* 
          {showConfetti && (
            <div className={styles.confetti}>🎊🎉🎊 Бульбашки радості та конфетті! 🎉🎊🎉</div>
          )} */}
        </div>

        {showModal && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 200,
            }}
          >
            <div
              style={{
                // background: "white",
                padding: 20,
                borderRadius: 16,
                // maxWidth: 640,
                width: "90%",
              }}
            >
              
              <video
                src="/final.mp4"
                controls autoPlay
                style={{ width: "90%", borderRadius: 12, marginBottom: 12 }}
              />
              <button
                className={styles.startButton}
                onClick={() => setShowModal(false)}
              >
                Закрити
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
