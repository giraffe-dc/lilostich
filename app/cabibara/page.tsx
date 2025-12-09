"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "../hawaii.module.css";
import { useCrystalProgress } from "../lib/useCrystalProgress";
import { CrystalBar } from "../components/CrystalBar";

const muzykList = [
  {url:'/1.Капібара Танцюй Уварова Наталя.mp3',
  name:"Капібара Танцюй"
  },{url:'/2.Капібара Медитуй  Уварова Наталя.mp3',
  name:"Капібара Медитуй"
  },{url:'/Капібара врубай.mp3',
  name:"Капібара врубай"
  },{url:'/Капібара зірочка палай.mp3',
  name:"Капібара зірочка палай"
  },{url:'/Капібара Олег.mp3',
  name:"Капібара Олег"
  },{url:'/Капібара смарагдове небо.mp3',
  name:"Капібара смарагдове небо"
  },{url:'/капібара танцюй Манікюр.mp3',
  name:"капібара танцюй Манікюр"
  },{url:'/Медитація Капібара 1 Уварова Наталя.mp3',
  name:"Медитація Капібара 1"
  },{url:'/Медитація Капібара 2 Уварова Наталя.mp3',
  name:"Медитація Капібара 2"
  },{url:'/Медитація Капібара 3 Уварова Наталя.mp3',
  name:"Медитація Капібара 3"
  }
]

export default function CabibaraPage() {
  const { fragments, markCollected } = useCrystalProgress();
  const [showVideo, setShowVideo] = useState(false);
  const [showJump, setShowJump] = useState(false);
  const router = useRouter();

  const handlePlayVideo = () => {
    setShowVideo(true);
  };

  const handleNext = () => {
    if (!fragments[6]) {
      markCollected(6);
    }
    setShowJump(true);
    setTimeout(() => {
      router.push("/final");
    }, 1500);
  };

  return (
    <div className={styles.page} style={{
            backgroundImage: "url('/cabibara-bg.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}>
    {/* <video
    className={styles.videoBackground}
    src="/beach.mp4"
    autoPlay
    muted
    loop
    playsInline
  /> */}
      <CrystalBar fragments={fragments} />
      <main className={styles.main}>
        <div
          className={styles.slide}
          style={{
            backgroundImage: "url('/cabibaras-bg.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <h2>Друзі Гаваїв — Капібара двіж</h2>

          <div style={{
            background: "rgba(255,255,255,0.85)",
            padding: 16,
            borderRadius: 16,
            marginBottom: 16,
            maxWidth: 500,
            width: "100%",
            
            
          }}>
            <p style={{color:"#000"}}>Обирай музику і влаштовуй пляжну дискотеку!</p>
            {muzykList.map((m) => (
              <div key={m.url} style={{ marginBottom: 12, display:'grid',gridTemplateColumns: '1fr 1fr' }}>
                <p style={{ margin: "0 0 4px", color: "#000", fontWeight: 600 }}>
                  {m.name}
                </p>
                <audio controls style={{ width: "100%" }}>
                  <source src={m.url} />
                </audio>
              </div>
            ))}
          </div>

          {!showVideo && (
            <button className={styles.startButton} onClick={handlePlayVideo}>
              УРА
            </button>
          )}

          {showVideo && (
            <div style={{ maxWidth: 640, width: "100%", position:'absolute' }}>
              <video
                src="/cabibara-dance.mp4"
                controls autoPlay
                style={{ width: "100%", borderRadius: 16, marginBottom: 16 }}
              />

              <button className={styles.startButton} onClick={handleNext}>
                Далі
              </button>

              {/* {showJump && (
                <div className={styles.stitchDance}>
                  🦫 Капібара стрибає від щастя! + пелюстка 7
                </div>
              )} */}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
