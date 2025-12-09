"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../hawaii.module.css";
import { useCrystalProgress } from "../lib/useCrystalProgress";
import { CrystalBar } from "../components/CrystalBar";

type SignalColor = "blue" | "orange" | "green" | "red";

const SIGNALS: { color: SignalColor; action: string; emoji: string }[] = [
  { color: "blue", action: "Замри!", emoji: "🔵" },
  { color: "orange", action: "Стрибок!", emoji: "🟠" },
  { color: "green", action: "Біжи!", emoji: "🟢" },
  { color: "red", action: "Обійми!", emoji: "🔴" },
];

export default function BattlePage() {
  const { fragments, markCollected } = useCrystalProgress();
  const [currentSignal, setCurrentSignal] = useState<SignalColor | null>(null);
  const [score, setScore] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      const random = SIGNALS[Math.floor(Math.random() * SIGNALS.length)];
      setCurrentSignal(random.color);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleAction = () => {
    setShowModal(true);
    setTimeout(() => {
     setShowModal(false);
    router.push("/cristmas");
    }, 5000);
  };

  const handleNext = () => {
    if (!fragments[1]) {
      markCollected(1);
    }
    setShowModal(false);
    router.push("/cristmas");
  };

  const signalData = SIGNALS.find((s) => s.color === currentSignal) ?? null;

  return (
    <div className={styles.page} style={{
            backgroundImage: "url('/birthday-bg.mp4')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}>
    <video
    className={styles.videoBackground}
    src="/battle-bg.mp4"
    autoPlay
    muted
    loop
    playsInline
  />
      <CrystalBar fragments={fragments} />
      <main className={styles.main}>
      <audio
            src="/battle-fon.mp3"
            autoPlay            
            // loop
            // style={{ display: "none" }}
          />
        <div
          className={styles.slide}
          style={{
            backgroundImage: "url('/  .jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <h2>STOP THE INVADER</h2>
          {/* <p>Стій навпроти Ганту і уважно стеж за сигналами!</p>

          <div className={styles.gantu}>🦈 Ганту</div> */}

          {signalData && (
            <div className={`${styles.signal} ${styles[signalData.color]}`}>
              <div style={{ fontSize: "3rem" }}>{signalData.emoji}</div>
              <p>{signalData.action}</p>
            </div>
          )}

          <button className={styles.actionButton} onClick={handleAction}>
            Виконати дію!
          </button>

          {/* <p>Правильних реакцій: {score}/4</p> */}
        </div>

        {showModal && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.7)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 200,
            }}
          >
            <div
              style={{
                background: "white",
                padding: 20,
                borderRadius: 16,
                // maxWidth: 640,
                width: "90%",
              }}
            >
              {/* <h3 style={{ marginBottom: 12 }}>Відео битви з Ганту</h3> */}
              <video
                src="/battle-boom.mp4"
                controls autoPlay
                style={{ width: "100%", borderRadius: 12, marginBottom: 12 }}
              />
              {/* <div style={{ display: "flex", gap: 12, justifyContent: "flex-end" }}>
                <button
                  className={styles.actionButton}
                  type="button"
                  onClick={() => setShowModal(false)}
                >
                  Закрити
                </button>
                <button
                  className={styles.startButton}
                  type="button"
                  onClick={handleNext}
                >
                  Далі
                </button>
              </div> */}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
