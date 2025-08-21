import { useEffect, useState } from "react";

const MovingWords = () => {
  const [words] = useState([
    "Professional",
    "Compassionate", 
    "Healing",
    "Growth",
    "Resilience",
    "Empowerment",
    "Wellness",
    "Support",
    "Excellence",
    "Transformation"
  ]);

  const [positions, setPositions] = useState<Array<{x: number, y: number, word: string, delay: number}>>([]);

  useEffect(() => {
    const newPositions = words.map((word, index) => ({
      x: Math.random() * (window.innerWidth - 200),
      y: Math.random() * (window.innerHeight - 100),
      word,
      delay: index * 800
    }));
    setPositions(newPositions);
  }, [words]);

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {positions.map((item, index) => (
        <div
          key={item.word}
          className="absolute text-primary/10 font-bold text-4xl md:text-6xl select-none"
          style={{
            left: `${item.x}px`,
            top: `${item.y}px`,
            animationDelay: `${item.delay}ms`,
            animation: 'float 15s ease-in-out infinite'
          }}
        >
          {item.word}
        </div>
      ))}
      
      <style>
        {`
          @keyframes float {
            0%, 100% {
              transform: translateY(0px) rotate(0deg);
              opacity: 0.1;
            }
            25% {
              transform: translateY(-20px) rotate(1deg);
              opacity: 0.05;
            }
            50% {
              transform: translateY(-10px) rotate(-1deg);
              opacity: 0.08;
            }
            75% {
              transform: translateY(-30px) rotate(0.5deg);
              opacity: 0.03;
            }
          }
        `}
      </style>
    </div>
  );
};

export default MovingWords;