"use client";

import Link from "next/link";
import styles from "./hawaii.module.css";
import { useCrystalProgress } from "./lib/useCrystalProgress";
import { CrystalBar } from "./components/CrystalBar";

export default function HomePage() {
  const { fragments, resetFragments } = useCrystalProgress();

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
        <div className={styles.welcomeSlide}>
          <div
            className={styles.hawaiianBackground}
            // style={{
            //   backgroundImage: "url('/birthday-bg.png')",
            //   backgroundSize: "cover",
            //   backgroundPosition: "center",
            // }}
          >
            <div className={styles.palmTrees}>🌴🌴</div>
            <h1 className={styles.title}>З Днем народження!</h1>
            {/* <h2 className={styles.subtitle}>Ліло, Стіч і друзі вже чекають!</h2> */}

            <div className={styles.instructions}>
              <p>Сьогодні ми вирушаємо в гавайську пригоду.</p>
              {/* <p>
                Допоможи зібрати всі пелюстки кристала Охани, проходячи веселi
                станції-квестu.
              </p>
              <p>Натискай кнопку внизу, щоб почати свято!</p> */}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <Link href="/stich" className={styles.startButton}>
                Вперед до пригоди!
              </Link>

              <button
                type="button"
                onClick={resetFragments}
                className={styles.startButton}
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,255,255,0.8))",
                  color: "#2C5F2D",
                }}
              >
                Скинути прогрес кристала
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
