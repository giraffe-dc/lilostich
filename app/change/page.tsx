"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../hawaii.module.css";
import { useCrystalProgress } from "../lib/useCrystalProgress";
import { CrystalBar } from "../components/CrystalBar";

interface MemoryCard {
  id: number;
  value: string;
  matched: boolean;
}

const BASE_VALUES = ["/smile-1.jpg", "🌴", "🌊", "🌈", "🧸", "🦈", "🏠", "🎁", "🥥", "🍍"]; // 10 пар = 20 карт для сітки 5x4

function createDeck(): MemoryCard[] {
  const doubled = [...BASE_VALUES, ...BASE_VALUES];
  const shuffled = doubled
    .map((v) => ({ v, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map((item, index) => ({ id: index, value: item.v, matched: false }));
  return shuffled;
}

export default function ChangePage() {
  const { fragments, markCollected } = useCrystalProgress();
  const [cards, setCards] = useState<MemoryCard[]>([]);
  const [openIds, setOpenIds] = useState<number[]>([]);
  const [allMatched, setAllMatched] = useState(false);
  const [showMaze, setShowMaze] = useState(false);
  const [isMazeFullscreen, setIsMazeFullscreen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setCards(createDeck());
  }, []);

  useEffect(() => {
    if (cards.length > 0 && cards.every((c) => c.matched)) {
      setAllMatched(true);
      if (!fragments[4]) {
        markCollected(4);
      }
      setTimeout(() => {
        setShowMaze(true);
      }, 1500);
    }
  }, [cards, fragments, markCollected]);

  const handleCardClick = (card: MemoryCard) => {
    if (card.matched || openIds.includes(card.id) || showMaze) return;

    if (openIds.length === 0) {
      setOpenIds([card.id]);
    } else if (openIds.length === 1) {
      const firstId = openIds[0];
      const firstCard = cards.find((c) => c.id === firstId);
      if (!firstCard) return;

      const newOpen = [firstId, card.id];
      setOpenIds(newOpen);

      if (firstCard.value === card.value) {
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) =>
              c.id === firstId || c.id === card.id ? { ...c, matched: true } : c
            )
          );
          setOpenIds([]);
        }, 600);
      } else {
        setTimeout(() => {
          setOpenIds([]);
        }, 800);
      }
    }
  };

  const handleNext = () => {
    if (!fragments[5]) {
      markCollected(5);
    }
    setTimeout(() => {
      router.push("/cabibara");
    }, 1200);
  };

  return (
    <div className={styles.page} style={{
            backgroundImage: "url('/birthday-bg.mp4')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}>
    <video
    className={styles.videoBackground}
    src="/beach.mp4"
    autoPlay
    muted
    loop
    playsInline
  />
      <CrystalBar fragments={fragments} />
      <main className={styles.main} style={{width: "100%", height: "100%"}}>
        <div
          className={styles.slide}
          style={{
            backgroundImage: "url('/change-bg.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center", 
            width: "100vw", height: "100vh",
            justifyContent: "center",
            alignItems: "center",
            // margin: "0 auto",

          }}
        >
          <h2 style={{color:"red", border:"2px solid green", borderRadius: 16, padding: 16}}>Знайди нас...</h2>

          {!showMaze && (
            <>
              <p style={{color:'black'}}>Відкривай картки по дві і шукай однакові пари!</p>
              <div className={styles.memoryGrid}>
                {cards.slice(0, 20).map((card) => {
                  const isOpen = openIds.includes(card.id) || card.matched;
                  return (
                    <div
                      key={card.id}
                      className={styles.memoryCard}
                      onClick={() => handleCardClick(card)}
                    >
                      {isOpen ? (
                        typeof card.value === "string" && card.value.startsWith("/") ? (
                          <img
                            src={card.value}
                            alt="Картка"
                            style={{ width: "70%", height: "100%", objectFit: "cover", borderRadius: 8 }}
                          />
                        ) : (
                          card.value
                        )
                      ) : (
                        "?"
                      )}
                    </div>
                  );
                })}
              </div>
              {allMatched && (
                <div className={styles.stitchDance}>Ви знайшлись! + пелюстка 5</div>
              )}
            </>
          )}

          {showMaze && (
            <div >
              <p style={{color:'black'}}>Тепер проведи героїв лабіринтом до їхніх будиночків очима чи пальчиком!</p>
              <div
                style={{
                  width: "100%",
                  // maxWidth: 600,
                  height: "60vh",
                  borderRadius: 16,
                  backgroundImage: "url('/maze-placeholder.png')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  marginBottom: 24,
                  cursor: "pointer",
                }}
                onClick={() => setIsMazeFullscreen(true)}
              >
                {/* Спрощене зображення лабіринту, без складної логіки */}
              </div>

              <button className={styles.startButton} onClick={handleNext}>
                Далі
              </button>
            </div>
          )}
        {isMazeFullscreen && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.8)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 300,
            }}
            onClick={() => setIsMazeFullscreen(false)}
          >
            <div
              style={{
                 width: "100vw",
        height: "100vh",
        backgroundImage: "url('/maze-placeholder.png')",
        backgroundSize: "contain",          // було "contain"
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
              }}
            />
          </div>
        )}
        </div>
      </main>
    </div>
  );
}
